interface SliderProps {
  value: number;
  onChange: (val: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-2/3 h-2 rounded-lg bg-gray-700 accent-green-500 appearance-none"
      style={{
        outline: "none", // removes default focus outline
      }}
    />
  );
};

export default Slider;
