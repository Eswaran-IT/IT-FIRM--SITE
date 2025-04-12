let userSession = {
    ip_address: null, // you can fetch this via backend if needed
    device_info: navigator.userAgent,
    browser_info: navigator.appVersion,
    section_viewed: [],
    interactions: [],
    entry_time: new Date().toISOString(),
    exit_time: null,
    is_new_user: !sessionStorage.getItem("visited_before"),
  };
  
  // Save flag so user isn't marked new next time
  sessionStorage.setItem("visited_before", "true");
  
  // 🧠 Track section views
  export const trackSection = (sectionName) => {
    const timestamp = new Date().toISOString();
    userSession.section_viewed.push({ section: sectionName, time: timestamp });
  };
  
  // 🧠 Track specific user actions (optional)
  export const trackAction = (actionName) => {
    const timestamp = new Date().toISOString();
    userSession.interactions.push({ action: actionName, time: timestamp });
  };
  
  // 📤 Send tracking data to backend
  export const sendTrackingData = async () => {
    userSession.exit_time = new Date().toISOString();
  
    const timeSpentMs = new Date(userSession.exit_time) - new Date(userSession.entry_time);
    userSession.time_spent = Math.floor(timeSpentMs / 1000); // seconds
  
    try {
      await fetch("http://localhost:5000/user-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userSession),
      });
    } catch (err) {
      console.error("📛 Failed to send tracking data:", err);
    }
  };
  