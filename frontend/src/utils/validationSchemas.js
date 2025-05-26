import * as Yup from 'yup';

export const personalInfoSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits long'),
});

export const educationSchema = Yup.object().shape({
  schoolName: Yup.string()
    .required('School name is required'),
  collegeName: Yup.string()
    .required('College/University name is required'),
  degree: Yup.string()
    .required('Degree/Field of study is required'),
});

export const interestsSchema = Yup.object().shape({
  jobTitle: Yup.string()
    .required('Current job title is required'),
  areasOfInterest: Yup.array()
    .of(Yup.string().required('Area of interest is required'))
    .min(1, 'At least one area of interest is required'),
  willingToTeach: Yup.boolean()
    .required('Please specify if you are willing to teach or learn'),
});

export const skillsSchema = Yup.object().shape({
  skillsToTeach: Yup.array()
    .of(Yup.string().required('Skill is required'))
    .min(1, 'At least one skill to teach is required'),
  skillsToLearn: Yup.array()
    .of(Yup.string().required('Skill is required'))
    .min(1, 'At least one skill to learn is required'),
  supportingDocuments: Yup.mixed()
    .nullable()
    .test('fileType', 'Unsupported file type', value => {
      if (!value) return true; // Allow empty
      const supportedFormats = ['application/pdf', 'image/jpeg', 'image/png'];
      return supportedFormats.includes(value.type);
    }),
});