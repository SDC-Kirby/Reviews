const { getReviews } = require('./get.js');
const { getMeta } = require('./meta.js');
const { postReview, postPhoto, postChar } = require('./post.js');
const { helpful, report } = require('./put.js');

module.exports = { getReviews, getMeta, postReview, postPhoto, postChar, helpful, report };
