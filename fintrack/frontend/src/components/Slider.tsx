import React from "react";
import { COLORS } from "../theme/colors";

interface SliderProps {
  value: number;
  onChange: (val: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-2">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(90deg, ${COLORS.secondaryAccent} ${value}%, ${COLORS.border} ${value}%)`,
          outline: "none",
        }}
      />

      {/* Show numeric value below slider */}
      <span style={{ color: COLORS.secondaryText, fontSize: "0.9rem" }}>
        {value}%
      </span>

      <style>
        {`
          /* Custom thumb styling */
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: ${COLORS.primaryAccent};
            border: 2px solid ${COLORS.background};
            box-shadow: 0 0 6px ${COLORS.primaryAccent};
            cursor: pointer;
            transition: transform 0.2s ease;
          }

          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }

          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: ${COLORS.primaryAccent};
            border: 2px solid ${COLORS.background};
            box-shadow: 0 0 6px ${COLORS.primaryAccent};
            cursor: pointer;
            transition: transform 0.2s ease;
          }

          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.2);
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
