const express = require('express');
const path = require('path');
const { strict } = require('assert');
require('dotenv').config();

// IMPORTS
const { insertNewDocument, isSlugAlreadyInUse, getUrlFromSlug } = require('./mongodb')

// Express
const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', './public/html')
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/', (req, res) => {
    res.render('index', { showData: false, showError: false });
});

app.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    const doc = await getUrlFromSlug(slug);
    if(doc) {
        res.redirect(doc.url);
    }else {
        res.status(404).send("404: Slug doesn't exist");
    }
});

app.post('/', async (req, res) => {
    const { url, slug } = req.body;

    const doc = await isSlugAlreadyInUse(slug);
    if(doc) {
        res.render('index', { showData: false, showError: true, error: "Slug already in use" });
    } else {
        await insertNewDocument(slug, url);
        res.render('index', { showData: true, showError: false, url, slug });
    }
})

app.listen(port, () => {
    console.log(`UrlShortener lsitening at http://localhost:${port}`)
})
