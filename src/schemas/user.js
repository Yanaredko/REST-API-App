const mongoose = require('mongoose');
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
  
  token: String
},
    { versionKey: false });

userSchema.post("save", handleMongooseError);

const userValidationSchema = Joi.object({
  password: Joi.string().required().minlength(6).messages({
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