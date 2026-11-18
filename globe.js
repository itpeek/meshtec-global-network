/* Progressive 3D enhancement: source SVG remains accessible if WebGL or CDN is unavailable. */
(() => {
  "use strict";
  const host = document.getElementById("meshtecGlobe");
  const existingMap = document.getElementById("worldMap");
  const bridge = window.MESHTECNetwork;
  if (!host || !bridge || !window.Globe) return;

  const views = {
    all:{lat:16,lng:17,altitude:2.4},
    "asia-pacific":{lat:21,lng:108,altitude:1.65},
    europe:{lat:48,lng:15,altitude:1.4},
    "north-america":{lat:42,lng:-100,altitude:1.64},
    "south-america":{lat:-15,lng:-63,altitude:1.66},
    "middle-east":{lat:27,lng:47,altitude:1.32},
    africa:{lat:0,lng:22,altitude:1.45}
  };
  const labels = [
    {name:"NORTH AMERICA",id:"north-america",lat:43,lng:-108},
    {name:"SOUTH AMERICA",id:"south-america",lat:-21,lng:-62},
    {name:"EUROPE",id:"europe",lat:52,lng:15},
    {name:"ASIA PACIFIC",id:"asia-pacific",lat:25,lng:109},
    {name:"MIDDLE EAST",id:"middle-east",lat:29,lng:45},
    {name:"AFRICA",id:"africa",lat:-9,lng:20}
  ];
  function inRegion(lat,lng) {
    if(lng < -32) return lat >= 10 ? "north-america" : "south-america";
    if(lat >= 12 && lat <= 43 && lng >= 35 && lng <= 63) return "middle-east";
    if(lat >= 35 && lat <= 73 && lng >= -25 && lng <= 43) return "europe";
    if(lat >= -36 && lat < 38 && lng >= -20 && lng <= 54) return "africa";
    return "asia-pacific";
  }
  function centerOf(feature) {
    const geometry=feature.geometry;
    if(!geometry) return [0,0];
    let outer = geometry.type === "Polygon" ? geometry.coordinates[0] : geometry.type === "MultiPolygon" ? geometry.coordinates.reduce((a,p)=>p[0].length>a.length?p[0]:a,[]) : [];
    if(!outer.length) return [0,0];
    // Use a representative vertex-average on the largest ring; handle dateline wrap.
    let sx=0,sy=0,n=0; const pivot=outer[0][0];
    for(const p of outer){let lon=p[0];if(lon-pivot>180)lon-=360;if(lon-pivot< -180)lon+=360;sx+=lon;sy+=p[1];n++;}
    let lng=sx/n; if(lng>180)lng-=360;if(lng< -180)lng+=360;
    return [sy/n,lng];
  }
  function featureRegion(feature){
    const n=(feature.properties?.name||feature.properties?.ADMIN||"").toLowerCase();
    if(["turkey","russia","russian federation","georgia","armenia","azerbaijan"].includes(n)) return "europe";
    if(["egypt","morocco","algeria","tunisia","libya","sudan","western sahara"].includes(n)) return "africa";
    if(["iran","iraq","israel","palestine","jordan","lebanon","syria","saudi arabia","yemen","oman","kuwait","qatar","bahrain","united arab emirates"].includes(n)) return "middle-east";
    const [lat,lng]=centerOf(feature);return inRegion(lat,lng);
  }
  const isActive=()=>bridge.getCurrent().region;
  let globe, boundaries=[];
  try{
    globe=Globe({animateIn:false,waitForGlobeReady:false})(host)
      .showAtmosphere(true)
      .atmosphereColor("#8797d3")
      .atmosphereAltitude(0.12)
      .backgroundColor("rgba(0,0,0,0)")
      .showGraticules(false)
      .globeImageUrl(null)
      .polygonAltitude(0.006)
      .polygonStrokeColor(()=>"#ffffff")
      .polygonSideColor(()=>"#d7d9e8")
      .polygonCapColor(f=>isActive()!=="all" && f._region===isActive()?"#353da9":"#dedede")
      .onPolygonClick(f=>{if(f?._region)bridge.selectRegion(f._region);})
      .onPolygonHover(f=>{host.style.cursor=f?"pointer":"grab";})
      .polygonLabel(f=>'<div class="globe-tooltip">'+String(f.properties?.name||f.properties?.ADMIN||"Region").replaceAll("<","&lt;")+'</div>')
      .labelsData(labels)
      .labelLat("lat").labelLng("lng").labelText("name")
      .labelColor(()=>"#393939").labelSize(0.72)
      .labelAltitude(0.013).labelResolution(2)
      .labelDotRadius(0.23).labelDotOrientation(()=> "bottom");
    const mat=globe.globeMaterial();
    if(mat?.color)mat.color.set("#f8f9fb");
    globe.controls().enableDamping=true;
    globe.controls().dampingFactor=0.08;
    globe.controls().autoRotate=false;
    globe.controls().minDistance=140;
    globe.controls().maxDistance=650;
    globe.pointOfView(views.all,0);
  }catch(e){host.replaceChildren();return;}
  function fit(){const r=host.getBoundingClientRect();if(r.width&&r.height){globe.width(r.width).height(r.height);}}
  fit();if(window.ResizeObserver)new ResizeObserver(fit).observe(host);else window.addEventListener("resize",fit);

  const url="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/DATA/world.geojson";
  fetch(url).then(r=>{if(!r.ok)throw Error("Map polygons unavailable");return r.json();}).then(data=>{
    boundaries=(data.features||[]).filter(f=>f.geometry?.type==="Polygon"||f.geometry?.type==="MultiPolygon");
    boundaries.forEach(f=>f._region=featureRegion(f));
    globe.polygonsData(boundaries);
    host.parentElement.classList.add("globe-ready");
    existingMap.setAttribute("aria-hidden","true");
  }).catch(()=>{host.parentElement.classList.remove("globe-ready");host.replaceChildren();});

  function syncRegion(id){
    const view=views[id]||views.all;
    globe.pointOfView(view,900);
    globe.polygonCapColor(f=>id!=="all"&&f._region===id?"#353da9":"#dedede");
    globe.polygonSideColor(f=>id!=="all"&&f._region===id?"#2c3295":"#d7d9e8");
  }
  window.addEventListener("meshtec:region",ev=>syncRegion(ev.detail.region));
  document.querySelectorAll("[data-globe-zoom]").forEach(button=>button.addEventListener("click",()=>{
    const action=button.dataset.globeZoom;
    const curr=globe.pointOfView();
    if(action==="reset"){syncRegion(isActive());return;}
    const altitude=Math.max(0.5,Math.min(3.4,curr.altitude*(action==="in"?0.74:1.36)));
    globe.pointOfView({...curr,altitude},400);
  }));
  host.addEventListener("dblclick",()=>globe.pointOfView({...globe.pointOfView(),altitude:Math.max(.5,globe.pointOfView().altitude*.73)},450));
  syncRegion(isActive());
})();