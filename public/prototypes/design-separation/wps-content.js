/* ==========================================================================
   WPS research prototypes — shared content + kit (plain JS, no build step)
   --------------------------------------------------------------------------
   The example content is the same fictional "Acme Co." home page used in the
   existing client-admin and front-end-editor prototypes, so research feedback
   is about the interaction model, never about unfamiliar copy.

   Exposes on window:
     WPS        — example content + purpose vocabulary + helpers
     WPSIcon    — monoline SVG icon component (React)
     WPSGlyph   — abstract purpose preview (React + static SVG)
     WPS_SITE   — read-only "Acme Co." renderer (HTML string)
     WPS_STORE  — tiny localStorage helper
   ========================================================================== */
(function () {
  'use strict';

  var SITE = {
    name: 'Acme Co.',
    nav: ['Services', 'About', 'Work', 'Contact'],
    navCta: 'Get in touch',
  };

  var SECTIONS = [
    {
      id: 'hero',
      kind: 'hero',
      label: 'Hero',
      purpose: 'Opening statement',
      heading: 'Build with confidence.',
      body: 'Thoughtful websites for ambitious small businesses.',
      cta: 'Get in touch',
      design: { colorTreatment: 'light', layout: 'split' },
    },
    {
      id: 'services',
      kind: 'services',
      label: 'Services',
      purpose: 'What you offer',
      heading: 'Services that move your business forward.',
      body: 'Everything we do is designed to help you attract more customers and keep them coming back.',
      design: { colorTreatment: 'light', layout: 'simple' },
    },
    {
      id: 'testimonials',
      kind: 'testimonials',
      label: 'Testimonials',
      purpose: 'Proof that it works',
      heading: 'Trusted by business owners like you.',
      body: 'Our new site finally feels easy to keep current — and it still looks like us.',
      design: { colorTreatment: 'light', layout: 'single' },
    },
    {
      id: 'contact',
      kind: 'contact',
      label: 'Call to action',
      purpose: 'Invite the next step',
      heading: 'Let’s start a conversation.',
      body: 'Have a question or a project in mind? We would love to hear about it.',
      cta: 'Get in touch',
      design: { colorTreatment: 'brand', layout: 'soft' },
    },
  ];

  var SERVICES = [
    { id: 'website-design', title: 'Website Design', description: 'Custom, modern websites that look great and convert visitors into customers.' },
    { id: 'performance', title: 'Performance Optimization', description: 'Faster sites, better SEO, and a smooth experience across every device.' },
    { id: 'support', title: 'Ongoing Support', description: 'Updates, backups, and reliable support whenever you need it.' },
  ];

  var ADDABLE = [
    { kind: 'faq', label: 'Frequently asked questions', description: 'Answer common questions clearly.', purpose: 'Answer questions', glyph: 'faq' },
    { kind: 'text-image', label: 'Text and image', description: 'Tell a focused story with supporting media.', purpose: 'Tell a story', glyph: 'textImage' },
    { kind: 'testimonials', label: 'Testimonials', description: 'Share customer proof and outcomes.', purpose: 'Show proof', glyph: 'quoteSingle' },
    { kind: 'contact', label: 'Call to action', description: 'Help visitors take the next step.', purpose: 'Invite action', glyph: 'ctaSoft' },
  ];

  // Design, expressed as purpose. Each choice answers "what job does this
  // section do?" — never "which color / which CSS value?".
  var PURPOSES = {
    hero: [
      { id: 'split', label: 'Lead with a headline', help: 'A strong statement beside a supporting image.', glyph: 'leadHeadline' },
      { id: 'image-led', label: 'Lead with an image', help: 'Let a photo set the tone, with words close by.', glyph: 'leadImage' },
      { id: 'centered', label: 'Announce something', help: 'Center a single, focused message.', glyph: 'announce' },
    ],
    services: [
      { id: 'simple', label: 'Show as cards', help: 'Three equal panels that feel approachable.', glyph: 'cards' },
      { id: 'editorial', label: 'Show as a list', help: 'A calm, scannable list of what you offer.', glyph: 'listItems' },
      { id: 'photos', label: 'Show with photos', help: 'Pair each service with an image.', glyph: 'cardsPhotos' },
    ],
    testimonials: [
      { id: 'single', label: 'Feature one quote', help: 'Give a single customer voice the spotlight.', glyph: 'quoteSingle' },
      { id: 'with-photo', label: 'Quote with a photo', help: 'Add a face to make it human.', glyph: 'quotePhoto' },
      { id: 'wall', label: 'Wall of quotes', help: 'Show several customers at once.', glyph: 'quoteWall' },
    ],
    contact: [
      { id: 'soft', label: 'Soft invitation', help: 'A friendly, low-pressure next step.', glyph: 'ctaSoft' },
      { id: 'strong', label: 'Strong call to action', help: 'Make the next step clear and prominent.', glyph: 'ctaStrong' },
    ],
  };

  var TREATMENTS = [
    { id: 'light', label: 'Plain', help: 'Sits on the page background.' },
    { id: 'brand', label: 'Accented', help: 'A soft brand color behind this section.' },
    { id: 'dark', label: 'Emphasized', help: 'A dark, high-contrast section.' },
  ];

  // ------------------------------------------------------------------ util --
  var seq = 0;
  function nextId(prefix) { seq += 1; return prefix + '-' + Date.now().toString(36) + '-' + seq; }
  function moveItem(items, from, to) {
    var next = items.slice();
    var moved = next.splice(from, 1)[0];
    next.splice(to, 0, moved);
    return next;
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  var STORE = {
    get: function (key, fallback) {
      try { var raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
      catch (err) { return fallback; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* private mode */ }
    },
  };

  // ------------------------------------------------------------------ icons --
  var ICONS = {
    back: '<path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    caretUp: '<path d="M6 15l6-6 6 6"/>',
    caretDown: '<path d="M6 9l6 6 6-6"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a1 1 0 0 1 1-1h9"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14.5 6.5l3 3"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18h1.6a2.4 2.4 0 0 0 1.5-4.3 1.9 1.9 0 0 1 1.5-3.1H20A9 9 0 0 0 12 3z"/><circle cx="7.5" cy="12" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="14.5" cy="8" r="1"/>',
    eye: '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.6"/>',
    eyeOff: '<path d="M4 4l16 16"/><path d="M9.9 5.2A9.7 9.7 0 0 1 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-3.3 4.1"/><path d="M6.1 8.2A17 17 0 0 0 2.5 12S6 19 12 19a9.4 9.4 0 0 0 3.9-.8"/><path d="M9.5 9.6a3 3 0 0 0 4.2 4.2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    x: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
    sliders: '<path d="M4 8h9"/><path d="M17 8h3"/><path d="M4 16h4"/><path d="M12 16h8"/><circle cx="15" cy="8" r="2"/><circle cx="10" cy="16" r="2"/>',
    list: '<path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/>',
    lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
    grip: '<path d="M9 6h.01"/><path d="M15 6h.01"/><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M9 18h.01"/><path d="M15 18h.01"/>',
    arrowUp: '<path d="M12 19V5"/><path d="M6 11l6-6 6 6"/>',
    arrowDown: '<path d="M12 5v14"/><path d="M6 13l6 6 6-6"/>',
    image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-5 4 3 3-2 4 4"/>',
    type: '<path d="M5 6h14"/><path d="M12 6v13"/><path d="M9 19h6"/>',
    rows: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    columns: '<rect x="4" y="5" width="6.5" height="14" rx="1.4"/><rect x="13.5" y="5" width="6.5" height="14" rx="1.4"/>',
    chat: '<path d="M20 12a8 8 0 0 1-11.6 7.2L4 20l.9-4.1A8 8 0 1 1 20 12z"/>',
    briefcase: '<rect x="3.5" y="7.5" width="17" height="11.5" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3.5 12.5h17"/>',
    gauge: '<path d="M12 13l4-4"/><path d="M4 18a9 9 0 1 1 16 0"/>',
    quote: '<path d="M8 8c-2 1.4-3 3.2-3 5.5 0 1.8 1 3 2.6 3s2.6-1.2 2.6-2.8-1-2.6-2.4-2.8"/><path d="M17 8c-2 1.4-3 3.2-3 5.5 0 1.8 1 3 2.6 3s2.6-1.2 2.6-2.8-1-2.6-2.4-2.8"/>',
    megaphone: '<path d="M4 10l12-5v14L4 14z"/><path d="M4 10v4"/><path d="M8 15v3a1.5 1.5 0 0 0 3 0"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-3.6-3.6"/>',
    external: '<path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M19 14v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    undo: '<path d="M9 7L4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-3"/>',
    monitor: '<rect x="3.5" y="5" width="17" height="11.5" rx="2"/><path d="M9 20h6"/><path d="M12 16.5V20"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    layers: '<path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z"/><path d="M4 12l8 4.5 8-4.5"/>',
    layout: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 10h17"/><path d="M10 10v9"/>',
  };

  function Icon(props) {
    var name = props.name;
    var size = props.size || 18;
    var stroke = props.strokeWidth || 1.7;
    return React.createElement('svg', {
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': 'true', focusable: 'false', style: { display: 'block', flex: 'none' },
      dangerouslySetInnerHTML: { __html: ICONS[name] || '' },
    });
  }

  // ----------------------------------------------------------- glyphs ------
  // Abstract purpose previews (not decoration): each one shows the arrangement
  // a purpose choice produces, so clients choose by intent, not by CSS name.
  var G = {
    leadHeadline: '<rect x="6" y="14" width="40" height="7" rx="2"/><rect x="6" y="26" width="34" height="5" rx="2" opacity=".55"/><rect x="6" y="35" width="24" height="5" rx="2" opacity=".55"/><rect x="58" y="12" width="36" height="38" rx="5" opacity=".35"/>',
    leadImage: '<rect x="6" y="12" width="36" height="38" rx="5" opacity=".35"/><rect x="52" y="16" width="42" height="7" rx="2"/><rect x="52" y="28" width="34" height="5" rx="2" opacity=".55"/><rect x="52" y="37" width="26" height="5" rx="2" opacity=".55"/>',
    announce: '<rect x="22" y="18" width="56" height="8" rx="2"/><rect x="34" y="32" width="32" height="5" rx="2" opacity=".55"/>',
    cards: '<rect x="6" y="16" width="26" height="32" rx="4" opacity=".55"/><rect x="37" y="16" width="26" height="32" rx="4" opacity=".55"/><rect x="68" y="16" width="26" height="32" rx="4" opacity=".55"/>',
    listItems: '<rect x="6" y="14" width="88" height="4" rx="2"/><rect x="6" y="28" width="88" height="4" rx="2" opacity=".55"/><rect x="6" y="42" width="88" height="4" rx="2" opacity=".55"/>',
    cardsPhotos: '<rect x="6" y="14" width="26" height="14" rx="3" opacity=".35"/><rect x="37" y="14" width="26" height="14" rx="3" opacity=".35"/><rect x="68" y="14" width="26" height="14" rx="3" opacity=".35"/><rect x="6" y="34" width="26" height="4" rx="2" opacity=".55"/><rect x="37" y="34" width="26" height="4" rx="2" opacity=".55"/><rect x="68" y="34" width="26" height="4" rx="2" opacity=".55"/>',
    quoteSingle: '<rect x="28" y="18" width="44" height="6" rx="3" opacity=".55"/><rect x="20" y="30" width="60" height="6" rx="3"/><rect x="34" y="42" width="32" height="5" rx="2" opacity=".55"/>',
    quotePhoto: '<circle cx="18" cy="32" r="9" opacity=".35"/><rect x="34" y="18" width="52" height="6" rx="3" opacity=".55"/><rect x="34" y="30" width="48" height="6" rx="3"/><rect x="34" y="42" width="30" height="5" rx="2" opacity=".55"/>',
    quoteWall: '<rect x="6" y="14" width="42" height="18" rx="4" opacity=".55"/><rect x="52" y="14" width="42" height="18" rx="4" opacity=".35"/><rect x="6" y="36" width="42" height="18" rx="4" opacity=".35"/><rect x="52" y="36" width="42" height="18" rx="4" opacity=".55"/>',
    ctaSoft: '<rect x="6" y="20" width="46" height="6" rx="3"/><rect x="6" y="32" width="36" height="5" rx="2" opacity=".55"/><rect x="62" y="24" width="26" height="12" rx="4" opacity=".45"/>',
    ctaStrong: '<rect x="6" y="20" width="46" height="6" rx="3"/><rect x="6" y="32" width="36" height="5" rx="2" opacity=".55"/><rect x="62" y="22" width="26" height="14" rx="4"/>',
    faq: '<rect x="6" y="14" width="66" height="5" rx="2" opacity=".55"/><rect x="78" y="13" width="9" height="7" rx="2"/><rect x="6" y="30" width="60" height="5" rx="2" opacity=".55"/><rect x="78" y="29" width="9" height="7" rx="2"/><rect x="6" y="46" width="54" height="5" rx="2" opacity=".55"/><rect x="78" y="45" width="9" height="7" rx="2"/>',
    textImage: '<rect x="6" y="16" width="44" height="6" rx="3"/><rect x="6" y="28" width="36" height="4" rx="2" opacity=".55"/><rect x="6" y="38" width="30" height="4" rx="2" opacity=".55"/><rect x="58" y="14" width="36" height="34" rx="5" opacity=".35"/>',
  };

  function Glyph(props) {
    var size = props.size || 64;
    var html = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 64" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false">' + (G[props.name] || '') + '</svg>';
    return React.createElement('span', {
      style: { display: 'block', width: size + 'px', maxWidth: '100%', color: 'currentColor' },
      dangerouslySetInnerHTML: { __html: html },
    });
  }

  // ------------------------------------------------------- site renderer ---
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function heroBody(section, services) {
    var layout = (section.design && section.design.layout) || 'split';
    var treatment = (section.design && section.design.colorTreatment) || 'light';
    var heading = '<h1 class="sc-heading">' + esc(section.heading) + '</h1>';
    var body = '<p class="sc-body">' + esc(section.body) + '</p>';
    var cta = section.cta ? '<span class="sc-cta">' + esc(section.cta) + '</span>' : '';
    if (layout === 'centered') {
      return '<div class="sc-hero" data-layout="centered" style="grid-template-columns:1fr;text-align:center">' +
        '<div><span class="sc-eyebrow">Built around your goals</span>' + heading + body + cta + '</div></div>';
    }
    var copy = '<div><span class="sc-eyebrow">Built around your goals</span>' + heading + body + cta + '</div>';
    var img = '<div class="sc-hero__img" aria-hidden="true"></div>';
    return '<div class="sc-hero" data-layout="' + esc(layout) + '">' + (layout === 'image-led' ? img + copy : copy + img) + '</div>';
  }

  function servicesBody(section, services) {
    var layout = (section.design && section.design.layout) || 'simple';
    var heading = '<h2 class="sc-heading">' + esc(section.heading) + '</h2>';
    var body = '<p class="sc-body">' + esc(section.body) + '</p>';
    var cards = services.map(function (s) {
      return '<div class="sc-card"><strong>' + esc(s.title) + '</strong><p>' + esc(s.description) + '</p></div>';
    }).join('');
    return '<div style="text-align:center;max-width:60ch;margin:0 auto 26px"><span class="sc-eyebrow">What we do</span>' + heading + body + '</div>' +
      '<div class="sc-grid" data-layout="' + esc(layout) + '">' + cards + '</div>';
  }

  function testimonialsBody(section) {
    var layout = (section.design && section.design.layout) || 'single';
    var heading = '<h2 class="sc-heading" style="margin-inline:auto">' + esc(section.heading) + '</h2>';
    var quote = '<p class="sc-quote">“' + esc(section.body) + '”</p>';
    var photo = layout === 'with-photo' ? '<span class="sc-avatar" aria-hidden="true"></span>' : '';
    var person = '<div class="sc-person">' + photo + '<div><strong>Sarah M.</strong><span>Boutique owner</span></div></div>';
    if (layout === 'wall') {
      var wall = [1, 2, 3].map(function () {
        return '<div class="sc-card"><p style="color:inherit">“' + esc(section.body) + '”</p><div class="sc-person"><span class="sc-avatar" aria-hidden="true"></span><div><strong>Sarah M.</strong><span>Boutique owner</span></div></div></div>';
      }).join('');
      return '<div style="text-align:center">' + heading + '</div><div class="sc-grid" style="margin-top:24px">' + wall + '</div>';
    }
    return '<div style="text-align:center;max-width:56ch;margin:0 auto">' + heading + '<div style="margin-top:14px">' + quote + '</div>' + person + '</div>';
  }

  function contactBody(section) {
    var layout = (section.design && section.design.layout) || 'soft';
    var heading = '<h2 class="sc-heading">' + esc(section.heading) + '</h2>';
    var body = '<p class="sc-body">' + esc(section.body) + '</p>';
    var cta = '<span class="sc-cta">' + esc(section.cta || 'Get in touch') + '</span>';
    return '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px">' +
      '<div>' + heading + body + '</div>' + cta + '</div>';
  }

  function placeholderBody(section) {
    return '<span class="sc-eyebrow">New section</span><h2 class="sc-heading">' + esc(section.heading) + '</h2><p class="sc-body">' + esc(section.body) + '</p>';
  }

  function renderSection(section, services, opts) {
    opts = opts || {};
    var treatment = (section.design && section.design.colorTreatment) || 'light';
    var inner;
    switch (section.kind) {
      case 'hero': inner = heroBody(section, services); break;
      case 'services': inner = servicesBody(section, services); break;
      case 'testimonials': inner = testimonialsBody(section); break;
      case 'contact': inner = contactBody(section); break;
      default: inner = placeholderBody(section);
    }
    var chip = opts.showChip ? '<span class="sc-lock" style="position:absolute;top:10px;left:10px">' + esc(section.label) + '</span>' : '';
    return '<section class="sc-section" data-kind="' + esc(section.kind) + '" data-section="' + esc(section.id) + '" data-treatment="' + esc(treatment) + '" data-active="' + (opts.activeId === section.id ? 'true' : 'false') + '"' +
      (opts.showChip ? ' style="position:relative"' : '') + '>' + chip + inner + '</section>';
  }

  function renderSite(sections, services, opts) {
    opts = opts || {};
    var nav = SITE.nav.map(function (item) { return '<span>' + esc(item) + '</span>'; }).join('');
    var chrome = opts.hideChrome ? '' :
      '<header class="sc-nav"><span class="sc-logo">' + esc(SITE.name) + '</span><nav class="sc-nav__links" aria-label="Example site navigation">' + nav + '</nav><span class="sc-nav__cta">' + esc(SITE.navCta) + '</span></header>';
    var body = sections.map(function (section) { return renderSection(section, services, opts); }).join('');
    return '<div class="sc-site">' + chrome + body + '</div>';
  }

  window.WPS = {
    site: SITE,
    sections: SECTIONS,
    services: SERVICES,
    addable: ADDABLE,
    purposes: PURPOSES,
    treatments: TREATMENTS,
    nextId: nextId,
    moveItem: moveItem,
    clone: clone,
  };
  window.WPSIcon = Icon;
  window.WPSGlyph = Glyph;
  window.WPS_SITE = { render: renderSite, renderSection: renderSection, escape: esc };
  window.WPS_STORE = STORE;
})();
