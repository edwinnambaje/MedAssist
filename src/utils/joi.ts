import joi, {ValidationError} from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = joi.extend(joiPasswordExtendCore);

interface SignUpData {
  userName: string;
  email: string;
  password: string;
}

async function SignUpValidation(data: SignUpData) {
  const schema = joi.object({
    username: joi.string().min(3).required().label('username'),
    email: joi.string().email().required().label('email'),
    password: joiPassword
      .string()
      .min(8)
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .label('password')
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'any.required': 'Password is required'
      })
  });
    return await schema.validateAsync(data, {
      abortEarly: false
    });
}

export default SignUpValidation;
