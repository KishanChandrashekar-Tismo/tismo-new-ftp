import Image from "next/image";
import React from "react";

interface Release {
  name: string;
  image: string; // URL or import
  description: string;
}

interface ReleaseNotesPopupProps {
  releases: Release[];
  onClose: () => void;
}

const ReleaseNotesPopup: React.FC<ReleaseNotesPopupProps> = ({
  releases,
  onClose,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "40px",
        left: "230px",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        width: 400,
        maxWidth: "90vw",
        maxHeight: 650,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", textAlign: "center", marginBottom: 12 }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0 }}>
          Release Notes
        </h2>
      </div>
      <div
        style={{
          overflowY: "auto",
          width: "100%",
          flex: 1,
        }}
      >
        {releases.map((release, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 24,
              borderBottom: "1px solid #eee",
              paddingBottom: 16,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 18, textAlign: "left" }}>
              {release.name}
            </div>
            <Image
              src={release.image}
              alt={release.name}
              width={400}
              height={400}
              style={{
                objectFit: "contain",
                borderRadius: 30,
                margin: "8px 0",
              }}
            />
            <div style={{ fontSize: 15, textAlign: "left" }}>
              {release.description}
            </div>
          </div>
        ))}
      </div>
      <button
        style={{
          marginTop: 8,
          border: "none",
          background: "#116ad5",
          color: "#fff",
          borderRadius: 8,
          padding: "8px 24px",
          fontWeight: 600,
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ReleaseNotesPopup;
