import React, { useState } from "react";

const WHATSAPP_NUMBER = "917426809415";
const WHATSAPP_MESSAGE = "Hello! I'm interested in your event planning services.";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}
    >
      {/* Tooltip label */}
      <span
        style={{
          background: "#25D366",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: "0px",
          fontSize: "12px",
          fontFamily: "inherit",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: "none",
        }}
      >
        Chat with us
      </span>

      {/* WhatsApp icon button */}
      <span
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? "0 6px 28px rgba(37,211,102,0.55)"
            : "0 4px 16px rgba(37,211,102,0.4)",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          flexShrink: 0,
        }}
      >
        {/* Official WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="#fff"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.467 2.027 7.77L0 32l8.438-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.853l-.486-.29-4.997 1.19 1.26-4.858-.318-.5A13.27 13.27 0 012.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.267-9.907c-.398-.2-2.357-1.163-2.722-1.295-.364-.133-.63-.2-.896.2-.265.398-1.03 1.295-1.264 1.56-.232.265-.465.298-.863.1-.398-.2-1.683-.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.756-.232-.398-.025-.613.175-.81.18-.178.398-.465.597-.698.2-.232.265-.398.398-.663.133-.265.067-.497-.033-.697-.1-.2-.896-2.16-1.228-2.957-.323-.776-.65-.67-.896-.683l-.763-.013c-.265 0-.697.1-1.063.497s-1.394 1.362-1.394 3.322 1.427 3.853 1.627 4.12c.2.265 2.808 4.286 6.803 6.012.951.41 1.693.655 2.271.839.954.303 1.822.26 2.508.158.765-.114 2.357-.963 2.69-1.894.333-.93.333-1.727.232-1.894-.1-.166-.365-.265-.763-.465z" />
        </svg>
      </span>
    </a>
  );
}
