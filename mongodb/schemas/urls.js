const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: String,
    slug: String
})

module.exports.urlSchema = urlSchema;