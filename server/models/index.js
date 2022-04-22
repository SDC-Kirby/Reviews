const { db } = require('../db');

module.exports = {
  getReviews: (product_id, count, page, sort, callback) => {
    const offset = (page - 1) * count;
    db.query(
      `SELECT
      review_id,
      rating,
      summary,
      recommended,
      response,
      body,
      to_timestamp(date) date,
      reviewer_name,
      helpfulness,
      (SELECT json_agg(row_to_json(photos)) photos FROM (SELECT id, url FROM photos WHERE photos.review_id = reviews.review_id) photos )
      FROM reviews
      WHERE product_id = $1
      LIMIT $2
      OFFSET $3`,
      [ product_id, count, offset ],
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result.rows);
        }
      }
    );
  },

  getMeta: (req) => {

  },

};
