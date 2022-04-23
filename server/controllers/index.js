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
    models.getReviews(product_id, count, page, sort, (err, results ) => {
      if (err) {
        console.log(err);
      } else {
        const dataObj = { product_id, count, page, results };
        res.send(dataObj);
      }
    });
  },

  meta: (req, res) => {
    const { product_id } = req.query;
    models.getMeta(product_id, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  },

  post: (req, res) => {
    models.postReview({...req.body}, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  },

  helpful: (req, res) => {
    const { review_id } = req.params;
    console.log(req.params);
    models.helpful(review_id, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  },

  report: (req, res) => {
    const { review_id } = req.params;
    console.log(review_id);
    models.report(review_id, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  }

};
