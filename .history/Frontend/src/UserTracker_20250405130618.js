let userSession = {
  ip_address: null, // Set by backend if needed
  device_info: navigator.userAgent,
  browser_info: navigator.appVersion,
  section_viewed: [],
  interactions: [],
  entry_time: new Date().toLocaleString(), // Human-readable entry time
  exit_time: null,
  is_new_user: !sessionStorage.getItem("visited_before"),
};

// Save flag so user isn't marked new next time
sessionStorage.setItem("visited_before", "true");

// Track which section the user viewed
export const trackSection = (sectionName) => {
  const timestamp = new Date().toLocaleString(); // Human-readable timestamp for section view
  userSession.section_viewed.push({ section: sectionName, time: timestamp });
};

// Track any custom interactions if needed
export const trackAction = (actionName) => {
  const timestamp = new Date().toLocaleString(); // Human-readable timestamp for action
  userSession.interactions.push({ action: actionName, time: timestamp });
};

// Send everything to the backend when the user exits
export const sendTrackingData = async () => {
  userSession.exit_time = new Date().toLocaleString(); // Human-readable exit time
  const entryDate = new Date(userSession.entry_time);
  const exitDate = new Date(userSession.exit_time);
  const timeSpentMs = exitDate - entryDate;
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
