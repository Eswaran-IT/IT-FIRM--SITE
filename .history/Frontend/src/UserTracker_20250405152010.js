// Utility to format date in MySQL style
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

// Get browser and device info
const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("MSIE") || userAgent.includes("Trident")) return "Internet Explorer";
  return "Unknown";
};

const getDeviceType = () => {
  return /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
};

// Init session
let userSession = {
  device_info: getDeviceType(),
  browser_info: getBrowserName(),
  entry_time: new Date().toISOString(),
  exit_time: null,
  is_new_user: !sessionStorage.getItem("visited_before"),
  section_viewed: [],
  interactions: [],
};

sessionStorage.setItem("visited_before", "true");

// Track section
export const trackSection = (sectionName) => {
  const timestamp = new Date().toISOString();
  if (!userSession.section_viewed.find(s => s.section === sectionName)) {
    userSession.section_viewed.push({
      section: sectionName,
      time: formatDateForMySQL(timestamp),
    });
  }
};

// Track action (optional)
export const trackAction = (actionName) => {
  const timestamp = new Date().toISOString();
  userSession.interactions.push({
    action: actionName,
    time: formatDateForMySQL(timestamp),
  });
};

// Send tracking data
export const sendTrackingData = () => {
  userSession.exit_time = new Date().toISOString();
  const payload = {
    ...userSession,
    entry_time: formatDateForMySQL(userSession.entry_time),
    exit_time: formatDateForMySQL(userSession.exit_time),
    time_spent: Math.floor((new Date(userSession.exit_time) - new Date(userSession.entry_time)) / 1000),
  };

  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  const success = navigator.sendBeacon("http://localhost:5000/track", blob);

  if (!success) {
    fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).then(res => {
      if (res.ok) console.log("✅ Tracking data sent via fetch fallback.");
    }).catch(console.error);
  } else {
    console.log("✅ Tracking data sent via Beacon.");
  }
};
