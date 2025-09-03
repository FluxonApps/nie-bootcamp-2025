import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelectionCard = ({ role, isSelected, onSelect, title, description, icon, benefits }) => {
  return (
    <div
      onClick={() => onSelect(role)}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isSelected ? 'bg-primary text-white' : 'bg-muted text-primary'
        }`}>
          <Icon name={icon} size={24} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-text-secondary mb-4">{description}</p>
          
          <ul className="space-y-1">
            {benefits?.map((benefit, index) => (
              <li key={index} className="flex items-center text-xs text-text-secondary">
                <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} color="white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelectionCard;