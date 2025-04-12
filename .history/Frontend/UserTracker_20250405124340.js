import { useEffect } from "react";

const UserTracker = () => {
  useEffect(() => {
    const ip_address = localStorage.getItem("ip_address") || "unknown"; // You can later fetch IP if needed
    const device_info = navigator.userAgent;
    const browser_info = navigator.userAgent;
    const is_new_user = !localStorage.getItem("hasVisited");
    const entry_time = new Date();
    const sectionViewed = new Set();
    const interactions = [];

    localStorage.setItem("hasVisited", true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionViewed.add(entry.target.id);
            interactions.push({
              type: "view",
              section: entry.target.id,
              timestamp: new Date().toISOString(),
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    const handleClick = (e) => {
      if (e.target && e.target.closest("section")) {
        interactions.push({
          type: "click",
          section: e.target.closest("section").id,
          timestamp: new Date().toISOString(),
        });
      }
    };

    window.addEventListener("click", handleClick);

    const handleBeforeUnload = async () => {
      const exit_time = new Date();
      const time_spent = Math.floor((exit_time - entry_time) / 1000); // in seconds

      const payload = {
        ip_address,
        device_info,
        browser_info,
        section_viewed: Array.from(sectionViewed),
        interactions,
        entry_time: entry_time.toISOString().slice(0, 19).replace("T", " "),
        exit_time: exit_time.toISOString().slice(0, 19).replace("T", " "),
        time_spent,
        is_new_user,
      };

      navigator.sendBeacon("http://localhost:5000/track", JSON.stringify(payload));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, []);

  return null; // This doesn't render anything in UI
};

export default UserTracker;
