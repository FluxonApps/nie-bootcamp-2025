import { COLORS } from "../theme/colors";

const ReportPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <p>Reports will be displayed here.</p>
    </div>
  );
};

export default ReportPage;