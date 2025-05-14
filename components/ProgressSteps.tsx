import { View, Text } from 'react-native';
import React from 'react';

interface StepProps {
  number: string;
  label: string;
  isActive: boolean;
  showRightLine: boolean;
}

const ProgressStep: React.FC<StepProps> = ({
  number,
  label,
  isActive,
  showRightLine,
}) => (
  <View className="flex-1 flex-row items-center justify-center relative">
    {/* Step Circle and Label */}
    <View className="flex flex-col gap-1 items-center z-10">
      <View
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? 'bg-[#6CC51D]' : 'bg-white border border-gray'
        }`}
      >
        <Text
          className={`text-[15px] font-poppinsMedium ${
            isActive ? 'text-white' : 'text-gray'
          }`}
        >
          {number}
        </Text>
      </View>
      <Text className="text-gray uppercase font-poppinsMedium text-[12px]">
        {label}
      </Text>
    </View>

    {/* Connecting Line */}
    {showRightLine && (
      <View
        className={`absolute left-1/2 w-full h-[1px] ${
          isActive ? 'bg-[#6CC51D]' : 'bg-gray'
        }`}
        style={{ top: 14 }}
      />
    )}
  </View>
);

interface ProgressStepsProps {
  currentStep: 'Delivery' | 'Address' | 'Payment';
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
}) => {
  const steps = [
    { number: '1', label: 'Delivery', isActive: false },
    { number: '2', label: 'Address', isActive: false },
    { number: '3', label: 'Payment', isActive: false },
  ];

  // Set isActive based on currentStep, including previous steps
  const stepIndex = steps.findIndex((step) => step.label === currentStep);
  const updatedSteps = steps.map((step, index) => ({
    ...step,
    isActive: index <= stepIndex, // Activate current step and all previous steps
  }));

  return (
    <View className="flex-row p-6 bg-offWhite">
      {updatedSteps.map((step, index) => (
        <ProgressStep
          key={step.label}
          number={step.number}
          label={step.label}
          isActive={step.isActive}
          showRightLine={index < steps.length - 1}
        />
      ))}
    </View>
  );
};
