/* Demonstration content, not verified MESHTEC production claims. Edit this data to match real operations. */
const REGIONS = {
  'asia-pacific': {
    name:'Asia Pacific', short:'APAC', code:'APAC', icon:'▱',
    description:'Regional architectural product solutions for residential, commercial and infrastructure projects across Asia and Oceania.',
    markets:'Southeast Asia, East Asia, ANZ', focus:'Architectural systems', standards:'Project-specific',
    node:[824,267], label:[836,306],
    products:[
      {name:'Architectural Mesh Panels',icon:'▦',description:'Woven and architectural mesh panel concepts for architectural facades, screening and interior applications.',applications:['Architectural facades','Interior partitions','Decorative screening']},
      {name:'Facade & Screening Systems',icon:'▱',description:'Mesh-based screening systems for the external envelope and building design.',applications:['Facade screening','Balustrade infill','Sun shading']},
      {name:'Security & Ventilation Panels',icon:'⬡',description:'Security-oriented mesh and ventilation panel configurations, subject to local project requirements.',applications:['Ventilation','Security screening','Service enclosures']},
      {name:'Public Infrastructure Solutions',icon:'✚',description:'Architectural mesh concepts for civic, healthcare and public-sector environments.',applications:['Hospital buildings','Public infrastructure','Transport facilities']},
      {name:'Residential Exterior Systems',icon:'⌂',description:'Mesh and exterior screening concepts for coastal homes, villas and high-end residences.',applications:['Luxury residences','Outdoor screening','Architectural details']}
    ]
  },
  europe:{
    name:'Europe', short:'EU', code:'EMEA-EU', icon:'◇',
    description:'Explore sample product categories for specification-led architecture, facade detailing and mesh integration.',
    markets:'Western, Central & Northern Europe', focus:'Architectural detailing', standards:'Project-specific',
    node:[559,147], label:[555,185],
    products:[
      {name:'Architectural Woven Mesh',icon:'▦',description:'Metal mesh concepts for architectural and interior-design specifications.',applications:['Facades','Ceilings','Feature walls']},
      {name:'Exterior Screening',icon:'▱',description:'Mesh screening concepts integrated into external building envelopes.',applications:['Solar screens','Facade layers','Balustrades']},
      {name:'Custom Mesh Fabrication',icon:'⚙',description:'Conceptual made-to-measure mesh assemblies and detailing options.',applications:['Custom sizes','Edge framing','System integration']},
      {name:'Ventilation Grilles',icon:'≋',description:'Airflow-friendly mesh or grille configurations for architectural applications.',applications:['Plant rooms','Air intake','Equipment screening']}
    ]
  },
  'north-america':{
    name:'North America', short:'NA', code:'AMER-NA', icon:'▣',
    description:'Explore mesh and screening product concepts for institutional, commercial and residential projects.',
    markets:'USA, Canada, Mexico', focus:'Commercial screening', standards:'Project-specific',
    node:[218,164], label:[218,200],
    products:[
      {name:'Security Mesh Systems',icon:'⬡',description:'Durable mesh system concepts for applications that require a defined security specification.',applications:['Building envelope','Perimeter screening','Controlled access']},
      {name:'Commercial Facade Panels',icon:'▦',description:'Architectural mesh infill for commercial facade and building screening.',applications:['Office buildings','Retail exteriors','Parking structures']},
      {name:'Ventilation & Louver Mesh',icon:'≋',description:'Mesh design concepts for architectural ventilation and exterior equipment screening.',applications:['Ventilation openings','Mechanical screens','Service rooms']},
      {name:'Residential Screen Systems',icon:'⌂',description:'Exterior mesh products for housing design and outdoor screening.',applications:['Porches','Patios','Residential facades']}
    ]
  },
  'south-america':{
    name:'South America', short:'LATAM', code:'AMER-SA', icon:'◈',
    description:'Browse illustrative regional product options for building facades, outdoor screening and infrastructure.',
    markets:'Brazil, Chile and wider LATAM', focus:'Facade & exterior', standards:'Project-specific',
    node:[334,355], label:[339,391],
    products:[
      {name:'Exterior Architectural Mesh',icon:'▦',description:'Facade and exterior mesh panels intended for varied building typologies.',applications:['Commercial buildings','Hotels','Public buildings']},
      {name:'Sun Screening Panels',icon:'☼',description:'Screen-based shading concepts for architectural envelopes.',applications:['Solar shading','Exterior screens','Open-air structures']},
      {name:'Balustrade Infill Mesh',icon:'▱',description:'Mesh infill concepts for architectural guardrails and balustrades.',applications:['Stairs','Balconies','Terraces']},
      {name:'Custom Facade Components',icon:'⚙',description:'Custom mesh assemblies for diverse architecture and project conditions.',applications:['Facade retrofits','Design features','Screening']}
    ]
  },
  'middle-east':{
    name:'Middle East', short:'ME', code:'ME', icon:'◉',
    description:'Explore illustrative mesh solutions for architectural, commercial and hospitality projects across the Middle East.',
    markets:'United Arab Emirates and wider Middle East (inquiry-based)', focus:'Architectural screening', standards:'Project-specific',
    node:[685,245], label:[720,281],
    products:[
      {name:'Architectural Solar Screens',icon:'☼',description:'Mesh screening concepts for building facades and shading applications.',applications:['Sun shading','Building facades','Hospitality projects']},
      {name:'Decorative Metal Mesh',icon:'▦',description:'Design-focused mesh concepts for exterior and interior architectural spaces.',applications:['Hospitality interiors','Facade features','Architectural screening']},
      {name:'Security & Privacy Screens',icon:'⬡',description:'Project-specific mesh screening concepts for privacy and security.',applications:['Privacy screening','Security applications','Exterior enclosures']},
      {name:'Infrastructure Mesh Panels',icon:'✚',description:'Mesh-panel concepts suitable for public-facing infrastructure applications.',applications:['Transport facilities','Public buildings','Service enclosures']}
    ]
  },
  africa:{
    name:'Africa', short:'AFR', code:'AFR', icon:'◈',
    description:'Explore illustrative architectural mesh, facade and infrastructure solutions for network locations across Africa.',
    markets:'Sub-Saharan Africa and Indian Ocean locations', focus:'Exterior mesh & infrastructure', standards:'Project-specific',
    node:[566,343], label:[560,380],
    products:[
      {name:'Architectural Solar Screens',icon:'☼',description:'Mesh screen systems that can support exterior shading and facade concepts.',applications:['Sun shading','Building facades','Hospitality projects']},
      {name:'Decorative Metal Mesh',icon:'▦',description:'Decorative woven mesh concepts for design-led public and private spaces.',applications:['Hospitality projects','Retail architecture','Feature ceilings']},
      {name:'Perimeter & Security Screens',icon:'⬡',description:'Mesh screen applications for perimeter, privacy and project-specific security use.',applications:['Privacy screening','Secure areas','Service zones']},
      {name:'Infrastructure Mesh Panels',icon:'✚',description:'Mesh panels for civic architecture and public infrastructure designs.',applications:['Transport hubs','Public facilities','Service enclosures']}
    ]
  }
};

