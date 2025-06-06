import React from 'react';
import './style.css';

function Loader2() {
  return (
    <div className="loader-overlay">
      <svg
        className="spinner"
        viewBox="0 0 50 50"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
}

export default Loader2;
