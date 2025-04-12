// Extract only the browser name
const getBrowserName = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Chrome")) {
    return "Chrome";
  } else if (userAgent.includes("Firefox")) {
    return "Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  } else if (userAgent.includes("Edge")) {
    return "Edge";
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
};

// Extract device type (mobile or desktop)
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Mobi|Android/i.test(userAgent)) {
    return "Mobile";
  } else {
    return "Desktop";
  }
};

let userSession = {
  ip_address: null, // Set by backend if needed
  device_info: getDeviceType(), // Store device type (mobile/desktop)
  browser_info: getBrowserName(), // Store only browser name
  section_viewed: [],
  interactions: [],
  entry_time: new Date().toISOString(),
  exit_time: null,
  is_new_user: !sessionStorage.getItem("visited_before"),
};

// Save flag so user isn't marked new next time
sessionStorage.setItem("visited_before", "true");

// Track which section the user viewed
export const trackSection = (sectionName) => {
  const timestamp = new Date().toISOString();
  userSession.section_viewed.push({ section: sectionName, time: timestamp });
};

// Track any custom interactions if needed
export const trackAction = (actionName) => {
  const timestamp = new Date().toISOString();
  userSession.interactions.push({ action: actionName, time: timestamp });
};

// Send everything to the backend when the user exits
export const sendTrackingData = async () => {
  userSession.exit_time = new Date().toISOString();
  const timeSpentMs = new Date(userSession.exit_time) - new Date(userSession.entry_time);
  userSession.time_spent = Math.floor(timeSpentMs / 1000); // Time spent in seconds

  try {
    await fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSession),
    });
    console.log("✅ User tracking data sent.");
  } catch (err) {
    console.error("❌ Failed to send tracking data:", err);
  }
};

// Ensure that the user session data is sent when they leave the page
window.addEventListener("beforeunload", sendTrackingData);

