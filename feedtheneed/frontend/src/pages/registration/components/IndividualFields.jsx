import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IndividualFields = ({ formData, handleInputChange, errors }) => {
  const motivationOptions = [
    { value: 'reduce_waste', label: 'Reduce Food Waste' },
    { value: 'help_community', label: 'Help Community' },
    { value: 'environmental_impact', label: 'Environmental Impact' },
    { value: 'personal_values', label: 'Personal Values' },
    { value: 'religious_beliefs', label: 'Religious/Spiritual Beliefs' },
    { value: 'other', label: 'Other' }
  ];

  const householdSizes = [
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5', label: '5 people' },
    { value: '6+', label: '6+ people' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="(555) 123-4567"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
        />
        
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth}
          onChange={handleInputChange}
          error={errors?.dateOfBirth}
          description="Must be 18 or older"
        />
      </div>
      <Input
        label="Address"
        type="text"
        name="address"
        placeholder="Enter your complete address"
        value={formData?.address}
        onChange={handleInputChange}
        error={errors?.address}
        required
      />
      {formData?.selectedRole === 'donor' && (
        <Select
          label="What motivates you to donate?"
          name="motivation"
          options={motivationOptions}
          value={formData?.motivation}
          onChange={(value) => handleInputChange({ target: { name: 'motivation', value } })}
          error={errors?.motivation}
          placeholder="Select your primary motivation"
        />
      )}
      {formData?.selectedRole === 'recipient' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Household Size"
            name="householdSize"
            options={householdSizes}
            value={formData?.householdSize}
            onChange={(value) => handleInputChange({ target: { name: 'householdSize', value } })}
            error={errors?.householdSize}
            placeholder="Select household size"
          />
          
          <Input
            label="Emergency Contact"
            type="tel"
            name="emergencyContact"
            placeholder="Emergency contact number"
            value={formData?.emergencyContact}
            onChange={handleInputChange}
            error={errors?.emergencyContact}
            description="Optional but recommended"
          />
        </div>
      )}
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-text-primary mb-2">Verification Information</h4>
        <p className="text-sm text-text-secondary mb-3">
          To ensure platform safety, we may require identity verification for individual accounts.
        </p>
        
        <Input
          label="Government ID Number (Optional)"
          type="text"
          name="governmentId"
          placeholder="Driver's license, state ID, etc."
          value={formData?.governmentId}
          onChange={handleInputChange}
          error={errors?.governmentId}
          description="This information is encrypted and used only for verification"
        />
      </div>
    </div>
  );
};

export default IndividualFields;