/* Published global network locations from MESHTEC Fabricated Product Brochure (2025).
   Entries are network labels, NOT claims of factories or SKU availability. */
const NETWORK_LOCATIONS=[
['US','United States','north-america',204,213],['CA','Canada','north-america',230,159],['MX','Mexico','north-america',222,260],['HI','Hawaii','north-america',91,259],['CB','Caribbean','north-america',296,282],
['AE','United Arab Emirates','middle-east',652,265],['GH','Ghana','africa',509,317],['NG','Nigeria','africa',546,319],['UG','Uganda','africa',596,337],['KE','Kenya','africa',619,346],['TZ','Tanzania','africa',608,366],['MW','Malawi','africa',615,392],['ZM','Zambia','africa',585,396],['ZW','Zimbabwe','africa',594,419],['BW','Botswana','africa',566,433],['NA','Namibia','africa',543,431],['ZA','South Africa','africa',567,463],['LS','Lesotho','africa',581,455],['MZ','Mozambique','africa',618,422],['SZ','Eswatini (Swaziland)','africa',600,444],['MU','Mauritius','africa',677,423],
['IN','India','asia-pacific',735,285],['CN','China','asia-pacific',821,223],['TH','Thailand','asia-pacific',781,283],['VN','Vietnam','asia-pacific',806,284],['MY','Malaysia','asia-pacific',786,331],['SG','Singapore','asia-pacific',795,343],['PH','Philippines','asia-pacific',853,294],['JP','Japan','asia-pacific',919,218],['PI','Pacific Islands','asia-pacific',1017,341],['AU','Australia','asia-pacific',902,432],['NZ','New Zealand','asia-pacific',1000,465]
].map(([code,name,region,x,y])=>({code,name,region,x,y}));

