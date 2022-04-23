const { db } = require('../db');

exports.postReview = ({
  product_id, rating, summary, body,
  recommend, name, email, photos, characteristics
}, cb) => {
  const date = Date.now();
  const queryString = `
  INSERT INTO reviews
  VALUES (
    product_id = $1,
    rating = $2,
    summary = $3,
    body = $4,
    recommend = $5,
    name = $6,
    email = $7,
    date = $8,
    reported = false,
    helpfulness = 0
  );
  `;
  db.query(queryString, [ product_id, rating, summary, body,
    recommend, name, email, date ], (err, response) => {
    if (err) {
      cb(err);
    } else {
      cb(null, response.rows);
    }
  });
};
