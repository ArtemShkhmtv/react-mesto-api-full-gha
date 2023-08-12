const usersRouter = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../utils/reg-ex');
const {
  getUsers,
  getAimUser,
  updateUser,
  getAuthorizedUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

//  роуты
usersRouter.get('/users', auth, getUsers);

usersRouter.get('/users/me', auth, getAuthorizedUser);

usersRouter.get('/users/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getAimUser);

usersRouter.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

usersRouter.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regEx),
  }),
}), updateUser);

module.exports = {
  usersRouter,
};
