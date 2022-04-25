const { db } = require('../db');

exports.helpful = (review_id, cb) => {
  const queryString = `
  UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1`;
  return db.query(queryString, [ review_id ]);
};

exports.report = (review_id, cb) => {
  const queryString = `
    UPDATE reviews SET reported = true WHERE review_id = $1;
  `;
  return db.query(queryString, [ review_id ]);
};
