const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	age: Number,
	proffesion: String,
});

module.exports = mongoose.model('User', UserSchema);
