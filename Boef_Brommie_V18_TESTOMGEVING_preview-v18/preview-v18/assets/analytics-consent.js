/*
 * Boef & Brommie – privacyvriendelijke Google Analytics 4
 * Meet-ID G-9CGG9GV25Y. Basis-consent: Google-tag uitsluitend na opt-in.
 * Op lokale previews en andere domeinen wordt nooit gemeten.
 */
(function () {
  'use strict';
  var MEASUREMENT_ID = 'G-9CGG9GV25Y';
  var KEY = 'bb_analytics_consent_v1';
  var ALLOWED_HOSTS = ['bestelboefenbrommie.nl', 'www.bestelboefenbrommie.nl'];
  var tagStarted = false;

  function getSavedChoice() {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  }
  function saveChoice(choice) {
    try { localStorage.setItem(KEY, choice); } catch (_) { /* Geen opslag mogelijk: keuze geldt deze pagina. */ }
  }
  function hasProductionHost() {
    return ALLOWED_HOSTS.indexOf(window.location.hostname.toLowerCase()) !== -1 && /^\/(?:|index\.html|bestellen\.html|reviews\.html|contact\.html|downloads\.html|gastlessen\.html|flaptekst\.html|privacy\.html|bedankt\.html|bedankt-review\.html)$/.test(window.location.pathname);
  }
  function enableMeasurement() {
    if (tagStarted || !hasProductionHost()) return;
    tagStarted = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    // Consent Mode v2: alle categorieën standaard geweigerd.
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    // Alleen de gekozen analytische opslag krijgt toestemming.
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { send_page_view: true });
    var googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    googleTag.setAttribute('data-bb-analytics', '1');
    document.head.appendChild(googleTag);
  }

  function clearAnalyticsCookies() {
    var domain = window.location.hostname.toLowerCase();
    var names = document.cookie.split(';').map(function (c) { return c.trim().split('=')[0]; });
    names.forEach(function (name) {
      if (!/^_ga(?:_|$)/.test(name)) return;
      var domains = ['', domain, '.bestelboefenbrommie.nl'];
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (d ? '; domain=' + d : '');
      });
    });
  }

  function createStyle() {
    var css = document.createElement('style');
    css.textContent = '\n'
      + '.bb-analytics-banner,.bb-analytics-banner *,.bb-analytics-settings{box-sizing:border-box}'
      + '.bb-analytics-settings{position:fixed;z-index:9998;left:14px;bottom:12px;background:#fff;color:#083d7e;border:1px solid #b4dfff;border-radius:999px;box-shadow:0 5px 18px rgba(8,61,126,.17);padding:7px 12px;font:600 12px/1.3 Arial,sans-serif;cursor:pointer;max-width:160px}'
      + '.bb-analytics-settings:focus-visible,.bb-analytics-choice:focus-visible{outline:3px solid #083d7e;outline-offset:3px}'
      + '.bb-analytics-banner{position:fixed;z-index:9999;left:15px;bottom:15px;width:min(540px,calc(100% - 30px));max-height:calc(100vh - 30px);overflow:auto;background:white;color:#17324d;border:2px solid #b4dfff;border-radius:18px;padding:17px 19px 18px;box-shadow:0 12px 44px rgba(8,61,126,.24);font:14px/1.5 Arial,sans-serif;text-align:left}'
      + '.bb-analytics-banner strong{font-size:16px;color:#083d7e;display:block;margin:0 0 6px}'
      + '.bb-analytics-banner p{font-size:14px;line-height:1.5;margin:0 0 12px;color:#17324d}'
      + '.bb-analytics-banner .bb-analytics-actions{display:flex;gap:9px;flex-wrap:wrap}'
      + '.bb-analytics-choice{cursor:pointer;min-width:125px;min-height:40px;padding:9px 14px;border-radius:11px;border:2px solid #0179f1;font:700 14px Arial,sans-serif}'
      + '.bb-analytics-choice--deny{background:#fff;color:#083d7e}'
      + '.bb-analytics-choice--allow{background:#0179f1;color:#fff}'
      + '.bb-analytics-banner details{margin-top:10px;font-size:12px}'
      + '.bb-analytics-banner summary{color:#083d7e;cursor:pointer}'
      + '.bb-analytics-banner a{color:#083d7e;text-decoration:underline}'
      + '@media(max-width:480px){.bb-analytics-banner{padding:14px}.bb-analytics-choice{flex:1}.bb-analytics-settings{left:10px;bottom:10px}}';
    document.head.appendChild(css);
  }

  function initUI() {
    createStyle();
    var settings = document.createElement('button');
    settings.type = 'button';
    settings.className = 'bb-analytics-settings';
    settings.textContent = 'Cookie-instellingen';
    settings.setAttribute('aria-label', 'Cookie-instellingen aanpassen');
    document.body.appendChild(settings);

    var banner = document.createElement('section');
    banner.className = 'bb-analytics-banner';
    banner.setAttribute('aria-label', 'Toestemming voor websiteanalyse');
    banner.innerHTML = '<strong>Mag Boef & Brommie websitebezoek meten?</strong>'
      + '<p>Met Google Analytics zien we welke pagina’s bezoekers bekijken. We laden deze meetdienst alleen als je toestemming geeft. Weigeren heeft geen gevolgen voor de website.</p>'
      + '<div class="bb-analytics-actions">'
      + '<button class="bb-analytics-choice bb-analytics-choice--deny" type="button">Weigeren</button>'
      + '<button class="bb-analytics-choice bb-analytics-choice--allow" type="button">Toestaan</button></div>'
      + '<details><summary>Meer informatie</summary><p>Bij toestemming kan Google informatie over jouw websitebezoek verwerken en analytische cookies plaatsen. Je kunt je keuze later wijzigen met ‘Cookie-instellingen’. <a href="privacy.html">Privacy &amp; cookies bij Boef &amp; Brommie</a> en <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=nl">privacyinformatie van Google</a>.</p></details>';
    document.body.appendChild(banner);

    function hideBanner() {
      banner.hidden = true;
      settings.hidden = false;
    }
    function showBanner() {
      banner.hidden = false;
      settings.hidden = true;
    }
    settings.addEventListener('click', showBanner);
    banner.querySelector('.bb-analytics-choice--allow').addEventListener('click', function () {
      saveChoice('granted');
      enableMeasurement();
      hideBanner();
    });
    banner.querySelector('.bb-analytics-choice--deny').addEventListener('click', function () {
      var alreadyStarted = tagStarted;
      saveChoice('denied');
      if (alreadyStarted) clearAnalyticsCookies();
      hideBanner();
      if (alreadyStarted) {
        // Basis-consent: stoppen met meten door de ingeladen Google-tag te ontladen.
        window.location.reload();
      }
    });

    if (getSavedChoice() === 'granted' || getSavedChoice() === 'denied') {
      hideBanner();
      if (getSavedChoice() === 'granted') enableMeasurement();
    } else {
      showBanner();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initUI);
  else initUI();
}());
