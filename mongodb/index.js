const mongoose = require('mongoose');
require('dotenv').config();

// IMPORTS
const { urlSchema } = require('./schemas/urls');

const insertNewDocument = async (slug, url) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true })
        console.log('Connected successfully to DB!');
    } catch (error) {
        console.log(error);
    }

    try {
        console.log('Creating new url model...');
        const urls = mongoose.model('urls', urlSchema);
        console.log('Inserting new document...');
        await urls.create({ url, slug });
        console.log('Document inserted!');
    } catch(error) {
        console.log(error);
    }

    mongoose.disconnect();
    console.log('Close connection')
}

const isSlugAlreadyInUse = async (slug) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true })
        console.log('Connected successfully to DB!');
    } catch (error) {
        console.log(error);
    }

    let doc;
    try{
        console.log('Creating new url model...');
        const urls = mongoose.model('urls', urlSchema);
        console.log('Searching if slug already exist...');
        doc = await urls.findOne({slug}).exec();
        if(doc) console.log('Slug already exist');
        else console.log('Slug does not exit');
    }catch(error) {
        console.log(error);
    }

    mongoose.disconnect();
    console.log('Close connection');
    return doc;
}

const getUrlFromSlug = async (slug) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true })
        console.log('Connected successfully to DB!');
    } catch (error) {
        console.log(error);
    }

    let doc;
    try{
        console.log('Creating new url model...');
        const urls = mongoose.model('urls', urlSchema);
        console.log(`Get document from slug ${slug}...`);
        doc = await urls.findOne({slug}).exec();
    }catch(error) {
        console.log(error);
    }

    mongoose.disconnect();
    console.log('Close connection');
    return doc;
}

module.exports.insertNewDocument = insertNewDocument;
module.exports.isSlugAlreadyInUse = isSlugAlreadyInUse;
module.exports.getUrlFromSlug = getUrlFromSlug;
