import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrganizationFields = ({ formData, handleInputChange, errors }) => {
  const organizationTypes = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'grocery_store', label: 'Grocery Store' },
    { value: 'food_bank', label: 'Food Bank' },
    { value: 'shelter', label: 'Shelter' },
    { value: 'community_center', label: 'Community Center' },
    { value: 'school', label: 'School/Educational Institution' },
    { value: 'hospital', label: 'Hospital/Healthcare' },
    { value: 'corporate', label: 'Corporate/Business' },
    { value: 'nonprofit', label: 'Non-profit Organization' },
    { value: 'other', label: 'Other' }
  ];

  const organizationSizes = [
    { value: 'small', label: 'Small (1-10 employees)' },
    { value: 'medium', label: 'Medium (11-50 employees)' },
    { value: 'large', label: 'Large (51-200 employees)' },
    { value: 'enterprise', label: 'Enterprise (200+ employees)' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Organization Name"
          type="text"
          name="organizationName"
          placeholder="Enter organization name"
          value={formData?.organizationName}
          onChange={handleInputChange}
          error={errors?.organizationName}
          required
        />
        
        <Select
          label="Organization Type"
          name="organizationType"
          options={organizationTypes}
          value={formData?.organizationType}
          onChange={(value) => handleInputChange({ target: { name: 'organizationType', value } })}
          error={errors?.organizationType}
          placeholder="Select organization type"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Organization Size"
          name="organizationSize"
          options={organizationSizes}
          value={formData?.organizationSize}
          onChange={(value) => handleInputChange({ target: { name: 'organizationSize', value } })}
          error={errors?.organizationSize}
          placeholder="Select organization size"
        />
        
        <Input
          label="Tax ID / Registration Number"
          type="text"
          name="taxId"
          placeholder="Enter tax ID or registration number"
          value={formData?.taxId}
          onChange={handleInputChange}
          error={errors?.taxId}
          description="For verification purposes (optional)"
        />
      </div>
      <Input
        label="Organization Address"
        type="text"
        name="organizationAddress"
        placeholder="Enter complete address"
        value={formData?.organizationAddress}
        onChange={handleInputChange}
        error={errors?.organizationAddress}
        required
      />
      <Input
        label="Contact Person"
        type="text"
        name="contactPerson"
        placeholder="Name of primary contact person"
        value={formData?.contactPerson}
        onChange={handleInputChange}
        error={errors?.contactPerson}
        required
      />
      <Input
        label="Organization Phone"
        type="tel"
        name="organizationPhone"
        placeholder="(555) 123-4567"
        value={formData?.organizationPhone}
        onChange={handleInputChange}
        error={errors?.organizationPhone}
        required
      />
      <Input
        label="Website (Optional)"
        type="url"
        name="website"
        placeholder="https://www.example.com"
        value={formData?.website}
        onChange={handleInputChange}
        error={errors?.website}
      />
    </div>
  );
};

export default OrganizationFields;