const { db } = require('../db');

/*
Queries the database for all reviews attached to a certain product.

@param product_id Integer: the product id of the requested reviews.
@param count Integer: the number of reviews to be returned per page.
@param page Integer: the page number of reviews.
@param sort String: the parameter ('newest, helpful, relevance') by which to sort the reviews.

@return Promise (object): A Promise Object resolving to query data Object.
The formatted reviews can be accessed at the .rows property of the resolved query data object.
*/

exports.getReviews = (product_id, count, page, sort) => {
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
  recommend,
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
  ORDER BY ${sortField}
  LIMIT $2
  OFFSET $3`;
  return db.query(queryString, [ product_id, count, offset ]);
};