const ORDER = ['all','asia-pacific','europe','north-america','south-america','middle-east','africa'];
const mapShapes = document.getElementById('mapShapes');
const mapMarkers = document.getElementById('mapMarkers');
const mapRoutes = document.getElementById('mapRoutes');
const tabs = document.getElementById('regionTabs');
const detail = document.getElementById('detailContent');
const svgNS = 'http://www.w3.org/2000/svg';
let active = 'asia-pacific';
let expandedProductIndex = -1;
let selectedCountryCode = null;

/* Sample per-country product mappings for interaction testing ONLY.
   A listed network location does not imply a factory, production capability,
   sales availability or certification. Replace these mappings with verified data. */
const DEMO_COUNTRY_PRODUCTS = {
  IN:[0,1,3], CN:[0,1,2,4], TH:[0,1,2,3,4], VN:[0,2,3], MY:[0,1,4],
  SG:[1,2,4], PH:[0,2,4], JP:[0,1,3], PI:[1,4], AU:[0,1,2,4], NZ:[0,2,4],
  US:[0,1,2,3], CA:[0,1,3], MX:[0,2], HI:[0,3], CB:[0,3],
  AE:[0,1,2], GH:[1,3], NG:[0,3], UG:[2,3], KE:[0,1], TZ:[0,3],
  MW:[2,3], ZM:[1,3], ZW:[2,3], BW:[0,3], NA:[0,2], ZA:[0,1,2,3],
  LS:[1,3], MZ:[0,3], SZ:[2,3], MU:[0,1]
};

function svg(tag, attrs, parent) {
  const element = document.createElementNS(svgNS, tag);
  Object.entries(attrs).forEach(([k, v]) => element.setAttribute(k, v));
  parent.appendChild(element);
  return element;
}

function makeMap() {
  Object.entries(REGIONS).forEach(([id, region]) => {
    const path = svg('path', {
      d: window.MAP_PATHS[id],
      class: 'map-region',
      'data-region': id,
      tabindex: '0',
      role: 'button',
      'aria-label': `Select ${region.name}`
    }, mapShapes);

    path.addEventListener('click', () => select(id));
    path.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(id);
      }
    });

    const [x, y] = region.node;
    const marker = svg('g', {
      class: 'map-node',
      'data-region': id,
      tabindex: '0',
      role: 'button',
      'aria-label': `Select ${region.name}`
    }, mapMarkers);

    svg('circle', { cx: x, cy: y, r: 21, class: 'node-halo', filter: 'url(#nodeGlow)' }, marker);
    svg('circle', { cx: x, cy: y, r: 10, class: 'node-outer' }, marker);
    svg('circle', { cx: x, cy: y, r: 4.2, class: 'node-inner' }, marker);

    const width = Math.max(88, region.name.length * 7.1 + 24);
    const lx = Math.min(1100 - width, Math.max(0, region.label[0] - width / 2));
    const ly = region.label[1];
    svg('rect', { x: lx, y: ly - 17, width, height: 27, rx: 5, class: 'node-label-bg' }, marker);
    const text = svg('text', { x: lx + width / 2, y: ly + 1, 'text-anchor': 'middle', class: 'node-label' }, marker);
    text.textContent = region.name.toUpperCase();

    marker.addEventListener('click', () => select(id));
    marker.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(id);
      }
    });
  });
}

function makeTabs() {
  ORDER.forEach(id => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'region-tab';
    button.dataset.region = id;
    button.textContent = id === 'all' ? 'ALL REGIONS' : REGIONS[id].name.toUpperCase();
    button.addEventListener('click', () => select(id));
    tabs.appendChild(button);
  });
}

