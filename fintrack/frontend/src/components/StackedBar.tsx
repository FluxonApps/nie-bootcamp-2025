import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent } from "./Card";
import { useMemo } from "react";

// Dummy line chart data
const lineData = [
  { name: "A", budget: 400, spent: 240 },
  { name: "B", budget: 300, spent: 139 },
  { name: "C", budget: 200, spent: 980 },
  { name: "D", budget: 278, spent: 390 },
  { name: "E", budget: 189, spent: 480 },
  { name: "F", budget: 239, spent: 380 },
];

// Dummy pie chart data
const pieData = [
  { name: "Food", value: 400 },
  { name: "Shopping", value: 300 },
  { name: "Bills", value: 200 },
  { name: "Entertainment", value: 150 },
  { name: "Other", value: 100 },
];

// Vibrant colors
const PIE_COLORS = ["#4ade80", "#60a5fa", "#a78bfa", "#facc15", "#f87171"];

export default function ReportingSection() {
  const total = useMemo(() => pieData.reduce((sum, item) => sum + item.value, 0), []);

  return (
    <Card className="bg-[#0D1117] border border-[#1F2937] shadow-xl rounded-2xl p-6 text-white">
      <h2 className="text-xl font-bold mb-4">💰 Budget & Transactions</h2>
      <CardContent className="space-y-10">
        
        {/* Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h3 className="text-lg font-semibold mb-2">Budget vs Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Line type="monotone" dataKey="budget" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa" }} />
              <Line type="monotone" dataKey="spent" stroke="#4ade80" strokeWidth={2} dot={{ fill: "#4ade80" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h3 className="text-lg font-semibold mb-2">Transaction Breakdown</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
                label={({ name = "", percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#111827" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
              {/* Center Label */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: "16px", fontWeight: "bold", fill: "#f9fafb" }}
              >
                Total {total}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

      </CardContent>
    </Card>
  );
}
