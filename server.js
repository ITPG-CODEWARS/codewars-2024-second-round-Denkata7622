// Require needed Libraries
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');
const app = express();

// Connect to Url Shortener
mongoose.connect('mongodb://localhost/urlShortener', {});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes for other pages
app.get('/about', (req, res) => res.render('about'));
app.get('/service', (req, res) => res.render('service'));
app.get('/why', (req, res) => res.render('why'));
app.get('/team', (req, res) => res.render('team'));
app.get('/login', (req, res) => res.render('login'));

// Home page route
app.get('/', async (req, res) => {
  const ShortUrls = await ShortUrl.find();
  res.render('index', { shortUrls: ShortUrls });
});

// DELETE route to remove a short URL
app.delete('/url/:short', async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOneAndDelete({ short: req.params.short });
    if (shortUrl) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting URL' });
  }
});

// POST route to create a new short URL
app.post('/shortUrls', async (req, res) => {
  const { fullUrl, shortUrl: customUrl } = req.body;

  // Check if a custom short URL was provided
  const short = req.body.customUrl;

  // Check if custom short URL is already in use
  const existingUrl = await ShortUrl.findOne({ short });
  if (existingUrl) {
    return res.status(400).send('Custom short URL already exists. Choose a different one.');
  }

  // Create the short URL
  await ShortUrl.create({ full: fullUrl, short: short });
  res.redirect('/');
});

// Route to handle redirection
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (!shortUrl) return res.sendStatus(404);

  //Increase Url clicks by 1
  shortUrl.clicks++;
  await shortUrl.save();
  res.redirect(shortUrl.full);
});

// Start server at localhost:5000
app.listen(process.env.PORT || 5000, () => console.log('Server running...'));