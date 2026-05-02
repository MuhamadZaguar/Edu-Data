import React from "react";

const AnimatedBackground = ({ variant = "login" }) => (
  <div className={`animated-bg ${variant === "app" ? "animated-bg--app" : "animated-bg--login"}`} aria-hidden="true">
    <span className="animated-orb orb-1" />
    <span className="animated-orb orb-2" />
    <span className="animated-orb orb-3" />
  </div>
);

export default AnimatedBackground;

