"use client";

import { useEffect, useRef, useState } from "react";

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -10%",
};

export default function ScrollReveal({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  once = true,
  variant = "up",
  style: customStyle,
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    let frame;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(() => setIsVisible(true));
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          frame = requestAnimationFrame(() => setIsVisible(false));
        }
      });
    }, observerOptions);

    observer.observe(node);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      observer.disconnect();
    };
  }, [once]);

  const classes = ["scroll-reveal", className, isVisible ? "is-revealed" : null]
    .filter(Boolean)
    .join(" ");

  const styleObject = {
    ...customStyle,
    ...(delay ? { "--reveal-delay": `${delay}ms` } : {}),
  };

  const style = Object.keys(styleObject).length ? styleObject : undefined;

  return (
    <Component
      ref={ref}
      className={classes}
      data-variant={variant}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
}
