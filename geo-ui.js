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
  var nativeRender=renderDetail,nativeSelect=select;
  selectedCountry=function(){return extraCountries.find(function(p){return p.region===active && p.code===selectedCountryCode;})||null;};
  function chosenArea(){return (stateMap.get(selectedCountryCode)||[]).find(function(p){return p.code===chosenState;})||null;}
  function pill(p){return '<button type="button" class="market-pill '+(selectedCountryCode===p.code?'is-selected':'')+'" data-country="'+escapeHtml(p.code)+'" aria-pressed="'+(selectedCountryCode===p.code)+'"><span class="market-pill-dot '+(p.network?'':'directory-dot')+'"></span>'+escapeHtml(p.name)+'</button>';}
  function statePill(s){return '<button type="button" class="state-pill '+(chosenState===s.code?'is-selected':'')+'" data-state="'+escapeHtml(s.code)+'" aria-pressed="'+(chosenState===s.code)+'">'+escapeHtml(s.name)+'</button>';}
  countryDirectory=function(region){
    var records=extraCountries.filter(function(p){return p.region===region;});
    var sorted=records.slice().sort(function(a,b){return Number(b.network)-Number(a.network)||a.name.localeCompare(b.name);});
    var networkCount=sorted.filter(function(p){return p.network;}).length;
    var current=selectedCountry(), states=current?(stateMap.get(current.code)||[]):[];
    var visible=showAllCountries?sorted:sorted.slice(0,networkCount+10);
    var html='<section class="markets-section geo-directory"><div class="markets-heading"><span>COUNTRIES & NETWORK LOCATIONS</span><span class="markets-count">'+records.length+' COUNTRIES / LOCATIONS</span></div>';
    html+='<input class="directory-search" id="countrySearch" type="search" placeholder="Search countries..." aria-label="Search all countries in this region" autocomplete="off">';
    html+='<div class="market-pills" id="countryList">'+visible.map(pill).join('')+'</div>';
    if(sorted.length>networkCount+10)html+='<button type="button" class="directory-more" id="showCountries">'+(showAllCountries?'Show fewer countries':'Show all '+records.length+' countries')+'</button>';
    html+='<p class="directory-hint"><span class="network-legend-dot"></span> Network references appear first. Other countries are geographic reference data, not confirmed MESHTEC network locations.</p>';
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
  };
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
      var list=detail.querySelector('#countryList');if(!list)return;
      var data=extraCountries.filter(function(p){return p.region===active&&p.name.toLocaleLowerCase().includes(q);}).sort(function(a,b){return Number(b.network)-Number(a.network)||a.name.localeCompare(b.name);});
      var networkCount=data.filter(function(p){return p.network;}).length;
      list.innerHTML=data.slice(0,q?data.length:showAllCountries?data.length:networkCount+10).map(pill).join('')||'<span class="market-empty">No countries found.</span>';
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
    var clear=detail.querySelector('#clearCountry');if(clear)clear.addEventListener('click',function(){chosenState=null;});
  };
  // The original app has rendered already; synchronize UI and map once.
  renderDetail();
  window.MESHTECNetwork.selectRegion=select;
  window.MESHTECNetwork.selectCountry=function(region,code){if(active!==region)select(region);if(code)selectCountry(code);};
  window.MESHTECNetwork.getLocations=function(){return extraCountries.map(function(p){return {code:p.code,name:p.name,region:p.region,network:p.network};});};
  window.MESHTECNetwork.getCurrent=function(){return {region:active,country:selectedCountryCode,state:chosenState};};
})();
