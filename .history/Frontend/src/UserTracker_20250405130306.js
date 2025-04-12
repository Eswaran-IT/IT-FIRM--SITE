// User session object to store the tracking data
let userSession = {
  device_info: getDeviceInfo(), // Collect only the device name
  browser_info: getBrowserName(), // Collect only the browser name
  section_viewed: [], // Store the sections the user views
  interactions: [], // Store interactions like clicks, scrolls, etc.
  entry_time: new Date().toISOString(), // Store session entry time
  exit_time: null, // Will be set when the user exits
  is_new_user: !sessionStorage.getItem("visited_before"), // Mark as a new user if they haven't visited before
};

// Save flag so the user isn't marked new next time
sessionStorage.setItem("visited_before", "true");

// Function to get device name from user agent
function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  if (/Mobi|Android/i.test(userAgent)) {
      return "Mobile";
  } else {
      return "Desktop";
  }
}

// Function to get browser name from user agent
function getBrowserName() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
  } else if (userAgent.indexOf("Edge") > -1) {
      return "Edge";
  } else {
      return "Unknown";
  }
}

// Track the section the user viewed
export const trackSection = (sectionName) => {
  const timestamp = new Date().toISOString();
  userSession.section_viewed.push({ section: sectionName, time: timestamp });
};

// Track any custom interactions (like button clicks, scroll events, etc.)
export const trackAction = (actionName) => {
  const timestamp = new Date().toISOString();
  userSession.interactions.push({ action: actionName, time: timestamp });
};

// Send the tracking data to the backend when the user exits the page
export const sendTrackingData = async () => {
  userSession.exit_time = new Date().toISOString(); // Set the exit time
  const timeSpentMs = new Date(userSession.exit_time) - new Date(userSession.entry_time); // Calculate time spent
  userSession.time_spent = Math.floor(timeSpentMs / 1000); // Convert to seconds

  // Prepare the data to send
  const dataToSend = {
      device_info: userSession.device_info, // Device type (Mobile or Desktop)
      browser_info: userSession.browser_info, // Browser name (e.g., Chrome, Firefox)
      section_viewed: userSession.section_viewed, // Sections viewed by the user
      interactions: userSession.interactions, // User interactions (actions)
      entry_time: userSession.entry_time, // Session entry time
      exit_time: userSession.exit_time, // Session exit time
      time_spent: userSession.time_spent, // Total time spent on the page (in seconds)
      is_new_user: userSession.is_new_user, // Whether the user is new or returning
  };

  try {
      // Send the data to the backend API (replace with your API URL)
      await fetch("http://localhost:5000/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
      });
      console.log("✅ User tracking data sent.");
  } catch (err) {
      console.error("❌ Failed to send tracking data:", err);
  }
};

// Example sections (You can call these methods wherever the user visits a section)
trackSection("Home");
trackSection("About");
trackSection("Services");
trackSection("Past Experience");
trackSection("Why Us");
trackSection("Contact");
trackSection("Footer");

// Example actions to track (these can be custom actions like button clicks or scrolls)
trackAction("Clicked Button");
trackAction("Scrolled Down");

// When the user exits (you could also use window.onbeforeunload or other events)
window.addEventListener("beforeunload", sendTrackingData);
