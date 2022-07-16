const { db } = require('../db');

/*
Queries the database for metadata (averages, number of reviews per rating, etc.) of a product.

@param product_id Integer: The product id for the desired metadata.

@returns Promise: A promise object resolving to a query data Object.
The formatted metadata can be accessed at the .rows property of the query data object.
*/

exports.getMeta = (product_id) => {
  const queryString1 = `

  SELECT
    (SELECT
    COALESCE(json_object_agg(name, json_build_object('id', id, 'value', value)), '{}'::json) AS characteristics
    FROM (
      SELECT c.name as NAME, c.id AS id, AVG(c_r.rating) AS value
      FROM char_reviews AS c_r
      INNER JOIN characteristics AS c
      ON c_r.characteristic_id = c.id
      WHERE c.product_id = $1
      GROUP BY c.id
      ) AS id_and_value),

    (SELECT
    COALESCE(json_object_agg(rating, count), '{}'::json) AS ratings
    FROM (
      SELECT rating, COUNT(rating) AS count
      FROM reviews
      WHERE product_id=$1
      GROUP BY rating
    ) ratings),

    (SELECT
    COALESCE(json_object_agg(recommend, count), '{}'::json) AS recommended
    FROM (
      SELECT recommend, COUNT(recommend) AS count
      FROM reviews
      WHERE product_id=$1
      GROUP BY recommend
    ) recommended)

  ;`;

  return db.query(queryString1, [product_id]);
};