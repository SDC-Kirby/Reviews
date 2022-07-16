const { db } = require('../db');
const models = require('../models');

/*
CONTROLLERS
Middleware functions that handle HTTP requests from the router.
These should be passed as an argument to Express functions accepting middleware.

They accept the following arguments (automatically passed by Express when invoked by the router):

@params req Object
@params res Object
@params next middleware function

@return void
*/

module.exports = {

  /*
  Gets all reviews for a product.
  */

  get: (req, res, next) => {
    const { product_id, count = 5, page = 1, sort = 'relevance' } = req.query;
    models.getReviews(product_id, count, page, sort)
      .then(data => {
        const results = data.rows;
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send({product_id, count, page, results});
      })
      .catch(err => next(err));
  },

  /*
  Gets metadata associated to a product.
  */

  meta: (req, res, next) => {
    const { product_id } = req.query;
    models.getMeta(product_id)
      .then(response => {
        let data = response.rows[0];
        data.product_id = product_id;
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
      })
      .catch(err => next(err));
  },

  /*
  Writes a new review to the database.
  */
  post: (req, res, next) => {
    const { photos, characteristics } = req.body;
    let rev;
    models.postReview(req.body)
      .then(result => {
        [ rev ] = result.rows;
        return Promise.all(photos.map(photo => models.postPhoto(rev.review_id, photo)));
      })
      .then(result => {
        const promises = [];
        Object.keys(characteristics).forEach(id => {
          promises.push(models.postChar(rev.review_id, id, characteristics[id]));
        });
        return Promise.all(promises);
      })
      .then(response => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(response);
      })
      .catch(err => next(err));
  },

  /*
  Updates an existing review as helpful.
  */
  helpful: (req, res, next) => {
    const { review_id } = req.params;
    models.helpful(review_id)
      .then(response => res.send(response.rows))
      .catch(err => next(err));
  },

  /*
  Updates an existing review as reported.
  */
  report: (req, res, next) => {
    const { review_id } = req.params;
    models.report(review_id)
      .then(response => res.send(response.rows))
      .catch(err => next(err));
  }

};
