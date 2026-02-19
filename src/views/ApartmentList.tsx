import { Layout } from './Layout.js'

interface Apartment {
  id: number
  title: string
  price: string
  url: string
  img: string
  sqm: string
  rooms: string
  desc: string
  createdAt: string
  agencyTitle: string
  agencyLogo: string | null
}

function parseNumeric(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, '')
  const num = parseFloat(cleaned)
  return Number.isFinite(num) ? String(num) : ''
}

const filterScript = `
(function() {
  var inputs = document.querySelectorAll('.filter-input');
  var toggles = document.querySelectorAll('.filter-toggle');
  var cards = document.querySelectorAll('.card');
  var countEl = document.getElementById('visible-count');

  function apply() {
    var pMin = parseFloat(document.getElementById('f-price-min').value) || 0;
    var pMax = parseFloat(document.getElementById('f-price-max').value) || Infinity;
    var sMin = parseFloat(document.getElementById('f-sqm-min').value) || 0;
    var sMax = parseFloat(document.getElementById('f-sqm-max').value) || Infinity;
    var showNoPrice = document.getElementById('f-no-price').checked;
    var showNoSqm = document.getElementById('f-no-sqm').checked;
    var visible = 0;
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var hasPrice = c.dataset.price !== '';
      var hasSqm = c.dataset.sqm !== '';
      var price = parseFloat(c.dataset.price) || 0;
      var sqm = parseFloat(c.dataset.sqm) || 0;

      var priceOk = hasPrice ? (price >= pMin && price <= pMax) : showNoPrice;
      var sqmOk = hasSqm ? (sqm >= sMin && sqm <= sMax) : showNoSqm;

      var show = priceOk && sqmOk;
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    }
    countEl.textContent = visible;
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', apply);
  }
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('change', apply);
  }

  document.getElementById('filter-reset').addEventListener('click', function() {
    for (var i = 0; i < inputs.length; i++) { inputs[i].value = ''; }
    for (var i = 0; i < toggles.length; i++) { toggles[i].checked = true; }
    apply();
  });
})();
`

export function ApartmentList({ apartments }: { apartments: Apartment[] }) {
  return (
    <Layout title="Chamonix Apartment Finder">
      <header class="page-header">
        <h1><span class="title-icon">&#9978;</span> Chamonix Apartment Finder</h1>
        <p class="subtitle"><span id="visible-count">{apartments.length}</span> of {apartments.length} listings from {new Set(apartments.map((a) => a.agencyTitle)).size} agencies across the valley</p>
      </header>
      <main>
        <div class="filters">
          <div class="filter-group">
            <label class="filter-label">Price (&euro;)</label>
            <div class="filter-range">
              <input id="f-price-min" class="filter-input" type="number" placeholder="Min" min="0" step="10000" />
              <span class="filter-sep">&ndash;</span>
              <input id="f-price-max" class="filter-input" type="number" placeholder="Max" min="0" step="10000" />
            </div>
          </div>
          <div class="filter-group">
            <label class="filter-label">Size (m&sup2;)</label>
            <div class="filter-range">
              <input id="f-sqm-min" class="filter-input" type="number" placeholder="Min" min="0" step="5" />
              <span class="filter-sep">&ndash;</span>
              <input id="f-sqm-max" class="filter-input" type="number" placeholder="Max" min="0" step="5" />
            </div>
          </div>
          <div class="filter-group">
            <label class="filter-label">Include</label>
            <div class="filter-toggles">
              <label class="toggle-label">
                <input id="f-no-price" class="filter-toggle" type="checkbox" checked />
                <span class="toggle-switch" />
                <span class="toggle-text">No price</span>
              </label>
              <label class="toggle-label">
                <input id="f-no-sqm" class="filter-toggle" type="checkbox" checked />
                <span class="toggle-switch" />
                <span class="toggle-text">No m&sup2;</span>
              </label>
            </div>
          </div>
          <button id="filter-reset" class="filter-reset" type="button">Reset</button>
        </div>
        <div class="grid">
          {apartments.map((apt) => (
            <article
              class="card"
              key={apt.id}
              data-price={parseNumeric(apt.price)}
              data-sqm={parseNumeric(apt.sqm)}
            >
              {apt.img ? (
                <img
                  class="card-img"
                  src={apt.img}
                  alt={apt.title}
                  loading="lazy"
                />
              ) : (
                <div class="card-img card-img-placeholder" />
              )}
              <div class="card-body">
                <h3 class="card-title">{apt.title}</h3>
                <div class="chips">
                  {apt.price ? <span class="chip chip-price">{apt.price} &euro;</span> : null}
                  {apt.sqm ? <span class="chip">{apt.sqm} m&sup2;</span> : null}
                  {apt.rooms ? <span class="chip">{apt.rooms} rooms</span> : null}
                </div>
                {apt.desc ? <p class="card-desc">{apt.desc}</p> : null}
                <div class="card-footer">
                  <div class="agency-badge">
                    {apt.agencyLogo ? (
                      <img class="agency-logo" src={apt.agencyLogo} alt={apt.agencyTitle} />
                    ) : (
                      <span class="agency-initial">{apt.agencyTitle.charAt(0)}</span>
                    )}
                    <span class="agency-name">{apt.agencyTitle}</span>
                  </div>
                  <a class="card-link" target="_blank" href={apt.url}>
                    View listing &rarr;
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <script dangerouslySetInnerHTML={{ __html: filterScript }} />
    </Layout>
  )
}
