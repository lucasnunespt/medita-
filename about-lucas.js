(() => {
  const story = document.querySelector("[data-story-scroll]");
  const track = document.querySelector("[data-story-track]");
  const progressBar = document.querySelector("[data-progress-bar]");
  const progressCurrent = document.querySelector("[data-progress-current]");
  const nodes = Array.from(document.querySelectorAll("[data-node]"));
  const particleCanvas = document.querySelector("[data-neural-particles]");
  const particleContext = particleCanvas?.getContext("2d", { alpha: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let maxTranslate = 0;
  let ticking = false;
  let currentProgress = 0;
  let activeChapterIndex = 0;
  let previousScrollY = window.scrollY;
  let scrollDirection = 0;
  let pointerX = 0.5;
  let pointerY = 0.5;
  let pointerInfluence = 0;
  let particleAnimationId = 0;
  let particleWidth = 0;
  let particleHeight = 0;
  let pixelRatio = 1;
  const particles = [];
  const particleCount = 32;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function formatChapter(index) {
    return String(index).padStart(2, "0");
  }

  function updateProgress(progress) {
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    if (progressCurrent && nodes.length) {
      const viewportCenter = progress * maxTranslate + window.innerWidth * 0.5;
      let activeIndex = 0;

      nodes.forEach((node, index) => {
        const nodeCenter = node.offsetLeft + node.offsetWidth * 0.5;
        const activeCenter = nodes[activeIndex].offsetLeft + nodes[activeIndex].offsetWidth * 0.5;

        if (Math.abs(nodeCenter - viewportCenter) < Math.abs(activeCenter - viewportCenter)) {
          activeIndex = index;
        }
      });

      activeChapterIndex = activeIndex;
      progressCurrent.textContent = formatChapter(activeIndex + 1);
    }
  }

  function updateParallax(progress) {
    if (reducedMotion.matches) {
      nodes.forEach((node) => {
        node.style.setProperty("--node-parallax", "0px");
      });
      return;
    }

    nodes.forEach((node) => {
      const depth = Number.parseFloat(node.dataset.depth || "0.1");
      const nodeCenter = node.offsetLeft + node.offsetWidth * 0.5;
      const viewportCenter = progress * maxTranslate + window.innerWidth * 0.5;
      const distance = (nodeCenter - viewportCenter) / window.innerWidth;
      const parallax = clamp(distance * depth * 42, -18, 18);
      node.style.setProperty("--node-parallax", `${parallax.toFixed(2)}px`);
    });
  }

  function measureStory() {
    if (!story || !track) {
      return;
    }

    maxTranslate = Math.max(0, track.offsetWidth - window.innerWidth);
    story.style.setProperty("--story-height", `${maxTranslate + window.innerHeight}px`);
    updateStory();
  }

  function updateStory() {
    if (!story || !track) {
      return;
    }

    const rect = story.getBoundingClientRect();
    const scrollable = Math.max(1, story.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    currentProgress = progress;
    track.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
    updateProgress(progress);
    updateParallax(progress);
  }

  function requestStoryUpdate() {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateStory();
      ticking = false;
    });
  }

  window.addEventListener("scroll", requestStoryUpdate, { passive: true });
  window.addEventListener("resize", measureStory);
  window.addEventListener("scroll", () => {
    const nextScrollY = window.scrollY;
    scrollDirection = clamp((nextScrollY - previousScrollY) / 90, -1, 1);
    previousScrollY = nextScrollY;
  }, { passive: true });
  window.addEventListener("pointermove", (event) => {
    pointerX = clamp(event.clientX / Math.max(1, window.innerWidth), 0, 1);
    pointerY = clamp(event.clientY / Math.max(1, window.innerHeight), 0, 1);
    pointerInfluence = reducedMotion.matches ? 0 : 1;
  }, { passive: true });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", measureStory);
  } else {
    reducedMotion.addListener(measureStory);
  }

  window.addEventListener("load", measureStory);
  measureStory();

  function createParticle(index) {
    const rootBias = index < particleCount * 0.36;
    const futureBias = index > particleCount * 0.74;

    return {
      x: Math.random(),
      y: 0.16 + Math.random() * 0.68,
      vx: (Math.random() - 0.5) * (rootBias ? 0.00008 : 0.00014),
      vy: (Math.random() - 0.5) * 0.0001,
      radius: rootBias ? 1.35 + Math.random() * 1.6 : futureBias ? 1.7 + Math.random() * 2 : 1.45 + Math.random() * 1.75,
      phase: Math.random() * Math.PI * 2,
      depth: 0.24 + Math.random() * 0.76,
      lane: Math.random()
    };
  }

  function initializeParticles() {
    particles.length = 0;

    for (let index = 0; index < particleCount; index += 1) {
      particles.push(createParticle(index));
    }
  }

  function resizeParticles() {
    if (!particleCanvas || !particleContext) {
      return;
    }

    const rect = particleCanvas.getBoundingClientRect();
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    particleWidth = Math.max(1, Math.floor(rect.width));
    particleHeight = Math.max(1, Math.floor(rect.height));
    particleCanvas.width = Math.floor(particleWidth * pixelRatio);
    particleCanvas.height = Math.floor(particleHeight * pixelRatio);
    particleContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function particleColor(stage, alpha) {
    if (stage < 0.28) {
      return `rgba(92, 62, 42, ${alpha})`;
    }

    if (stage < 0.58) {
      return `rgba(118, 144, 132, ${alpha})`;
    }

    if (stage < 0.82) {
      return `rgba(210, 159, 102, ${alpha})`;
    }

    return `rgba(159, 214, 199, ${alpha})`;
  }

  function drawParticles(time = 0) {
    if (!particleCanvas || !particleContext) {
      return;
    }

    particleContext.fillStyle = "rgba(244, 244, 241, 0.3)";
    particleContext.fillRect(0, 0, particleWidth, particleHeight);

    if (reducedMotion.matches) {
      particleAnimationId = window.requestAnimationFrame(drawParticles);
      return;
    }

    const stage = currentProgress;
    const density = stage < 0.28 ? 0.13 : stage < 0.58 ? 0.24 : stage < 0.82 ? 0.46 : 0.62;
    const opacity = stage < 0.28 ? 0.22 : stage < 0.58 ? 0.34 : stage < 0.82 ? 0.5 : 0.64;
    const speed = stage < 0.28 ? 0.18 : stage < 0.58 ? 0.24 : stage < 0.82 ? 0.3 : 0.26;
    const connectionDistance = particleWidth * (stage < 0.28 ? 0.095 : stage < 0.58 ? 0.12 : stage < 0.82 ? 0.16 : 0.19);
    const pointerEase = pointerInfluence * 0.00022;
    const scrollEase = scrollDirection * 0.00016;

    pointerInfluence *= 0.94;
    scrollDirection *= 0.9;

    particles.forEach((particle, index) => {
      const drift = Math.sin(time * 0.00035 + particle.phase + stage * 3) * 0.00008;
      const organization = stage * 0.00018;
      const targetY = 0.22 + particle.lane * 0.56;

      particle.vx += drift * particle.depth + scrollEase * particle.depth;
      particle.vy += (targetY - particle.y) * organization;
      particle.vx += (pointerX - particle.x) * pointerEase * particle.depth;
      particle.vy += (pointerY - particle.y) * pointerEase * 0.55 * particle.depth;
      particle.vx *= 0.986;
      particle.vy *= 0.986;
      particle.x += particle.vx * speed * 8;
      particle.y += particle.vy * speed * 8;

      if (particle.x < -0.05) particle.x = 1.05;
      if (particle.x > 1.08) particle.x = -0.03;
      particle.y = clamp(particle.y, 0.07, 0.93);

      const x = particle.x * particleWidth;
      const y = particle.y * particleHeight;
      const pulse = stage > 0.82 ? 0.6 + Math.sin(time * 0.002 + particle.phase) * 0.28 : 0.6;
      const radius = particle.radius * (1 + pulse * stage * 0.28);

      particleContext.beginPath();
      particleContext.fillStyle = particleColor(stage, opacity * (0.55 + particle.depth * 0.45));
      particleContext.arc(x, y, radius, 0, Math.PI * 2);
      particleContext.fill();

      if (stage > 0.12) {
        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const other = particles[nextIndex];
          const dx = x - other.x * particleWidth;
          const dy = y - other.y * particleHeight;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance && Math.random() < density) {
            const lineAlpha = (1 - distance / connectionDistance) * opacity * (stage < 0.58 ? 0.18 : 0.34);
            particleContext.beginPath();
            particleContext.strokeStyle = particleColor(stage, lineAlpha);
            particleContext.lineWidth = stage > 0.8 ? 0.9 : 0.65;
            particleContext.moveTo(x, y);
            particleContext.quadraticCurveTo(
              (x + other.x * particleWidth) * 0.5,
              (y + other.y * particleHeight) * 0.5 + Math.sin(time * 0.0005 + index) * 9,
              other.x * particleWidth,
              other.y * particleHeight
            );
            particleContext.stroke();
          }
        }
      }
    });

    particleAnimationId = window.requestAnimationFrame(drawParticles);
  }

  if (particleCanvas && particleContext) {
    initializeParticles();
    resizeParticles();
    window.addEventListener("resize", resizeParticles);
    particleAnimationId = window.requestAnimationFrame(drawParticles);
  }

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const closeButton = document.querySelector("[data-lightbox-close]");
  let lastFocusedElement = null;

  function openLightbox(src, alt, opener) {
    if (!lightbox || !lightboxImage) {
      return;
    }

    function focusCloseButton() {
      if (closeButton && typeof closeButton.focus === "function") {
        closeButton.focus({ preventScroll: true });
      } else if (typeof lightbox.focus === "function") {
        lightbox.focus({ preventScroll: true });
      }
    }

    lastFocusedElement = opener || document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    window.requestAnimationFrame(() => {
      focusCloseButton();
      window.setTimeout(focusCloseButton, 60);
    });
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage || lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.classList.remove("lightbox-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(button.dataset.lightboxSrc, button.dataset.lightboxAlt, button);
    });
  });

  closeButton?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox || lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "Tab" && closeButton) {
      event.preventDefault();
      closeButton.focus();
    }
  });
})();
