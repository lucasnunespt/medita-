/**
 * NeuroMedit — Meditation Core Orchestrator
 * Global orchestration for the Calm Meditation experience and Airlock transition.
 */

(function (window, document) {
  'use strict';

  let idleTimer = null;

  /**
   * Resets the inactivity timer.
   * Removes the .mouse-idle class from <body> to make controls visible,
   * and sets a timeout to hide them after 3000ms.
   */
  function resetIdleTimer() {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    document.body.classList.remove('mouse-idle');

    if (document.body.classList.contains('is-meditating')) {
      idleTimer = setTimeout(function () {
        document.body.classList.add('mouse-idle');
      }, 3000);
    }
  }

  /**
   * Starts the meditation experience with a transition Airlock.
   * @param {HTMLAudioElement} audioElement 
   */
  function startGlobalMeditation(audioElement) {
    const airlock = document.querySelector('.meditation-airlock');
    if (airlock) {
      airlock.classList.add('is-active');
    }
    document.body.classList.add('is-meditating');

    // Initialize the idle timer immediately to prevent controls from showing permanently
    resetIdleTimer();

    setTimeout(function () {
      if (airlock) {
        airlock.classList.remove('is-active');
      }
      if (audioElement && typeof audioElement.play === 'function') {
        audioElement.play().catch(function (error) {
          console.warn('Audio play was prevented or failed:', error);
        });
      }
    }, 3500);
  }

  /**
   * Stops the meditation experience and restores the page elements.
   * @param {HTMLAudioElement} audioElement 
   */
  function stopGlobalMeditation(audioElement) {
    if (audioElement && typeof audioElement.pause === 'function') {
      audioElement.pause();
    }
    document.body.classList.remove('is-meditating', 'mouse-idle');
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }

    const airlock = document.querySelector('.meditation-airlock');
    if (airlock) {
      airlock.classList.remove('is-active');
    }
  }

  // Activity listeners to manage control visibility during meditation
  document.body.addEventListener('mousemove', function () {
    if (document.body.classList.contains('is-meditating')) {
      resetIdleTimer();
    }
  });

  document.body.addEventListener('touchstart', function () {
    if (document.body.classList.contains('is-meditating')) {
      resetIdleTimer();
    }
  }, { passive: true });

  // Expose functions globally for modular inclusion in page flows
  window.startGlobalMeditation = startGlobalMeditation;
  window.stopGlobalMeditation = stopGlobalMeditation;

})(window, document);
