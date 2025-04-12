// ===== Utility Functions =====

// Format ISO date to MySQL format
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

// Get browser name from user agent
const getBrowserName = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Unknown";
};

// Get device type (Mobile or Desktop)
const getDeviceType = () => {
  return /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
};

// Generate unique session ID for each session
const generateSessionID = () => {
  return 'session_' + Math.random().toString(36).substr(2, 9);
};

// ===== Session Init =====
let userSession = {
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

// Store session ID in sessionStorage for persistence across reloads
sessionStorage.setItem("visited_before", "true");
sessionStorage.setItem("session_id", userSession.session_id);

// ===== Track Sections & Actions =====

export const trackSection = (sectionName) => {
  const timestamp = new Date().toISOString();
  if (!userSession.section_viewed.find((s) => s.section === sectionName)) {
    userSession.section_viewed.push({
      section: sectionName,
      time: formatDateForMySQL(timestamp),
    });
  }
};

export const trackAction = (actionName) => {
  const timestamp = new Date().toISOString();
  userSession.interactions.push({
    action: actionName,
    time: formatDateForMySQL(timestamp),
  });
};

// ===== Send Tracking Data =====

export const sendTrackingData = () => {
  userSession.exit_time = new Date().toISOString();

  const payload = {
    ...userSession,
    entry_time: formatDateForMySQL(userSession.entry_time),
    exit_time: formatDateForMySQL(userSession.exit_time),
    time_spent: Math.floor(
      (new Date(userSession.exit_time) - new Date(userSession.entry_time)) / 1000
    ),
  };

  // Log the payload to verify data
  console.log("📤 Sending tracking data:", payload);

  try {
    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });

    const success = navigator.sendBeacon("http://localhost:5000/track", blob);
    if (success) {
      console.log("✅ Tracking sent via sendBeacon");
    } else {
      throw new Error("sendBeacon failed");
    }
  } catch (e) {
    console.warn("⚠️ Beacon failed, trying fetch...");
    fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then((res) => {
        if (res.ok) console.log("✅ Tracking sent via fetch");
      })
      .catch((err) => console.error("❌ Tracking failed:", err));
  }
};

// ===== Event Listeners for Exit =====

// Trigger tracking when the user is about to leave the page (before refresh or close)
window.addEventListener("beforeunload", sendTrackingData);

// Track when the page visibility changes (for hidden tabs or minimized windows)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    sendTrackingData();
  }
});

// Optionally, send tracking data periodically (e.g., every 30 seconds)
setInterval(() => {
  sendTrackingData();
}, 30000); // Sends tracking data every 30 seconds

