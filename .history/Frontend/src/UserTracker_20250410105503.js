// ===== Utility Functions =====
const formatDateForMySQL = (isoDate) => {
  const date = new Date(isoDate);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
};

const getBrowserName = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Unknown";
};

const getDeviceType = () => {
  return /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
};

const generateSessionID = () => {
  return 'session_' + Math.random().toString(36).substr(2, 9);
};

// ===== Route Check =====
const isTrackingAllowed = () => {
  return window.location.pathname !== "/analytics";  // Disable only for /analytics route
};

// ===== Session Setup =====
let userSession = null;

if (isTrackingAllowed()) {
  userSession = {
    session_id: sessionStorage.getItem("session_id") || generateSessionID(),
    device_info: getDeviceType(),
    browser_info: getBrowserName(),
    os_info: navigator.platform,
    referrer: document.referrer,
    entry_time: new Date().toISOString(),
    exit_time: null,
    is_new_user: !sessionStorage.getItem("visited_before"),
    section_viewed: [],
    interactions: [],
  };

  sessionStorage.setItem("visited_before", "true");
  sessionStorage.setItem("session_id", userSession.session_id);
}

// ===== Tracking APIs =====
export const trackSection = (sectionName) => {
  if (!isTrackingAllowed() || !userSession) return;

  const timestamp = new Date().toISOString();
  if (!userSession.section_viewed.find(s => s.section === sectionName)) {
    userSession.section_viewed.push({
      section: sectionName,
      time: formatDateForMySQL(timestamp),
    });
  }
};

export const trackAction = (actionName) => {
  if (!isTrackingAllowed() || !userSession) return;

  const timestamp = new Date().toISOString();
  userSession.interactions.push({
    action: actionName,
    time: formatDateForMySQL(timestamp),
  });
};

// ===== Send Tracking Data on Exit =====
let trackingSent = false;

export const sendTrackingData = () => {
  if (trackingSent || !isTrackingAllowed() || !userSession) return;

  userSession.exit_time = new Date().toISOString();

  const payload = {
    ...userSession,
    entry_time: formatDateForMySQL(userSession.entry_time),
    exit_time: formatDateForMySQL(userSession.exit_time),
    time_spent: Math.floor(
      (new Date(userSession.exit_time) - new Date(userSession.entry_time)) / 1000
    ),
  };

  console.log("Sending tracking data:", payload);

  try {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const success = navigator.sendBeacon(`${import.meta.env.VITE_BACKEND_BASE_URL}/track`, blob);

    if (success) {
      console.log("✅ Tracking sent via sendBeacon");
    } else {
      throw new Error("sendBeacon failed");
    }
  } catch (e) {
    console.warn("⚠️ sendBeacon failed, using fetch...");
    fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
    .then((res) => res.ok && console.log("Tracking sent via fetch"))
    .catch((err) => console.error("Failed to send tracking:", err));
  }

  trackingSent = true;
};

// ===== Auto Send on Exit/Close Events =====
if (isTrackingAllowed()) {
  window.addEventListener("beforeunload", sendTrackingData);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendTrackingData();
    }
  });
}
