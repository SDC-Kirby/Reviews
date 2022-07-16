const { db } = require('../db');

/*
Updates an existing review in the database as helpful.

@param review_id: The numeric key of the review to update in the database.

@returns Promise Object
*/

exports.helpful = (review_id) => {
  const queryString = `
  UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1`;
  return db.query(queryString, [ review_id ]);
};

/*
Updates an existing review in the database by increasing its helpfulness value by one.

@param review_id Integer: The numeric key of the review to be updated.

@return Promise Object

*/

exports.report = (review_id) => {
  const queryString = `
    UPDATE reviews SET reported = true WHERE review_id = $1;
  `;
  return db.query(queryString, [ review_id ]);
};
