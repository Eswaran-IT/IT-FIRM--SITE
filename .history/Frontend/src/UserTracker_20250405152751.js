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

const getBrowserName = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("MSIE") || ua.includes("Trident")) return "Internet Explorer";
  return "Unknown";
};

const getDeviceType = () => /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";

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

export const trackSection = (sectionName) => {
  const timestamp = new Date().toISOString();
  if (!userSession.section_viewed.find(s => s.section === sectionName)) {
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

export const sendTrackingData = () => {
  try {
    userSession.exit_time = new Date().toISOString();
    const payload = {
      ...userSession,
      entry_time: formatDateForMySQL(userSession.entry_time),
      exit_time: formatDateForMySQL(userSession.exit_time),
      time_spent: Math.floor((new Date(userSession.exit_time) - new Date(userSession.entry_time)) / 1000),
    };

    const url = "http://localhost:5000/track";
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });

    const sent = navigator.sendBeacon(url, blob);
    if (!sent) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      })
        .then((res) => res.ok && console.log("✅ Fallback fetch sent tracking data."))
        .catch((err) => console.error("❌ Fetch fallback error:", err));
    } else {
      console.log("✅ Tracking data sent via Beacon.");
    }

    console.log("📦 Sent payload:", payload);
  } catch (err) {
    console.error("❌ Error sending tracking data:", err);
  }
};
