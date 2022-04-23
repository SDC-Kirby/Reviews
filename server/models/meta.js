const { db } = require('../db');

exports.getMeta = (product_id, cb) => {
  const queryString1 = `
  SELECT
    (SELECT
    json_object_agg(name, json_build_object('id', id, 'value', value)) AS characteristics
    FROM (
      SELECT c.name as NAME, c.id AS id, AVG(c_r.rating) AS value
      FROM char_reviews AS c_r
      INNER JOIN characteristics AS c
      ON c_r.characteristic_id = c.id
      WHERE c.product_id = $1
      GROUP BY c.id
      ) AS id_and_value),

    (SELECT
    json_object_agg(rating, count) AS ratings
    FROM (
      SELECT rating, COUNT(rating) AS count
      FROM reviews
      WHERE product_id=$1
      GROUP BY rating
    ) ratings),

    (SELECT
    json_object_agg(recommended, count) AS recommended
    FROM (
      SELECT recommended, COUNT(recommended) AS count
      FROM reviews
      WHERE product_id=$1
      GROUP BY recommended
    ) recommended)
  ;`;

  db.query(queryString1, [product_id], (err, results) => {
    if (err) {
      cb(err);
    } else {
      const data = results.rows[0];
      data.product_id = product_id;
      cb(null, data);
    }
  });
};
