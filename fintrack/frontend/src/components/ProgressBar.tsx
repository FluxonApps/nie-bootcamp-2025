import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Progress bar container */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: "300px", // scrollbar-like width
          height: "20px", // fixed height
          backgroundColor: "#d3d3d3", // gray background
        }}
      >
        {/* Red progress bar */}
        <div
          className="h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to bottom, #ff4d4d, #cc0000)",
            boxShadow:
              "inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Caption */}
      <p className="text-sm text-gray-400 italic">Progress Bar</p>
    </div>
  );
};

export default ProgressBar;
