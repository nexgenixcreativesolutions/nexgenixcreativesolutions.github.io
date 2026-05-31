/* ================================================================
   packages.js — NGCS Dashboard companion
   ----------------------------------------------------------------
   dashboard-script.js already owns:
     • servicePackages data  (all prices, features, categories)
     • loadServices()        (renders all service-grid cards)
     • selectService(cat,key)(shows correct form + invoice)
     • changeCurrency()      (converts & re-renders)

   This file only does three things:
     1. Patches the TWO-PAGE Starter price ₱6,500 → ₱8,000
     2. Adds App Design & UI/UX grids to serviceGridAppDesign /
        serviceGridUiux (they exist in servicePackages but weren't
        in the original loadServices grid list — patched below)
     3. Handles URL pre-selection:
          ?service=logo-design&package=pkg-logo-pro
          ?type=renewal
        so links from the services/quote page land on the right
        package with the form already open
   ================================================================ */

(function () {

  /* ── 1. PRICE PATCH — run before DOMContentLoaded ─────────────
     servicePackages is defined at the top of dashboard-script.js
     and is a plain object in the global scope. We wait for the
     script to finish executing, then patch.                      */
  function patchPrices() {
    if (typeof servicePackages === 'undefined') return;
    // TWO-PAGE Starter: ₱6,500 → ₱8,000
    if (servicePackages.onePage && servicePackages.onePage.starter) {
      servicePackages.onePage.starter.price = 8000;
    }
  }

  /* ── 2. URL PRE-SELECT ─────────────────────────────────────────
     Supports these query params (all optional, combinable):
       ?type=renewal          → switches to Renewal tab
       ?service=logo-design   → clicks the matching filter tab
       ?package=pkg-logo-pro  → selects that specific package
                                (uses our stable pkg IDs mapped
                                 to dashboard-script's cat+key)  */

  /* Map from our stable pkg IDs → dashboard-script.js cat + key */
  var PKG_ID_MAP = {
    /* Maintenance */
    'pkg-maint-basic':    { cat:'maintenance',   key:'basic'    },
    'pkg-maint-pro':      { cat:'maintenance',   key:'pro'      },
    'pkg-maint-premium':  { cat:'maintenance',   key:'premium'  },
    /* Two-Page */
    'pkg-two-starter':    { cat:'onePage',       key:'starter'  },
    'pkg-two-pro':        { cat:'onePage',       key:'pro'      },
    'pkg-two-premium':    { cat:'onePage',       key:'premium'  },
    /* No Maintenance */
    'pkg-nom-basic':      { cat:'noMaintenance', key:'basic'    },
    'pkg-nom-standard':   { cat:'noMaintenance', key:'standard' },
    'pkg-nom-advanced':   { cat:'noMaintenance', key:'advanced' },
    /* Logo */
    'pkg-logo-basic':     { cat:'logoDesign',    key:'basic'    },
    'pkg-logo-pro':       { cat:'logoDesign',    key:'pro'      },
    'pkg-logo-premium':   { cat:'logoDesign',    key:'premium'  },
    /* Video */
    'pkg-vid-short':      { cat:'videoAds',      key:'short'    },
    'pkg-vid-standard':   { cat:'videoAds',      key:'standard' },
    'pkg-vid-premium':    { cat:'videoAds',      key:'premium'  },
    /* App Design */
    'pkg-app-starter':    { cat:'appDesign',     key:'starter'  },
    'pkg-app-pro':        { cat:'appDesign',     key:'pro'      },
    'pkg-app-premium':    { cat:'appDesign',     key:'premium'  },
    /* UI/UX */
    'pkg-uiux-starter':   { cat:'uiux',          key:'starter'  },
    'pkg-uiux-pro':       { cat:'uiux',          key:'pro'      },
    'pkg-uiux-premium':   { cat:'uiux',          key:'premium'  },
    /* Manager */
    'pkg-mgr-monthly':    { cat:'manager',       key:'monthly'  },
    'pkg-mgr-annual':     { cat:'manager',       key:'annual'   },
    /* Renewal */
    'pkg-renew-standard': { cat:'renewal',       key:'standard' },
  };

  /* Map service param → filter tab ID */
  var SERVICE_TAB_MAP = {
    'logo-design':      'tab-logo',
    'video-ads':        'tab-video',
    'app-design':       'tab-app-design',
    'ui-ux-design':     'tab-ui-ux',
    'web-design':       'tab-web-design',
    'web-development':  'tab-web-development',
  };

  function handleUrlPreselect() {
    var params  = new URLSearchParams(window.location.search);
    var type    = params.get('type');      /* 'renewal' */
    var service = params.get('service');  /* 'logo-design', etc. */
    var pkgId   = params.get('package'); /* 'pkg-logo-pro', etc. */

    /* Switch to Renewal tab if ?type=renewal */
    if (type === 'renewal') {
      if (typeof selectOrderType === 'function') {
        selectOrderType('renewal');
      }
    }

    /* Click the right filter tab */
    if (service && SERVICE_TAB_MAP[service]) {
      var tabEl = document.getElementById(SERVICE_TAB_MAP[service]);
      if (tabEl && typeof filterByServiceType === 'function') {
        filterByServiceType(service, tabEl);
      }
    }

    /* Pre-select and open the package form */
    if (pkgId && PKG_ID_MAP[pkgId]) {
      var mapping = PKG_ID_MAP[pkgId];
      setTimeout(function () {
        if (typeof selectService === 'function') {
          selectService(mapping.cat, mapping.key);

          /* Scroll the selected card into view */
          var cardEl = document.getElementById('card-' + mapping.cat + '-' + mapping.key);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 350); /* small delay so loadServices() has already run */
    }
  }

  /* ── 3. CURRENCY SYNC ──────────────────────────────────────────
     dashboard-script.js owns changeCurrency() which calls
     loadServices() to re-render cards. We just make sure the
     dropdown's initial value is respected on first load.        */
  function syncInitialCurrency() {
    var sel = document.getElementById('currencyDropdown');
    if (!sel) return;
    if (typeof changeCurrency === 'function') {
      changeCurrency(sel.value || 'USD');
    }
  }

  /* ── INIT ──────────────────────────────────────────────────────
     Use DOMContentLoaded so dashboard-script.js (which also
     listens on DOMContentLoaded) has already run its own init.
     We delay with setTimeout(0) to ensure loadServices() fired. */
  document.addEventListener('DOMContentLoaded', function () {
    patchPrices();          /* fix ₱8,000 starter price */

    setTimeout(function () {
      /* Re-run loadServices so the patched price shows immediately */
      if (typeof loadServices === 'function') loadServices();
      syncInitialCurrency();
      handleUrlPreselect();
    }, 0);
  });

})();
