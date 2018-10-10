const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({
          message: `No products found`
        });
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}