var mongoose = require('mongoose');

module.exports = mongoose.model('Thread', {
    messages: [{ user_id: String, content: String }]
});
