import React from "react";

/* Distinct line icons for the four feature cards in the red wave section. */

export function IconQuality(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M9 8.6 L11 10.6 L15 6.6" />
      <path d="M8.3 13.6 L6.6 21 L12 18 L17.4 21 L15.7 13.6" />
    </svg>
  );
}

export function IconHolistic(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5 C 10.5 3.6 7 3.2 4.5 4.5 V 18 C 7 16.7 10.5 17.1 12 18.5" />
      <path d="M12 5 C 13.5 3.6 17 3.2 19.5 4.5 V 18 C 17 16.7 13.5 17.1 12 18.5" />
      <path d="M12 5 V 18.5" />
    </svg>
  );
}

export function IconValue(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20 C 7 16.3 3.5 13.2 3.5 9.4 C 3.5 6.8 5.5 5 7.8 5 C 9.3 5 10.7 5.8 12 7.4 C 13.3 5.8 14.7 5 16.2 5 C 18.5 5 20.5 6.8 20.5 9.4 C 20.5 13.2 17 16.3 12 20 Z" />
    </svg>
  );
}

export function IconSafe(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3.5 L19 6.2 V 11 C 19 15.6 16 18.8 12 20.5 C 8 18.8 5 15.6 5 11 V 6.2 Z" />
      <path d="M9 11.3 L11.2 13.5 L15.3 9" />
    </svg>
  );
}