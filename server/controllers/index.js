const { db } = require('../db');
const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id, count = 5, page = 1, sort = 'relevance' } = req.query;
    models.getReviews(product_id, count, page, sort)
      .then(data => {
        const results = data.rows;
        console.log(results);
        res.header('Access-Control-Allow-Origin', '*');
        res.send({product_id, count, page, results});
      })
      .catch(err => res.send(err));
  },

  meta: (req, res) => {
    const { product_id } = req.query;
    models.getMeta(product_id)
      .then(response => {
        let data = response.rows[0];
        data.product_id = product_id;
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      })
      .catch(err => res.send(err));
  },

  post: (req, res) => {
    const { photos, characteristics } = req.body;
    let rev;
    models.postReview(req.body)
      .then(result => {
        console.log('Submitted review details; now submitting photos');
        rev = result.rows[0];
        console.log(rev.review_id);
        return Promise.all(photos.map(photo => models.postPhoto(rev.review_id, photo)));
      })
      .then(result => {
        console.log('Submitted photos; now submitting characteristics');
        const promises = [];
        for (let id in characteristics) {
          promises.push(models.postChar(rev.review_id, id, characteristics[id]));
        }
        return Promise.all(promises);
      })
      .then(response => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(response);
      })
      .catch(err => console.log(err));
  },

  helpful: (req, res) => {
    const { review_id } = req.params;
    models.helpful(review_id)
      .then(response => res.send(response.rows))
      .catch(err => console.log(err));
  },

  report: (req, res) => {
    const { review_id } = req.params;
    models.report(review_id)
      .then(response => res.send(response.rows).status(200))
      .catch(err => console.log(err));
  }

};
