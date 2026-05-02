import React from "react";

const AnimatedBackground = ({ variant = "login" }) => (
  <div
    className={`animated-bg ${variant === "app" ? "animated-bg--app" : "animated-bg--login"}`}
    aria-hidden="true"
  >
    {/* subtle rotating gradient layer handled via CSS pseudo-elements */}
    <span className="animated-orb orb-1" />
    <span className="animated-orb orb-2" />
    <span className="animated-orb orb-3" />
    <span className="animated-veil" />
  </div>
);

export default AnimatedBackground;

