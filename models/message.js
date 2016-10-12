var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    content: String,
    thread_id: String
});
