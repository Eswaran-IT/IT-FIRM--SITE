let entryTime = new Date();
let sectionViewed = new Set();
let interactions = [];

export const trackSection = (section) => {
  sectionViewed.add(section);
};

export const trackAction = (action) => {
  interactions.push({
    action,
    timestamp: new Date().toISOString(),
  });
};

const getDeviceInfo = () => navigator.userAgent;

const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
};

const isNewUser = () => {
  if (!localStorage.getItem("hasVisited")) {
    localStorage.setItem("hasVisited", "true");
    return true;
  }
  return false;
};

export const sendTrackingData = async () => {
  const exitTime = new Date();
  const timeSpent = Math.floor((exitTime - entryTime) / 1000);

  const payload = {
    device_info: getDeviceInfo(),
    browser_info: getBrowserInfo(),
    section_viewed: Array.from(sectionViewed),
    interactions,
    entry_time: entryTime.toISOString(),
    exit_time: exitTime.toISOString(),
    time_spent: timeSpent,
    is_new_user: isNewUser(),
  };

  try {
    await fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("📊 User tracking data sent");
  } catch (error) {
    console.error("❌ Failed to send tracking data:", error);
  }
};
