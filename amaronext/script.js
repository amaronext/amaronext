/* =============================================
   AMARONEXT — script.js
   ============================================= */

/* === Cabeçalho: linha de separação ao rolar === */
(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* === Barra fixa de WhatsApp (celular) ===
   Aparece depois que o botão do topo sai da tela e some
   quando o botão final entra, para não duplicar chamadas. */
(function () {
  var bar = document.getElementById('sticky-cta');
  var heroCta = document.getElementById('hero-cta');
  var finalCta = document.getElementById('final-cta');
  if (!bar || !heroCta || !finalCta || !('IntersectionObserver' in window)) return;

  var heroVisible = true;
  var finalVisible = false;

  function render() {
    var show = !heroVisible && !finalVisible;
    bar.classList.toggle('is-visible', show);
    bar.setAttribute('aria-hidden', show ? 'false' : 'true');
    var link = bar.querySelector('a');
    if (link) link.tabIndex = show ? 0 : -1;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.target === heroCta) {
        // Considera "visível" também quando o botão ainda está abaixo da tela
        heroVisible = e.isIntersecting || e.boundingClientRect.top > 0;
      }
      if (e.target === finalCta) finalVisible = e.isIntersecting;
    });
    render();
  });

  io.observe(heroCta);
  io.observe(finalCta);
})();

/* === Eventos de conversão (Meta Pixel / Google Tag, se estiverem instalados) === */
document.querySelectorAll('[data-wa]').forEach(function (link) {
  link.addEventListener('click', function () {
    var local = link.getAttribute('data-wa');
    if (typeof window.fbq === 'function') window.fbq('track', 'Contact', { content_name: local });
    if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { local: local });
  });
});
