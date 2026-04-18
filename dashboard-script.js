// ============================================================
// SUPABASE — NGCS Dashboard
// ============================================================
const SUPABASE_URL  = 'https://rranivozhrsldhapzwqc.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyYW5pdm96aHJzbGRoYXB6d3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNzIxMzcsImV4cCI6MjA4NTc0ODEzN30.0wOlQErCvNbf9LhhWzecDINB6523BHqgc2G2v0wURGQ';
const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ── GUEST-FRIENDLY AUTH — no forced redirect ──────────────────────────────
// Guests can browse and place orders; only Profile/Settings/Orders need login.
let _sessionResolved = false;
let _currentSession = null;

_sb.auth.onAuthStateChange(async (event, session) => {
  if (_sessionResolved) return;
  _sessionResolved = true;
  _currentSession = session;

  if (session) {
    // Logged in: load profile data and update UI to auth state
    const { data: profile } = await _sb
      .from('profiles').select('*').eq('id', session.user.id).single();
    if (profile) loadProfileIntoUI(profile);
  }

  // Apply auth state to UI (works for both guests and logged-in users)
  if (typeof window.applyAuthState === 'function') {
    window.applyAuthState(!!session);
  }
});

function loadProfileIntoUI(profile) {
  const displayName = profile.display_name || profile.full_name || 'Valued Client';
  const email       = profile.email || '';
  const phone       = profile.phone || '';

  const dnEl       = document.getElementById('displayNameInput');
  const emEl       = document.getElementById('profileEmail');
  const invNameEl  = document.getElementById('clientNameInput');
  const invEmailEl = document.getElementById('invoiceEmailInput');

  if (dnEl)      dnEl.value      = displayName;
  if (emEl)      emEl.value      = email;
  if (invNameEl) invNameEl.value = displayName;
  if (invEmailEl && !invEmailEl.dataset.userEdited) invEmailEl.value = email;

  if (phone) {
    const codeEl = document.getElementById('phoneCode');
    const numEl  = document.getElementById('phoneNumber');
    if (codeEl && numEl) {
      const match = phone.match(/^(\+\d{1,3})\s*(.*)$/);
      if (match) { codeEl.value = match[1]; numEl.value = match[2].trim(); }
      else { numEl.value = phone; }
    }
  }

  // Update initials in avatar
  const initialsEl = document.getElementById('avatarInitials');
  if (initialsEl && displayName) {
    const parts = displayName.trim().split(/\s+/);
    initialsEl.textContent = parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : displayName.slice(0, 2).toUpperCase();
  }
}

    // =================== EMAILJS CONFIGURATION ===================
    (function() {
      emailjs.init({
        publicKey: 'coUeJ01I7BiMQ-ABN',
        blockHeadless: false,
      });
    })();

    const EMAILJS_CONFIG = {
      serviceID: 'service_ju84tjo',
      adminTemplateID: 'template_7z9si7j',
      clientTemplateID: 'template_s8jsvcf',
      publicKey: 'coUeJ01I7BiMQ-ABN'
    };

    // =================== CURRENCY CONVERSION ===================
    let currentCurrency = 'USD';
    const conversionRates = {
      'USD': 1, 'PHP': 56.50, 'EUR': 0.92, 'GBP': 0.79,
      'JPY': 149.50, 'AUD': 1.52, 'CAD': 1.39, 'SGD': 1.34,
      'INR': 83.20, 'CNY': 7.24, 'PLN': 3.98, 'MXN': 17.15,
      'BRL': 4.97, 'KRW': 1325.00, 'CHF': 0.89, 'AED': 3.67, 'SAR': 3.75
    };
    const currencySymbols = {
      'USD': '$', 'PHP': '₱', 'EUR': '€', 'GBP': '£', 'JPY': '¥',
      'AUD': 'A$', 'CAD': 'C$', 'SGD': 'S$', 'INR': '₹', 'CNY': '¥',
      'PLN': 'zł', 'MXN': 'MX$', 'BRL': 'R$', 'KRW': '₩', 'CHF': 'Fr',
      'AED': 'د.إ', 'SAR': '﷼'
    };
    const currencyNames = {
      'USD': 'US Dollar', 'PHP': 'Philippine Peso', 'EUR': 'Euro (Italy/EU)',
      'GBP': 'British Pound', 'JPY': 'Japanese Yen', 'AUD': 'Australian Dollar',
      'CAD': 'Canadian Dollar', 'SGD': 'Singapore Dollar', 'INR': 'Indian Rupee',
      'CNY': 'Chinese Yuan', 'PLN': 'Polish Złoty', 'MXN': 'Mexican Peso',
      'BRL': 'Brazilian Real', 'KRW': 'South Korean Won', 'CHF': 'Swiss Franc',
      'AED': 'UAE Dirham', 'SAR': 'Saudi Riyal'
    };
    const currencyFlags = {
      'USD': '💵', 'PHP': '🇵🇭', 'EUR': '🇪🇺', 'GBP': '🇬🇧', 'JPY': '🇯🇵',
      'AUD': '🇦🇺', 'CAD': '🇨🇦', 'SGD': '🇸🇬', 'INR': '🇮🇳', 'CNY': '🇨🇳',
      'PLN': '🇵🇱', 'MXN': '🇲🇽', 'BRL': '🇧🇷', 'KRW': '🇰🇷', 'CHF': '🇨🇭',
      'AED': '🇦🇪', 'SAR': '🇸🇦'
    };

    function formatPrice(usdAmount) {
      const converted = usdAmount * conversionRates[currentCurrency];
      const symbol = currencySymbols[currentCurrency];
      if (['JPY', 'KRW', 'INR'].includes(currentCurrency)) {
        return symbol + Math.round(converted).toLocaleString();
      }
      return symbol + converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function convertPHPToUSD(phpAmount) {
      return phpAmount / 56.50;
    }

    function changeCurrency(currency) {
      currentCurrency = currency;
      const metaEl = document.getElementById('invoiceCurrencyMeta');
      if (metaEl) metaEl.textContent = currency;
      const dropdown = document.getElementById('currencyDropdown');
      if (dropdown) dropdown.value = currency;
      loadServices();
      if (selectedPackage) updateInvoice();
    }

    function changeCurrencyFromDropdown(select) {
      changeCurrency(select.value);
    }

    function changeCurrencyStandalone(btn, currency) {
      changeCurrency(currency);
    }

    // =================== SERVICE PACKAGES DATA ===================
    const servicePackages = {
      maintenance: {
        basic: {
          name: 'BASIC - Starter Business', price: 18000,
          basePages: 5, minPages: 3, maxPages: 5, pricePerPage: 1500,
          features: ['3-5 page website','Mobile responsive','Free domain (1 year)','Hosting (1 year)','1 professional email'],
          excluded: [], bestFor: 'sari-sari, cafés, freelancers, startups'
        },
        pro: {
          name: 'PRO - Growing Business', price: 26000,
          basePages: 8, minPages: 5, maxPages: 8, pricePerPage: 2000,
          features: ['5-8 pages','SQL database','2 professional emails','SEO optimization','Monthly maintenance'],
          excluded: [], bestFor: 'clinics, restaurants, agencies'
        },
        premium: {
          name: 'PREMIUM - Established/Corporate', price: 52500,
          basePages: 12, minPages: 8, maxPages: 12, pricePerPage: 3500,
          features: ['Custom UI/UX','Advanced SQL & admin panel','Multiple emails','Priority support','Dedicated Website Manager'],
          excluded: [], bestFor: 'corporations, franchises, e-commerce'
        }
      },
      onePage: {
        starter: {
          name: 'TWO-PAGE Starter', price: 6500,
          basePages: 2, minPages: 2, maxPages: 2, pricePerPage: 1000,
          features: ['2 pages','Mobile responsive','Basic UI design','Contact form','FREE domain (1 year)','Hosting (1 year)'],
          excluded: ['No maintenance','No business email'],
          bestFor: 'freelancers, home-based sellers, promos'
        },
        pro: {
          name: 'TWO-PAGE Pro', price: 9500,
          basePages: 2, minPages: 2, maxPages: 2, pricePerPage: 1500,
          features: ['Everything in Starter','Custom layout & branding','SEO-ready structure','Faster loading optimization','Priority setup'],
          excluded: ['No maintenance','No business email'],
          bestFor: 'cafés, startups, marketing campaigns'
        },
        premium: {
          name: 'TWO-PAGE Premium', price: 14000,
          basePages: 2, minPages: 2, maxPages: 2, pricePerPage: 2000,
          features: ['Custom-designed landing page','Conversion-focused layout','Call-to-action sections','Google Map integration','Analytics setup'],
          excluded: ['No maintenance','No business email'],
          bestFor: 'product launches, agencies, corporate promos'
        }
      },
      noMaintenance: {
        basic: {
          name: 'MULTI-PAGE Basic', price: 12000,
          basePages: 4, minPages: 3, maxPages: 4, pricePerPage: 1200,
          features: ['3-4 pages','Mobile responsive','FREE domain (1 year)','Hosting (1 year)','Contact form'],
          excluded: ['No maintenance','No business email','No updates after turnover'],
          bestFor: 'small shops, sari-sari, service providers'
        },
        standard: {
          name: 'MULTI-PAGE Standard', price: 17000,
          basePages: 7, minPages: 5, maxPages: 7, pricePerPage: 1700,
          features: ['5-7 pages','Improved UI design','Speed optimization','FREE domain (1 year)','Hosting (1 year)'],
          excluded: ['No maintenance','No business email'],
          bestFor: 'restaurants, clinics, schools'
        },
        advanced: {
          name: 'MULTI-PAGE Advanced', price: 25000,
          basePages: 12, minPages: 8, maxPages: 12, pricePerPage: 2500,
          features: ['8-12 pages','Custom layout','SQL database (if needed)','FREE domain (1 year)','Hosting (1 year)'],
          excluded: ['No maintenance','No business email'],
          bestFor: 'large local businesses, organizations'
        }
      },
      manager: {
        monthly: {
          name: 'Website Manager (Monthly)', price: 800,
          basePages: 0, pricePerPage: 0,
          features: ['Content updates','Minor design changes','Plugin & security checks','Backup monitoring','Basic performance checks','Startup-friendly pricing'],
          excluded: [], bestFor: 'businesses wanting flexible monthly support'
        },
        annual: {
          name: 'Website Manager (Annual)', price: 8000,
          basePages: 0, pricePerPage: 0,
          features: ['All monthly features','2 months FREE','Priority support','Discounted rate','Better value for long-term'],
          excluded: [], bestFor: 'businesses committed to ongoing maintenance'
        }
      },
      renewal: {
        standard: {
          name: 'Annual Website Renewal', price: 20000,
          basePages: 0, pricePerPage: 0,
          features: ['Hosting Renewal: ₱1,800','Domain Renewal: ₱900','Google Workspace Email Renewal (1 user): ₱6,800','Website Manager Service (Annual): ₱8,000','Technical Support & Vendor Handling Fee: ₱2,500'],
          excluded: [], bestFor: 'existing clients renewing annual services'
        }
      },
      appDesign: {
        starter: {
          name: 'APP DESIGN - Starter', price: 8000,
          basePages: 0, pricePerPage: 0,
          features: ['Up to 8 screens','iOS or Android','Static Figma mockups','Basic UI design','Mobile-first layout'],
          excluded: ['No prototype','No branding'], bestFor: 'small apps, MVPs, simple utilities'
        },
        pro: {
          name: 'APP DESIGN - Pro', price: 18000,
          basePages: 0, pricePerPage: 0,
          features: ['Up to 20 screens','iOS & Android','Clickable prototype','Custom branding & icon','Onboarding screens'],
          excluded: [], bestFor: 'startups, e-commerce apps, service apps'
        },
        premium: {
          name: 'APP DESIGN - Premium', price: 35000,
          basePages: 0, pricePerPage: 0,
          features: ['Unlimited screens','Cross-platform design','Animated prototype','Full design system','Dark & light mode','Developer handoff'],
          excluded: [], bestFor: 'funded startups, enterprise apps, SaaS'
        }
      },
      uiux: {
        starter: {
          name: 'UI/UX - Starter', price: 5000,
          basePages: 0, pricePerPage: 0,
          features: ['Up to 5 screens','Wireframes only','Figma delivery','1 revision round'],
          excluded: ['No prototype'], bestFor: 'simple projects, landing pages'
        },
        pro: {
          name: 'UI/UX - Pro', price: 12000,
          basePages: 0, pricePerPage: 0,
          features: ['Up to 15 screens','Hi-fi mockups','Clickable prototype','3 revision rounds','Design tokens'],
          excluded: [], bestFor: 'apps, dashboards, SaaS products'
        },
        premium: {
          name: 'UI/UX - Premium', price: 28000,
          basePages: 0, pricePerPage: 0,
          features: ['Unlimited screens','Full design system','User research & testing','Unlimited revisions','Developer specs'],
          excluded: [], bestFor: 'enterprise products, full redesigns'
        }
      },
      logoDesign: {
        basic: {
          name: 'LOGO - Basic', price: 2500,
          basePages: 0, pricePerPage: 0, tier: 'basic',
          tagline: 'Simple & clean logo to get started',
          features: ['2 logo concepts','PNG & JPG formats only','2 revision rounds','Color & black-and-white versions','5–7 business day delivery'],
          excluded: ['No vector file (AI / EPS / SVG)','No brand guide','No business card mockup'],
          bestFor: 'startups, solo entrepreneurs, sari-sari stores'
        },
        pro: {
          name: 'LOGO - Pro', price: 5500,
          basePages: 0, pricePerPage: 0, tier: 'pro',
          tagline: 'Professional quality with vector files',
          features: ['4 logo concepts','PNG, JPG & SVG (vector) formats','4 revision rounds','Color, B&W & reversed versions','Business card mockup preview','3–5 business day delivery'],
          excluded: ['No full brand guide','No social media kit'],
          bestFor: 'growing businesses, clinics, restaurants'
        },
        premium: {
          name: 'LOGO - Premium Brand Identity', price: 12000,
          basePages: 0, pricePerPage: 0, tier: 'premium',
          tagline: 'Complete brand identity — everything included',
          features: ['Unlimited logo concepts','Full vector package: AI, EPS, SVG, PNG, JPG','Unlimited revisions','Brand style guide','Social media kit','Business card + letterhead mockup'],
          excluded: [], bestFor: 'established brands, agencies, funded startups'
        }
      },
      videoAds: {
        short: {
          name: 'VIDEO ADS - Short', price: 4500,
          basePages: 0, pricePerPage: 0,
          features: ['Up to 30 seconds','1080p Full HD','1 revision round','Background music included','Fast 3–5 day delivery'],
          excluded: ['No custom voiceover'], bestFor: 'social media stories, reels, quick promos'
        },
        standard: {
          name: 'VIDEO ADS - Standard', price: 9500,
          basePages: 0, pricePerPage: 0,
          features: ['Up to 60 seconds','1080p or 4K','2 revision rounds','Custom graphics & animations','Voiceover option'],
          excluded: [], bestFor: 'Facebook/Instagram ads, YouTube pre-rolls'
        },
        premium: {
          name: 'VIDEO ADS - Premium', price: 22000,
          basePages: 0, pricePerPage: 0,
          features: ['Up to 120 seconds','4K resolution','Unlimited revisions','Custom voiceover included','Multiple format delivery','Full post-production'],
          excluded: [], bestFor: 'brand campaigns, TV-quality ads, product launches'
        }
      }
    };

    // =================== STATE ===================
    let selectedCategory = null;
    let selectedPackage  = null;
    let currentPageCount = 1;
    let bizSelections    = { type: [], goal: [], stage: [] };
    let webDesignSelections = [];
    let webDevSelections    = [];

    // =================== SHOW SECTION ===================
    function showSection(id) {
      document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
      const target = document.getElementById(id);
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // =================== TOGGLE SIDEBAR (MOBILE) ===================
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      if (!sidebar) return;
      const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.classList.contains('open');
      if (isOpen) {
        sidebar.style.transform = 'translateX(-100%)';
        sidebar.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        sidebar.classList.remove('open');
      } else {
        sidebar.style.display = 'flex';
        sidebar.style.transform = 'translateX(0px)';
        if (overlay) overlay.style.display = 'block';
        sidebar.classList.add('open');
      }
    }

    // =================== ORDER TYPE ===================
    function selectOrderType(type) {
      document.getElementById('newWebsitePackages').style.display = type === 'new' ? 'block' : 'none';
      document.getElementById('renewalPackages').style.display    = type === 'renewal' ? 'block' : 'none';
      document.getElementById('newWebsiteBtn').classList.toggle('active', type === 'new');
      document.getElementById('renewalBtn').classList.toggle('active', type === 'renewal');
      document.getElementById('customizationPanel').style.display = 'none';
      document.getElementById('invoiceSection').style.display     = 'none';
      selectedCategory = null;
      selectedPackage  = null;
    }

    // =================== FILTER BY SERVICE TYPE ===================
    function filterByServiceType(type, btn) {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      if (btn) btn.classList.add('active');

      document.querySelectorAll('.package-category').forEach(cat => {
        if (type === 'all') {
          cat.classList.remove('hidden');
        } else {
          const types = (cat.dataset.serviceTypes || '').split(' ');
          cat.classList.toggle('hidden', !types.includes(type));
        }
      });
    }

    // =================== LOAD SERVICES ===================
    function loadServices() {
      const grids = {
        serviceGridMaintenance:  { cat: 'maintenance',  keys: ['basic','pro','premium'] },
        serviceGridOnePage:      { cat: 'onePage',      keys: ['starter','pro','premium'] },
        serviceGridNoMaintenance:{ cat: 'noMaintenance',keys: ['basic','standard','advanced'] },
        serviceGridManager:      { cat: 'manager',      keys: ['monthly','annual'] },
        serviceGridRenewal:      { cat: 'renewal',      keys: ['standard'] },
        serviceGridAppDesign:    { cat: 'appDesign',    keys: ['starter','pro','premium'] },
        serviceGridUiux:         { cat: 'uiux',         keys: ['starter','pro','premium'] },
        serviceGridLogoDesign:   { cat: 'logoDesign',   keys: ['basic','pro','premium'] },
        serviceGridVideoAds:     { cat: 'videoAds',     keys: ['short','standard','premium'] }
      };

      Object.entries(grids).forEach(([gridId, { cat, keys }]) => {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        grid.innerHTML = keys.map(key => {
          const pkg = servicePackages[cat]?.[key];
          if (!pkg) return '';
          const usdPrice = convertPHPToUSD(pkg.price);
          const displayPrice = formatPrice(usdPrice);
          const isSelected = selectedCategory === cat && selectedPackage === key;

          return `
            <div class="service-card ${isSelected ? 'selected' : ''}" id="card-${cat}-${key}">
              <h3>${pkg.name}</h3>
              <div class="price">${displayPrice}</div>
              ${pkg.tagline ? `<div class="card-tagline">${pkg.tagline}</div>` : ''}
              <div class="price-info">Base price • Add-ons available</div>
              <ul>
                ${pkg.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
              ${pkg.excluded?.length ? `
                <div class="card-not-included-label">Not Included</div>
                <ul class="excluded-list">
                  ${pkg.excluded.map(e => `<li class="excluded">${e}</li>`).join('')}
                </ul>
              ` : ''}
              <div class="best-for">🎯 Best for: ${pkg.bestFor}</div>
              <button class="select-btn" onclick="selectService('${cat}', '${key}')">
                ${isSelected ? '✓ Selected' : 'Select Package'}
              </button>
            </div>
          `;
        }).join('');
      });
    }

    // =================== SELECT SERVICE ===================
    function selectService(cat, pkg) {
      selectedCategory = cat;
      selectedPackage  = pkg;
      loadServices();

      // Show customization panel
      const panel = document.getElementById('customizationPanel');
      panel.style.display = 'block';
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Determine service type
      const webCats     = ['maintenance','onePage','noMaintenance'];
      const serviceType = webCats.includes(cat) ? 'web' :
                          cat === 'appDesign'   ? 'app-design' :
                          cat === 'uiux'        ? 'ui-ux' :
                          cat === 'logoDesign'  ? 'logo' :
                          cat === 'videoAds'    ? 'video' :
                          cat === 'manager'     ? 'manager' :
                          cat === 'renewal'     ? 'renewal' : 'web';

      // Badge
      const badgeMap = {
        'web':'🌐 WEB DESIGN / DEVELOPMENT','app-design':'📱 APP DESIGN',
        'ui-ux':'🧩 UI/UX DESIGN','logo':'🎨 LOGO DESIGN',
        'video':'🎬 VIDEO ADS','manager':'🔧 WEBSITE MANAGER','renewal':'🔄 RENEWAL'
      };
      const badge = document.getElementById('serviceTypeBadge');
      if (badge) badge.textContent = badgeMap[serviceType] || serviceType.toUpperCase();

      // Show/hide option panels
      const panels = {
        'appDesignOptions':   serviceType === 'app-design',
        'webDesignOptions':   serviceType === 'web' && cat !== 'noMaintenance',
        'webDevOptions':      serviceType === 'web',
        'uiuxOptions':        serviceType === 'ui-ux',
        'logoOptions':        serviceType === 'logo',
        'videoAdsOptions':    serviceType === 'video',
        'bizQuestionnaire':   !['manager','renewal'].includes(serviceType),
        'projectDetailsSection': !['manager','renewal','video'].includes(serviceType),
      };
      Object.entries(panels).forEach(([id, show]) => {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? 'block' : 'none';
      });

      // Load toggles for web design
      if (serviceType === 'web') loadWebDesignFeatures(cat);

      updateInvoice();

      // Show invoice section
      document.getElementById('invoiceSection').style.display = 'block';
    }

    // =================== WEB DESIGN FEATURES ===================
    const webDesignFeatureOptions = [
      { name: 'Custom Animations',   price: 2000 },
      { name: 'Live Chat Widget',    price: 1500 },
      { name: 'Booking System',      price: 3000 },
      { name: 'E-Commerce Store',    price: 5000 },
      { name: 'Admin Dashboard',     price: 4000 },
      { name: 'Blog / News Section', price: 2000 },
      { name: 'Gallery / Portfolio', price: 1500 },
      { name: 'Social Media Feed',   price: 1000 },
    ];

    function loadWebDesignFeatures(cat) {
      const container = document.getElementById('webDesignFeatures');
      if (!container) return;
      container.innerHTML = webDesignFeatureOptions.map((f, i) => `
        <label class="toggle-item" onclick="this.classList.toggle('selected'); updateInvoice()">
          <input type="checkbox" value="${f.name}" data-price="${f.price}">
          <span class="toggle-check"></span>
          <span class="toggle-text">
            <span class="toggle-name">${f.name}</span>
            <span class="toggle-price">+${formatPrice(convertPHPToUSD(f.price))}</span>
          </span>
        </label>
      `).join('');

      // Same for dev features
      const devContainer = document.getElementById('webDevFeatures');
      if (devContainer) devContainer.innerHTML = container.innerHTML;
    }

    // =================== PAGE ADJUSTMENT ===================
    function adjustPages(inputId, delta) {
      const input = document.getElementById(inputId);
      if (!input) return;
      let val = parseInt(input.value) || 1;
      val = Math.max(1, val + delta);
      input.value = val;
      updatePageCount(inputId);
      updateInvoice();
    }

    function updatePageCount(inputId) {
      if (!selectedCategory || !selectedPackage) return;
      const pkg = servicePackages[selectedCategory]?.[selectedPackage];
      if (!pkg || !pkg.basePages) return;
      const input = document.getElementById(inputId);
      if (!input) return;
      const pages = parseInt(input.value) || 1;
      const hint = document.getElementById(
        inputId === 'numPages' ? 'pageCounterHint' : 'pageCounterHintDev'
      );
      const counter = input.closest('.page-counter');

      if (pages <= pkg.maxPages) {
        if (hint) { hint.textContent = `✓ Included in package (up to ${pkg.maxPages} pages)`; hint.className = 'page-counter-hint hint-included'; }
        if (counter) counter.className = 'page-counter';
      } else {
        const extra = pages - pkg.maxPages;
        const extraCost = extra * pkg.pricePerPage;
        if (hint) { hint.textContent = `+${extra} extra page(s) at ${formatPrice(convertPHPToUSD(pkg.pricePerPage))}/page = +${formatPrice(convertPHPToUSD(extraCost))}`; hint.className = 'page-counter-hint hint-extra'; }
        if (counter) counter.className = 'page-counter over-max';
      }
    }

    // =================== UPDATE INVOICE ===================
    function updateInvoice() {
      if (!selectedCategory || !selectedPackage) return;
      const pkg = servicePackages[selectedCategory]?.[selectedPackage];
      if (!pkg) return;

      let baseUSD = convertPHPToUSD(pkg.price);
      let rows = [];
      let totalUSD = baseUSD;

      rows.push({ desc: pkg.name, detail: 'Base package', amount: baseUSD });

      // Extra pages
      const pageInputId = selectedCategory === 'noMaintenance' ? 'numPagesdev' : 'numPages';
      const pageInput = document.getElementById(pageInputId) || document.getElementById('numPages');
      if (pageInput && pkg.pricePerPage) {
        const pages = parseInt(pageInput.value) || pkg.basePages;
        if (pages > pkg.maxPages) {
          const extra = pages - pkg.maxPages;
          const extraUSD = extra * convertPHPToUSD(pkg.pricePerPage);
          rows.push({ desc: `Extra Pages (${extra})`, detail: `+${extra} × ${formatPrice(convertPHPToUSD(pkg.pricePerPage))}`, amount: extraUSD });
          totalUSD += extraUSD;
        }
      }

      // Web design add-ons
      document.querySelectorAll('#webDesignFeatures .toggle-item.selected input, #webDevFeatures .toggle-item.selected input').forEach(input => {
        const price = convertPHPToUSD(parseInt(input.dataset.price) || 0);
        rows.push({ desc: input.value, detail: 'Add-on', amount: price });
        totalUSD += price;
      });

      // Build table
      const tbody = document.getElementById('invoiceTableBody');
      if (tbody) {
        tbody.innerHTML = rows.map(r => `
          <tr>
            <td>${r.desc}</td>
            <td style="color:var(--text-muted);font-size:0.8rem;">${r.detail}</td>
            <td style="text-align:right;font-weight:700;color:var(--yellow);">${formatPrice(r.amount)}</td>
          </tr>
        `).join('');
      }

      // Total
      const totalEl = document.getElementById('invoiceTotalAmount');
      if (totalEl) {
        totalEl.textContent = formatPrice(totalUSD);
        totalEl.classList.add('total-updating');
        setTimeout(() => totalEl.classList.remove('total-updating'), 500);
      }

      // Invoice date
      const dateEl = document.getElementById('invoiceDate');
      if (dateEl && !dateEl.textContent) {
        dateEl.textContent = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
      }
    }

    // =================== SYNC CLIENT INFO ===================
    function syncClientName(input) {
      input.dataset.userEdited = '1';
    }
    function syncInvoiceEmail(input) {
      input.dataset.userEdited = '1';
    }
    function syncInvoicePhone() {}
    function syncInvoiceEmailFromSettings() {
      const settings = document.getElementById('profileEmail');
      const inv = document.getElementById('invoiceEmailInput');
      if (settings && inv && !inv.dataset.userEdited) inv.value = settings.value;
    }
    function syncSettingsPhoneToInvoice() {}

    // =================== SUBMIT ORDER ===================
    async function submitOrder(e) {
      if (e) e.preventDefault();
      if (!selectedPackage) { alert('Please select a service package first.'); return; }

      const clientName  = document.getElementById('clientNameInput')?.value?.trim() || 'Guest';
      const clientEmail = document.getElementById('invoiceEmailInput')?.value?.trim() || '';

      if (!clientEmail) {
        alert('Please enter your email address to receive order confirmation.');
        return;
      }

      const btn = document.getElementById('placeOrderBtn');
      if (btn) { btn.disabled = true; btn.textContent = '⏳ Sending...'; }

      const pkg = servicePackages[selectedCategory]?.[selectedPackage];
      const totalEl = document.getElementById('invoiceTotalAmount');
      const totalText = totalEl?.textContent || '—';

      const templateParams = {
        client_name:    clientName,
        client_email:   clientEmail,
        service_name:   pkg?.name || selectedPackage,
        total_amount:   totalText,
        currency:       currentCurrency,
        invoice_number: document.getElementById('invoiceNumber')?.textContent || '',
        invoice_date:   document.getElementById('invoiceDate')?.textContent   || '',
        payment_method: document.getElementById('invPaymentMethod')?.value    || '',
        business_name:  document.getElementById('businessName')?.value        || '',
        special_notes:  document.getElementById('specialRequests')?.value     || '',
        deadline:       document.getElementById('projectDeadline')?.value     || '',
      };

      try {
        await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.adminTemplateID, templateParams);
        try {
          await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.clientTemplateID, templateParams);
        } catch(e2) { /* client email optional */ }

        const banner = document.getElementById('orderSuccessBanner');
        if (banner) banner.style.display = 'block';
        if (btn) { btn.style.display = 'none'; }
        const newPurchaseBtn = document.getElementById('newPurchaseBtn');
        if (newPurchaseBtn) newPurchaseBtn.style.display = 'block';

      } catch(err) {
        alert('Order submission failed. Please try again or contact us directly.');
        if (btn) { btn.disabled = false; btn.textContent = '🛒 Place Order'; }
      }
    }

    // =================== DOWNLOAD INVOICE ===================
    function downloadInvoice() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const pkg = servicePackages[selectedCategory]?.[selectedPackage];
      if (!pkg) { alert('Select a package first.'); return; }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('NEX GENIX CREATIVE SOLUTIONS', 14, 20);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('nexgenixcreativesolutions.github.io', 14, 28);
      doc.text('info@nexgenixcreativesolutions.com', 14, 34);

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', 160, 20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(document.getElementById('invoiceNumber')?.textContent || '', 160, 28);
      doc.text(document.getElementById('invoiceDate')?.textContent   || '', 160, 34);

      doc.line(14, 40, 196, 40);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('BILL TO:', 14, 50);
      doc.setFont('helvetica', 'normal');
      doc.text(document.getElementById('clientNameInput')?.value  || 'Client', 14, 57);
      doc.text(document.getElementById('invoiceEmailInput')?.value || '', 14, 63);

      doc.setFont('helvetica', 'bold');
      doc.text('Package:', 14, 78);
      doc.setFont('helvetica', 'normal');
      doc.text(pkg.name, 50, 78);

      doc.setFont('helvetica', 'bold');
      doc.text('Total Amount:', 14, 90);
      doc.setFont('helvetica', 'normal');
      doc.text(document.getElementById('invoiceTotalAmount')?.textContent || '', 60, 90);

      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text('50% downpayment required to start • 50% upon project completion', 14, 105);
      doc.text('Thank you for choosing Nex Genix Creative Solutions!', 14, 112);

      doc.save(`NGCS-Invoice-${Date.now()}.pdf`);
    }

    // =================== START NEW PURCHASE ===================
    function startNewPurchase() {
      selectedCategory = null;
      selectedPackage  = null;
      document.getElementById('customizationPanel').style.display = 'none';
      document.getElementById('invoiceSection').style.display = 'none';
      document.getElementById('orderSuccessBanner').style.display = 'none';
      document.getElementById('placeOrderBtn').style.display = 'block';
      document.getElementById('placeOrderBtn').disabled = false;
      document.getElementById('placeOrderBtn').textContent = '🛒 Place Order';
      document.getElementById('newPurchaseBtn').style.display = 'none';
      loadServices();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =================== SAVE / LOAD CLIENT INFO ===================
    const LS_KEY = 'ngcs_client_v1';

    function saveClientInfo() {
      const data = {
        name:  document.getElementById('clientNameInput')?.value || '',
        email: document.getElementById('invoiceEmailInput')?.value || '',
        phone: document.getElementById('invoicePhoneNumber')?.value || '',
        code:  document.getElementById('invoicePhoneCode')?.value || '+63'
      };
      if (!data.name && !data.email) {
        alert('Please enter at least a name or email before saving.');
        return;
      }
      localStorage.setItem(LS_KEY, JSON.stringify(data));
      const banner = document.getElementById('invSavedBanner');
      if (banner) { banner.textContent = '💾 Profile saved to this device'; banner.classList.add('visible'); }
      setTimeout(() => { if (banner) banner.textContent = '✅ Auto-filled from saved profile'; }, 2000);
    }

    function loadClientInfo() {
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return;
        const d = JSON.parse(raw);
        if (d.name)  { const el = document.getElementById('clientNameInput');    if (el) el.value = d.name; }
        if (d.email) { const el = document.getElementById('invoiceEmailInput');  if (el) el.value = d.email; }
        if (d.phone) { const el = document.getElementById('invoicePhoneNumber'); if (el) el.value = d.phone; }
        if (d.code)  { const el = document.getElementById('invoicePhoneCode');   if (el) el.value = d.code; }
        const banner = document.getElementById('invSavedBanner');
        if (banner && (d.name || d.email)) banner.classList.add('visible');
      } catch(e) { /* ignore */ }
    }

    // =================== POPULATE PHONE DROPDOWNS ===================
    const phoneCountries = [
      { code: '+63', flag: '🇵🇭', name: 'Philippines (+63)' },
      { code: '+1',  flag: '🇺🇸', name: 'US/Canada (+1)' },
      { code: '+44', flag: '🇬🇧', name: 'UK (+44)' },
      { code: '+61', flag: '🇦🇺', name: 'Australia (+61)' },
      { code: '+65', flag: '🇸🇬', name: 'Singapore (+65)' },
      { code: '+60', flag: '🇲🇾', name: 'Malaysia (+60)' },
      { code: '+81', flag: '🇯🇵', name: 'Japan (+81)' },
      { code: '+82', flag: '🇰🇷', name: 'South Korea (+82)' },
      { code: '+86', flag: '🇨🇳', name: 'China (+86)' },
      { code: '+91', flag: '🇮🇳', name: 'India (+91)' },
      { code: '+49', flag: '🇩🇪', name: 'Germany (+49)' },
      { code: '+33', flag: '🇫🇷', name: 'France (+33)' },
      { code: '+39', flag: '🇮🇹', name: 'Italy (+39)' },
      { code: '+48', flag: '🇵🇱', name: 'Poland (+48)' },
      { code: '+971',flag: '🇦🇪', name: 'UAE (+971)' },
      { code: '+966',flag: '🇸🇦', name: 'Saudi Arabia (+966)' },
      { code: '+55', flag: '🇧🇷', name: 'Brazil (+55)' },
      { code: '+52', flag: '🇲🇽', name: 'Mexico (+52)' },
    ];

    function populatePhoneDropdowns() {
      const options = phoneCountries.map(c =>
        `<option value="${c.code}">${c.flag} ${c.name}</option>`
      ).join('');

      ['phoneCode', 'invoicePhoneCode'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = options;
      });
    }

    // =================== FLOATING CODE BACKGROUND ===================
    function createFloatingCodeBackground() {
      const container = document.getElementById('floatingCodeContainer');
      if (!container) return;
      const snippets = [
        'const solution = ngcs.build()',
        'function createWebsite() {}',
        '<div class="hero-section">',
        'display: flex; gap: 1rem;',
        'git commit -m "launch v1"',
        'SELECT * FROM clients;',
        'border-radius: 0.875rem;',
        '@media (max-width: 768px)',
        'async function fetchData()',
        'import { useState } from react',
        'transform: translateY(-4px);',
        'box-shadow: 0 0 20px #39FF14;',
      ];
      for (let i = 0; i < 12; i++) {
        const el = document.createElement('div');
        el.className = 'code-line';
        el.textContent = snippets[i % snippets.length];
        el.style.top    = Math.random() * 100 + '%';
        el.style.animationDuration = (20 + Math.random() * 30) + 's';
        el.style.animationDelay   = (Math.random() * 20) + 's';
        container.appendChild(el);
      }
    }

    // =================== DATETIME CLOCK ===================
    function updateClock() {
      const el = document.getElementById('datetime');
      if (!el) return;
      const now = new Date();
      el.textContent = now.toLocaleString('en-US', {
        weekday:'short', year:'numeric', month:'short',
        day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit'
      });
    }

    // =================== SAVE PROFILE ===================
    async function saveProfile() {
      const displayName = document.getElementById('displayNameInput')?.value?.trim() || '';
      const phoneCode   = document.getElementById('phoneCode')?.value || '';
      const phoneNum    = document.getElementById('phoneNumber')?.value?.trim() || '';
      const fullPhone   = phoneNum ? `${phoneCode}${phoneNum.replace(/\s/g,'')}` : '';

      try {
        const { data: { session } } = await _sb.auth.getSession();
        if (!session) throw new Error('Not logged in');
        const { error } = await _sb.from('profiles').update({
          display_name: displayName,
          phone:        fullPhone || null,
          updated_at:   new Date().toISOString()
        }).eq('id', session.user.id);
        if (error) throw error;
        alert('Profile updated successfully!');
      } catch(err) {
        alert('Could not save profile: ' + err.message);
      }
    }

    async function updatePassword() {
      const newPassword = document.getElementById('passwordInput')?.value ||
                          document.getElementById('newPasswordInput')?.value;
      if (!newPassword || newPassword.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      try {
        const { error } = await _sb.auth.updateUser({ password: newPassword });
        if (error) throw error;
        alert('Password updated successfully!');
        const pwEl = document.getElementById('passwordInput') || document.getElementById('newPasswordInput');
        if (pwEl) pwEl.value = '';
      } catch(err) {
        alert('Could not update password: ' + err.message);
      }
    }

    async function logout() {
      await _sb.auth.signOut();
      // Instead of redirect, just update UI to guest state
      _currentSession = null;
      if (typeof window.applyAuthState === 'function') window.applyAuthState(false);
      showSection('order');
    }

    // =================== BOTTOM NAV ACTIVE STATE ===================
    function setBottomActive(el) {
      document.querySelectorAll('.bottom-nav-item').forEach(btn => btn.classList.remove('active'));
      el.classList.add('active');
    }

    // =================== SCROLL TO TOP ===================
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =================== VIDEO DURATION LIMIT ===================
    function updateDurationLimit() {
      updateInvoice();
      if (!selectedCategory || !selectedPackage) return;
      const sel     = document.getElementById('videoDuration');
      const warning = document.getElementById('durationWarning');
      const maxLabel = document.getElementById('durationMaxLabel');
      if (!sel || !warning) return;
      const secMap = { '15 seconds':15,'30 seconds':30,'60 seconds (1 min)':60,'90 seconds':90,'120 seconds (2 min)':120 };
      const chosen = secMap[sel.value] || 0;
      const limits = { short: 30, standard: 60, premium: 120 };
      const limitLabels = { short: '30 seconds', standard: '60 seconds', premium: '120 seconds' };
      const limit = limits[selectedPackage] || 120;
      if (chosen > limit) {
        warning.style.display = 'block';
        if (maxLabel) maxLabel.textContent = limitLabels[selectedPackage] || '120 seconds';
      } else {
        warning.style.display = 'none';
      }
    }

    // =================== PAYMENT ICON ===================
    function updatePaymentIcon() {
      const sel = document.getElementById('invPaymentMethod');
      if (!sel) return;
      const icons = { gcash: '🟢', bank: '🏦', maya: '🟣', paypal: '🔵', stripe: '⬛' };
      const icon = document.getElementById('invPayIcon');
      if (icon) icon.textContent = icons[sel.value] || '💳';
    }

    // =================== INITIALIZE ===================
    document.addEventListener('DOMContentLoaded', function() {
      createFloatingCodeBackground();
      loadServices();
      populatePhoneDropdowns();
      loadClientInfo();
      updateClock();
      setInterval(updateClock, 1000);

      // Hamburger show on mobile
      const toggle = document.getElementById('sidebarToggleBtn');
      if (toggle) {
        if (window.innerWidth <= 768) toggle.style.display = 'flex';
        window.addEventListener('resize', () => {
          toggle.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
        });
      }

      // Auto-select service tab from URL ?service= param
      (function autoSelectServiceFromURL() {
        const params  = new URLSearchParams(window.location.search);
        const service = params.get('service');
        if (!service) return;
        const tabIdMap = {
          'app-design':      'tab-app-design',
          'web-design':      'tab-web-design',
          'web-development': 'tab-web-development',
          'ui-ux-design':    'tab-ui-ux',
          'logo-design':     'tab-logo',
          'video-ads':       'tab-video'
        };
        const tabBtn = document.getElementById(tabIdMap[service.toLowerCase()]);
        if (tabBtn) {
          setTimeout(() => {
            tabBtn.click();
            const filterBar = document.getElementById('serviceFilterBar');
            if (filterBar) filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      })();

      // Go to top button
      window.addEventListener('scroll', () => {
        const goTopBtn = document.getElementById('goTopBtn');
        if (goTopBtn) goTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
      });

      // Phone sync
      const codeEl = document.getElementById('phoneCode');
      const numEl  = document.getElementById('phoneNumber');
      if (codeEl) codeEl.addEventListener('change', syncSettingsPhoneToInvoice);
      if (numEl)  numEl.addEventListener('input',  syncSettingsPhoneToInvoice);
    });

    // ── GLOBAL EXPORTS ──
    window.filterByServiceType        = filterByServiceType;
    window.selectOrderType            = selectOrderType;
    window.selectService              = selectService;
    window.showSection                = showSection;
    window.toggleSidebar              = toggleSidebar;
    window.updateInvoice              = updateInvoice;
    window.adjustPages                = adjustPages;
    window.updatePageCount            = updatePageCount;
    window.changeCurrencyFromDropdown = changeCurrencyFromDropdown;
    window.submitOrder                = submitOrder;
    window.downloadInvoice            = downloadInvoice;
    window.startNewPurchase           = startNewPurchase;
    window.saveClientInfo             = saveClientInfo;
    window.syncClientName             = syncClientName;
    window.syncInvoiceEmail           = syncInvoiceEmail;
    window.syncInvoicePhone           = syncInvoicePhone;
    window.syncInvoiceEmailFromSettings = syncInvoiceEmailFromSettings;
    window.updatePaymentIcon          = updatePaymentIcon;
    window.logout                     = logout;
    window.setBottomActive            = setBottomActive;
    window.scrollToTop                = scrollToTop;
    window.updateDurationLimit        = updateDurationLimit;
    window.saveProfile                = saveProfile;
    window.updatePassword             = updatePassword;
    window.toggleMultiDrop            = typeof toggleMultiDrop === 'function' ? toggleMultiDrop : function(){};
    window.updateMultiSelect          = typeof updateMultiSelect === 'function' ? updateMultiSelect : function(){};
    window.togglePw                   = typeof togglePw === 'function' ? togglePw : function(){};
    window.filterOrders               = typeof filterOrders === 'function' ? filterOrders : function(){};
