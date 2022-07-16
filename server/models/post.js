const { db } = require('../db');

/*
Inserts a new review into the database.

@param Object: An Object with properties
    { product_id : Integer,
      rating : Integer,
      summary : String ,
      body: String ,
      recommend: Boolean,
      name: String (limit 60 characters),
      email: String (limit 60 characters)
    }

@return Promise: A Promise resolving to a query data object.
The inserted review can be accessed at queryDataObject.rows[0].
*/

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

/*
Inserts a review photo into the database.

@param review_id Integer: the numeric key attached to the review in the database.
@param photo String: the url of the photo.

@returns Promise: a Promise Object resolving to query data object.
The inserted row can be accessed at queryDataObject.rows[0].
*/

exports.postPhoto = ( review_id, photo) => {
  const queryString = `
  INSERT INTO photos (review_id, url) VALUES ($1, $2);
  `;
  return db.query(queryString, [review_id, photo]);
};

/*
Inserts a single characteristic rating from a review into the database.

@param review_id Integer: The numeric key attached to the review in the database.
@param char_id Integer: The characteristic id for the characteristic.
@param rating Integer: The rating (a number from 1 - 5).

@returns Promise: A Promise Object resolving to a query data object.
The inserted row can be accessed at queryDataObject.rows[0].
*/

exports.postChar = (review_id, char_id, rating) => {
  const queryString = `
  INSERT INTO char_reviews (review_id, characteristic_id, rating) VALUES ($1, $2, $3)`;

  return db.query(queryString, [ review_id, char_id, rating ]);
};
