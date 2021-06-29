import * as Yup from 'yup';

const MealValidator = Yup.object().shape({
  name: Yup.string()
    .label('Meal Name')
    .required("The meal can't be unnamed")
    .min(5, 'Meal name must have at least 5 characters'),
  description: Yup.string()
    .label('Description')
    .required('Description needs to be filled')
    .min(30, 'Description must have at least 30 characters'),
  time: Yup.number().label('Preparation Time').required(),
  filePath: Yup.string()
    .label('Image')
    .required('Image of the Meal is required')
    .min(5, 'Please select an Image'),
});

export default MealValidator;
