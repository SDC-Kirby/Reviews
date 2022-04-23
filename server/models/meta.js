const { db } = require('../db');

exports.getMeta = (product_id, cb) => {
  const queryString1 = `
    SELECT
    json_object_agg(char_products.name, char_products.details) AS characteristics
    FROM (
      SELECT
      c.name AS name, row_to_json(id_and_avg) AS details
      FROM (
        SELECT
        c_r.characteristic_id AS id, AVG(c_r.rating) AS value
        FROM
        char_reviews AS c_r
        INNER JOIN reviews AS r
        ON c_r.review_id = r.review_id
        WHERE r.product_id = $1
        GROUP BY c_r.characteristic_id
      ) AS id_and_avg
      INNER JOIN characteristics AS c
      ON c.id = id_and_avg.id
    ) AS char_products;
    `;
  const queryString2 = `
    SELECT
    json_object_agg(rating, count) AS ratings
    FROM (
      SELECT rating, COUNT(rating) AS count
      FROM reviews
      WHERE product_id=$1
      GROUP BY rating
    ) ratings;`;
  const queryString3 = `
    SELECT
    json_object_agg(recommended, count) AS recommended
    FROM (
      SELECT recommended, COUNT(recommended) AS count
      FROM reviews
      WHERE product_id=$1
      GROUP BY recommended
    ) recommendeds;
    `;
  db.query(queryString1, [product_id], (err, results) => {
    if (err) {
      cb(err);
    } else {
      const {characteristics} = results.rows[0];
      db.query(queryString2, [product_id], (err, results) => {
        if (err) {
          cb(err);
        } else {
          const {ratings} = results.rows[0];
          db.query(queryString3, [product_id], (err, results) => {
            if (err) {
              cb(err);
            } else {
              const {recommended} = results.rows[0];
              cb(null, {
                product_id,
                ratings,
                recommended,
                characteristics
              });
            }
          });
        }
      });
    }
  });
};
