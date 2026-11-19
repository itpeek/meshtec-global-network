/* MESHTEC geographic directory enhancement.
   Geographic countries and subdivisions are reference-only, not verified network coverage. */
(function () {
  'use strict';
  if (!window.MESHTEC_COUNTRIES || !window.MESHTEC_STATES || !window.MESHTECNetwork) return;
  var extraCountries=window.MESHTEC_COUNTRIES.map(function(c){return {code:c[0],name:c[1],region:c[2],lat:c[3],lng:c[4],network:false};});
  var index=new Map(extraCountries.map(function(p){return [p.region+':'+p.code,p];}));
  NETWORK_LOCATIONS.forEach(function(p){
    var entry=index.get(p.region+':'+p.code);
    if(entry){entry.network=true;entry.x=p.x;entry.y=p.y;entry.name=p.name;}
    else{entry={code:p.code,name:p.name,region:p.region,x:p.x,y:p.y,lat:null,lng:null,network:true};extraCountries.push(entry);}
  });
  var stateMap=new Map();
  window.MESHTEC_STATES.forEach(function(s){if(!stateMap.has(s[0]))stateMap.set(s[0],[]);stateMap.get(s[0]).push({code:s[1],name:s[2],lat:s[3],lng:s[4]});});
  stateMap.forEach(function(items){items.sort(function(a,b){return a.name.localeCompare(b.name);});});
  var chosenState=null,showAllCountries=false,showAllStates=false;
  var markers=document.createElementNS('http://www.w3.org/2000/svg','g');markers.id='geoMapMarkers';document.getElementById('worldMap').appendChild(markers);
  var nativeRender=renderDetail,nativeSelect=select;
  selectedCountry=function(){return extraCountries.find(function(p){return p.region===active && p.code===selectedCountryCode;})||null;};
  function chosenArea(){return (stateMap.get(selectedCountryCode)||[]).find(function(p){return p.code===chosenState;})||null;}
  function pill(p){return '<button type="button" class="market-pill '+(selectedCountryCode===p.code?'is-selected':'')+'" data-country="'+escapeHtml(p.code)+'" aria-pressed="'+(selectedCountryCode===p.code)+'"><span class="market-pill-dot '+(p.network?'':'directory-dot')+'"></span>'+escapeHtml(p.name)+'</button>';}
  function statePill(s){return '<button type="button" class="state-pill '+(chosenState===s.code?'is-selected':'')+'" data-state="'+escapeHtml(s.code)+'" aria-pressed="'+(chosenState===s.code)+'">'+escapeHtml(s.name)+'</button>';}
  countryDirectory=function(region){
    var records=extraCountries.filter(function(p){return p.region===region;});
    var networks=records.filter(function(p){return p.network;}).sort(function(a,b){return a.name.localeCompare(b.name);});
    var other=records.filter(function(p){return !p.network;}).sort(function(a,b){return a.name.localeCompare(b.name);});
    var current=selectedCountry(), states=current?(stateMap.get(current.code)||[]):[];
    var html='<section class="markets-section geo-directory"><div class="markets-heading"><span>COUNTRIES & NETWORK LOCATIONS</span><span class="markets-count">'+records.length+' COUNTRIES / LOCATIONS</span></div>';
    if(networks.length) html+='<div class="directory-label"><span class="directory-key"></span>NETWORK REFERENCES <span>'+networks.length+'</span></div><div class="market-pills">'+networks.map(pill).join('')+'</div>';
    html+='<div class="directory-label directory-extra">ALL COUNTRIES / GEOGRAPHIC DIRECTORY <span>'+other.length+'</span></div>';
    html+='<input class="directory-search" id="countrySearch" type="search" placeholder="Search countries..." aria-label="Search countries" autocomplete="off">';
    html+='<div class="market-pills" id="extraCountries">'+other.slice(0,showAllCountries?other.length:10).map(pill).join('')+'</div>';
    if(other.length>10)html+='<button type="button" class="directory-more" id="showCountries">'+(showAllCountries?'Show fewer countries':'Show all '+other.length+' countries')+'</button>';
    html+='<p class="directory-hint">Other countries are geographic reference data, not confirmed MESHTEC network locations.</p>';
    if(current){
      html+='<section class="state-directory"><div class="state-directory-title">STATES / PROVINCES / REGIONS <span>'+states.length+' AREAS</span></div>';
      html+='<p class="state-directory-country">'+escapeHtml(current.name)+(chosenArea()?' / '+escapeHtml(chosenArea().name):'')+'</p>';
      if(states.length){
        html+='<input class="directory-search" id="stateSearch" type="search" placeholder="Search states or provinces..." aria-label="Search states">';
        html+='<div class="state-pills" id="statePills">'+states.slice(0,showAllStates?states.length:18).map(statePill).join('')+'</div>';
        if(states.length>18)html+='<button type="button" class="directory-more" id="showStates">'+(showAllStates?'Show fewer areas':'Show all '+states.length+' areas')+'</button>';
      }else html+='<p class="market-empty">No first-level administrative areas in this reference dataset.</p>';
      html+='<p class="directory-hint">States/provinces are geographic references and do not represent confirmed facilities.</p></section>';
    }
    return html+'</section>';
  };
  function refresh(){
    var scroll=detail.scrollTop;
    renderDetail();
    detail.scrollTop=scroll;
    drawMarkers();
  }
  selectCountry=function(code){
    var p=extraCountries.find(function(x){return x.region===active && x.code===code;});
    if(!p)return;
    selectedCountryCode=selectedCountryCode===code?null:code;
    chosenState=null;showAllStates=false;expandedProductIndex=-1;
    refresh();
    window.dispatchEvent(new CustomEvent('meshtec:country',{detail:{region:active,country:selectedCountryCode,state:null}}));
  };
  select=function(id){
    if(!ORDER.includes(id))return;
    chosenState=null;showAllCountries=false;showAllStates=false;
    nativeSelect(id);
    drawMarkers();
  };
  function dot(x,y,code,label){
    var c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',8);c.setAttribute('class','geo-map-dot');
    c.setAttribute('tabindex','0');c.setAttribute('role','button');c.setAttribute('aria-label','Select '+label);
    c.addEventListener('click',function(e){e.stopPropagation();selectCountry(code);});
    c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();selectCountry(code);}});
    markers.appendChild(c);
  }
  function project(lat,lng){return [Math.max(8,Math.min(1092,550+lng*3.04)),Math.max(8,Math.min(532,285-lat*3.12))];}
  function drawMarkers(){
    markers.replaceChildren();
    if(active==='all')return;
    NETWORK_LOCATIONS.filter(function(p){return p.region===active;}).forEach(function(p){dot(p.x,p.y,p.code,p.name);});
    var country=selectedCountry();if(!country)return;
    var state=chosenArea(),obj=state||country,point;
    if(state||!Number.isFinite(country.x)||!Number.isFinite(country.y))point=project(obj.lat,obj.lng);
    else point=[country.x,country.y];
    if(!Number.isFinite(point[0])||!Number.isFinite(point[1]))return;
    var ns='http://www.w3.org/2000/svg';
    var halo=document.createElementNS(ns,'circle');halo.setAttribute('cx',point[0]);halo.setAttribute('cy',point[1]);halo.setAttribute('r',16);halo.setAttribute('class','geo-selected-halo');markers.appendChild(halo);
    var marker=document.createElementNS(ns,'circle');marker.setAttribute('cx',point[0]);marker.setAttribute('cy',point[1]);marker.setAttribute('r',7);marker.setAttribute('class','geo-selected-dot');markers.appendChild(marker);
    var title=document.createElementNS(ns,'text');title.setAttribute('x',Math.max(70,Math.min(1030,point[0])));title.setAttribute('y',point[1]-22);title.setAttribute('text-anchor','middle');title.setAttribute('class','geo-selected-label');title.textContent=state?state.name:country.name;markers.appendChild(title);
  }
  function wireCountryButtons(scope){
    (scope||detail).querySelectorAll('[data-country]').forEach(function(btn){btn.addEventListener('click',function(){selectCountry(btn.dataset.country);});});
  }
  function wireStateButtons(scope){
    (scope||detail).querySelectorAll('[data-state]').forEach(function(btn){btn.addEventListener('click',function(){
      chosenState=chosenState===btn.dataset.state?null:btn.dataset.state;refresh();
      window.dispatchEvent(new CustomEvent('meshtec:state',{detail:{region:active,country:selectedCountryCode,state:chosenState}}));
    });});
  }
  renderDetail=function(){
    nativeRender();
    // Native render already wires country buttons. Only wire state controls and search.
    wireStateButtons(detail);
    var countriesInput=detail.querySelector('#countrySearch');
    if(countriesInput)countriesInput.addEventListener('input',function(){
      var q=this.value.toLocaleLowerCase().trim();
      var list=detail.querySelector('#extraCountries');if(!list)return;
      var data=extraCountries.filter(function(p){return p.region===active&&!p.network&&p.name.toLocaleLowerCase().includes(q);}).sort(function(a,b){return a.name.localeCompare(b.name);});
      list.innerHTML=data.slice(0,q?data.length:showAllCountries?data.length:10).map(pill).join('')||'<span class="market-empty">No countries found.</span>';
      wireCountryButtons(list);
    });
    var statesInput=detail.querySelector('#stateSearch');
    if(statesInput)statesInput.addEventListener('input',function(){
      var q=this.value.toLocaleLowerCase().trim(),list=detail.querySelector('#statePills');if(!list)return;
      var states=(stateMap.get(selectedCountryCode)||[]).filter(function(p){return p.name.toLocaleLowerCase().includes(q);});
      list.innerHTML=states.slice(0,q?states.length:showAllStates?states.length:18).map(statePill).join('')||'<span class="market-empty">No areas found.</span>';
      wireStateButtons(list);
    });
    var showCountries=detail.querySelector('#showCountries');if(showCountries)showCountries.addEventListener('click',function(){showAllCountries=!showAllCountries;refresh();});
    var showStates=detail.querySelector('#showStates');if(showStates)showStates.addEventListener('click',function(){showAllStates=!showAllStates;refresh();});
    var clear=detail.querySelector('#clearCountry');if(clear)clear.addEventListener('click',function(){chosenState=null;drawMarkers();});
  };
  // The original app has rendered already; synchronize UI and map once.
  renderDetail();drawMarkers();
  window.MESHTECNetwork.selectRegion=select;
  window.MESHTECNetwork.selectCountry=function(region,code){if(active!==region)select(region);if(code)selectCountry(code);};
  window.MESHTECNetwork.getLocations=function(){return extraCountries.map(function(p){return {code:p.code,name:p.name,region:p.region,network:p.network};});};
  window.MESHTECNetwork.getCurrent=function(){return {region:active,country:selectedCountryCode,state:chosenState};};
})();
