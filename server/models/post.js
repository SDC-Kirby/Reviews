const { db } = require('../db');

exports.postReview = ({
  product_id, rating, summary, body,
  recommend, name, email, photos, characteristics
}, cb) => {
  const date = Date.now();
  const queryString1 = `
  INSERT INTO reviews
  (product_id, rating, summary, body, recommended, reviewer_name, email, date, reported, helpfulness)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, 0);
  `;
  //how to parse an object?
  const queryString2 = `
  INSERT INTO photos
  VALUES (
    review_id = $1,
    url = $2
  )
  ;`;
  //how to parse an object?
  const queryString3 = `
  INSERT INTO char_reviews
  VALUES (
    characteristic_id = $1,
    review_id = $2,
    rating = $3
  )

  `;
  db.query(queryString1, [ product_id, rating, summary, body,
    recommend, name, email, date ], (err, response) => {
    if (err) {
      cb(err);
    } else {
      cb(null, response.rows);
    }
  });
};
