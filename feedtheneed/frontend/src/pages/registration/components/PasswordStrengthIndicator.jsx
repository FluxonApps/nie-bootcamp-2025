import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password?.length >= 8,
      lowercase: /[a-z]/?.test(password),
      uppercase: /[A-Z]/?.test(password),
      numbers: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    score = Object.values(checks)?.filter(Boolean)?.length;
    
    if (score < 2) return { score, label: 'Weak', color: 'bg-destructive' };
    if (score < 4) return { score, label: 'Fair', color: 'bg-warning' };
    if (score < 5) return { score, label: 'Good', color: 'bg-secondary' };
    return { score, label: 'Strong', color: 'bg-success' };
  };
  
  const strength = calculateStrength(password);
  
  if (!password) return null;
  
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-secondary">Password strength</span>
        <span className={`text-xs font-medium ${
          strength?.label === 'Weak' ? 'text-destructive' :
          strength?.label === 'Fair' ? 'text-warning' :
          strength?.label === 'Good'? 'text-secondary' : 'text-success'
        }`}>
          {strength?.label}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= strength?.score ? strength?.color : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="mt-2 text-xs text-text-secondary">
        <p>Password should contain:</p>
        <ul className="mt-1 space-y-0.5">
          <li className={password?.length >= 8 ? 'text-success' : 'text-text-secondary'}>
            • At least 8 characters
          </li>
          <li className={/[a-z]/?.test(password) ? 'text-success' : 'text-text-secondary'}>
            • One lowercase letter
          </li>
          <li className={/[A-Z]/?.test(password) ? 'text-success' : 'text-text-secondary'}>
            • One uppercase letter
          </li>
          <li className={/\d/?.test(password) ? 'text-success' : 'text-text-secondary'}>
            • One number
          </li>
          <li className={/[!@#$%^&*(),.?":{}|<>]/?.test(password) ? 'text-success' : 'text-text-secondary'}>
            • One special character
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;