const { getReviews } = require('./get.js');
const { getMeta } = require('./meta.js');
const { postReview } = require('./post.js');
const { helpful, report } = require('./put.js');

module.exports = { getReviews, getMeta, postReview, helpful, report };
