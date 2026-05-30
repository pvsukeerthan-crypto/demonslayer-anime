(function () {
  'use strict';
  /* ─────────────────────────────────────────
     1. LOADING SCREEN
  ───────────────────────────────────────── */
  var loadingScreen = document.getElementById('loading-screen');
  var mainSite      = document.getElementById('main-site');
  var skipBtn       = document.getElementById('skip-btn');
  var loadSlides    = document.querySelectorAll('.load-slide');
  var currentLoadSlide = 0;
  var loadInterval     = null;
  var SLIDE_INTERVAL   = 300;
  function showLoadSlide(index) {
    loadSlides.forEach(function (s) { s.classList.remove('active'); });
    if (loadSlides[index]) loadSlides[index].classList.add('active');
  }
  function startLoading() {
    loadInterval = setInterval(function () {
      currentLoadSlide++;
      if (currentLoadSlide >= loadSlides.length) {
        finishLoading();
      } else {
        showLoadSlide(currentLoadSlide);
      }
    }, SLIDE_INTERVAL);
  }
  function finishLoading() {
    clearInterval(loadInterval);
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.8s ease';
    setTimeout(function () {
      loadingScreen.classList.add('hidden');
      mainSite.classList.remove('hidden');
      initHeroSlider();
      initPosterSlider();
      initScrollReveal();
    }, 800);
  }
  skipBtn.addEventListener('click', finishLoading);
  showLoadSlide(0);
  startLoading();
window.openme = function () {
  window.open("https://demonslayer-anime.com/infinitycastle/", "_blank");
};
  /* ─────────────────────────────────────────
     2. MOBILE NAV TOGGLE
  ───────────────────────────────────────── */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav   = document.getElementById('main-nav');
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  var hasDropdown = document.querySelector('.has-dropdown');
  if (hasDropdown) {
    hasDropdown.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.classList.toggle('open');
      }
    });
  }
  document.addEventListener('click', function (e) {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });
  /* ─────────────────────────────────────────
     3. HERO SLIDER — SLIDING ANIMATION
  ───────────────────────────────────────── */
function initHeroSlider() {
  var slides  = document.querySelectorAll('.hero-slide');
  var current = 0;
  var total   = slides.length;
  var timer   = null;
  var INTERVAL = 5000;
  if (!total) return;
  slides[0].classList.add('active');
  function goTo(index) {
    var prev = current;
    current = (index + total) % total;
    slides.forEach(function (slide) {
      slide.classList.remove('active', 'prev');
    });
    slides[prev].classList.add('prev');
    slides[current].classList.add('active');
  }
  function next() { goTo(current + 1); }
  function startTimer() { timer = setInterval(next, INTERVAL); }
  startTimer();
}
  /* ─────────────────────────────────────────
     4. TRAILER — OPENS IN NEW WINDOW
  ───────────────────────────────────────── */
  window.openTrailer = function () {
    window.open('https://www.youtube.com/watch?v=9kb7vK11_Rw', '_blank');
  };
  var playBtn = document.getElementById('play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      window.openTrailer();
    });
  }
  /* ─────────────────────────────────────────
     5. BACK TO TOP BUTTON
  ───────────────────────────────────────── */
  var pagetopBtn = document.getElementById('pagetop-btn');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      pagetopBtn.classList.add('visible');
    } else {
      pagetopBtn.classList.remove('visible');
    }
  });
  pagetopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  /* ─────────────────────────────────────────
     6. HEADER SCROLL STYLE
  ───────────────────────────────────────── */
  var siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      siteHeader.style.borderBottomColor = 'rgba(201, 168, 76, 0.5)';
    } else {
      siteHeader.style.borderBottomColor = 'rgba(201, 168, 76, 0.3)';
    }
  });
function initPosterSlider() {
  var track = document.querySelector('.poster-track');
  var prevBtn = document.getElementById('poster-prev');
  var nextBtn = document.getElementById('poster-next');
  var posterOffset = 0;
  var posterStep = 220;

  function getMaxOffset() {
    return -(track.scrollWidth - track.parentElement.clientWidth);
  }

  if (prevBtn && nextBtn && track) {
    prevBtn.addEventListener('click', function () {
      posterOffset = Math.min(posterOffset + posterStep, 0);
      track.style.transform = 'translateX(' + posterOffset + 'px)';
    });
    nextBtn.addEventListener('click', function () {
      posterOffset = Math.max(posterOffset - posterStep, getMaxOffset());
      track.style.transform = 'translateX(' + posterOffset + 'px)';
    });
  }
}
function initScrollReveal() {
  var sections = document.querySelectorAll('#poster-slider, #the-series, #chara-sound');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
 }, { threshold: 0, rootMargin: '0px 0px -40% 0px' });
  sections.forEach(function(s) { observer.observe(s); });
}
})();