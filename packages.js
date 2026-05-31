  (function(){
    /* ── Currency conversion ── */
    var PHP_RATE = 56.50;
    var RATES   = {USD:1,PHP:56.50,EUR:0.92,GBP:0.79,AUD:1.52,CAD:1.36,SGD:1.34,JPY:149.50,INR:83.10,CNY:7.24,MXN:17.15,BRL:4.97,KRW:1325,CHF:0.89,AED:3.67,SAR:3.75,PLN:3.98};
    var SYMBOLS = {USD:'$',PHP:'₱',EUR:'€',GBP:'£',AUD:'A$',CAD:'C$',SGD:'S$',JPY:'¥',INR:'₹',CNY:'¥',MXN:'MX$',BRL:'R$',KRW:'₩',CHF:'Fr',AED:'د.إ',SAR:'﷼',PLN:'zł'};
    var activeCurrency = 'USD';

    function phpToDisplay(php, cur) {
      cur = cur || activeCurrency;
      var usd = php / PHP_RATE;
      var val = usd * (RATES[cur] || 1);
      var sym = SYMBOLS[cur] || cur;
      if (cur === 'JPY' || cur === 'KRW') return sym + Math.round(val).toLocaleString();
      return sym + val.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
    }

    /* ── Package data (all prices in PHP) ── */
    var PACKAGES = {

      /* ── Multi-Page WITH Maintenance ── */
      maintenance: [
        {
          id: 'pkg-maint-basic',
          tier: 'Basic', name: 'BASIC — Starter Business',
          php: 18000, badge: null, coupon: true,
          features: [
            {text:'3–5 page website', yes:true},
            {text:'Mobile responsive', yes:true},
            {text:'Free domain (1 year)', yes:true},
            {text:'Hosting (1 year)', yes:true},
            {text:'1 professional email', yes:true},
            {text:'Ongoing maintenance', yes:true},
          ]
        },
        {
          id: 'pkg-maint-pro',
          tier: 'Pro', name: 'PRO — Growing Business',
          php: 26000, badge: 'Most Popular', coupon: true,
          features: [
            {text:'5–8 pages', yes:true},
            {text:'SQL database', yes:true},
            {text:'2 professional emails', yes:true},
            {text:'SEO optimization', yes:true},
            {text:'Monthly maintenance', yes:true},
          ]
        },
        {
          id: 'pkg-maint-premium',
          tier: 'Premium', name: 'PREMIUM — Corporate',
          php: 52500, badge: null, coupon: true,
          features: [
            {text:'8–12 pages custom UI/UX', yes:true},
            {text:'Advanced SQL & admin panel', yes:true},
            {text:'Multiple emails', yes:true},
            {text:'Priority support', yes:true},
            {text:'Dedicated Website Manager', yes:true},
          ]
        }
      ],

      /* ── 2-Page Fast Launch ── */
      onepage: [
        {
          id: 'pkg-two-starter',
          tier: 'Starter', name: 'TWO-PAGE Starter',
          php: 8000, badge: null, coupon: false,
          features: [
            {text:'2 pages, mobile responsive', yes:true},
            {text:'Basic UI design', yes:true},
            {text:'Contact form (email notification)', yes:true},
            {text:'FREE domain (1 year)', yes:true},
            {text:'Hosting (1 year)', yes:true},
            {text:'No maintenance', yes:false},
            {text:'No business email', yes:false},
          ]
        },
        {
          id: 'pkg-two-pro',
          tier: 'Pro', name: 'TWO-PAGE Pro',
          php: 9500, badge: 'Best Value', coupon: false,
          features: [
            {text:'Everything in Starter', yes:true},
            {text:'Custom layout & branding', yes:true},
            {text:'SEO-ready structure', yes:true},
            {text:'Faster loading optimization', yes:true},
            {text:'Priority setup', yes:true},
            {text:'No maintenance', yes:false},
            {text:'No business email', yes:false},
          ]
        },
        {
          id: 'pkg-two-premium',
          tier: 'Premium', name: 'TWO-PAGE Premium',
          php: 14000, badge: null, coupon: false,
          features: [
            {text:'Custom-designed landing page', yes:true},
            {text:'Conversion-focused layout', yes:true},
            {text:'Call-to-action sections', yes:true},
            {text:'Google Map integration', yes:true},
            {text:'Analytics setup', yes:true},
            {text:'No maintenance', yes:false},
            {text:'No business email', yes:false},
          ]
        }
      ],

      /* ── Multi-Page NO Maintenance ── */
      nomaintenance: [
        {
          id: 'pkg-nom-basic',
          tier: 'Basic', name: 'MULTI-PAGE Basic',
          php: 12000, badge: null, coupon: true,
          features: [
            {text:'3–4 pages', yes:true},
            {text:'Mobile responsive', yes:true},
            {text:'FREE domain (1 year)', yes:true},
            {text:'Hosting (1 year)', yes:true},
            {text:'Contact form', yes:true},
            {text:'No maintenance', yes:false},
            {text:'No business email', yes:false},
          ]
        },
        {
          id: 'pkg-nom-standard',
          tier: 'Standard', name: 'MULTI-PAGE Standard',
          php: 17000, badge: 'Best Value', coupon: true,
          features: [
            {text:'5–7 pages', yes:true},
            {text:'Improved UI design', yes:true},
            {text:'Speed optimization', yes:true},
            {text:'FREE domain (1 year)', yes:true},
            {text:'Hosting (1 year)', yes:true},
            {text:'No maintenance', yes:false},
          ]
        },
        {
          id: 'pkg-nom-advanced',
          tier: 'Advanced', name: 'MULTI-PAGE Advanced',
          php: 25000, badge: null, coupon: true,
          features: [
            {text:'8–12 pages', yes:true},
            {text:'Custom layout', yes:true},
            {text:'SQL database (if needed)', yes:true},
            {text:'FREE domain (1 year)', yes:true},
            {text:'Hosting (1 year)', yes:true},
            {text:'No maintenance', yes:false},
          ]
        }
      ],

      /* ── Logo Design ── */
      logoDesign: [
        {
          id: 'pkg-logo-basic',
          tier: 'Basic', name: 'Logo Design — Basic',
          php: 2500, badge: null, coupon: false,
          features: [
            {text:'2 logo concepts', yes:true},
            {text:'PNG / JPG delivery', yes:true},
            {text:'2 revision rounds', yes:true},
            {text:'5–7 day delivery', yes:true},
            {text:'No SVG vector file', yes:false},
            {text:'No brand guide', yes:false},
          ]
        },
        {
          id: 'pkg-logo-pro',
          tier: 'Pro', name: 'Logo Design — Pro',
          php: 5500, badge: 'Best Value', coupon: false,
          features: [
            {text:'4 logo concepts', yes:true},
            {text:'PNG / JPG / SVG files', yes:true},
            {text:'4 revision rounds', yes:true},
            {text:'Business card mockup', yes:true},
            {text:'No full brand guide', yes:false},
          ]
        },
        {
          id: 'pkg-logo-premium',
          tier: 'Premium', name: 'Logo + Brand Identity',
          php: 12000, badge: null, coupon: false,
          features: [
            {text:'Full vector source files', yes:true},
            {text:'Complete brand guide PDF', yes:true},
            {text:'Social media kit', yes:true},
            {text:'Letterhead design', yes:true},
            {text:'Unlimited revisions', yes:true},
          ]
        }
      ],

      /* ── Video Ads ── */
      videoAds: [
        {
          id: 'pkg-vid-short',
          tier: 'Short', name: 'Video Ad — Short (≤30s)',
          php: 4500, badge: null, coupon: false,
          features: [
            {text:'1080p resolution', yes:true},
            {text:'Background music', yes:true},
            {text:'1 revision round', yes:true},
            {text:'3–5 day delivery', yes:true},
            {text:'No voiceover', yes:false},
          ]
        },
        {
          id: 'pkg-vid-standard',
          tier: 'Standard', name: 'Video Ad — Standard (≤60s)',
          php: 9500, badge: 'Best Value', coupon: false,
          features: [
            {text:'1080p / 4K', yes:true},
            {text:'Custom graphics', yes:true},
            {text:'Voiceover option', yes:true},
            {text:'2 revision rounds', yes:true},
          ]
        },
        {
          id: 'pkg-vid-premium',
          tier: 'Premium', name: 'Video Ad — Premium (≤2min)',
          php: 22000, badge: null, coupon: false,
          features: [
            {text:'4K resolution', yes:true},
            {text:'Custom voiceover included', yes:true},
            {text:'Unlimited revisions', yes:true},
            {text:'Multi-format delivery', yes:true},
          ]
        }
      ],

      /* ── Website Manager (renewal section) ── */
      manager: [
        {
          id: 'pkg-mgr-monthly',
          tier: 'Monthly', name: 'Website Manager — Monthly',
          php: 800, badge: null, coupon: false,
          features: [
            {text:'Content & text updates', yes:true},
            {text:'Minor design changes', yes:true},
            {text:'Security checks', yes:true},
            {text:'Regular backups', yes:true},
          ]
        },
        {
          id: 'pkg-mgr-annual',
          tier: 'Annual', name: 'Website Manager — Annual',
          php: 8000, badge: 'Best Value', coupon: false,
          features: [
            {text:'All monthly features', yes:true},
            {text:'2 months FREE', yes:true},
            {text:'Priority support', yes:true},
            {text:'Performance reports', yes:true},
          ]
        }
      ],

      /* ── Annual Renewal ── */
      renewal: [
        {
          id: 'pkg-renew-basic',
          tier: 'Basic', name: 'Annual Renewal — Basic',
          php: 3500, badge: null, coupon: false,
          features: [
            {text:'Domain renewal (1 year)', yes:true},
            {text:'Hosting renewal (1 year)', yes:true},
            {text:'Uptime monitoring', yes:true},
          ]
        },
        {
          id: 'pkg-renew-pro',
          tier: 'Pro', name: 'Annual Renewal — Pro',
          php: 6500, badge: 'Best Value', coupon: false,
          features: [
            {text:'Domain + Hosting renewal', yes:true},
            {text:'SSL certificate', yes:true},
            {text:'Priority renewal processing', yes:true},
            {text:'1 free content update', yes:true},
          ]
        }
      ]
    };

    /* ── Card HTML builder ── */
    function buildCard(pkg, cur) {
      var price    = phpToDisplay(pkg.php, cur);
      var phpPrice = '₱' + pkg.php.toLocaleString();
      var badge    = pkg.badge
        ? '<div class="card-badge-overlay">' + pkg.badge + '</div>'
        : '';
      var couponBadge = pkg.coupon
        ? '<div style="display:inline-flex;align-items:center;gap:0.3rem;margin-bottom:0.5rem;padding:0.2rem 0.55rem;background:rgba(232,212,77,0.08);border:1px dashed rgba(232,212,77,0.3);border-radius:4px;font-family:\'Orbitron\',sans-serif;font-size:0.5rem;letter-spacing:0.08em;color:var(--yellow,#e8d44d);">🏷️ Coupon Eligible</div>'
        : '';
      var featureRows = pkg.features.map(function(f){
        var icon = f.yes
          ? '<span style="color:var(--neon,#39FF14);font-size:0.65rem;flex-shrink:0;">✓</span>'
          : '<span style="color:#555;font-size:0.65rem;flex-shrink:0;">✕</span>';
        var style = f.yes ? '' : 'opacity:0.4;';
        return '<li style="display:flex;align-items:flex-start;gap:0.45rem;font-size:0.72rem;padding:0.2rem 0;' + style + '">' + icon + '<span>' + f.text + '</span></li>';
      }).join('');

      return [
        '<div class="service-card" id="' + pkg.id + '" style="position:relative;cursor:pointer;" onclick="selectPackage && selectPackage(this)">',
          badge,
          '<div class="card-tier" style="font-family:\'Orbitron\',sans-serif;font-size:0.58rem;letter-spacing:0.2em;color:var(--neon,#39FF14);text-transform:uppercase;margin-bottom:0.25rem;opacity:0.8;">' + pkg.tier + '</div>',
          '<div class="card-name" style="font-family:\'Orbitron\',sans-serif;font-size:0.85rem;font-weight:700;color:#fff;margin-bottom:0.4rem;line-height:1.3;">' + pkg.name + '</div>',
          '<div class="card-price" data-php="' + pkg.php + '" style="font-family:\'Orbitron\',sans-serif;font-size:1.25rem;font-weight:900;color:var(--neon,#39FF14);margin:0.5rem 0 0.25rem;text-shadow:0 0 12px rgba(57,255,20,0.35);">' + price + '</div>',
          '<div class="card-price-php" style="font-size:0.68rem;color:var(--text-muted,#888);margin-bottom:0.75rem;font-family:\'Orbitron\',sans-serif;letter-spacing:0.04em;">' + phpPrice + '</div>',
          couponBadge,
          '<div style="height:1px;background:rgba(57,255,20,0.1);margin-bottom:0.75rem;"></div>',
          '<ul style="list-style:none;padding:0;margin:0 0 1rem;">' + featureRows + '</ul>',
          '<button class="service-card-btn" onclick="event.stopPropagation();selectPackage && selectPackage(this.closest(\'.service-card\'))" style="display:block;width:100%;text-align:center;padding:0.5rem;border-radius:4px;font-family:\'Orbitron\',sans-serif;font-size:0.6rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;border:1px solid rgba(57,255,20,0.3);background:rgba(57,255,20,0.08);color:var(--neon,#39FF14);transition:all 0.2s;">Select Package</button>',
        '</div>'
      ].join('');
    }

    /* ── Render all grids ── */
    function renderGrids(cur) {
      var map = {
        'serviceGridMaintenance':  PACKAGES.maintenance,
        'serviceGridOnePage':      PACKAGES.onepage,
        'serviceGridNoMaintenance':PACKAGES.nomaintenance,
        'serviceGridLogoDesign':   PACKAGES.logoDesign,
        'serviceGridVideoAds':     PACKAGES.videoAds,
        'serviceGridManager':      PACKAGES.manager,
        'serviceGridRenewal':      PACKAGES.renewal,
      };
      Object.keys(map).forEach(function(gridId){
        var el = document.getElementById(gridId);
        if (!el) return;
        el.innerHTML = map[gridId].map(function(pkg){ return buildCard(pkg, cur); }).join('');
      });
    }

    /* ── Re-render prices when dashboard currency changes ── */
    function syncCurrencyFromDashboard() {
      var sel = document.getElementById('currencyDropdown');
      if (!sel) return;
      activeCurrency = sel.value || 'USD';
      renderGrids(activeCurrency);
    }

    /* ── Hover style enhancement (add/remove on hover) ── */
    function attachCardHover() {
      document.querySelectorAll('.service-card').forEach(function(card){
        card.addEventListener('mouseenter', function(){
          this.style.borderColor = 'rgba(57,255,20,0.4)';
          this.style.boxShadow   = '0 0 20px rgba(57,255,20,0.1)';
          this.style.transform   = 'translateY(-3px)';
          var btn = this.querySelector('.service-card-btn');
          if (btn) { btn.style.background = 'var(--neon,#39FF14)'; btn.style.color = '#000'; }
        });
        card.addEventListener('mouseleave', function(){
          this.style.borderColor = '';
          this.style.boxShadow   = '';
          this.style.transform   = '';
          var btn = this.querySelector('.service-card-btn');
          if (btn) { btn.style.background = 'rgba(57,255,20,0.08)'; btn.style.color = 'var(--neon,#39FF14)'; }
        });
      });
    }

    /* ── Hook into dashboard currency dropdown ── */
    function hookCurrencyDropdown() {
      var sel = document.getElementById('currencyDropdown');
      if (!sel) return;
      // Wrap the existing onchange so we re-render cards too
      var _orig = sel.onchange;
      sel.addEventListener('change', function(){
        activeCurrency = this.value || 'USD';
        renderGrids(activeCurrency);
        attachCardHover();
      });
    }

    /* ── Init on DOM ready ── */
    document.addEventListener('DOMContentLoaded', function(){
      syncCurrencyFromDashboard();
      renderGrids(activeCurrency);
      attachCardHover();
      hookCurrencyDropdown();
    });

    /* ── Also expose globally so dashboard-script.js can call if needed ── */
    window.ngcsRenderPackages = function(cur) {
      if (cur) activeCurrency = cur;
      renderGrids(activeCurrency);
      attachCardHover();
    };

  })();
