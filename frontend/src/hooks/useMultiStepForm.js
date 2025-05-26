// useMultiStepForm.js
import { useState } from 'react';

export const useMultiStepForm = (steps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setCurrentStep(0);
        setFormData({});
    };

    return {
        currentStep,
        formData,
        nextStep,
        prevStep,
        handleInputChange,
        resetForm,
    };
};
