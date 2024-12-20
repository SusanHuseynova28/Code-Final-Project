"use client";

import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-custombgclr justify-center z-50 flex items-center ">
      <div className="infinity-spinner">
        <span>∞</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
