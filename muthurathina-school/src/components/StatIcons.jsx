import React from "react";

/* Small red line icons for the stats bar, matching the site's thin
   hand-drawn style. Each is a plain 24x24 stroke icon. */

export function IconYears(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.2 13.6 L6.5 21 L12 18 L17.5 21 L15.8 13.6" />
    </svg>
  );
}

export function IconStudents(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="M5.5 16.5 C 6.5 14 11.5 14 12.5 16.5" />
      <path d="M15 9.5 h4" />
      <path d="M15 13 h4" />
    </svg>
  );
}

export function IconTeachers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20 C 5.6 15.4 9 13.4 12 13.4 C 15 13.4 18.4 15.4 19.2 20" />
    </svg>
  );
}

export function IconPassRate(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 20 L14 10 L17 13 L7 23" />
      <path d="M13.2 10.8 L16.2 13.8" />
      <path d="M15.5 4.5 L19.5 8.5" />
      <path d="M14 6 L18 10" strokeWidth="1.2" />
      <path d="M17 3 L21 7" strokeWidth="1.2" />
    </svg>
  );
}