function updateMap() {
  document.querySelectorAll('.map-region').forEach(element => {
    const isActive = element.dataset.region === active;
    element.classList.toggle('active', isActive);
    element.classList.toggle('dimmed', active !== 'all' && !isActive);
    element.setAttribute('aria-pressed', String(isActive));
  });

  document.querySelectorAll('.map-node').forEach(element => {
    const isActive = element.dataset.region === active;
    element.classList.toggle('active', isActive);
    element.setAttribute('aria-pressed', String(isActive));
  });

  document.querySelectorAll('.region-tab').forEach(element => {
    element.setAttribute('aria-pressed', String(element.dataset.region === active));
  });

  mapRoutes.replaceChildren();
  if (active === 'all') return;

  const selected = REGIONS[active];
  Object.entries(REGIONS)
    .filter(([key]) => key !== active)
    .forEach(([, region]) => {
      const [x, y] = region.node;
      const [tx, ty] = selected.node;
      const mx = (x + tx) / 2;
      const my = (y + ty) / 2;
      svg('path', { class: 'route-line', d: `M ${x} ${y} Q ${mx} ${my - 78} ${tx} ${ty}` }, mapRoutes);
    });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function topLine(code) {
  return `<div class="detail-top"><span class="detail-kicker"><i class="pulse-dot"></i> REGIONAL PRODUCT CAPABILITIES</span><span class="region-code">${code}</span></div>`;
}

function productAccordionItem(product, index) {
  const expanded = index === expandedProductIndex;
  return `
    <div class="product-accordion ${expanded ? 'is-open' : ''}">
      <button type="button" class="product-row accordion-toggle" data-product="${index}" aria-expanded="${expanded}">
        <span class="product-glyph">${product.icon}</span>
        <span class="product-title">${escapeHtml(product.name)}</span>
        <span class="product-plus" aria-hidden="true">${expanded ? '−' : '+'}</span>
      </button>
      <div class="product-panel" ${expanded ? '' : 'hidden'}>
        <div class="product-panel-inner">
          <p class="product-description">${escapeHtml(product.description)}</p>
          <div class="product-apps">
            <span class="product-apps-label">ILLUSTRATIVE APPLICATIONS</span>
            <ul>
              ${product.applications.map(application => `<li>${escapeHtml(application)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>`;
}

function selectedCountry(){
  return NETWORK_LOCATIONS.find(place=>place.region===active && place.code===selectedCountryCode) || null;
}

function countryProducts(region){
  const country=selectedCountry();
  if(!country)return region.products;
  const indexes=DEMO_COUNTRY_PRODUCTS[country.code];
  return Array.isArray(indexes) ? indexes.map(i=>region.products[i]).filter(Boolean) : [];
}

function countryDirectory(regionId){
  const places=NETWORK_LOCATIONS.filter(place=>place.region===regionId);
  return `<section class="markets-section" aria-label="Network locations in this region">
    <div class="markets-heading"><span>COUNTRIES & NETWORK LOCATIONS</span><span class="markets-count">${places.length ? places.length + ' LOCATIONS' : 'CONTACT FOR DETAILS'}</span></div>
    ${places.length ? `<div class="market-pills" id="marketPills">${places.map(place=>`<button type="button" class="market-pill ${selectedCountryCode===place.code?'is-selected':''}" data-country="${escapeHtml(place.code)}" aria-pressed="${selectedCountryCode===place.code}"><span class="market-pill-dot" aria-hidden="true"></span>${escapeHtml(place.name)}</button>`).join('')}</div>` : '<p class="market-empty">Country-level coverage details have not been published here.</p>'}
    <p class="market-disclaimer">Select a location to preview its product categories. Country-specific product assignments are demo data, not verified manufacturing or availability.</p>
  </section>`;
}

function selectCountry(code){
  const place=NETWORK_LOCATIONS.find(item=>item.region===active && item.code===code);
  if(!place)return;
  selectedCountryCode = selectedCountryCode === code ? null : code;
  expandedProductIndex=-1;
  const scroller=detail;
  const oldScroll=scroller.scrollTop;
  renderDetail();
  scroller.scrollTop=oldScroll;
}

function renderDetail() {
  if (active === 'all') {
    detail.innerHTML = `${topLine('GLOBAL')}
      <div class="all-placeholder">
        <div class="region-heading region-heading-clean"><h2>Global Overview</h2></div>
        <p class="all-intro">Explore the MESHTEC global network across 25+ countries. Select a continent to view published locations and regional product concepts.</p>
        <div class="all-summary-grid">
          ${ORDER.slice(1).map(id => `<button class="summary-chip" data-select="${id}"><strong>${REGIONS[id].name}</strong><span>${REGIONS[id].products.length} CATEGORIES ↗</span></button>`).join('')}
        </div>
      </div>`;

    detail.querySelectorAll('[data-select]').forEach(element => {
      element.addEventListener('click', () => select(element.dataset.select));
    });
    return;
  }

  const region = REGIONS[active];
  const country = selectedCountry();
  const products = countryProducts(region);
  detail.innerHTML = `${topLine('REGION: ' + region.short)}
    <div class="region-heading region-heading-clean">
      <h2>${escapeHtml(region.name)}</h2>
    </div>
    <p class="region-description">${escapeHtml(region.description)}</p>
    ${countryDirectory(active)}
    <div class="product-section-title">${country ? 'PRODUCT CATEGORIES / '+escapeHtml(country.name.toUpperCase()) : 'MANUFACTURING FOCUS / PRODUCT CATEGORIES'}</div>
    ${country ? `<div class="country-context"><strong>${escapeHtml(country.name)}</strong><span>Demo product profile · Unverified country-level production</span><button type="button" class="country-clear" id="clearCountry">Clear selection ×</button></div>` : ''}
    <div class="product-list">
      ${products.length ? products.map((product, index) => productAccordionItem(product, index)).join('') : '<p class="market-empty">No product profile configured for this location.</p>'}
    </div>
    <div class="facts">
      <div class="fact"><span class="fact-symbol">◎</span><span class="meta-label">MARKETS</span><div class="fact-value">${escapeHtml(region.markets)}</div></div>
      <div class="fact"><span class="fact-symbol">▥</span><span class="meta-label">FOCUS</span><div class="fact-value">${escapeHtml(region.focus)}</div></div>
      <div class="fact"><span class="fact-symbol">◇</span><span class="meta-label">PRODUCT RANGE</span><div class="fact-value">${products.length} ${products.length === 1 ? "category" : "categories"}</div></div>
    </div>`;

  detail.querySelectorAll('[data-country]').forEach(button=>{
    button.addEventListener('click',()=>selectCountry(button.dataset.country));
  });
  const clearCountry=detail.querySelector('#clearCountry');
  if(clearCountry)clearCountry.addEventListener('click',()=>{
    selectedCountryCode=null;
    expandedProductIndex=-1;
    const scroll=detail.scrollTop;
    renderDetail();
    detail.scrollTop=scroll;
  });
  detail.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => toggleProduct(Number(button.dataset.product)));
  });
}

function select(id) {
  if (!ORDER.includes(id)) return;
  active = id;
  expandedProductIndex = -1;
  selectedCountryCode = null;
  updateMap();
  renderDetail();
  history.replaceState(null, '', id === 'all' ? '#explore' : `#${id}`);
}

function toggleProduct(index) {
  expandedProductIndex = expandedProductIndex === index ? -1 : index;
  // Update accordion in place so internal scroll position and keyboard focus are preserved.
  detail.querySelectorAll('.product-accordion').forEach((item, itemIndex) => {
    const expanded = itemIndex === expandedProductIndex;
    item.classList.toggle('is-open', expanded);
    const trigger = item.querySelector('.accordion-toggle');
    trigger.setAttribute('aria-expanded', String(expanded));
    item.querySelector('.product-plus').textContent = expanded ? '−' : '+';
    item.querySelector('.product-panel').hidden = !expanded;
  });
}

makeMap();
makeTabs();
const initial = location.hash.slice(1);
select(ORDER.includes(initial) ? initial : 'asia-pacific');
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (ORDER.includes(id) && id !== active) select(id);
});