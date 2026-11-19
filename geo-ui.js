/* MESHTEC geographic country directory.
   Geographic countries are reference data, not verified MESHTEC network coverage. */
(function () {
  'use strict';
  if (!window.MESHTEC_COUNTRIES || !window.MESHTECNetwork) return;

  const countries = window.MESHTEC_COUNTRIES.map(([code,name,region,lat,lng]) =>
    ({code,name,region,lat,lng,network:false}));
  const byRegionCode = new Map(countries.map(country=>[country.region+':'+country.code,country]));

  NETWORK_LOCATIONS.forEach(location=>{
    const existing=byRegionCode.get(location.region+':'+location.code);
    if(existing) {
      existing.network=true;
      existing.name=location.name;
    } else {
      const country={code:location.code,name:location.name,region:location.region,network:true};
      countries.push(country);
      byRegionCode.set(location.region+':'+location.code,country);
    }
  });

  let showAllCountries=false;
  const nativeRender=renderDetail;
  const nativeSelect=select;

  function listForRegion(region) {
    return countries.filter(country=>country.region===region)
      .sort((a,b)=>Number(b.network)-Number(a.network)||a.name.localeCompare(b.name));
  }

  selectedCountry=function(){
    return byRegionCode.get(active+':'+selectedCountryCode)||null;
  };

  function pill(country) {
    const chosen=selectedCountryCode===country.code;
    return '<button type="button" class="market-pill '+(chosen?'is-selected':'')+
      '" data-country="'+escapeHtml(country.code)+'" aria-pressed="'+chosen+'">'+
      '<span class="market-pill-dot '+(country.network?'':'directory-dot')+'" aria-hidden="true"></span>'+
      escapeHtml(country.name)+'</button>';
  }

  countryDirectory=function(region) {
    const records=listForRegion(region);
    const networkCount=records.filter(country=>country.network).length;
    const visible=showAllCountries?records:records.slice(0,networkCount+10);
    return '<section class="markets-section geo-directory" aria-label="Countries and network locations">'+
      '<div class="markets-heading"><span>COUNTRIES & NETWORK LOCATIONS</span>'+
      '<span class="markets-count">'+records.length+' COUNTRIES / LOCATIONS</span></div>'+
      '<input class="directory-search" id="countrySearch" type="search" placeholder="Search countries..." aria-label="Search countries" autocomplete="off">'+
      '<div class="market-pills" id="countryList">'+visible.map(pill).join('')+'</div>'+
      (records.length>networkCount+10?'<button type="button" class="directory-more" id="showCountries">'+
        (showAllCountries?'Show fewer countries':'Show all '+records.length+' countries')+'</button>':'')+
      '<p class="directory-hint"><span class="network-legend-dot"></span>Network references appear first. Other countries are geographic reference data, not confirmed MESHTEC network locations.</p>'+
      '</section>';
  };

  function refresh() {
    const scroll=detail.scrollTop;
    renderDetail();
    detail.scrollTop=scroll;
  }

  selectCountry=function(code) {
    const country=byRegionCode.get(active+':'+code);
    if(!country)return;
    selectedCountryCode=selectedCountryCode===code?null:code;
    expandedProductIndex=-1;
    refresh();
    window.dispatchEvent(new CustomEvent('meshtec:country',{detail:{region:active,country:selectedCountryCode}}));
  };

  select=function(id) {
    if(!ORDER.includes(id))return;
    showAllCountries=false;
    nativeSelect(id);
  };

  function bindCountryButtons(container) {
    container.querySelectorAll('[data-country]').forEach(button=>{
      button.addEventListener('click',()=>selectCountry(button.dataset.country));
    });
  }

  renderDetail=function() {
    nativeRender();
    // Original renderDetail binds the initially rendered country buttons.
    const input=detail.querySelector('#countrySearch');
    if(input)input.addEventListener('input',()=>{
      const query=input.value.toLocaleLowerCase().trim();
      const records=listForRegion(active).filter(country=>country.name.toLocaleLowerCase().includes(query));
      const networkCount=records.filter(country=>country.network).length;
      const visible=query||showAllCountries?records:records.slice(0,networkCount+10);
      const list=detail.querySelector('#countryList');
      if(!list)return;
      list.innerHTML=visible.length?visible.map(pill).join(''):'<span class="market-empty">No countries found.</span>';
      bindCountryButtons(list);
    });
    detail.querySelector('#showCountries')?.addEventListener('click',()=>{
      showAllCountries=!showAllCountries;
      refresh();
    });
  };

  // The original application initialized before this enhancement loaded.
  renderDetail();

  window.MESHTECNetwork.selectRegion=select;
  window.MESHTECNetwork.selectCountry=function(region,code) {
    if(!ORDER.includes(region)||region==='all')return;
    if(active!==region)select(region);
    if(code)selectCountry(code);
  };
  window.MESHTECNetwork.getLocations=function() {
    return countries.map(({code,name,region,network})=>({code,name,region,network}));
  };
  window.MESHTECNetwork.getCurrent=function(){
    return {region:active,country:selectedCountryCode};
  };
})();