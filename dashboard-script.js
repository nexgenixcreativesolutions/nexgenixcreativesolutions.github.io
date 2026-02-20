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
      'USD': 1,
      'PHP': 56.50,
      'EUR': 0.92,
      'GBP': 0.79,
      'JPY': 149.50,
      'AUD': 1.52,
      'CAD': 1.39,
      'SGD': 1.34,
      'INR': 83.20,
      'CNY': 7.24,
      'PLN': 3.98,
      'MXN': 17.15,
      'BRL': 4.97,
      'KRW': 1325.00,
      'CHF': 0.89,
      'AED': 3.67,
      'SAR': 3.75
    };

    const currencySymbols = {
      'USD': '$',
      'PHP': '₱',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'AUD': 'A$',
      'CAD': 'C$',
      'SGD': 'S$',
      'INR': '₹',
      'CNY': '¥',
      'PLN': 'zł',
      'MXN': 'MX$',
      'BRL': 'R$',
      'KRW': '₩',
      'CHF': 'Fr',
      'AED': 'د.إ',
      'SAR': '﷼'
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
      if (selectedPackage) {
        updateInvoice();
      }
    }

    function changeCurrencyFromDropdown(select) {
      changeCurrency(select.value);
    }

    function changeCurrencyStandalone(btn, currency) {
      changeCurrency(currency);
    }

    // =================== SERVICE PACKAGES DATA (CATEGORIZED) ===================
    const servicePackages = {
      // CATEGORY 1: MULTI-PAGE WITH MAINTENANCE
      maintenance: {
        basic: {
          name: 'BASIC - Starter Business',
          price: 18000,
          basePages: 5,
          minPages: 3,
          maxPages: 5,
          pricePerPage: 1500,
          features: [
            '3-5 page website',
            'Mobile responsive',
            'Free domain (1 year)',
            'Hosting (1 year)',
            '1 professional email'
          ],
          excluded: [],
          bestFor: 'sari-sari, cafés, freelancers, startups'
        },
        pro: {
          name: 'PRO - Growing Business',
          price: 26000,
          basePages: 8,
          minPages: 5,
          maxPages: 8,
          pricePerPage: 2000,
          features: [
            '5-8 pages',
            'SQL database',
            'Contact forms',
            'Speed optimization',
            'Website Manager (1 month FREE)'
          ],
          excluded: [],
          bestFor: 'clinics, restaurants, agencies'
        },
        premium: {
          name: 'PREMIUM - Established/Corporate',
          price: 52500,
          basePages: 12,
          minPages: 8,
          maxPages: 12,
          pricePerPage: 3500,
          features: [
            'Custom UI/UX',
            'Advanced SQL & admin panel',
            'Multiple emails',
            'Priority support',
            'Dedicated Website Manager'
          ],
          excluded: [],
          bestFor: 'corporations, franchises, e-commerce'
        }
      },

      // CATEGORY 2: TWO-PAGE WEBSITES
      onePage: {
        starter: {
          name: 'TWO-PAGE Starter',
          price: 6500,
          basePages: 2,
          minPages: 2,
          maxPages: 2,
          pricePerPage: 1000,
          features: [
            '2 pages',
            'Mobile responsive',
            'Basic UI design',
            'Contact form (email notification)',
            'Hosted online',
            'FREE domain (1 year)',
            'Hosting (1 year)'
          ],
          excluded: ['No maintenance', 'No business email'],
          bestFor: 'freelancers, home-based sellers, promos'
        },
        pro: {
          name: 'TWO-PAGE Pro',
          price: 9500,
          basePages: 2,
          minPages: 2,
          maxPages: 2,
          pricePerPage: 1500,
          features: [
            'Everything in Starter',
            'Custom layout & branding',
            'SEO-ready structure',
            'Faster loading optimization',
            'Priority setup'
          ],
          excluded: ['No maintenance', 'No business email'],
          bestFor: 'cafés, startups, marketing campaigns'
        },
        premium: {
          name: 'TWO-PAGE Premium',
          price: 14000,
          basePages: 2,
          minPages: 2,
          maxPages: 2,
          pricePerPage: 2000,
          features: [
            'Custom-designed landing page',
            'Conversion-focused layout',
            'Call-to-action sections',
            'Google Map integration',
            'Analytics setup'
          ],
          excluded: ['No maintenance', 'No business email'],
          bestFor: 'product launches, agencies, corporate promos'
        }
      },

      // CATEGORY 3: MULTI-PAGE WITHOUT MAINTENANCE
      noMaintenance: {
        basic: {
          name: 'MULTI-PAGE Basic',
          price: 12000,
          basePages: 4,
          minPages: 3,
          maxPages: 4,
          pricePerPage: 1200,
          features: [
            '3-4 pages',
            'Mobile responsive',
            'FREE domain (1 year)',
            'Hosting (1 year)',
            'Contact form'
          ],
          excluded: ['No maintenance', 'No business email', 'No updates after turnover'],
          bestFor: 'small shops, sari-sari, service providers'
        },
        standard: {
          name: 'MULTI-PAGE Standard',
          price: 17000,
          basePages: 7,
          minPages: 5,
          maxPages: 7,
          pricePerPage: 1700,
          features: [
            '5-7 pages',
            'Improved UI design',
            'Speed optimization',
            'FREE domain (1 year)',
            'Hosting (1 year)'
          ],
          excluded: ['No maintenance', 'No business email'],
          bestFor: 'restaurants, clinics, schools'
        },
        advanced: {
          name: 'MULTI-PAGE Advanced',
          price: 25000,
          basePages: 12,
          minPages: 8,
          maxPages: 12,
          pricePerPage: 2500,
          features: [
            '8-12 pages',
            'Custom layout',
            'SQL database (if needed)',
            'FREE domain (1 year)',
            'Hosting (1 year)'
          ],
          excluded: ['No maintenance', 'No business email'],
          bestFor: 'large local businesses, organizations'
        }
      },

      // CATEGORY 4: WEBSITE MANAGER SERVICES
      manager: {
        monthly: {
          name: 'Website Manager (Monthly)',
          price: 800,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Content updates (text/images)',
            'Minor design changes',
            'Plugin & security checks',
            'Backup monitoring',
            'Basic performance checks',
            'Startup-friendly pricing'
          ],
          excluded: [],
          bestFor: 'businesses wanting flexible monthly support'
        },
        annual: {
          name: 'Website Manager (Annual)',
          price: 8000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'All monthly features',
            '2 months FREE',
            'Priority support',
            'Discounted rate',
            'Better value for long-term'
          ],
          excluded: [],
          bestFor: 'businesses committed to ongoing maintenance'
        }
      },

      // CATEGORY 5: ANNUAL RENEWAL
      renewal: {
        standard: {
          name: 'Annual Website Renewal',
          price: 20000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Hosting Renewal: ₱1,800',
            'Domain Renewal: ₱900',
            'Google Workspace Email Renewal (1 user): ₱6,800',
            'Website Manager Service (Annual): ₱8,000',
            'Technical Support & Vendor Handling Fee: ₱2,500'
          ],
          excluded: [],
          bestFor: 'existing clients renewing annual services'
        }
      },

      // CATEGORY 6: APP DESIGN
      appDesign: {
        starter: {
          name: 'APP DESIGN - Starter',
          price: 8000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Up to 8 screens',
            'iOS or Android',
            'Static Figma mockups',
            'Basic UI design',
            'Mobile-first layout'
          ],
          excluded: ['No prototype', 'No branding'],
          bestFor: 'small apps, MVPs, simple utilities'
        },
        pro: {
          name: 'APP DESIGN - Pro',
          price: 18000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Up to 20 screens',
            'iOS & Android',
            'Clickable prototype',
            'Custom branding & icon',
            'Onboarding screens'
          ],
          excluded: [],
          bestFor: 'startups, e-commerce apps, service apps'
        },
        premium: {
          name: 'APP DESIGN - Premium',
          price: 35000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Unlimited screens',
            'Cross-platform design',
            'Animated prototype',
            'Full design system',
            'Dark & light mode',
            'Developer handoff'
          ],
          excluded: [],
          bestFor: 'funded startups, enterprise apps, SaaS'
        }
      },

      // CATEGORY 7: UI/UX DESIGN
      uiuxDesign: {
        wireframe: {
          name: 'UI/UX - Wireframes',
          price: 5000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Up to 10 screens',
            'Low to mid-fidelity',
            'User flow diagrams',
            'Figma deliverables',
            'Revision rounds included'
          ],
          excluded: ['No visual design', 'No prototype'],
          bestFor: 'early-stage planning, concept validation'
        },
        prototype: {
          name: 'UI/UX - Full Prototype',
          price: 14000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Up to 25 screens',
            'High-fidelity design',
            'Clickable prototype',
            'User journey mapping',
            'Information architecture'
          ],
          excluded: [],
          bestFor: 'investor demos, usability testing, pitches'
        },
        system: {
          name: 'UI/UX - Design System',
          price: 28000,
          basePages: 0,
          pricePerPage: 0,
          features: [
            'Complete component library',
            'Design tokens & variables',
            'Accessibility audit (WCAG)',
            'Developer handoff specs',
            'Documentation included'
          ],
          excluded: [],
          bestFor: 'product teams, SaaS platforms, enterprises'
        }
      },

      // CATEGORY 8: LOGO DESIGN
      logoDesign: {
        basic: {
          name: 'LOGO - Basic',
          price: 2500,
          basePages: 0, pricePerPage: 0,
          tier: 'basic',
          tagline: 'Simple & clean logo to get started',
          features: [
            '2 logo concepts to choose from',
            'PNG & JPG formats only',
            '2 revision rounds',
            'Color & black-and-white versions',
            '5–7 business day delivery'
          ],
          excluded: [
            'No vector file (AI / EPS / SVG)',
            'No brand guide or style sheet',
            'No business card mockup',
            'No social media kit',
            'No reversed / transparent versions'
          ],
          bestFor: 'startups, solo entrepreneurs, sari-sari stores'
        },
        pro: {
          name: 'LOGO - Pro',
          price: 5500,
          basePages: 0, pricePerPage: 0,
          tier: 'pro',
          tagline: 'Professional quality with vector files',
          features: [
            '4 logo concepts to choose from',
            'PNG, JPG & SVG (vector) formats',
            '4 revision rounds',
            'Color, B&W & reversed versions',
            'Business card mockup preview',
            '3–5 business day delivery'
          ],
          excluded: [
            'No full brand guide',
            'No social media kit',
            'No AI / EPS source files'
          ],
          bestFor: 'growing businesses, clinics, restaurants'
        },
        premium: {
          name: 'LOGO - Premium Brand Identity',
          price: 12000,
          basePages: 0, pricePerPage: 0,
          tier: 'premium',
          tagline: 'Complete brand identity — everything included',
          features: [
            'Unlimited logo concepts',
            'Full vector package: AI, EPS, SVG, PNG, JPG',
            'Unlimited revision rounds',
            'Complete mini brand guide (colors, fonts, usage rules)',
            'Social media profile kit (FB, IG, LinkedIn covers)',
            'Business card mockup',
            'Transparent / reversed versions for all backgrounds',
            'Priority 2–3 business day delivery'
          ],
          excluded: [],
          bestFor: 'corporations, franchises, rebrands, serious businesses'
        }
      },

      // CATEGORY 9: VIDEO ADS
      videoAds: {
        short: {
          name: 'VIDEO AD - Short (up to 30s)',
          price: 4500,
          basePages: 0, pricePerPage: 0,
          features: [
            'Up to 30 seconds',
            'Script consultation',
            'Motion graphics & text overlays',
            'Background music (licensed)',
            '2 revision rounds',
            'HD 1080p export'
          ],
          excluded: [],
          bestFor: 'social media stories, reels, quick promos'
        },
        standard: {
          name: 'VIDEO AD - Standard (up to 60s)',
          price: 8000,
          basePages: 0, pricePerPage: 0,
          features: [
            'Up to 60 seconds',
            'Script & storyboard',
            'Custom motion graphics',
            'Voiceover ready (client provides)',
            '3 revision rounds',
            'HD 1080p / 4K export'
          ],
          excluded: [],
          bestFor: 'YouTube ads, Facebook campaigns, product launches'
        },
        premium: {
          name: 'VIDEO AD - Premium (up to 120s)',
          price: 15000,
          basePages: 0, pricePerPage: 0,
          features: [
            'Up to 120 seconds',
            'Full script & storyboard',
            'Advanced animation & effects',
            'Custom music / SFX',
            'Multiple format exports',
            'Unlimited revisions',
            'Priority 3-day turnaround'
          ],
          excluded: [],
          bestFor: 'brand films, company profiles, major campaigns'
        }
      }
    };

    // =================== FLOATING CODE BACKGROUND ===================
    const codeSnippets = [
      'const nexgenix = () => {',
      'function createSolution() {',
      'import { Innovation } from "future"',
      '<div className="digital">',
      'async function buildDreams() {',
      'export default Excellence;',
      'return <Success />;',
      'const vision = await design();',
      'npm install creativity',
      'git commit -m "launch"',
      'SELECT * FROM solutions;',
      'CREATE TABLE success;',
      '{ transform: "ideas" }',
      '.future { display: flex; }',
      'onClick={() => innovate()}',
      'useState(creativity);',
      'useEffect(() => grow());',
      'class Digital extends Tech {',
      'interface Vision { }',
      'type Success = Promise<Growth>;'
    ];

    function createFloatingCodeBackground() {
      const container = document.getElementById('floatingCodeContainer');
      for (let i = 0; i < 15; i++) {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeLine.textContent = randomSnippet;
        const yPosition = 5 + (i * 6);
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 20;
        codeLine.style.top = `${yPosition}%`;
        codeLine.style.animationDuration = `${duration}s`;
        codeLine.style.animationDelay = `${delay}s`;
        container.appendChild(codeLine);
      }
    }

    // =================== DATE TIME UPDATE ===================
    function updateDateTime() {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    // =================== SERVICE TYPE FILTER ===================
    let activeServiceFilter = 'all';

    function filterByServiceType(type, btn) {
      activeServiceFilter = type;

      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      if (btn) btn.classList.add('active');

      document.querySelectorAll('#newWebsitePackages .package-category').forEach(cat => {
        const types = (cat.dataset.serviceTypes || '').split(' ');
        if (type === 'all' || types.includes(type)) {
          cat.classList.remove('hidden');
        } else {
          cat.classList.add('hidden');
        }
      });

      if (selectedPackage) {
        selectedPackage = null;
        selectedCategory = null;
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('customizationPanel').style.display = 'none';
        document.getElementById('invoiceSection').style.display = 'none';
      }

      const serviceTypeMap = {
        'app-design':      'app-design',
        'web-design':      'web-design',
        'web-development': 'web-development',
        'ui-ux-design':    'ui-ux-design',
        'logo-design':     'logo-design',
        'video-ads':       'video-ads'
      };
      if (type !== 'all' && serviceTypeMap[type]) {
        activeServiceType = serviceTypeMap[type];
      } else {
        activeServiceType = '';
      }
    }

    // =================== ORDER TYPE SELECTION ===================
    let currentOrderType = 'new';

    function selectOrderType(type) {
      currentOrderType = type;

      document.getElementById('newWebsiteBtn').classList.toggle('active', type === 'new');
      document.getElementById('renewalBtn').classList.toggle('active', type === 'renewal');

      document.getElementById('newWebsitePackages').style.display = type === 'new' ? 'block' : 'none';
      document.getElementById('renewalPackages').style.display = type === 'renewal' ? 'block' : 'none';
      document.getElementById('serviceFilterBar').style.display = type === 'new' ? 'flex' : 'none';

      document.getElementById('customizationPanel').style.display = 'none';
      document.getElementById('invoiceSection').style.display = 'none';

      selectedPackage = null;
      selectedCategory = null;
      document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
      });
    }

    // =================== NAVIGATION ===================
    function showSection(sectionId) {
      document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
      const section = document.getElementById(sectionId);
      if (section) section.classList.add('active');
      if (window.innerWidth <= 768) {
        const sb = document.getElementById('sidebar');
        if (sb) sb.classList.remove('active');
        const ov = document.getElementById('sidebarOverlay');
        if (ov) ov.classList.remove('active');
      }
    }

    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('active');
      document.getElementById('sidebarOverlay').classList.toggle('active');
    }

    // =================== LOAD SERVICES BY CATEGORY ===================
    function loadServices() {
      loadServiceCategory('serviceGridMaintenance', servicePackages.maintenance, 'maintenance');
      loadServiceCategory('serviceGridOnePage', servicePackages.onePage, 'onePage');
      loadServiceCategory('serviceGridNoMaintenance', servicePackages.noMaintenance, 'noMaintenance');
      loadServiceCategory('serviceGridManager', servicePackages.manager, 'manager');
      loadServiceCategory('serviceGridRenewal', servicePackages.renewal, 'renewal');
      loadServiceCategory('serviceGridAppDesign', servicePackages.appDesign, 'appDesign');
      loadServiceCategory('serviceGridUiux', servicePackages.uiuxDesign, 'uiuxDesign');
      loadServiceCategory('serviceGridLogoDesign', servicePackages.logoDesign, 'logoDesign');
      loadServiceCategory('serviceGridVideoAds', servicePackages.videoAds, 'videoAds');
    }

    function loadServiceCategory(gridId, packages, category) {
      const grid = document.getElementById(gridId);
      if (!grid) return;

      grid.innerHTML = '';

      for (const [key, pkg] of Object.entries(packages)) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.setAttribute('data-category', category);
        card.setAttribute('data-key', key);

        const featuresHTML = pkg.features.map(f => `<li>${f}</li>`).join('');
        const excludedHTML = pkg.excluded.map(f => `<li class="excluded">${f}</li>`).join('');

        const priceUSD = convertPHPToUSD(pkg.price);
        const pricePerPageUSD = convertPHPToUSD(pkg.pricePerPage);

        const isLogoOrVideo = category === 'logoDesign' || category === 'videoAds';
        const tierColors = { basic: 'var(--text-muted)', pro: 'var(--neon)', premium: 'var(--yellow)' };
        const tierIcons  = { basic: '🥉', pro: '🥈', premium: '🏆' };
        const tierColor  = (pkg.tier && tierColors[pkg.tier]) || 'var(--text-muted)';
        const tierIcon   = (pkg.tier && tierIcons[pkg.tier]) || '';

        card.innerHTML = `
          ${pkg.tier ? `<div class="card-tier-badge" style="color:${tierColor};border-color:${tierColor};">${tierIcon} ${pkg.tier.toUpperCase()}</div>` : ''}
          <h3>${pkg.name}</h3>
          ${pkg.tagline ? `<p class="card-tagline">${pkg.tagline}</p>` : ''}
          <div class="price">${formatPrice(priceUSD)}</div>
          ${pkg.basePages > 0 ? `
            <p class="price-info">
              ${pkg.basePages} pages included<br>
              ${formatPrice(pricePerPageUSD)} per additional page
            </p>
          ` : ''}
          <ul>
            ${featuresHTML}
          </ul>
          ${pkg.excluded && pkg.excluded.length ? `
            ${isLogoOrVideo ? '<div class="card-not-included-label">Not included:</div>' : ''}
            <ul class="excluded-list">
              ${excludedHTML}
            </ul>
          ` : ''}
          <p class="best-for">
            💡 Best for: ${pkg.bestFor}
          </p>
          <button class="select-btn" onclick="selectService('${category}', '${key}')">Select Package</button>
        `;

        grid.appendChild(card);
      }
    }

    let selectedPackage = null;
    let selectedCategory = null;
    let prevInvoiceKeys = new Set();
    let activeServiceType = '';

    // Business questionnaire tag state
    const bizSelections = { type: [], goal: [], stage: [] };

    function toggleBizTag(el, group, value) {
      const container = el.closest('.biz-tags');
      const isSingle = container.dataset.single === 'true';

      if (isSingle) {
        container.querySelectorAll('.biz-tag').forEach(t => t.classList.remove('selected'));
        bizSelections[group] = [value];
        el.classList.add('selected');
      } else {
        if (el.classList.contains('selected')) {
          el.classList.remove('selected');
          bizSelections[group] = bizSelections[group].filter(v => v !== value);
        } else {
          el.classList.add('selected');
          bizSelections[group].push(value);
        }
      }
      updateInvoice();
    }

    function toggleFeature(toggleEl, checkboxId) {
      const cb = document.getElementById(checkboxId);
      if (!cb) return;
      cb.checked = !cb.checked;
      toggleEl.classList.toggle('selected', cb.checked);
      updateInvoice();
    }

    // =================== SMART PAGE COUNTER ===================
    function initPageCounter(inputId) {
      if (!selectedPackage || !selectedCategory) return;
      const pkg = servicePackages[selectedCategory][selectedPackage];

      const min = pkg.minPages || 1;
      const max = pkg.maxPages || 999;
      const fixed = (min === max);
      const input = document.getElementById(inputId);
      const hint  = document.getElementById(inputId + 'Hint');
      const wrap  = document.getElementById(inputId + 'Counter');
      const btnMinus = document.getElementById(inputId + 'Minus');
      const btnPlus  = document.getElementById(inputId + 'Plus');

      if (!input) return;

      input.value = min;
      input.min = min;

      if (fixed) {
        if (btnMinus) btnMinus.disabled = true;
        if (btnPlus)  btnPlus.disabled  = true;
        if (hint) {
          hint.textContent = `Fixed at ${min} page${min > 1 ? 's' : ''} — included in package`;
          hint.className = 'page-counter-hint hint-fixed';
        }
        if (wrap) wrap.className = 'page-counter';
      } else {
        if (btnMinus) btnMinus.disabled = true;
        if (btnPlus)  btnPlus.disabled  = false;
        if (hint) {
          hint.textContent = `${min}–${max} pages included • beyond ${max}: +₱${pkg.pricePerPage.toLocaleString()}/page`;
          hint.className = 'page-counter-hint hint-included';
        }
        if (wrap) wrap.className = 'page-counter';
      }

      updateInvoice();
    }

    function adjustPages(inputId, delta) {
      if (!selectedPackage || !selectedCategory) return;
      const pkg = servicePackages[selectedCategory][selectedPackage];

      const min = pkg.minPages || 1;
      const max = pkg.maxPages || 999;
      const input = document.getElementById(inputId);
      const hint  = document.getElementById(inputId + 'Hint');
      const wrap  = document.getElementById(inputId + 'Counter');
      const btnMinus = document.getElementById(inputId + 'Minus');
      const btnPlus  = document.getElementById(inputId + 'Plus');

      if (!input) return;

      let current = parseInt(input.value) || min;
      current = Math.max(min, current + delta);

      input.value = current;

      if (btnMinus) btnMinus.disabled = (current <= min);

      if (current < min) {
        if (hint) { hint.textContent = `Minimum is ${min} pages`; hint.className = 'page-counter-hint hint-extra'; }
        if (wrap) wrap.className = 'page-counter';
      } else if (current <= max) {
        const remaining = max - current;
        if (remaining === 0) {
          if (hint) { hint.textContent = `At package maximum (${max} pages) — extra pages cost ₱${pkg.pricePerPage.toLocaleString()}/page`; hint.className = 'page-counter-hint hint-extra'; }
          if (wrap) wrap.className = 'page-counter at-max';
        } else {
          if (hint) { hint.textContent = `${current} page${current>1?'s':''} • ${remaining} more included free`; hint.className = 'page-counter-hint hint-included'; }
          if (wrap) wrap.className = 'page-counter';
        }
      } else {
        const over = current - max;
        const overCost = over * pkg.pricePerPage;
        if (hint) { hint.textContent = `${over} extra page${over>1?'s':''} beyond package → +₱${overCost.toLocaleString()} added to invoice`; hint.className = 'page-counter-hint hint-overage'; }
        if (wrap) wrap.className = 'page-counter over-max';
      }

      updateInvoice();
    }

    function updatePageCount(inputId) {
      adjustPages(inputId, 0);
    }

    // Map category → service type label and icon
    const categoryServiceMap = {
      maintenance:    { type: 'web-development', label: '🌐 Web Development', badgeText: '🌐 WEB DEVELOPMENT' },
      onePage:        { type: 'web-development', label: '🌐 Web Development', badgeText: '🌐 WEB DEVELOPMENT' },
      noMaintenance:  { type: 'web-development', label: '🌐 Web Development', badgeText: '🌐 WEB DEVELOPMENT' },
      appDesign:      { type: 'app-design',       label: '📱 App Design',      badgeText: '📱 APP DESIGN' },
      uiuxDesign:     { type: 'ui-ux-design',     label: '🧩 UI/UX Design',    badgeText: '🧩 UI/UX DESIGN' },
      manager:        { type: '',                 label: '🔧 Maintenance',     badgeText: '🔧 WEBSITE MANAGER' },
      renewal:        { type: '',                 label: '📅 Renewal',         badgeText: '📅 ANNUAL RENEWAL' },
      logoDesign:     { type: 'logo-design',      label: '🎨 Logo Design',     badgeText: '🎨 LOGO DESIGN' },
      videoAds:       { type: 'video-ads',        label: '🎬 Video Ads',       badgeText: '🎬 VIDEO ADS' }
    };

    function selectService(category, packageKey) {
      selectedCategory = category;
      selectedPackage = packageKey;

      document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
      const selectedCard = document.querySelector(`[data-category="${category}"][data-key="${packageKey}"]`);
      if (selectedCard) selectedCard.classList.add('selected');

      const mapping = categoryServiceMap[category] || { type: '', badgeText: '⚙️ Service Selected' };
      activeServiceType = mapping.type;

      document.getElementById('serviceTypeBadge').textContent = mapping.badgeText;

      document.getElementById('customizationPanel').style.display = 'block';
      document.getElementById('invoiceSection').style.display = 'block';

      const allPanels = [
        'appDesignOptions','webDesignOptions','webDevOptions','uiuxOptions',
        'logoDesignOptions','videoAdsOptions','bizQuestionnaire','projectDetailsSection'
      ];
      allPanels.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });

      if (activeServiceType === 'logo-design') {
        document.getElementById('logoDesignOptions').style.display = 'block';

      } else if (activeServiceType === 'video-ads') {
        document.getElementById('videoAdsOptions').style.display = 'block';

      } else if (activeServiceType === 'app-design') {
        document.getElementById('appDesignOptions').style.display = 'block';
        document.getElementById('bizQuestionnaire').style.display = 'block';
        document.getElementById('projectDetailsSection').style.display = 'block';

      } else if (activeServiceType === 'web-design') {
        document.getElementById('webDesignOptions').style.display = 'block';
        document.getElementById('bizQuestionnaire').style.display = 'block';
        document.getElementById('projectDetailsSection').style.display = 'block';
        initPageCounter('numPages');

      } else if (activeServiceType === 'web-development') {
        document.getElementById('webDevOptions').style.display = 'block';
        document.getElementById('bizQuestionnaire').style.display = 'block';
        document.getElementById('projectDetailsSection').style.display = 'block';
        initPageCounter('numPagesdev');

      } else if (activeServiceType === 'ui-ux-design') {
        document.getElementById('uiuxOptions').style.display = 'block';
        document.getElementById('bizQuestionnaire').style.display = 'block';
        document.getElementById('projectDetailsSection').style.display = 'block';

      } else {
        document.getElementById('projectDetailsSection').style.display = 'block';
      }

      prevInvoiceKeys = new Set();

      updateInvoice();
      document.getElementById('customizationPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // =================== EDITABLE CLIENT NAME ===================
    function syncClientName() { /* input is the direct source of truth */ }

    function syncInvoiceEmail() {
      const val = document.getElementById('invoiceEmailInput').value;
      const settingsEmail = document.getElementById('profileEmail');
      if (settingsEmail && !settingsEmail.dataset.userEdited) {
        settingsEmail.value = val;
      }
    }

    function syncInvoiceEmailFromSettings() {
      const profileEmail = document.getElementById('profileEmail');
      if (profileEmail) { const inv = document.getElementById('invoiceEmailInput'); if (inv) inv.value = profileEmail.value; return; }
      const val = document.getElementById('profileEmail').value;
      const invoiceEmail = document.getElementById('invoiceEmailInput');
      if (invoiceEmail) invoiceEmail.value = val;
      document.getElementById('profileEmail').dataset.userEdited = 'true';
    }

    function syncInvoicePhone() {
      const code = document.getElementById('invoicePhoneCode').value;
      const num = document.getElementById('invoicePhoneNumber').value;
      const settingsCode = document.getElementById('phoneCode');
      const settingsNum = document.getElementById('phoneNumber');
      if (settingsCode) settingsCode.value = code;
      if (settingsNum) settingsNum.value = num;
    }

    function syncSettingsPhoneToInvoice() {
      const code = document.getElementById('phoneCode').value;
      const num = document.getElementById('phoneNumber').value;
      const invCode = document.getElementById('invoicePhoneCode');
      const invNum = document.getElementById('invoicePhoneNumber');
      if (invCode) invCode.value = code;
      if (invNum) invNum.value = num;
    }

    function getFullWhatsApp() {
      const code = document.getElementById('invoicePhoneCode')?.value || '';
      const num = document.getElementById('invoicePhoneNumber')?.value || '';
      return num ? `${code}${num.replace(/\s/g, '')}` : '';
    }

    // =================== COUNTRY PHONE CODES ===================
    const PHONE_COUNTRIES = [
      { code: '+1',    flag: '🇺🇸', name: 'US/Canada',       abbr: 'US' },
      { code: '+44',   flag: '🇬🇧', name: 'United Kingdom',   abbr: 'GB' },
      { code: '+63',   flag: '🇵🇭', name: 'Philippines',      abbr: 'PH' },
      { code: '+39',   flag: '🇮🇹', name: 'Italy',            abbr: 'IT' },
      { code: '+48',   flag: '🇵🇱', name: 'Poland',           abbr: 'PL' },
      { code: '+61',   flag: '🇦🇺', name: 'Australia',        abbr: 'AU' },
      { code: '+1',    flag: '🇨🇦', name: 'Canada',           abbr: 'CA' },
      { code: '+65',   flag: '🇸🇬', name: 'Singapore',        abbr: 'SG' },
      { code: '+91',   flag: '🇮🇳', name: 'India',            abbr: 'IN' },
      { code: '+86',   flag: '🇨🇳', name: 'China',            abbr: 'CN' },
      { code: '+81',   flag: '🇯🇵', name: 'Japan',            abbr: 'JP' },
      { code: '+82',   flag: '🇰🇷', name: 'South Korea',      abbr: 'KR' },
      { code: '+49',   flag: '🇩🇪', name: 'Germany',          abbr: 'DE' },
      { code: '+33',   flag: '🇫🇷', name: 'France',           abbr: 'FR' },
      { code: '+34',   flag: '🇪🇸', name: 'Spain',            abbr: 'ES' },
      { code: '+31',   flag: '🇳🇱', name: 'Netherlands',      abbr: 'NL' },
      { code: '+46',   flag: '🇸🇪', name: 'Sweden',           abbr: 'SE' },
      { code: '+47',   flag: '🇳🇴', name: 'Norway',           abbr: 'NO' },
      { code: '+45',   flag: '🇩🇰', name: 'Denmark',          abbr: 'DK' },
      { code: '+358',  flag: '🇫🇮', name: 'Finland',          abbr: 'FI' },
      { code: '+7',    flag: '🇷🇺', name: 'Russia',           abbr: 'RU' },
      { code: '+55',   flag: '🇧🇷', name: 'Brazil',           abbr: 'BR' },
      { code: '+52',   flag: '🇲🇽', name: 'Mexico',           abbr: 'MX' },
      { code: '+54',   flag: '🇦🇷', name: 'Argentina',        abbr: 'AR' },
      { code: '+56',   flag: '🇨🇱', name: 'Chile',            abbr: 'CL' },
      { code: '+57',   flag: '🇨🇴', name: 'Colombia',         abbr: 'CO' },
      { code: '+971',  flag: '🇦🇪', name: 'UAE',              abbr: 'AE' },
      { code: '+966',  flag: '🇸🇦', name: 'Saudi Arabia',     abbr: 'SA' },
      { code: '+20',   flag: '🇪🇬', name: 'Egypt',            abbr: 'EG' },
      { code: '+27',   flag: '🇿🇦', name: 'South Africa',     abbr: 'ZA' },
      { code: '+234',  flag: '🇳🇬', name: 'Nigeria',          abbr: 'NG' },
      { code: '+254',  flag: '🇰🇪', name: 'Kenya',            abbr: 'KE' },
      { code: '+62',   flag: '🇮🇩', name: 'Indonesia',        abbr: 'ID' },
      { code: '+60',   flag: '🇲🇾', name: 'Malaysia',         abbr: 'MY' },
      { code: '+66',   flag: '🇹🇭', name: 'Thailand',         abbr: 'TH' },
      { code: '+84',   flag: '🇻🇳', name: 'Vietnam',          abbr: 'VN' },
      { code: '+880',  flag: '🇧🇩', name: 'Bangladesh',       abbr: 'BD' },
      { code: '+92',   flag: '🇵🇰', name: 'Pakistan',         abbr: 'PK' },
      { code: '+94',   flag: '🇱🇰', name: 'Sri Lanka',        abbr: 'LK' },
      { code: '+64',   flag: '🇳🇿', name: 'New Zealand',      abbr: 'NZ' },
      { code: '+41',   flag: '🇨🇭', name: 'Switzerland',      abbr: 'CH' },
      { code: '+43',   flag: '🇦🇹', name: 'Austria',          abbr: 'AT' },
      { code: '+32',   flag: '🇧🇪', name: 'Belgium',          abbr: 'BE' },
      { code: '+351',  flag: '🇵🇹', name: 'Portugal',         abbr: 'PT' },
      { code: '+30',   flag: '🇬🇷', name: 'Greece',           abbr: 'GR' },
      { code: '+380',  flag: '🇺🇦', name: 'Ukraine',          abbr: 'UA' },
      { code: '+90',   flag: '🇹🇷', name: 'Turkey',           abbr: 'TR' },
      { code: '+98',   flag: '🇮🇷', name: 'Iran',             abbr: 'IR' },
      { code: '+972',  flag: '🇮🇱', name: 'Israel',           abbr: 'IL' },
      { code: '+852',  flag: '🇭🇰', name: 'Hong Kong',        abbr: 'HK' },
      { code: '+886',  flag: '🇹🇼', name: 'Taiwan',           abbr: 'TW' },
    ];

    function populatePhoneDropdowns() {
      const selects = ['invoicePhoneCode', 'phoneCode'];
      selects.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = PHONE_COUNTRIES.map(c =>
          `<option value="${c.code}" data-abbr="${c.abbr}">${c.flag} ${c.abbr} ${c.code}</option>`
        ).join('');
        el.value = '+63';
      });
    }

    // =================== SERVICE TYPE CHANGE ===================
    function onServiceTypeChange() {
      updateInvoice();
    }

    // =================== INVOICE GENERATION ===================
    function updateInvoice() {
      if (!selectedPackage || !selectedCategory) return;

      const pkg = servicePackages[selectedCategory][selectedPackage];
      const serviceType = activeServiceType;

      let total = pkg.price;
      const items = [];

      items.push({
        description: `${pkg.name}${pkg.basePages > 0 ? ` (${pkg.basePages} pages)` : ''}`,
        amount: pkg.price
      });

      if (selectedCategory === 'manager' || selectedCategory === 'renewal') {
        renderInvoice(items, total);
        return;
      }

      if (bizSelections.type.length > 0) {
        items.push({ description: `Business Type: ${bizSelections.type.join(', ')}`, amount: 0 });
      }
      if (bizSelections.goal.length > 0) {
        items.push({ description: `Goals: ${bizSelections.goal.join(', ')}`, amount: 0 });
      }
      if (bizSelections.stage.length > 0) {
        items.push({ description: `Stage: ${bizSelections.stage[0]}`, amount: 0 });
      }

      // ── APP DESIGN ──
      if (serviceType === 'app-design') {
        const platform = document.getElementById('appPlatform');
        if (platform && platform.value) {
          const extra = parseInt(platform.options[platform.selectedIndex].dataset.extra || 0);
          items.push({ description: `Platform: ${platform.value}`, amount: extra });
          total += extra;
        }
        const category = document.getElementById('appCategory');
        if (category && category.value) items.push({ description: `App Category: ${category.value}`, amount: 0 });
        const screens = document.getElementById('appScreens');
        if (screens && screens.value) items.push({ description: `Screens: ${screens.value}`, amount: 0 });
        const proto = document.getElementById('appPrototype');
        if (proto && proto.value && proto.value !== 'none') {
          const extra = parseInt(proto.options[proto.selectedIndex].dataset.extra || 0);
          if (extra > 0) { items.push({ description: `Prototype: ${proto.value}`, amount: extra }); total += extra; }
          else if (proto.value) { items.push({ description: `Prototype: ${proto.value}`, amount: 0 }); }
        }
        [['app-branding','Branding / Logo Integration'],['app-darkmode','Dark Mode Version'],['app-icon','App Icon Design'],['app-onboarding','Onboarding Screens'],['app-designsystem','Design System / Style Guide'],['app-splash','Splash Screen Design']].forEach(([id, label]) => {
          const cb = document.getElementById(id);
          if (cb && cb.checked) { const p = parseInt(cb.dataset.price||0); items.push({description:label,amount:p}); total+=p; }
        });

      // ── WEB DESIGN ──
      } else if (serviceType === 'web-design') {
        const wdType = document.getElementById('wdType');
        if (wdType && wdType.value) items.push({ description: `Website Type: ${wdType.value}`, amount: 0 });

        const numPages = parseInt(document.getElementById('numPages').value) || pkg.minPages || pkg.basePages;
        const maxPg = pkg.maxPages || pkg.basePages;

        if (numPages <= maxPg) {
          items.push({ description: `Pages: ${numPages} of ${maxPg} included`, amount: 0 });
        } else {
          const extra = numPages - maxPg;
          const extraCost = extra * pkg.pricePerPage;
          items.push({ description: `Pages: ${maxPg} included in package`, amount: 0 });
          items.push({ description: `Extra Pages: ${extra} × ₱${pkg.pricePerPage.toLocaleString()} (beyond package max)`, amount: extraCost });
          total += extraCost;
        }
        [['wd-responsive','Mobile Responsive Design'],['wd-illustrations','Custom Illustrations'],['wd-logo','Logo Design'],['wd-motion','Animated / Motion Elements'],['wd-brandguide','Brand Style Guide'],['wd-darkmode','Dark Mode Design'],['wd-prototype','Clickable Prototype'],['wd-socialmedia','Social Media Kit']].forEach(([id, label]) => {
          const cb = document.getElementById(id);
          if (cb && cb.checked) { const p = parseInt(cb.dataset.price||0); items.push({description:label,amount:p}); total+=p; }
        });

      // ── WEB DEVELOPMENT ──
      } else if (serviceType === 'web-development') {
        const stack = document.getElementById('devStack');
        if (stack && stack.value) {
          const extra = parseInt(stack.options[stack.selectedIndex].dataset.extra || 0);
          items.push({ description: `Tech Stack: ${stack.value}`, amount: extra });
          total += extra;
        }
        const numPagesdev = parseInt(document.getElementById('numPagesdev').value) || pkg.minPages || pkg.basePages;
        const maxPgDev = pkg.maxPages || pkg.basePages;

        if (numPagesdev <= maxPgDev) {
          items.push({ description: `Pages: ${numPagesdev} of ${maxPgDev} included`, amount: 0 });
        } else {
          const extra = numPagesdev - maxPgDev;
          const extraCost = extra * pkg.pricePerPage;
          items.push({ description: `Pages: ${maxPgDev} included in package`, amount: 0 });
          items.push({ description: `Extra Pages: ${extra} × ₱${pkg.pricePerPage.toLocaleString()} (beyond package max)`, amount: extraCost });
          total += extraCost;
        }
        const maint = document.getElementById('devMaintenance');
        if (maint && maint.value && maint.value !== 'none') {
          const extra = parseInt(maint.options[maint.selectedIndex].dataset.extra || 0);
          items.push({ description: `Maintenance Plan: ${maint.value}`, amount: extra });
          total += extra;
        }
        [['dev-ecommerce','E-Commerce / Online Store'],['dev-cms','CMS Integration'],['dev-forms','Contact Form / Email Setup'],['dev-seo','SEO Optimization'],['dev-analytics','Analytics Integration'],['dev-ssl','SSL Certificate'],['dev-backup','Automated Backups'],['dev-hosting','Hosting & Domain Setup'],['dev-livechat','Live Chat Integration'],['dev-social','Social Media Integration'],['dev-speed','Speed Optimization']].forEach(([id, label]) => {
          const cb = document.getElementById(id);
          if (cb && cb.checked) { const p = parseInt(cb.dataset.price||0); items.push({description:label,amount:p}); total+=p; }
        });

      // ── UI/UX DESIGN ──
      } else if (serviceType === 'ui-ux-design') {
        const projectType = document.getElementById('uxProjectType');
        if (projectType && projectType.value) items.push({ description: `Project Type: ${projectType.value}`, amount: 0 });
        const deliverable = document.getElementById('uxDeliverable');
        if (deliverable && deliverable.value) {
          const extra = parseInt(deliverable.options[deliverable.selectedIndex].dataset.extra || 0);
          items.push({ description: `Deliverable: ${deliverable.value}`, amount: extra });
          total += extra;
        }
        const fidelity = document.getElementById('uxFidelity');
        if (fidelity && fidelity.value) items.push({ description: `Fidelity: ${fidelity.value}`, amount: 0 });
        const screens = document.getElementById('uxScreens');
        if (screens && screens.value) items.push({ description: `Screens: ${screens.value}`, amount: 0 });
        [['ux-research','User Research & Personas'],['ux-journey','User Journey Mapping'],['ux-ia','Information Architecture'],['ux-usability','Usability Testing Plan'],['ux-accessibility','Accessibility Audit (WCAG)'],['ux-microinteraction','Micro-Interaction Design'],['ux-handoff','Developer Handoff / Specs'],['ux-brand','Brand Integration']].forEach(([id, label]) => {
          const cb = document.getElementById(id);
          if (cb && cb.checked) { const p = parseInt(cb.dataset.price||0); items.push({description:label,amount:p}); total+=p; }
        });

      // ── LOGO DESIGN ──
      } else if (activeServiceType === 'logo-design') {
        const bizName   = (document.getElementById('logoBizName')?.value || '').trim();
        const industry  = (document.getElementById('logoBizIndustry')?.value || '').trim();
        const colors    = (document.getElementById('logoColorScheme')?.value || '').trim();
        const deadline  = (document.getElementById('logoDeadline')?.value || '');
        if (bizName)   items.push({ description: `Business Name: ${bizName}`, amount: 0 });
        if (industry)  items.push({ description: `Industry: ${industry}`, amount: 0 });
        if (colors)    items.push({ description: `Color Scheme: ${colors}`, amount: 0 });
        if (deadline)  items.push({ description: `Deadline: ${deadline}`, amount: 0 });

      // ── VIDEO ADS ──
      } else if (activeServiceType === 'video-ads') {
        const bizName   = (document.getElementById('videoBizName')?.value || '').trim();
        const industry  = (document.getElementById('videoBizIndustry')?.value || '').trim();
        const colors    = (document.getElementById('videoColorScheme')?.value || '').trim();
        const formats   = Array.from(document.querySelectorAll('#videoFormats input:checked')).map(i=>i.value);
        const res       = (document.getElementById('videoResolution')?.value || '');
        const duration  = (document.getElementById('videoDuration')?.value || '');
        const deadline  = (document.getElementById('videoDeadline')?.value || '');
        if (bizName)          items.push({ description: `Business Name: ${bizName}`, amount: 0 });
        if (industry)         items.push({ description: `Industry: ${industry}`, amount: 0 });
        if (colors)           items.push({ description: `Color Scheme: ${colors}`, amount: 0 });
        if (formats.length)   items.push({ description: `File Format: ${formats.join(', ')}`, amount: 0 });
        if (res)              items.push({ description: `Resolution: ${res}`, amount: 0 });
        if (duration)         items.push({ description: `Duration: ${duration}`, amount: 0 });
        if (deadline)         items.push({ description: `Deadline: ${deadline}`, amount: 0 });

      // ── GENERIC fallback ──
      } else {
        const numPages = parseInt((document.getElementById('numPages') || {}).value || 0) || pkg.basePages;
        if (numPages > pkg.basePages) {
          const extra = (numPages - pkg.basePages) * pkg.pricePerPage;
          items.push({ description: `Additional Pages (${numPages - pkg.basePages} × ₱${pkg.pricePerPage.toLocaleString()})`, amount: extra });
          total += extra;
        }
      }

      renderInvoice(items, total);
    }

    function renderInvoice(items, total) {
      const invoiceItemsEl = document.getElementById('invoiceItems');
      const currentKeys = new Set(items.map(i => i.description));

      const totalUSD = convertPHPToUSD(total);

      invoiceItemsEl.innerHTML = items.map(item => {
        const isNew = !prevInvoiceKeys.has(item.description);
        const rowClass = isNew ? 'invoice-row-new' : '';
        const itemAmountUSD = convertPHPToUSD(item.amount);

        return `
          <tr class="${rowClass}">
            <td>${item.description}</td>
            <td style="text-align: right; font-weight: 600; color: ${item.amount === 0 ? '#9ca3af' : '#fff'};">
              ${item.amount === 0 ? 'Included' : formatPrice(itemAmountUSD)}
            </td>
          </tr>
        `;
      }).join('');

      prevInvoiceKeys = currentKeys;

      const totalEl = document.getElementById('totalAmount');
      totalEl.textContent = formatPrice(totalUSD);
      totalEl.classList.remove('total-updating');
      void totalEl.offsetWidth;
      totalEl.classList.add('total-updating');

      document.getElementById('invoiceDate').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      document.getElementById('invoiceNumber').textContent = 'NGCS-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
    }

    // =================== ORDER SUBMISSION ===================
    async function submitOrder(event) {
      if (!selectedPackage || !selectedCategory) {
        alert('Please select a service package first.');
        return;
      }

      const isManagerOrRenewal = selectedCategory === 'manager' || selectedCategory === 'renewal';

      if (!isManagerOrRenewal && !activeServiceType) {
        alert('Please select a service package first.');
        return;
      }

      if (activeServiceType === 'web-design' && !document.getElementById('numPages').value) {
        alert('Please enter the Number of Pages for Web Design.');
        return;
      }

      if (activeServiceType === 'web-development' && !document.getElementById('numPagesdev').value) {
        alert('Please enter the Number of Pages for Web Development.');
        return;
      }

      const orderData = collectOrderData();

      const btn = document.getElementById('placeOrderBtn');
      btn.textContent = '⏳ Sending Order...';
      btn.disabled = true;

      const orderDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      const itemsList = (() => {
        const rows = document.querySelectorAll('#invoiceItems tr');
        let lines = '';
        rows.forEach(row => {
          const cols = row.querySelectorAll('td');
          if (cols.length === 2) lines += `  • ${cols[0].textContent.trim()} — ${cols[1].textContent.trim()}\n`;
        });
        return lines;
      })();

      const emailParams = {
        email:      'nexgenixcreativesolutions@gmail.com',
        from_name:  orderData.clientName,
        reply_to:   orderData.clientEmail || 'nexgenixcreativesolutions@gmail.com',
        subject:    `New Order — ${orderData.invoiceNumber} | ${orderData.clientName}`,
        client_name:  orderData.clientName,
        client_email: orderData.clientEmail || '',
        message:
`📦 NEW ORDER RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Invoice #:    ${orderData.invoiceNumber}
Date:         ${orderDate}

CLIENT DETAILS
Name:         ${orderData.clientName}
Email:        ${orderData.clientEmail || 'N/A'}
WhatsApp:     ${orderData.clientPhone || 'N/A'}

ORDER DETAILS
Package:      ${orderData.packageName}
Service Type: ${activeServiceType || 'N/A'}
Currency:     ${currentCurrency}

Items:
${itemsList}
TOTAL:        ${orderData.totalAmount}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTION REQUIRED: Follow up with client to confirm and process payment.
Reply-to client at: ${orderData.clientEmail || 'N/A'}`,

        auto_reply_message:
`Dear ${orderData.clientName},

Thank you for placing your order with Nex Genix Creative Solutions! 🎉
We have received your request and will be in touch shortly to confirm details and arrange payment.

ORDER SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Invoice #:    ${orderData.invoiceNumber}
Package:      ${orderData.packageName}
Service Type: ${activeServiceType || 'N/A'}
Total Amount: ${orderData.totalAmount} (${currentCurrency})
Date:         ${orderDate}

Items Ordered:
${itemsList}
Payment Terms: 50% downpayment to start · 50% upon completion
Payment Methods: GCash · Bank Transfer · PayMaya · PayPal · Stripe
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you have any questions, feel free to reply to this email.

Best regards,
Nex Genix Creative Solutions
nexgenixcreativesolutions@gmail.com`
      };

      try {
        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceID,
          EMAILJS_CONFIG.adminTemplateID,
          emailParams,
          EMAILJS_CONFIG.publicKey
        );
        console.log('Order notification sent:', response);

        btn.textContent = '✅ Order Placed!';
        btn.style.background = 'linear-gradient(135deg, rgba(57,255,20,0.3), rgba(57,255,20,0.15))';
        btn.style.borderColor = 'var(--neon)';
        btn.style.color = 'var(--neon)';
        btn.disabled = true;
        document.getElementById('orderSuccessBanner').style.display = 'block';
        document.getElementById('newPurchaseBtn').style.display = 'block';
        document.getElementById('orderSuccessBanner').scrollIntoView({ behavior: 'smooth', block: 'center' });

      } catch (error) {
        console.error('EmailJS Error:', error);

        const subject = encodeURIComponent(`New Order - ${orderData.invoiceNumber}`);
        const body = encodeURIComponent(`
Order Details:
━━━━━━━━━━━━━━━━━━
Client: ${orderData.clientName}
Package: ${orderData.packageName}
Total Amount: ${orderData.totalAmount}
Currency: ${currentCurrency}
Invoice #: ${orderData.invoiceNumber}
Date: ${new Date().toLocaleDateString()}

Please contact this client to process their order.

Full order details:
${JSON.stringify(orderData, null, 2)}
        `);

        const mailto = `mailto:nexgenixcreativesolutions@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailto, '_blank');

        btn.textContent = '⚠️ Retry — Send via Email';
        btn.disabled = false;
        btn.style.background = 'rgba(255,64,64,0.15)';
        btn.style.borderColor = 'var(--red)';
        btn.style.color = 'var(--red)';
      }
    }

    function startNewPurchase() {
      selectedPackage = null;
      selectedCategory = null;
      document.getElementById('invoiceSection').style.display = 'none';
      document.getElementById('orderSuccessBanner').style.display = 'none';
      document.getElementById('newPurchaseBtn').style.display = 'none';
      const btn = document.getElementById('placeOrderBtn');
      btn.textContent = '🛒 Place Order';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
    }

    function collectOrderData() {
      const pkg = servicePackages[selectedCategory][selectedPackage];

      const invoiceItems = [];
      const itemRows = document.querySelectorAll('#invoiceItems tr');
      itemRows.forEach(row => {
        const cols = row.querySelectorAll('td');
        if (cols.length === 2) {
          invoiceItems.push({
            description: cols[0].textContent.trim(),
            amount: cols[1].textContent.trim()
          });
        }
      });

      return {
        invoiceNumber: document.getElementById('invoiceNumber').textContent,
        clientName: document.getElementById('clientNameInput').value,
        clientEmail: document.getElementById('invoiceEmailInput').value || document.getElementById('profileEmail').value,
        clientPhone: getFullWhatsApp(),
        packageName: pkg.name,
        packagePrice: formatPrice(convertPHPToUSD(pkg.price)),
        category: selectedCategory,
        serviceType: activeServiceType,
        totalAmount: document.getElementById('totalAmount').textContent,
        currency: currentCurrency,
        invoiceItems: invoiceItems,
        timestamp: new Date().toISOString()
      };
    }

    async function downloadInvoice() {
      if (!selectedPackage || !selectedCategory) {
        alert('Please select a service package first.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const W = 210, H = 297;
      const margin = 14;
      const contentW = W - margin * 2;

      const C = {
        bg:          [6,   8,  14],
        surface:     [13,  18,  28],
        surface2:    [20,  28,  42],
        neon:        [57, 255,  20],
        neonDim:     [22, 163,  74],
        yellow:      [232,212,  77],
        white:       [255,255, 255],
        light:       [200,210, 220],
        muted:       [120,130, 145],
        border:      [35,  50,  70],
        red:         [255,  80,  80],
        rowEven:     [16,  22,  34],
        rowOdd:      [11,  16,  26],
      };

      const invNum      = document.getElementById('invoiceNumber')?.textContent || 'NGCS-' + Date.now();
      const invDate     = document.getElementById('invoiceDate')?.textContent   || new Date().toLocaleDateString();
      const clientName  = document.getElementById('clientNameInput')?.value     || 'Valued Client';
      const clientEmail = document.getElementById('invoiceEmailInput')?.value   || '';
      const pkg         = servicePackages[selectedCategory][selectedPackage];
      const totalText   = document.getElementById('totalAmount')?.textContent   || formatPrice(convertPHPToUSD(pkg.price));
      const currSymbol  = currencySymbols[currentCurrency] || '$';
      const currLabel   = currentCurrency;

      const rows = [];
      document.querySelectorAll('#invoiceItems tr').forEach(tr => {
        const cols = tr.querySelectorAll('td');
        if (cols.length === 2) rows.push({
          desc:   cols[0].textContent.trim(),
          amount: cols[1].textContent.trim()
        });
      });

      let y = 0;

      const fillRound = (x, ry, w, h, r, color) => {
        doc.setFillColor(...color);
        doc.roundedRect(x, ry, w, h, r, r, 'F');
      };
      const fillRect = (x, ry, w, h, color) => {
        doc.setFillColor(...color);
        doc.rect(x, ry, w, h, 'F');
      };
      const txt = (text, x, ry, opts = {}) => {
        doc.text(String(text), x, ry, opts);
      };

      // 1. BACKGROUND
      fillRect(0, 0, W, H, C.bg);

      // 2. HEADER
      const headerH = 42;
      fillRect(0, 0, W, headerH, C.surface);
      fillRect(0, headerH - 1, W, 1.5, C.neon);

      const logoBaseUrl = 'https://nexgenixcreativesolutions.github.io/assets/images/';
      const logoUrls = [logoBaseUrl + 'logo.png', logoBaseUrl + 'dashboard-logo-no-bg.png'];

      const loadImg = (url) => new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.width; c.height = img.height;
          c.getContext('2d').drawImage(img, 0, 0);
          resolve(c.toDataURL('image/png'));
        };
        img.onerror = () => resolve(null);
        img.src = url;
        setTimeout(() => resolve(null), 3000);
      });

      const [logo1, logo2] = await Promise.all(logoUrls.map(loadImg));
      const logoH = 18;

      let logoX = margin;
      if (logo1) { doc.addImage(logo1, 'PNG', logoX, (headerH - logoH) / 2, 28, logoH); logoX += 32; }
      if (logo2) { doc.addImage(logo2, 'PNG', logoX, (headerH - logoH) / 2, 40, logoH); logoX += 44; }

      doc.setTextColor(...C.neon);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setCharSpace(2.5);
      if (!logo1 && !logo2) {
        doc.setFontSize(14);
        doc.setCharSpace(0);
        txt('NEX GENIX CREATIVE SOLUTIONS', margin, 22);
      }
      doc.setCharSpace(0);

      doc.setDrawColor(...C.neon);
      doc.setLineWidth(0.8);
      doc.roundedRect(W - 50, 8, 34, 10, 2, 2, 'D');
      doc.setTextColor(...C.neon);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setCharSpace(1.5);
      txt('INVOICE', W - 33, 14.5, { align: 'center' });
      doc.setCharSpace(0);

      doc.setTextColor(...C.muted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      txt('# ' + invNum, W - 33, 22, { align: 'center' });

      // 3. META ROW
      y = headerH + 1;
      const metaH = 22;
      fillRect(0, y, W, metaH, C.surface2);
      fillRect(0, y + metaH - 0.5, W, 0.5, C.border);

      const metaCells = [
        { label: 'INVOICE NO',  value: invNum },
        { label: 'DATE',        value: invDate },
        { label: 'STATUS',      value: '⏳ PENDING' },
        { label: 'CURRENCY',    value: currSymbol + ' ' + currLabel },
      ];
      const cellW = contentW / 4;
      metaCells.forEach((cell, i) => {
        const cx = margin + i * cellW;
        doc.setTextColor(...C.muted);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setCharSpace(0.8);
        txt(cell.label, cx + cellW / 2, y + 7, { align: 'center' });
        doc.setCharSpace(0);

        let valColor = C.neon;
        if (cell.label === 'STATUS') valColor = C.yellow;
        if (cell.label === 'CURRENCY') valColor = C.light;

        doc.setTextColor(...valColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        txt(cell.value, cx + cellW / 2, y + 15, { align: 'center' });

        if (i < 3) {
          doc.setDrawColor(...C.border);
          doc.setLineWidth(0.3);
          doc.line(margin + (i + 1) * cellW, y + 3, margin + (i + 1) * cellW, y + metaH - 3);
        }
      });

      // 4. BILL TO / ISSUED BY
      y += metaH + 5;
      const cardH = 34;
      const cardW = (contentW - 6) / 2;

      fillRound(margin, y, cardW, cardH, 3, C.surface);
      doc.setDrawColor(...C.neonDim);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, cardW, cardH, 3, 3, 'D');
      fillRound(margin, y, cardW, 9, 3, C.neonDim);
      fillRect(margin, y + 5, cardW, 4, C.neonDim);
      doc.setTextColor(...C.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setCharSpace(1);
      txt('👤  BILL TO', margin + 6, y + 6);
      doc.setCharSpace(0);
      doc.setTextColor(...C.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      txt(clientName, margin + 6, y + 18);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...C.light);
      if (clientEmail) txt(clientEmail, margin + 6, y + 25);

      const ibX = margin + cardW + 6;
      fillRound(ibX, y, cardW, cardH, 3, C.surface);
      doc.setDrawColor(...C.border);
      doc.setLineWidth(0.5);
      doc.roundedRect(ibX, y, cardW, cardH, 3, 3, 'D');
      fillRound(ibX, y, cardW, 9, 3, C.surface2);
      fillRect(ibX, y + 5, cardW, 4, C.surface2);
      doc.setTextColor(...C.muted);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setCharSpace(1);
      txt('🏢  ISSUED BY', ibX + 6, y + 6);
      doc.setCharSpace(0);
      doc.setTextColor(...C.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      txt('Nex Genix Creative Solutions', ibX + 6, y + 18);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...C.neon);
      txt('nexgenixcreativesolutions@gmail.com', ibX + 6, y + 25);
      doc.setTextColor(...C.muted);
      txt('Philippines', ibX + 6, y + 31);

      // 5. ITEMS TABLE
      y += cardH + 6;
      fillRound(margin, y, contentW, 9, 2, C.surface2);
      fillRect(margin, y + 5, contentW, 4, C.surface2);
      doc.setDrawColor(...C.neon);
      doc.setLineWidth(0.5);
      doc.line(margin, y + 9, margin + contentW, y + 9);
      doc.setTextColor(...C.neon);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setCharSpace(0.8);
      txt('DESCRIPTION', margin + 5, y + 6);
      txt('AMOUNT', margin + contentW - 5, y + 6, { align: 'right' });
      doc.setCharSpace(0);
      y += 9;

      rows.forEach((row, i) => {
        const isZero     = row.amount === 'Included' || row.amount === '$0.00' || row.amount === '—' || row.amount === '';
        const splitDesc  = doc.splitTextToSize(row.desc, contentW - 55);
        const rowH       = Math.max(9, splitDesc.length * 5 + 4);

        fillRect(margin, y, contentW, rowH, i % 2 === 0 ? C.rowEven : C.rowOdd);
        fillRect(margin, y, 2, rowH, C.neon);

        doc.setTextColor(...C.light);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        txt(splitDesc, margin + 7, y + 6);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        if (isZero) {
          doc.setTextColor(...C.muted);
          txt('Included', margin + contentW - 5, y + 6, { align: 'right' });
        } else {
          doc.setTextColor(...C.neon);
          txt(row.amount, margin + contentW - 5, y + 6, { align: 'right' });
        }

        doc.setDrawColor(...C.border);
        doc.setLineWidth(0.2);
        doc.line(margin, y + rowH, margin + contentW, y + rowH);
        y += rowH;
      });

      // 6. TOTAL BOX
      y += 5;
      const totalBoxW = 90;
      const totalBoxH = 22;
      const totalBoxX = margin + contentW - totalBoxW;

      fillRound(totalBoxX, y, totalBoxW, totalBoxH, 3, C.surface2);
      doc.setDrawColor(...C.neon);
      doc.setLineWidth(0.8);
      doc.roundedRect(totalBoxX, y, totalBoxW, totalBoxH, 3, 3, 'D');
      doc.setTextColor(...C.muted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setCharSpace(0.8);
      txt('TOTAL AMOUNT DUE', totalBoxX + totalBoxW - 5, y + 7, { align: 'right' });
      doc.setCharSpace(0);
      doc.setTextColor(...C.neon);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      txt(totalText, totalBoxX + totalBoxW - 5, y + 18, { align: 'right' });
      doc.setTextColor(...C.muted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      txt(pkg.name, margin, y + 10);
      doc.setTextColor(...C.light);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      txt(clientName, margin, y + 18);

      // 7. PAYMENT INFO BOX
      y += totalBoxH + 6;
      const payH = 28;
      fillRound(margin, y, contentW, payH, 3, C.surface);
      doc.setDrawColor(...C.neonDim);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentW, payH, 3, 3, 'D');
      fillRound(margin, y, 3, payH, 2, C.neonDim);
      doc.setTextColor(...C.neon);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setCharSpace(0.8);
      txt('PAYMENT INFORMATION', margin + 8, y + 7);
      doc.setCharSpace(0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(...C.light);
      txt('Terms: 50% downpayment to start  ·  50% upon project completion', margin + 8, y + 14);
      doc.setTextColor(...C.muted);
      txt('Local: GCash  ·  Bank Transfer  ·  PayMaya', margin + 8, y + 20);
      txt('International: PayPal  ·  Stripe', margin + 8, y + 26);

      // 8. FOOTER
      const footY = H - 16;
      fillRect(0, footY - 3, W, 0.5, C.border);
      fillRect(0, footY - 3, W, 0.5, C.neon);
      doc.setTextColor(...C.muted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      txt('Thank you for choosing Nex Genix Creative Solutions!', W / 2, footY + 2, { align: 'center' });
      txt('nexgenixcreativesolutions@gmail.com  ·  Philippines', W / 2, footY + 7, { align: 'center' });
      doc.setTextColor(...C.border);
      doc.setFontSize(6.5);
      txt(`© ${new Date().getFullYear()} Nex Genix Creative Solutions. All Rights Reserved.`, W / 2, footY + 13, { align: 'center' });

      doc.save(`NexGenix_Invoice_${invNum.replace(/[^a-zA-Z0-9]/g,'_')}.pdf`);
    }

    // =================== USER PROFILE ===================
    async function saveProfile() {
      const displayName = document.getElementById('displayNameInput').value;
      const username = document.getElementById('usernameInput').value;
      const phoneCode = document.getElementById('phoneCode').value;
      const phoneNum = document.getElementById('phoneNumber').value;
      const fullPhone = phoneNum ? `${phoneCode}${phoneNum.replace(/\s/g,'')}` : '';

      syncSettingsPhoneToInvoice();
      alert('Profile updated successfully!' + (fullPhone ? `\nWhatsApp: ${fullPhone}` : ''));
    }

    async function updatePassword() {
      const newPassword = document.getElementById('passwordInput').value;
      if (!newPassword || newPassword.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      alert('Password updated successfully!');
      document.getElementById('passwordInput').value = '';
    }

    function logout() {
      window.location.href = 'https://nexgenixcreativesolutions.github.io/login-signup';
    }

    // =================== BOTTOM NAV ACTIVE STATE ===================
    function setBottomActive(el) {
      document.querySelectorAll('.bottom-nav-item').forEach(btn => btn.classList.remove('active'));
      el.classList.add('active');
    }

    // =================== SCROLL TO TOP ===================
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =================== PAYMENT METHOD ICON ===================
    function updateDurationLimit() {
      updateInvoice();
      if (!selectedCategory || !selectedPackage) return;
      const sel     = document.getElementById('videoDuration');
      const warning = document.getElementById('durationWarning');
      const maxLabel = document.getElementById('durationMaxLabel');
      if (!sel || !warning) return;
      const secMap = {
        '15 seconds': 15,
        '30 seconds': 30,
        '60 seconds (1 min)': 60,
        '90 seconds': 90,
        '120 seconds (2 min)': 120
      };
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

    function updatePaymentIcon() {
      const sel = document.getElementById('invPaymentMethod');
      if (!sel) return;
      const icons = { gcash: '🟢', bank: '🏦', maya: '🟣', paypal: '🔵', stripe: '⬛' };
      const icon = document.getElementById('invPayIcon');
      if (icon) icon.textContent = icons[sel.value] || '💳';
    }

    // =================== LOCALSTORAGE CLIENT INFO ===================
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

    // =================== MULTI-SELECT DROPDOWNS ===================
    function toggleMultiDrop(id) {
      const drop = document.getElementById(id);
      if (drop) drop.classList.toggle('open');
    }

    function updateMultiSelect(id) {
      updateInvoice();
    }

    // =================== PASSWORD TOGGLE ===================
    function togglePw(inputId) {
      const input = document.getElementById(inputId);
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
    }

    // =================== INITIALIZE ===================
    document.addEventListener('DOMContentLoaded', function() {
      createFloatingCodeBackground();
      loadServices();
      populatePhoneDropdowns();
      loadClientInfo();

      // Go to top button visibility
      window.addEventListener('scroll', () => {
        document.getElementById('goTopBtn').style.display = window.scrollY > 300 ? 'block' : 'none';
      });
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.addEventListener('scroll', () => {
          document.getElementById('goTopBtn').style.display = mainContent.scrollTop > 300 ? 'block' : 'none';
        });
      }

      // Set default user info
      document.getElementById('clientNameInput').value = 'Valued Client';
      document.getElementById('displayNameInput').value = 'Valued Client';
      document.getElementById('profileEmail').value = 'client@example.com';
      document.getElementById('invoiceEmailInput').value = 'client@example.com';

      // Sync settings phone to invoice whenever settings phone changes
      document.getElementById('phoneCode').addEventListener('change', syncSettingsPhoneToInvoice);
      document.getElementById('phoneNumber').addEventListener('input', syncSettingsPhoneToInvoice);

      // =================== DEFAULT ACTIVE TAB: SERVICES =================== 
      // The dashboard always opens on the "order" (Services) section.
      // Mark the Services bottom-nav button as active immediately on load
      // so the user always sees a green highlighted Services tab — whether
      // they arrived directly or were redirected from the digital services page.
      const servicesNavBtn = document.querySelector('.bottom-nav-item[onclick*="order"]');
      if (servicesNavBtn) setBottomActive(servicesNavBtn);

      // =================== URL PARAM: AUTO-SELECT SERVICE CATEGORY ===================
      // Reads ?service=web-design (or any valid type) from the URL
      // and automatically activates the correct filter tab on the dashboard.
      // This is triggered when redirected from the Digital Services page.
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get('service');

      if (serviceParam && serviceParam !== 'all') {
        // Make sure we're on the "New Website" order view (section ID is 'order')
        selectOrderType('new');

        // Show the order/services section — the correct section ID is 'order'
        showSection('order');

        // Find the matching filter tab by checking its onclick attribute
        const allTabs = document.querySelectorAll('.filter-tab');
        let matchedTab = null;
        allTabs.forEach(tab => {
          const onclickVal = tab.getAttribute('onclick') || '';
          if (onclickVal.includes(`'${serviceParam}'`) || onclickVal.includes(`"${serviceParam}"`)) {
            matchedTab = tab;
          }
        });

        if (matchedTab) {
          // Click the matching tab — this triggers filterByServiceType with the right button ref
          matchedTab.click();
        } else {
          // Fallback: call filterByServiceType directly
          const dummy = document.createElement('button');
          dummy.classList.add('filter-tab');
          filterByServiceType(serviceParam, dummy);
        }

        // Scroll the filter bar into view so the user immediately sees the filtered result
        const filterBar = document.getElementById('serviceFilterBar');
        if (filterBar) {
          setTimeout(() => {
            filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      }
    });

    // ── GLOBAL EXPORTS — ensure onclick= attributes can always reach these ──
    window.filterByServiceType         = filterByServiceType;
    window.selectOrderType             = selectOrderType;
    window.selectService               = selectService;
    window.showSection                 = showSection;
    window.toggleSidebar               = toggleSidebar;
    window.updateInvoice               = updateInvoice;
    window.adjustPages                 = adjustPages;
    window.updatePageCount             = updatePageCount;
    window.changeCurrencyFromDropdown  = changeCurrencyFromDropdown;
    window.submitOrder                 = submitOrder;
    window.downloadInvoice             = downloadInvoice;
    window.startNewPurchase            = startNewPurchase;
    window.saveClientInfo              = saveClientInfo;
    window.syncClientName              = syncClientName;
    window.syncInvoiceEmail            = syncInvoiceEmail;
    window.syncInvoicePhone            = syncInvoicePhone;
    window.syncInvoiceEmailFromSettings = syncInvoiceEmailFromSettings;
    window.updatePaymentIcon           = updatePaymentIcon;
    window.logout                      = logout;
    window.setBottomActive             = setBottomActive;
    window.scrollToTop                 = scrollToTop;
    window.updateDurationLimit         = updateDurationLimit;
    window.filterOrders                = typeof filterOrders === 'function' ? filterOrders : function(){};
    window.saveProfile                 = saveProfile;
    window.updatePassword              = updatePassword;
    window.toggleMultiDrop             = toggleMultiDrop;
    window.updateMultiSelect           = updateMultiSelect;
    window.togglePw                    = togglePw;
    window.toggleBizTag                = toggleBizTag;
    window.toggleFeature               = toggleFeature;
