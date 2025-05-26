import React, { createContext, useState, useContext } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
        },
        education: {
            schoolName: '',
            collegeName: '',
            degree: '',
        },
        interests: {
            jobTitle: '',
            areasOfInterest: [],
            willingToTeach: false,
        },
        skills: {
            skillsToTeach: [],
            skillsToLearn: [],
            supportingDocuments: [],
        },
    });

    const updateFormData = (stepData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...stepData,
        }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};

// ✅ Add this custom hook so other components can easily access context
export const useFormContext = () => useContext(FormContext);
