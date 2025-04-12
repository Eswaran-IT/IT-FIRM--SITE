// Utility function to format ISO date into MySQL-compatible format
const formatDateForMySQL = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Get browser name
const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("MSIE") || userAgent.includes("Trident")) return "Internet Explorer";
  return "Unknown";
};

// Get device type (mobile or desktop)
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  return /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop";
};

// Initialize user session data
let userSession = {
  device_info: getDeviceType(),
  browser_info: getBrowserName(),
  entry_time: new Date().toISOString(),
  exit_time: null,
  is_new_user: !sessionStorage.getItem("visited_before"),
  section_viewed: [],
  interactions: [],
};

// Mark the user as visited so next time it's not new
sessionStorage.setItem("visited_before", "true");

// Track section views
export const trackSection = (sectionName) => {
  const timestamp = new Date().toISOString();
  userSession.section_viewed.push({ section: sectionName, time: formatDateForMySQL(timestamp) });
};

// Track user actions
export const trackAction = (actionName) => {
  const timestamp = new Date().toISOString();
  userSession.interactions.push({ action: actionName, time: formatDateForMySQL(timestamp) });
};

// Send tracking data to backend (with Beacon API and fallback)
export const sendTrackingData = () => {
  try {
    userSession.exit_time = new Date().toISOString();

    // Format dates for DB
    const formattedEntry = formatDateForMySQL(userSession.entry_time);
    const formattedExit = formatDateForMySQL(userSession.exit_time);

    // Calculate time spent
    const timeSpentMs = new Date(userSession.exit_time) - new Date(userSession.entry_time);
    const timeSpent = Math.floor(timeSpentMs / 1000); // seconds

    const payload = {
      device_info: userSession.device_info,
      browser_info: userSession.browser_info,
      entry_time: formattedEntry,
      exit_time: formattedExit,
      time_spent: timeSpent,
      is_new_user: userSession.is_new_user,
      section_viewed: userSession.section_viewed,
      interactions: userSession.interactions,
    };

    const url = "http://localhost:5000/track";

    // Primary send with Beacon API (async, no callback)
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const success = navigator.sendBeacon(url, blob);

    if (!success) {
      // Fallback if Beacon API fails
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true, // Allows fetch during unload
      })
        .then((res) => {
          if (res.ok) {
            console.log("✅ Tracking data sent successfully via fetch fallback.");
          } else {
            console.warn("⚠️ Tracking data fetch failed. Server responded with error.");
          }
        })
        .catch((err) => {
          console.error("❌ Fetch fallback error while sending tracking data:", err);
        });
    } else {
      console.log("✅ Tracking data sent successfully via Beacon.");
    }

    console.log("📤 Payload sent:", payload);
  } catch (error) {
    console.error("❌ Error during sendTrackingData:", error);
  }
};

// Ensure tracking data is sent when user leaves the page
window.addEventListener("beforeunload", sendTrackingData);
