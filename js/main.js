/**
 * Brielle Edge Solutions Ltd. — Main Interactive Controller
 * Blocks:
 *   1. Progressive Reveal Failsafe & 3-Second Brand Preloader
 *   2. Hero A & B Entrance, Parallax, Ambient Loops & Stat Count-Up
 *   3. Lenis Smooth Scroll & Scroll-to-Top Floating Action
 *   4. Accessible Mobile Drawer Navigation (Focus Trap & Scroll Lock)
 *   5. Hero A & B 3-Division Finder Switchers & Enquiry Prefill
 *   6. Swiper Carousels (Packages & Proof)
 *   7. Interactive Footer Wordmark Wave & Static Forms
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '2348169203706';
  const LOADER_DURATION_MS = 3000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(hover: none)').matches;

  let lenis = null;

  /* ------------------------------------------------------------------------
     1. Visibility Failsafe (Never hide content if GSAP or CDN fails)
     ------------------------------------------------------------------------ */
  const revealAllFallback = () => {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('is-revealed');
    });
  };

  const fallbackTimer = window.setTimeout(revealAllFallback, 1600);

  /* ------------------------------------------------------------------------
     2. Hero Entrance, Parallax, Ambient Loops & Stat Count-Up
     ------------------------------------------------------------------------ */
  const playHeroEntrance = () => {
    if (prefersReducedMotion || typeof window.gsap === 'undefined') return;

    const gsap = window.gsap;
    const activeHero = document.documentElement.getAttribute('data-hero') === 'b' ? 'b' : 'a';
    const isDesktop = window.innerWidth >= 768;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: isDesktop ? 0.48 : 0.36 } });

    if (activeHero === 'a') {
      tl.fromTo('#hero-a .hero__kicker', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, clearProps: 'opacity,transform' })
        .fromTo('#hero-a .hero__title-line', { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, clearProps: 'opacity,transform' }, 0.06)
        .fromTo('#hero-a .hero__lead', { y: 14, opacity: 0 }, { y: 0, opacity: 1, clearProps: 'opacity,transform' }, 0.14)
        .fromTo('#hero-a .hero-finder', { y: 16, opacity: 0 }, { y: 0, opacity: 1, clearProps: 'opacity,transform' }, 0.18)
        .fromTo('#hero-a .hero-globe', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.52, clearProps: 'opacity,transform' }, 0.08)
        .fromTo('#hero-a .hero-portal', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, clearProps: 'opacity,transform' }, 0.14)
        .fromTo('#hero-a .hero-badge', { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.36, clearProps: 'opacity,transform' }, 0.22);
    } else {
      tl.fromTo('#hero-b .hero-b__card', { scale: 0.99, opacity: 0.85 }, { scale: 1, opacity: 1, duration: 0.4, clearProps: 'opacity,transform' })
        .fromTo('#hero-b .hero-b__kicker', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, clearProps: 'opacity,transform' }, 0.04)
        .fromTo('#hero-b .hero-b__title-line', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, clearProps: 'opacity,transform' }, 0.08)
        .fromTo('#hero-b .hero-b__lead', { y: 14, opacity: 0 }, { y: 0, opacity: 1, clearProps: 'opacity,transform' }, 0.14)
        .fromTo('#hero-b .hero-b__stamp', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.44, clearProps: 'opacity,transform' }, 0.16)
        .fromTo('#hero-b .hero-b-finder', { y: 16, opacity: 0 }, { y: 0, opacity: 1, clearProps: 'opacity,transform' }, 0.18);
    }
  };

  const initPreloader = (onComplete) => {
    const loader = document.getElementById('page-loader');
    const skip =
      !loader ||
      prefersReducedMotion ||
      document.documentElement.classList.contains('skip-loader');

    if (skip) {
      if (loader) {
        loader.classList.add('is-done');
        loader.hidden = true;
      }
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    document.body.classList.add('is-loading');

    window.setTimeout(() => {
      loader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      if (typeof onComplete === 'function') onComplete();

      window.setTimeout(() => {
        loader.hidden = true;
        if (typeof window.ScrollTrigger !== 'undefined') {
          window.ScrollTrigger.refresh();
        }
      }, 520);
    }, LOADER_DURATION_MS);
  };

  const animateKpiCounter = (el) => {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const target = parseInt(el.getAttribute('data-count-target'), 10);
    const suffix = el.getAttribute('data-count-suffix') || '';
    if (!Number.isFinite(target) || prefersReducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    if (typeof window.gsap !== 'undefined') {
      const counter = { val: 0 };
      window.gsap.to(counter, {
        val: target,
        duration: 1.35,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val)}${suffix}`;
        },
        onComplete: () => {
          el.textContent = `${target}${suffix}`;
        },
      });
    } else {
      const start = performance.now();
      const dur = 1100;
      const step = (now) => {
        const progress = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  };

  const initStatCountUp = () => {
    const kpiNums = Array.from(document.querySelectorAll('.kpi-card__num[data-count-target]'));
    if (!kpiNums.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      kpiNums.forEach((el) => {
        const target = el.getAttribute('data-count-target') || '';
        const suffix = el.getAttribute('data-count-suffix') || '';
        el.textContent = `${target}${suffix}`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateKpiCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    kpiNums.forEach((el) => observer.observe(el));
  };

  const initMotion = () => {
    if (prefersReducedMotion || typeof window.gsap === 'undefined') {
      revealAllFallback();
      window.clearTimeout(fallbackTimer);
      initPreloader(null);
      initStatCountUp();
      return;
    }

    const gsap = window.gsap;
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';

    if (hasScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.config({ ignoreMobileResize: true });
    }

    if (isFinePointer && typeof window.Lenis !== 'undefined') {
      lenis = new window.Lenis({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1,
      });

      if (hasScrollTrigger) {
        lenis.on('scroll', window.ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const rafLoop = (t) => {
          lenis.raf(t);
          requestAnimationFrame(rafLoop);
        };
        requestAnimationFrame(rafLoop);
      }
    }

    document.documentElement.classList.add('animations-ready');
    window.clearTimeout(fallbackTimer);

    const mm = gsap.matchMedia();
    const activeHero = document.documentElement.getAttribute('data-hero') === 'b' ? 'b' : 'a';

    // Desktop & Tablet: Scroll Reveals + Parallax + Ambient Loops
    mm.add('(min-width: 768px)', () => {
      if (hasScrollTrigger) {
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
              onComplete: () => el.classList.add('is-revealed'),
            }
          );
        });

        // Subtle inside-frame scroll parallax across hero backdrop & gallery photos
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          if (el.closest('#hero-a') && activeHero !== 'a') return;
          if (el.closest('#hero-b') && activeHero !== 'b') return;

          const factor = parseFloat(el.getAttribute('data-parallax')) || 0.08;
          const isFigure = el.tagName === 'FIGURE';
          const isSkyline = el.classList.contains('bento-banner__skyline');
          const target = isFigure ? el.querySelector('img') || el : el;
          const shiftPercent = Math.max(-9, Math.min(9, factor * 75));

          if (!isSkyline) {
            gsap.set(target, { scale: 1.12 });
          }

          gsap.fromTo(
            target,
            { yPercent: -shiftPercent },
            {
              yPercent: shiftPercent,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('section, .hero-b__card, .cta-banner, .bento-photo-card, .bento-banner') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.85,
              },
            }
          );
        });
      } else {
        revealAllFallback();
      }

      // Ambient Looping Animations (GPU-only transform on desktop/tablet)
      if (activeHero === 'a') {
        gsap.to('#hero-a .hero-badge', {
          y: -6,
          duration: 2.6,
          ease: 'sine.inOut',
          stagger: { each: 0.35, from: 'random' },
          repeat: -1,
          yoyo: true,
        });

        gsap.to('#hero-a .hero-orbit__jet', {
          x: 4,
          y: -5,
          rotation: 2,
          duration: 3.1,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      gsap.to('[data-loop="float"]', {
        y: -8,
        rotation: -0.7,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to('.bento-banner__skyline img', {
        y: -5,
        duration: 3.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // Small Screens: Keep scroll native and reveals instant while honoring stat count-up
    mm.add('(max-width: 767px)', () => {
      revealAllFallback();
    });

    if (hasScrollTrigger) {
      window.addEventListener('orientationchange', () => {
        window.setTimeout(() => window.ScrollTrigger.refresh(), 160);
      });
    }

    initStatCountUp();
    initPreloader(playHeroEntrance);
  };

  /* ------------------------------------------------------------------------
     3. Smooth Anchor Scrolling, Floating Scroll-to-Top & Mobile Drawer
     ------------------------------------------------------------------------ */
  const scrollToSection = (targetId) => {
    if (targetId === '#top') {
      if (lenis && !prefersReducedMotion) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    if (lenis && !prefersReducedMotion) {
      lenis.scrollTo(target, { offset: -16 });
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const initScrollTop = () => {
    const btn = document.getElementById('scroll-top-btn');
    if (!btn) return;

    const syncVisibility = () => {
      const visible = window.scrollY > 420;
      btn.classList.toggle('is-visible', visible);
    };

    syncVisibility();
    window.addEventListener('scroll', syncVisibility, { passive: true });

    btn.addEventListener('click', () => {
      scrollToSection('#top');
    });
  };

  const initNavigation = () => {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-nav-drawer');

    if (toggleBtn && drawer) {
      const panel = drawer.querySelector('.mobile-drawer__panel');
      let previousFocus = null;

      const getFocusable = () =>
        Array.from(
          panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')
        );

      const closeDrawer = (restoreFocus = true) => {
        drawer.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        if (lenis) lenis.start();

        window.setTimeout(() => {
          if (!drawer.classList.contains('is-open')) {
            drawer.hidden = true;
          }
        }, 280);

        if (restoreFocus && previousFocus) {
          previousFocus.focus();
        }
      };

      const openDrawer = () => {
        previousFocus = document.activeElement;
        drawer.hidden = false;
        void drawer.offsetHeight;
        drawer.classList.add('is-open');
        document.body.classList.add('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        if (lenis) lenis.stop();
        if (closeBtn) closeBtn.focus();
      };

      toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        if (expanded) closeDrawer();
        else openDrawer();
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => closeDrawer());
      }

      drawer.querySelectorAll('[data-drawer-close]').forEach((el) => {
        el.addEventListener('click', () => closeDrawer());
      });

      drawer.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            closeDrawer(false);
            window.setTimeout(() => scrollToSection(href), 60);
          }
        });
      });

      document.addEventListener('keydown', (e) => {
        if (!drawer.classList.contains('is-open')) return;
        if (e.key === 'Escape') {
          e.preventDefault();
          closeDrawer();
          return;
        }
        if (e.key === 'Tab') {
          const focusable = getFocusable();
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }

    // Smooth anchor navigation across header, hero B circular badge, buttons & footer
    document
      .querySelectorAll('.site-nav a[href^="#"], .footer-nav a[href^="#"], a.btn[href^="#"], a.hero-b__stamp[href^="#"], a.brand-lockup[href^="#"]')
      .forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href && href.length >= 1) {
            e.preventDefault();
            scrollToSection(href);
          }
        });
      });
  };

  /* ------------------------------------------------------------------------
     4. Hero A & Hero B Tab Switchers & Enquiry Prefill Triggers
     ------------------------------------------------------------------------ */
  const DIVISION_OPTIONS = {
    travels: {
      divisionLabel: 'Brielle Travels',
      placeholder: 'e.g. Next month',
      items: [
        'Canada (Tourism / Business Visa)',
        'Italy (Schengen Visa)',
        'China (Canton Fair Business)',
        'Oman (Residence Permit)',
        'Serbia (Work Visa)',
        'New Zealand (Skilled Work Visa)',
        'Flights, Hotels & Study Abroad',
      ],
    },
    events: {
      divisionLabel: 'Brielle Events',
      placeholder: 'e.g. Saturday in Dec',
      items: [
        'Wedding Planning & Execution',
        'Corporate Function / Gala',
        'Private Party & Guest Logistics',
        'Venue Sourcing, Decor & Catering',
      ],
    },
    errands: {
      divisionLabel: 'Brielle Errands',
      placeholder: 'e.g. This week',
      items: [
        'Grocery & Gift Sourcing',
        'Local Port Harcourt Deliveries',
        'Bank Visits & Scheduling Support',
        'Corporate Administrative Errands',
      ],
    },
  };

  const populateServiceOptions = (selectEl, divisionKey) => {
    const cfg = DIVISION_OPTIONS[divisionKey];
    if (!selectEl || !cfg) return;
    selectEl.innerHTML = '';
    cfg.items.forEach((label) => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      selectEl.appendChild(option);
    });
  };

  const prefillConsultation = (divisionName, serviceText) => {
    const divSelect = document.getElementById('req-division');
    const detailsEl = document.getElementById('req-details');
    const nameEl = document.getElementById('req-name');

    if (divSelect && divisionName) {
      const opt = Array.from(divSelect.options).find((o) => o.value === divisionName);
      if (opt) divSelect.value = opt.value;
    }

    if (detailsEl && serviceText) {
      detailsEl.value = `Enquiry regarding: ${serviceText}`;
    }

    scrollToSection('#contact');
    window.setTimeout(() => {
      if (nameEl) nameEl.focus({ preventScroll: true });
    }, 520);
  };

  const initHeroFinder = () => {
    // Hero A Finder
    const tabsA = document.querySelectorAll('.hero-finder__tab');
    const selectA = document.getElementById('finder-service');
    const dateInputA = document.getElementById('finder-date');
    const formA = document.getElementById('hero-finder-form');
    let divA = 'travels';

    if (tabsA.length && selectA) {
      tabsA.forEach((tab) => {
        tab.addEventListener('click', () => {
          const key = tab.getAttribute('data-division');
          if (!key || !DIVISION_OPTIONS[key]) return;
          divA = key;
          tabsA.forEach((t) => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
          populateServiceOptions(selectA, key);
          if (dateInputA) dateInputA.placeholder = DIVISION_OPTIONS[key].placeholder;
        });
      });
    }

    if (formA) {
      formA.addEventListener('submit', (e) => {
        e.preventDefault();
        const cfg = DIVISION_OPTIONS[divA] || DIVISION_OPTIONS.travels;
        const svc = selectA ? selectA.value : '';
        const dateNote = dateInputA && dateInputA.value.trim() ? ` (Target timeline: ${dateInputA.value.trim()})` : '';
        prefillConsultation(cfg.divisionLabel, `${svc}${dateNote}`);
      });
    }

    // Hero B Finder
    const pillsB = document.querySelectorAll('.hero-b-pill[data-b-division]');
    const divSelectB = document.getElementById('finder-b-division');
    const selectB = document.getElementById('finder-b-service');
    const dateInputB = document.getElementById('finder-b-date');
    const formB = document.getElementById('hero-b-finder-form');
    let divB = 'travels';

    const syncHeroBDivision = (key) => {
      if (!DIVISION_OPTIONS[key]) return;
      divB = key;
      pillsB.forEach((p) => {
        p.setAttribute('aria-selected', p.getAttribute('data-b-division') === key ? 'true' : 'false');
      });
      if (divSelectB) {
        divSelectB.value = DIVISION_OPTIONS[key].divisionLabel;
      }
      populateServiceOptions(selectB, key);
      if (dateInputB) dateInputB.placeholder = DIVISION_OPTIONS[key].placeholder;
    };

    if (pillsB.length) {
      pillsB.forEach((pill) => {
        pill.addEventListener('click', () => {
          const key = pill.getAttribute('data-b-division');
          syncHeroBDivision(key);
        });
      });
    }

    if (divSelectB) {
      divSelectB.addEventListener('change', () => {
        const matchKey = Object.keys(DIVISION_OPTIONS).find(
          (k) => DIVISION_OPTIONS[k].divisionLabel === divSelectB.value
        );
        if (matchKey) syncHeroBDivision(matchKey);
      });
    }

    if (formB) {
      formB.addEventListener('submit', (e) => {
        e.preventDefault();
        const cfg = DIVISION_OPTIONS[divB] || DIVISION_OPTIONS.travels;
        const svc = selectB ? selectB.value : '';
        const dateNote = dateInputB && dateInputB.value.trim() ? ` (Target timeline: ${dateInputB.value.trim()})` : '';
        prefillConsultation(cfg.divisionLabel, `${svc}${dateNote}`);
      });
    }

    // Package card prefill buttons
    document.querySelectorAll('[data-prefill-service]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const svc = btn.getAttribute('data-prefill-service');
        const div = btn.getAttribute('data-prefill-division');
        prefillConsultation(div, svc);
      });
    });
  };

  /* ------------------------------------------------------------------------
     5. Swiper Carousels (Packages & Proof)
     ------------------------------------------------------------------------ */
  const initCarousels = () => {
    if (typeof window.Swiper === 'undefined') return;

    const pkgEl = document.getElementById('packages-swiper');
    if (pkgEl) {
      new window.Swiper(pkgEl, {
        slidesPerView: 1.05,
        spaceBetween: 16,
        watchOverflow: true,
        touchAngle: 45,
        touchStartPreventDefault: false,
        preventClicks: true,
        preventClicksPropagation: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        a11y: {
          enabled: true,
          prevSlideMessage: 'Previous service package',
          nextSlideMessage: 'Next service package',
        },
        navigation: {
          prevEl: '#pkg-prev',
          nextEl: '#pkg-next',
        },
        pagination: {
          el: '.packages-pagination',
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 22,
          },
        },
      });
    }

    const proofEl = document.getElementById('proof-swiper');
    if (proofEl) {
      new window.Swiper(proofEl, {
        slidesPerView: 1,
        spaceBetween: 16,
        watchOverflow: true,
        touchAngle: 45,
        touchStartPreventDefault: false,
        preventClicks: true,
        preventClicksPropagation: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        a11y: {
          enabled: true,
          prevSlideMessage: 'Previous client review',
          nextSlideMessage: 'Next client review',
        },
        navigation: {
          prevEl: '#proof-prev',
          nextEl: '#proof-next',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
        },
      });
    }
  };

  /* ------------------------------------------------------------------------
     6. Interactive Footer Wordmark Letter-Wave & Static Forms
     ------------------------------------------------------------------------ */
  const initFooterWordmark = () => {
    const wordmark = document.getElementById('footer-wordmark');
    if (!wordmark) return;

    const chars = Array.from(wordmark.querySelectorAll('.footer-char'));
    if (!chars.length) return;

    const clearStates = () => {
      chars.forEach((c) => c.classList.remove('is-wave-peak', 'is-wave-near'));
    };

    const highlightAt = (idx) => {
      clearStates();
      if (chars[idx] && !chars[idx].classList.contains('footer-char--space')) {
        chars[idx].classList.add('is-wave-peak');
      }
      if (chars[idx - 1] && !chars[idx - 1].classList.contains('footer-char--space')) {
        chars[idx - 1].classList.add('is-wave-near');
      }
      if (chars[idx + 1] && !chars[idx + 1].classList.contains('footer-char--space')) {
        chars[idx + 1].classList.add('is-wave-near');
      }
    };

    const runRippleSequence = () => {
      if (prefersReducedMotion) return;
      chars.forEach((ch, idx) => {
        if (ch.classList.contains('footer-char--space')) return;
        window.setTimeout(() => {
          highlightAt(idx);
          if (idx === chars.length - 1) {
            window.setTimeout(clearStates, 260);
          }
        }, idx * 45);
      });
    };

    chars.forEach((ch, idx) => {
      if (ch.classList.contains('footer-char--space')) return;
      ch.addEventListener('pointerenter', () => highlightAt(idx));
      ch.addEventListener('click', (e) => {
        e.stopPropagation();
        runRippleSequence();
      });
    });

    wordmark.addEventListener('pointerleave', clearStates);
    wordmark.addEventListener('click', runRippleSequence);

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      let didAutoRipple = false;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !didAutoRipple) {
              didAutoRipple = true;
              runRippleSequence();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(wordmark);
    }
  };

  const initForms = () => {
    const form = document.getElementById('consultation-form');
    const statusBox = document.getElementById('consultation-status');

    if (form && statusBox) {
      const fields = [
        {
          el: document.getElementById('req-name'),
          err: document.getElementById('err-name'),
          validate: (v) => (v.trim().length >= 2 ? '' : 'Please enter your full name.'),
        },
        {
          el: document.getElementById('req-phone'),
          err: document.getElementById('err-phone'),
          validate: (v) => (v.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone or WhatsApp number.'),
        },
        {
          el: document.getElementById('req-email'),
          err: document.getElementById('err-email'),
          validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
        },
        {
          el: document.getElementById('req-details'),
          err: document.getElementById('err-details'),
          validate: (v) => (v.trim().length >= 8 ? '' : 'Please share a brief summary of what you need.'),
        },
      ];

      fields.forEach(({ el, err }) => {
        if (!el) return;
        el.addEventListener('input', () => {
          el.removeAttribute('aria-invalid');
          if (err) err.textContent = '';
          statusBox.classList.remove('is-visible');
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let firstInvalid = null;

        fields.forEach(({ el, err, validate }) => {
          if (!el) return;
          const msg = validate(el.value);
          if (msg) {
            el.setAttribute('aria-invalid', 'true');
            if (err) err.textContent = msg;
            if (!firstInvalid) firstInvalid = el;
          } else {
            el.removeAttribute('aria-invalid');
            if (err) err.textContent = '';
          }
        });

        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        const name = document.getElementById('req-name').value.trim();
        const phone = document.getElementById('req-phone').value.trim();
        const email = document.getElementById('req-email').value.trim();
        const division = document.getElementById('req-division').value;
        const details = document.getElementById('req-details').value.trim();

        const waMsg = encodeURIComponent(
          `Hello Brielle Edge Solutions,\nName: ${name}\nDivision: ${division}\nPhone: ${phone}\nEmail: ${email}\nRequest: ${details}`
        );
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

        statusBox.innerHTML = '';
        const textNode = document.createElement('p');
        textNode.style.margin = '0';
        textNode.textContent = `Request prepared for ${division}. Tap below to send this brief directly to our Port Harcourt WhatsApp desk or call +234 816 920 3706.`;

        const link = document.createElement('a');
        link.href = waUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Send Prepared Brief on WhatsApp \u2192';

        statusBox.appendChild(textNode);
        statusBox.appendChild(link);
        statusBox.classList.add('is-visible');
      });
    }

    const footerForm = document.getElementById('footer-callback-form');
    const footerInput = document.getElementById('footer-contact-input');
    const footerMsg = document.getElementById('footer-callback-msg');

    if (footerForm && footerInput && footerMsg) {
      footerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = footerInput.value.trim();
        if (val.length < 5) {
          footerMsg.textContent = 'Please enter a valid email address or WhatsApp number.';
          footerInput.focus();
          return;
        }
        const waText = encodeURIComponent(`Hello Brielle Edge Solutions, please reach out to me via: ${val}`);
        footerMsg.innerHTML = '';
        const span = document.createElement('span');
        span.textContent = 'Callback note ready — ';
        const a = document.createElement('a');
        a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.textDecoration = 'underline';
        a.style.color = '#FFFFFF';
        a.textContent = 'open WhatsApp to confirm now';
        footerMsg.appendChild(span);
        footerMsg.appendChild(a);
        footerInput.value = '';
      });
    }
  };

  /* ------------------------------------------------------------------------
     Init on DOM Ready
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
      yearEl.textContent = String(Math.max(2026, new Date().getFullYear()));
    }

    initNavigation();
    initHeroFinder();
    initCarousels();
    initForms();
    initScrollTop();
    initFooterWordmark();
    initMotion();
  });
})();
