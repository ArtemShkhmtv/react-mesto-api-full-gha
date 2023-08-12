const Card = require('../models/card');
const {
  OK_STATUS_CODE,
  OK_CREATE_STATUS_CODE,
} = require('../utils/status-code');
const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-action-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Card.create({ name, link, owner })
    .then((card) => res.status(OK_CREATE_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      }
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if ((!card.owner.equals(req.user._id))) {
        throw (new ForbiddenError('Попытка удаления карточки другого пользователя'));
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deleteCard) => {
          res.status(OK_STATUS_CODE).send(deleteCard);
        }).catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка не найдена'));
      } if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточки не существует'));
      }
      if (err.message === 'Попытка удаления карточки другого пользователя') {
        next(new ForbiddenError('Попытка удаления карточки другого пользователя'));
      }
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(OK_CREATE_STATUS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка не найдена'));
      } if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточки не существует'));
      }
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail()
  .then((card) => {
    res.status(OK_STATUS_CODE).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Карточка не найдена'));
    } if (err.name === 'DocumentNotFoundError') {
      next(new NotFoundError('Карточки не существует'));
    }
    next(new ServerError('На сервере произошла ошибка'));
  });
