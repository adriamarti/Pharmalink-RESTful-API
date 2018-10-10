const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: `User with email provided already exists`
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          console.log(hash);
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
      
            user
              .save()
              .then(result => {
                console.log(result);
                return res.status(201).json({
                  message: `User created`
                });
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json({
                  error: err
                })
              });
          }
        })
      }
    })
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: `Authorization failed`
            });
          }

          if (result) {
            const responseToken = token.sign(
              {
                email: user.email,
                userId: user._id
              },
              process.env.TOKEN_KEY,
              {
                expiresIn: `1h`
              });
            return res.status(200).json({
              message: `Authorization successful`,
              token: responseToken
            });
          }

          return res.status(401).json({
            message: `Authorization failed`
          });
        });
      } else {
        return res.status(401).json({
          message: `Authorization failed`
        });
      }      
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

// DELETE user
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;

  User.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      return res.status(200).json({
        message: `User successfully deleted`
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

module.exports = router;