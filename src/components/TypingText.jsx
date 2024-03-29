import React, { useEffect } from "react";
import Typed from "typed.js";

const TypingText = () => {
  useEffect(() => {
    const typed = new Typed(".typing-text", {
      strings: ["Amrit", "अमृत", "અમૃત", "அம்ரித்"],
      loop: true,
      typeSpeed: 70,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <div className="typing-text text-8xl flex flex-row"></div>;
};

export default TypingText;
