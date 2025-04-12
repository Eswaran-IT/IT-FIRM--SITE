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
  device_info: getDeviceType(),             // Track device type
  browser_info: getBrowserName(),           // Track browser name
  entry_time: new Date().toISOString(),     // ISO for now, will convert before sending
  exit_time: null,
  is_new_user: !sessionStorage.getItem("visited_before"),
};

// Mark as returning user
sessionStorage.setItem("visited_before", "true");

// Track section views (optional, enabled if needed)
export const trackSection = (sectionName) => {
  // You can uncomment and add this tracking array to `userSession` if needed
  // const timestamp = new Date().toISOString();
  // if (!userSession.section_viewed) userSession.section_viewed = [];
  // userSession.section_viewed.push({ section: sectionName, time: timestamp });
};

// Track custom actions (optional)
export const trackAction = (actionName) => {
  // const timestamp = new Date().toISOString();
  // if (!userSession.interactions) userSession.interactions = [];
  // userSession.interactions.push({ action: actionName, time: timestamp });
};

// Send tracking data on page exit
export const sendTrackingData = () => {
  userSession.exit_time = new Date().toISOString();

  // Format for MySQL
  userSession.entry_time = formatDateForMySQL(userSession.entry_time);
  userSession.exit_time = formatDateForMySQL(userSession.exit_time);

  const timeSpentMs = new Date(userSession.exit_time) - new Date(userSession.entry_time);
  userSession.time_spent = Math.floor(timeSpentMs / 1000); // in seconds

  const url = "http://localhost:5000/track"; // Your backend API
  const data = JSON.stringify(userSession);
  const blob = new Blob([data], { type: "application/json" });

  navigator.sendBeacon(url, blob);

  console.log("✅ User tracking data sent.");
};

// Ensure it's sent before unload
window.addEventListener("beforeunload", sendTrackingData);
