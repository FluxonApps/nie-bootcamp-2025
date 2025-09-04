// App.tsx
import StackedBarChart from './components/StackedBarChart';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#161B22', 
      padding: '20px', 
      borderRadius: '8px', 
      border: '1px solid #1F2937', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
    }}>
      <h2 style={{ color: '#F9FAFB' }}>Monthly Progress & Breakdown</h2>
      <StackedBarChart />
    </div>
  );
};

export default App;