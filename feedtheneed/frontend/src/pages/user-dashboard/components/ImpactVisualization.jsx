import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImpactVisualization = ({ user, impactData }) => {
  const [activeChart, setActiveChart] = useState('monthly');

  const chartTypes = [
    { id: 'monthly', label: 'Monthly Impact', icon: 'BarChart3' },
    { id: 'category', label: 'Food Categories', icon: 'PieChart' },
    { id: 'trend', label: 'Impact Trend', icon: 'TrendingUp' }
  ];

  const COLORS = ['#2D5A3D', '#4A90A4', '#F4A261', '#10B981', '#F59E0B', '#EF4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-text-primary">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'monthly':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData?.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={user?.role === 'donor' ? 'donations' : 'received'} 
                fill="#2D5A3D" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'category':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={impactData?.categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {impactData?.categoryData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={impactData?.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="week" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="impact" 
                stroke="#2D5A3D" 
                strokeWidth={3}
                dot={{ fill: '#2D5A3D', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">Your Impact</h2>
        <Button variant="ghost" size="sm" iconName="Download">
          Export
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {chartTypes?.map((chart) => (
          <Button
            key={chart?.id}
            variant={activeChart === chart?.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveChart(chart?.id)}
            iconName={chart?.icon}
            iconPosition="left"
          >
            {chart?.label}
          </Button>
        ))}
      </div>
      <div className="mb-6">
        {renderChart()}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Users" size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary">{impactData?.totalPeopleHelped}</div>
          <div className="text-sm text-text-secondary">People Helped</div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Package" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-text-primary">{impactData?.totalMeals}</div>
          <div className="text-sm text-text-secondary">Meals Provided</div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Leaf" size={24} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-text-primary">{impactData?.wasteReduced}kg</div>
          <div className="text-sm text-text-secondary">Waste Reduced</div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={24} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-text-primary">{impactData?.impactScore}</div>
          <div className="text-sm text-text-secondary">Impact Score</div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Trophy" size={24} className="text-accent" />
          <div>
            <p className="font-semibold text-text-primary">
              {user?.role === 'donor' ? 'Top Donor This Month!' : 'Active Community Member!'}
            </p>
            <p className="text-sm text-text-secondary">
              {user?.role === 'donor' 
                ? 'You\'ve helped feed 127 people this month. Keep up the amazing work!' :'You\'ve been actively participating in community food sharing. Thank you!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactVisualization;