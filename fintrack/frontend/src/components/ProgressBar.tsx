import React from "react";
import { COLORS } from "../theme/colors";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Progress bar container */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: "100%", // responsive
          maxWidth: "350px",
          height: "20px",
          backgroundColor: COLORS.border,
        }}
      >
        {/* Progress fill */}
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${COLORS.secondaryAccent}, ${COLORS.primaryAccent})`,
            boxShadow: `0 0 10px ${COLORS.primaryAccent}`,
          }}
        />
      </div>

      {/* Caption with dynamic color */}
      <p
        className="text-sm italic"
        style={{ color: COLORS.secondaryText }}
      >
        {progress}% Complete
      </p>
    </div>
  );
};

export default ProgressBar;
