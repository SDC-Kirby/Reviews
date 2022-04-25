const { db } = require('../db');

exports.postReview = ({
  product_id, rating, summary, body,
  recommend, name, email
} ) => {
  const date = Date.now();
  const queryString1 = `
    INSERT INTO reviews
    (product_id, rating, summary, body, recommend, reviewer_name, email, date, reported, helpfulness)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, 0)
    RETURNING review_id
  ;`;
  return db.query(queryString1, [ product_id, rating, summary, body,
    recommend, name, email, date ]);
};

exports.postPhoto = ( review_id, photo) => {
  const queryString = `
  INSERT INTO photos (review_id, url) VALUES ($1, $2);
  `;
  return db.query(queryString, [review_id, photo]);
};

exports.postChar = (review_id, char_id, rating) => {
  const queryString = `
  INSERT INTO char_reviews (review_id, characteristic_id, rating) VALUES ($1, $2, $3)`;

  return db.query(queryString, [ review_id, char_id, rating ]);
};
