const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const variables = require('../global/variables')
const token = require('../services/token');

const Saler = require('../models/saler');

exports.signup = (req, res, next) => {
  Saler.findOne({ email: req.body.email })
    .exec()
    .then(saler => {
      if (saler) {
        return res.status(409).json({
          message: `Saler with email provided already exists`
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          console.log(hash);
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const saler = new Saler({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
      
            saler
              .save()
              .then(result => {
                console.log(result);
                return res.status(201).json({
                  message: `Saler created`
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
};

exports.login = (req, res, next) => {
  Saler.findOne({ email: req.body.email })
    .exec()
    .then(saler => {
      if (saler && saler.validAccount) {
        bcrypt.compare(req.body.password, saler.password, (err, result) => {
          if (err) {
            return res.status(401).json(variables.error.authFailed);
          }

          if (result) {
            return res.status(200).json({
              message: `Authorization successful`,
              token: token(saler.email, saler._id),
              saler: {
                id: saler._id,
                contactPoints: saler.contactPoints,
                email: saler.email,
                legalData: saler.legalData,
                name: saler.name,
              }
            });
          }

          return res.status(401).json(variables.error.authFailed);
        });
      } else if (saler && !saler.validAccount) {
        return res.status(401).json(variables.canceledAccount);
      } else {
        return res.status(401).json(variables.error.authFailed);
      }      
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
};

exports.cancelAccount = (req, res, next) => {
  Saler.updateOne({ _id: req.params.salerId }, { validAccount: false})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};