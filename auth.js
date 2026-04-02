/**
 * auth.js — Universal Auth Guard  v4.0
 * NexGenix Creative Solutions / NGCS
 *
 * Drop this script into every HTML page (before </body>):
 *   <script src="auth.js"></script>
 *
 * ── Protecting pages ─────────────────────────────────────────────────────────
 *
 *  METHOD A — Add filename to PROTECTED_PAGES list below.
 *  METHOD B — Add <meta name="ngcs-auth" content="required"> inside <head>.
 *
 * ── What happens to unauthenticated users ────────────────────────────────────
 *
 *  Redirected to access-denied.html. Their intended destination is saved so
 *  after logging in they land exactly where they tried to go.
 *
 * ── Nav toggle ───────────────────────────────────────────────────────────────
 *
 *  Requires these three elements in your navbar (IDs must match exactly):
 *    id="nav-login-btn"     — shown when logged OUT
 *    id="nav-dashboard-btn" — shown when logged IN
 *    id="nav-logout-btn"    — shown when logged IN
 *
 * ── Public API ───────────────────────────────────────────────────────────────
 *
 *  NGCS_Auth.login(token)   — save token, update nav, redirect to intended dest
 *  NGCS_Auth.logout()       — clear token, update nav, redirect to homePage
 *  NGCS_Auth.isLoggedIn()   — returns true / false
 */

