const { db } = require('../db');
const models = require('../models');

module.exports = {
  get: (req, res) => {
    const {
      product_id,
      count = 5,
      page = 1,
      sort = 'relevance'
    } = req.query;
    models.getReviews(product_id, count, page, sort, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.send(response);
      }
    });
  },

  meta: () => {
    models.getMeta();
  },

  postReview: (req, res) => {
    const { product_id, rating, summary, body, recommend, name, email } = req.body;
    const date = Date.now();
    const reported = false;
    const response = null;
    const helpfulness = 0;
    db.query('INSERT INTO reviews VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11', []);
  }

};
