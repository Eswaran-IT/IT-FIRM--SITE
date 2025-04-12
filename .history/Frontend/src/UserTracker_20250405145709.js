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

// Save flag so user isn't marked as new next time
sessionStorage.setItem("visited_before", "true");

// Track which section the user viewed
export const trackSection = (sectionName) => {
  const timestamp = new Date().toISOString();
  userSession.section_viewed.push({ section: sectionName, time: formatDateForMySQL(timestamp) });
};

// Track custom user actions
export const trackAction = (actionName) => {
  const timestamp = new Date().toISOString();
  userSession.interactions.push({ action: actionName, time: formatDateForMySQL(timestamp) });
};

// Send tracking data to the backend before user leaves the page
export const sendTrackingData = () => {
  userSession.exit_time = new Date().toISOString();

  // Format entry and exit times for MySQL
  userSession.entry_time = formatDateForMySQL(userSession.entry_time);
  userSession.exit_time = formatDateForMySQL(userSession.exit_time);

  // Calculate time spent
  const timeSpentMs = new Date(userSession.exit_time) - new Date(userSession.entry_time);
  userSession.time_spent = Math.floor(timeSpentMs / 1000); // in seconds

  // Send using Beacon API
  const url = "http://localhost:5000/track"; // Backend API URL
  const data = JSON.stringify(userSession);
  const blob = new Blob([data], { type: "application/json" });

  navigator.sendBeacon(url, blob);

  console.log("✅ User tracking data sent:", userSession);
};

// Ensure tracking data is sent when user leaves
window.addEventListener("beforeunload", sendTrackingData);