(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════
     CONFIG
  ═══════════════════════════════════════════════════════════════*/
  const CONFIG = {
    storageKey: "ngcs_auth_token",
    loginPage:  "login-signup.html",
    deniedPage: "access-denied.html",
    homePage:   "index.html",

    // METHOD A — add any filename here to require login
    PROTECTED_PAGES: [
      "dashboard.html",
      "digital-services.html",
      "services-list.html",
      // ← add more as your site grows
    ],
  };

  /* ═══════════════════════════════════════════════════════════════
     HELPERS
  ═══════════════════════════════════════════════════════════════*/

  function isLoggedIn() {
    const token = localStorage.getItem(CONFIG.storageKey);
    return !!token && token.trim() !== "";
  }

  function getFilename(href) {
    if (!href) return "";
    try {
      const url   = new URL(href, window.location.href);
      const parts = url.pathname.split("/");
      return parts[parts.length - 1] || "";
    } catch (e) {
      const parts = href.split("/");
      return parts[parts.length - 1] || "";
    }
  }

  function currentPage() {
    return getFilename(window.location.pathname);
  }

  function saveIntendedDestination(href) {
    sessionStorage.setItem("ngcs_intended", href);
  }

  function popIntendedDestination() {
    const dest = sessionStorage.getItem("ngcs_intended");
    sessionStorage.removeItem("ngcs_intended");
    return dest;
  }

  function isProtectedPage(filename) {
    if (CONFIG.PROTECTED_PAGES.indexOf(filename) !== -1) return true;
    if (filename === currentPage()) {
      const meta = document.querySelector('meta[name="ngcs-auth"]');
      if (meta && meta.getAttribute("content") === "required") return true;
    }
    return false;
  }

  function isSafePage(filename) {
    return filename === CONFIG.loginPage || filename === CONFIG.deniedPage;
  }

  function denyAccess(intendedHref) {
    saveIntendedDestination(intendedHref || window.location.href);
    window.location.replace(CONFIG.deniedPage);
  }

  /* ═══════════════════════════════════════════════════════════════
     NAV TOGGLE
     Shows/hides login, dashboard, and logout buttons based on
     auth state. Runs on every page that has the nav.
  ═══════════════════════════════════════════════════════════════*/

  function updateNav() {
    const loginBtn   = document.getElementById("nav-login-btn");
    const dashBtn    = document.getElementById("nav-dashboard-btn");
    const logoutBtn  = document.getElementById("nav-logout-btn");

    // If navbar buttons aren't on this page, do nothing
    if (!loginBtn && !dashBtn && !logoutBtn) return;

    if (isLoggedIn()) {
      if (loginBtn)  loginBtn.style.display  = "none";
      if (dashBtn)   dashBtn.style.display   = "flex";
      if (logoutBtn) logoutBtn.style.display = "flex";
    } else {
      if (loginBtn)  loginBtn.style.display  = "flex";
      if (dashBtn)   dashBtn.style.display   = "none";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     CORE AUTH ACTIONS
  ═══════════════════════════════════════════════════════════════*/

  function login(token) {
    if (!token || token.trim() === "") {
      console.warn("[NGCS Auth] login() called with empty token — ignored.");
      return;
    }
    localStorage.setItem(CONFIG.storageKey, token);
    updateNav();
    const intended = popIntendedDestination();
    window.location.href = intended || CONFIG.PROTECTED_PAGES[0] || CONFIG.homePage;
  }

  function logout() {
    localStorage.removeItem(CONFIG.storageKey);
    sessionStorage.removeItem("ngcs_intended");
    updateNav();
    window.location.href = CONFIG.homePage;
  }

  /* ═══════════════════════════════════════════════════════════════
     PAGE GUARD — runs immediately before DOM renders
  ═══════════════════════════════════════════════════════════════*/

  function guardCurrentPage() {
    const page = currentPage();
    if (isSafePage(page)) return; // never block login or denied pages
    if (isProtectedPage(page) && !isLoggedIn()) {
      denyAccess(window.location.href);
    }
  }

  // ⚡ Runs BEFORE any HTML renders — prevents flash of protected content
  guardCurrentPage();

  /* ═══════════════════════════════════════════════════════════════
     LINK & BUTTON INTERCEPTOR
  ═══════════════════════════════════════════════════════════════*/

  function handleProtectedClick(e) {
    if (!isLoggedIn()) {
      e.preventDefault();
      e.stopPropagation();
      const dest = this.getAttribute("href") || this.getAttribute("data-href") || "";
      denyAccess(dest || window.location.href);
    }
  }

  function interceptProtectedLinks() {
    document.querySelectorAll("a[href]").forEach(function (link) {
      const target = getFilename(link.getAttribute("href"));
      if (isProtectedPage(target) && !link.dataset.ngcsGuarded) {
        link.dataset.ngcsGuarded = "1";
        link.addEventListener("click", handleProtectedClick, true);
      }
    });

    document.querySelectorAll("[data-href]").forEach(function (el) {
      const target = getFilename(el.getAttribute("data-href"));
      if (isProtectedPage(target) && !el.dataset.ngcsGuarded) {
        el.dataset.ngcsGuarded = "1";
        el.addEventListener("click", handleProtectedClick, true);
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     PATCH location.assign / location.replace
  ═══════════════════════════════════════════════════════════════*/

  (function patchLocationMethods() {
    const origAssign  = window.location.assign.bind(window.location);
    const origReplace = window.location.replace.bind(window.location);

    function guarded(origFn, url) {
      const filename = getFilename(url);
      if (!isSafePage(filename) && isProtectedPage(filename) && !isLoggedIn()) {
        saveIntendedDestination(url);
        origFn(CONFIG.deniedPage);
      } else {
        origFn(url);
      }
    }

    try {
      window.location.assign  = function (url) { guarded(origAssign,  url); };
      window.location.replace = function (url) { guarded(origReplace, url); };
    } catch (e) { /* silently skip */ }
  })();

  /* ═══════════════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════════════*/

  function init() {
    updateNav();
    interceptProtectedLinks();

    // Re-scan for dynamically injected nav/links
    if (window.MutationObserver) {
      const observer = new MutationObserver(function () {
        updateNav();
        interceptProtectedLinks();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ═══════════════════════════════════════════════════════════════
     PUBLIC API
  ═══════════════════════════════════════════════════════════════*/

  window.NGCS_Auth = {
    login:      login,
    logout:     logout,
    isLoggedIn: isLoggedIn,
  };

})();