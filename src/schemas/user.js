const mongoose = require('mongoose');
const gravatar = require('gravatar');
const Schema = mongoose.Schema;
const Joi = require('joi');
const { handleMongooseError } = require("../helpers");


const userSchema = new Schema({
email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    },

  password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
    },
    
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  
   avatarURL: {
    type: String,
  },
  
  token: String
},
  { versionKey: false });
    
userSchema.pre('validate', async function (next) {
  try {
    if (!this.avatarURL) {
      this.avatarURL = gravatar.url(this.email, { s: '200', r: 'pg', d: 'identicon' }, true);
    }
    await userValidationSchema.validateAsync(this.toJSON());
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.post("save", handleMongooseError);

const userValidationSchema = Joi.object({
  password: Joi.string().required().min(6).messages({
    'any.required': 'Set password for user',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
  token: Joi.string(),
});

const User = mongoose.model('User', userSchema);

module.exports = { User, userValidationSchema };