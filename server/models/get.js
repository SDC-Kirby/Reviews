const { db } = require('../db');

exports.getReviews = (product_id, count, page, sort, callback) => {
  const offset = (page - 1) * count;
  let sortField;
  if (sort === 'newest') {
    sortField = 'date DESC';
  } else if (sort === 'helpful') {
    sortField = 'helpfulness DESC';
  } else {
    sortField = 'helpfulness DESC, date DESC';
  }
  const queryString = `
  SELECT
  review_id,
  rating,
  summary,
  recommended,
  response,
  body,
  to_timestamp(date / 1000) date,
  reviewer_name,
  helpfulness,
  (SELECT
    COALESCE(json_agg(row_to_json(photos)), '[]' :: json) photos
    FROM (
      SELECT id, url FROM photos WHERE photos.review_id = reviews.review_id
    )
    photos
  )
  FROM reviews
  WHERE product_id = $1 AND reported = false
  ORDER BY $4
  LIMIT $2
  OFFSET $3`;
  db.query( queryString,
    [ product_id, count, offset, sortField],
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

