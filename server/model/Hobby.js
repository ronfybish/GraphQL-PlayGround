const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
	title: String,
	description: String,
	userId: String,
});

module.exports = mongoose.model('Hobby', HobbySchema);
