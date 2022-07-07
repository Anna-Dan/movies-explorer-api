const userRouter = require('express').Router();
const {
  updateUserValidation,
  userIdValidation,
} = require('../middlewares/validations');
const { updateUserInfo, getCurrentUser } = require('../controllers/users');

userRouter.get('/users/me', userIdValidation, getCurrentUser);
userRouter.patch('/users/me', updateUserValidation, updateUserInfo);

module.exports = userRouter;
