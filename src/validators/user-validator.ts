import * as yup from 'yup'

// const validateStudent = (student) => {
//     const schema = Joi.object({
//       email: Joi.string().email().min(5).max(500).required(),
//       name: Joi.string().required(),
//       age: Joi.number().required(),
//       class: Joi.string().required(),
//       subject: Joi.string().required(),
//       teacher: Joi.required(),
//     });
//     return schema.validate(student);
//   };

  const validateUserSchema = yup.object({
    name: yup.string().lowercase().trim().required(),
    email: yup.string().email().lowercase().trim().required(),
  });

  const ValidationSchema = {
    validateUserSchema
  };
  
  export default ValidationSchema;