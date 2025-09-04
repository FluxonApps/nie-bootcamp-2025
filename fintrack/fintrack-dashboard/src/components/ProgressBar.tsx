interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
    <div className="bg-blue-500 h-6 rounded-full" style={{ width: `${progress}%` }}></div>
  </div>
);

export default ProgressBar;
