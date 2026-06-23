/* feedback.js - Feedback saving logic and flow controls for NeuroMedit */

(() => {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("source") || "";
  const practice = params.get("practice") || "";
  const status = params.get("status") || "";

  // 1. Immersion mode detection
  // If we came from a meditation session (has status or source parameters), hide menus
  const isPostMeditation = status === "completed" || status === "exited" || source || practice;
  if (isPostMeditation) {
    document.body.classList.add("immersion-mode");
  }

  // 2. Firebase variables
  let auth = null;
  let db = null;
  let doc = null;
  let setDoc = null;
  let currentUser = null;

  async function initFirebase() {
    try {
      const fb = await import('./firebase-init.js');
      auth = fb.auth;
      db = fb.db;
      doc = fb.doc;
      setDoc = fb.setDoc;

      fb.onAuthStateChanged(auth, (user) => {
        currentUser = user;
      });
    } catch (e) {
      console.warn("Firebase failed to load. Operating in guest mode.", e);
    }
  }

  initFirebase();

  // 3. UI references
  const card = document.querySelector(".complete-card");
  const question = document.querySelector("[data-feedback-question]");
  const optionsContainer = document.querySelector("[data-feedback-options]");
  const gratitudeMessage = document.querySelector("[data-feedback-thank-you]");

  // Reveal options container once scripts are ready
  if (optionsContainer) {
    optionsContainer.hidden = false;
  }

  // 4. Helper to get translation language
  function getFeedbackLanguage() {
    return localStorage.getItem("neuromedit-language")
      || localStorage.getItem("preferredLanguage")
      || document.documentElement.lang
      || "pt";
  }

  // 5. Calculate session duration in seconds
  function getSessionDuration() {
    const durationParam = params.get("duration");
    if (durationParam) {
      const parsed = Number(durationParam);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed > 1000 ? Math.round(parsed / 1000) : parsed;
      }
    }

    // Fallback estimates based on practice or source
    if (practice === "initial-pause" || source === "index") return 120; // 2 min
    if (practice === "before-sleep" || source === "sleep") return 480; // 8 min

    // Fallback from sessionStorage containing previous session name
    try {
      const lastSession = sessionStorage.getItem("neuromedit.lastSession") || "";
      if (lastSession.includes("calm")) return 180; // 3 min
      if (lastSession.includes("focus")) return 240; // 4 min
      if (lastSession.includes("body")) return 360; // 6 min
      if (lastSession.includes("sleep")) return 480; // 8 min
    } catch (e) {
      // ignore
    }

    if (source === "calm") return 180;
    if (source === "focus") return 240;
    if (source === "body") return 360;

    return 120; // default fallback 2 min
  }

  // 6. Local storage save fallback
  function saveToLocalStorage(feeling, duration) {
    const key = "guest-feedback";
    const entry = {
      timestamp: new Date().toISOString(),
      feeling,
      duration
    };

    try {
      const existingRaw = localStorage.getItem(key);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const safeExisting = Array.isArray(existing) ? existing : [];
      safeExisting.push(entry);
      localStorage.setItem(key, JSON.stringify(safeExisting));
    } catch (error) {
      console.warn("Could not save guest feedback in localStorage", error);
      try {
        localStorage.setItem(key, JSON.stringify([entry]));
      } catch (err) {
        console.error("Critical storage write failure", err);
      }
    }
  }

  // 7. Click listener on options
  optionsContainer?.addEventListener("click", async (event) => {
    const button = event.target.closest(".feedback-option");
    if (!button) return;

    const feeling = button.textContent.trim();
    const duration = getSessionDuration();

    // Disable interaction immediately and start fade out transition
    if (optionsContainer) {
      optionsContainer.style.pointerEvents = "none";
      optionsContainer.style.opacity = "0";
    }
    if (question) {
      question.style.opacity = "0";
    }

    // Save logic (async)
    if (auth && currentUser && db && setDoc && doc) {
      // Logged in: Write to Firestore
      try {
        const uniqueId = `${currentUser.uid}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const feedbackRef = doc(db, "meditation-feedback", uniqueId);
        await setDoc(feedbackRef, {
          timestamp: new Date().toISOString(),
          feeling,
          duration,
          uid: currentUser.uid
        });
      } catch (firestoreError) {
        console.warn("Firestore save failed, using local storage fallback", firestoreError);
        saveToLocalStorage(feeling, duration);
      }
    } else {
      // Guest: Write to localStorage
      saveToLocalStorage(feeling, duration);
    }

    // After the fade-out transition (350ms), hide elements and show gratitude message
    setTimeout(() => {
      if (question) question.hidden = true;
      if (optionsContainer) optionsContainer.hidden = true;

      // Show gratitude message (fade in)
      if (gratitudeMessage) {
        gratitudeMessage.hidden = false;
        // Force layout calculation
        gratitudeMessage.offsetHeight;
        gratitudeMessage.classList.add("is-visible");
      }
    }, 350);

    // Smooth redirect transition: Fade out after 1.6 seconds, redirect at 2 seconds
    setTimeout(() => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "scale(0.97)";
      }
      document.body.style.transition = "background-color 0.4s ease";
      document.body.style.backgroundColor = "transparent";
    }, 1600);

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
})();
