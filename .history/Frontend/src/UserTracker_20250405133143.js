// Utility function to format ISO date into MySQL compatible format
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

// Get device type (mobile or desktop)
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Mobi|Android/i.test(userAgent)) {
    return "Mobile";
  } else {
    return "Desktop";
  }
};

// Initialize user session data
let userSession = {
  ip_address: null, // Set by backend if needed
  device_info: getDeviceType(),
  browser_info: getBrowserName(),
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

// Send tracking data to the backend using sendBeacon (for beforeunload)
export const sendTrackingData = () => {
  userSession.exit_time = new Date().toISOString();

  // Format entry_time and exit_time to MySQL-compatible format
  userSession.entry_time = formatDateForMySQL(userSession.entry_time);
  userSession.exit_time = formatDateForMySQL(userSession.exit_time);

  const timeSpentMs = new Date(userSession.exit_time) - new Date(userSession.entry_time);
  userSession.time_spent = Math.floor(timeSpentMs / 1000); // Time spent in seconds

  // Use sendBeacon to send data before unloading the page
  const url = "http://localhost:5000/track";
  const data = JSON.stringify(userSession);

  const blob = new Blob([data], { type: "application/json" });
  navigator.sendBeacon(url, blob);

  console.log("✅ User tracking data sent.");
};

// Ensure that the user session data is sent when they leave the page
window.addEventListener("beforeunload", sendTrackingData);
