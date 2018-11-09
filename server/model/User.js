
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	dateBirth: { type: Date },
	city: String,
	country: String,
	enabled: { type: Boolean, default: true }
});

// Model name, schema, collection name
module.exports = mongoose.model('User', UserSchema, 'User');
