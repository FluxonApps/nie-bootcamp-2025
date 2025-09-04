import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealth = () => {
  const [healthData, setHealthData] = useState({
    overall: 'healthy',
    lastUpdated: new Date(),
    metrics: [
      {
        id: 1,
        name: 'API Response Time',
        value: '145ms',
        status: 'healthy',
        threshold: '< 200ms',
        icon: 'Zap',
        color: 'text-success'
      },
      {
        id: 2,
        name: 'Database Performance',
        value: '98.5%',
        status: 'healthy',
        threshold: '> 95%',
        icon: 'Database',
        color: 'text-success'
      },
      {
        id: 3,
        name: 'Server Uptime',
        value: '99.9%',
        status: 'healthy',
        threshold: '> 99%',
        icon: 'Server',
        color: 'text-success'
      },
      {
        id: 4,
        name: 'Memory Usage',
        value: '78%',
        status: 'warning',
        threshold: '< 80%',
        icon: 'HardDrive',
        color: 'text-warning'
      },
      {
        id: 5,
        name: 'Active Users',
        value: '1,247',
        status: 'healthy',
        threshold: 'Normal',
        icon: 'Users',
        color: 'text-primary'
      },
      {
        id: 6,
        name: 'Error Rate',
        value: '0.02%',
        status: 'healthy',
        threshold: '< 0.1%',
        icon: 'AlertCircle',
        color: 'text-success'
      }
    ],
    alerts: [
      {
        id: 1,
        type: 'warning',
        message: 'Memory usage approaching threshold',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        resolved: false
      },
      {
        id: 2,
        type: 'info',
        message: 'Scheduled maintenance completed successfully',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        resolved: true
      }
    ]
  });

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setHealthData(prev => ({
          ...prev,
          lastUpdated: new Date()
        }));
      }, 30000); // Update every 30 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    const statusColors = {
      healthy: 'text-success',
      warning: 'text-warning',
      critical: 'text-destructive',
      unknown: 'text-muted-foreground'
    };
    return statusColors?.[status] || statusColors?.unknown;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      healthy: { color: 'bg-success text-success-foreground', label: 'Healthy', icon: 'CheckCircle' },
      warning: { color: 'bg-warning text-warning-foreground', label: 'Warning', icon: 'AlertTriangle' },
      critical: { color: 'bg-destructive text-destructive-foreground', label: 'Critical', icon: 'XCircle' },
      unknown: { color: 'bg-muted text-muted-foreground', label: 'Unknown', icon: 'HelpCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.unknown;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const getOverallStatus = () => {
    const criticalCount = healthData?.metrics?.filter(m => m?.status === 'critical')?.length;
    const warningCount = healthData?.metrics?.filter(m => m?.status === 'warning')?.length;
    
    if (criticalCount > 0) return 'critical';
    if (warningCount > 0) return 'warning';
    return 'healthy';
  };

  const handleRefresh = () => {
    setHealthData(prev => ({
      ...prev,
      lastUpdated: new Date()
    }));
  };

  const handleResolveAlert = (alertId) => {
    setHealthData(prev => ({
      ...prev,
      alerts: prev?.alerts?.map(alert => 
        alert?.id === alertId ? { ...alert, resolved: true } : alert
      )
    }));
  };

  const overallStatus = getOverallStatus();
  const unresolvedAlerts = healthData?.alerts?.filter(alert => !alert?.resolved);

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-bold text-text-primary">System Health</h2>
              {getStatusBadge(overallStatus)}
            </div>
            <p className="text-sm text-text-secondary">
              Last updated: {healthData?.lastUpdated?.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoRefresh"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e?.target?.checked)}
                className="rounded border-border"
              />
              <label htmlFor="autoRefresh" className="text-sm text-text-secondary">
                Auto-refresh
              </label>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              iconName="RefreshCw"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
      {/* Alerts Section */}
      {unresolvedAlerts?.length > 0 && (
        <div className="p-4 bg-warning/5 border-b border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <h3 className="font-semibold text-warning">Active Alerts</h3>
          </div>
          
          <div className="space-y-2">
            {unresolvedAlerts?.map((alert) => (
              <div key={alert?.id} className="flex items-center justify-between p-3 bg-card border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={alert?.type === 'warning' ? 'AlertTriangle' : 'Info'} 
                    size={16} 
                    className={alert?.type === 'warning' ? 'text-warning' : 'text-primary'} 
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{alert?.message}</p>
                    <p className="text-xs text-text-secondary">
                      {alert?.timestamp?.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResolveAlert(alert?.id)}
                  iconName="Check"
                >
                  Resolve
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Metrics Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthData?.metrics?.map((metric) => (
            <div key={metric?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${metric?.color}`}>
                  <Icon name={metric?.icon} size={20} />
                </div>
                {getStatusBadge(metric?.status)}
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-1">{metric?.name}</h4>
                <p className="text-2xl font-bold text-text-primary mb-1">{metric?.value}</p>
                <p className="text-xs text-text-secondary">
                  Threshold: {metric?.threshold}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button variant="outline" iconName="Activity">
            View Logs
          </Button>
          <Button variant="outline" iconName="Settings">
            System Config
          </Button>
          <Button variant="outline" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;