"use client";

import { useRef, useState } from "react";
import ReleaseNotesPopup from "@/components/ui/ReleaseNotesPopup";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const { token } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const clickTimes = useRef<number[]>([]);

  // Example release data (replace/update as needed)
  const releases = [
    {
      name: "Skins Update, v1.0",
      image: "/assets/up_01.png", // update with real image path
      description:
        "Added new UI skins, improved performance, and fixed minor bugs.",
    },
    {
      name: "Skins Update, v1.0",
      image: "/assets/up_01.png", // update with real image path
      description:
        "Added new UI skins, improved performance, and fixed minor bugs.",
    },
  ];

  const handleVersionClick = () => {
    const now = Date.now();

    clickTimes.current.push(now);
    // Keep only last 5 clicks
    if (clickTimes.current.length > 5) clickTimes.current.shift();
    // If 5 clicks within 1.2 seconds
    if (clickTimes.current.length === 5 && now - clickTimes.current[0] < 1200) {
      setShowPopup(true);
      clickTimes.current = [];
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <footer className="login-footer" style={{ position: "relative" }}>
      <h2
        className="version-footer"
        title="Click multiple times"
        onClick={handleVersionClick}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        v1.0
      </h2>
      <div>© 2025 Tismo Technology Solutions. All Rights Reserved.</div>
      {/* Show only if logged in */}
      {token && <h2 className="title-footer">TRANSFER</h2>}
      {showPopup && (
        <ReleaseNotesPopup releases={releases} onClose={handleClosePopup} />
      )}
    </footer>
  );
}
