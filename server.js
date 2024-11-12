// Require needed Libraries
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const shortId = require('shortid');
const session = require('express-session');
const ShortUrl = require('./models/ShortUrl');
const User = require('./models/User');
const app = express();

// Connect to Url Shortener
mongoose.connect('mongodb://localhost/urlShortener', {});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set up express-session middleware
app.use(
  session({
    secret: 'superSecretKey',  // Replace with your actual secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Ensures cookies are secure in production
      maxAge: 1000 * 60 * 60 * 24 // Cookie expires after 1 day
    }
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;  // Make session available in all views
  next();
});

// Middleware for checking authentication
function checkAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Routes for other pages
app.get('/about', (req, res) => res.render('about'));
app.get('/service', (req, res) => res.render('service'));
app.get('/why', (req, res) => res.render('why'));
app.get('/team', (req, res) => res.render('team'));
app.get('/login', (req, res) => res.render('login'));
// Still in progress
app.get('/register', (req, res) => res.render('register'));

// Home page route
app.get('/', async (req, res) => {
  const userId = req.session.userId; // Get the logged-in user's ID

  if (!userId) {
    return res.redirect('/login'); // If not logged in, redirect to login
  }

  // **Changed here**: Use `userId` instead of `username` for the query
  const shortUrls = await ShortUrl.find({ creator: userId });

  res.render('index', { shortUrls });
});

// POST route to register a new User
app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,  // Store the password directly (no encryption for now)
    });

    // Save User
    await newUser.save();

    res.redirect('/login');  // Redirect to login after registration
  } catch (error) {
    console.error(error);
    res.redirect('/register');  // If an error occurs, redirect back to registration page
  }
});

// POST route to register a new User
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      console.log('User not found!');
      return res.redirect('/login');  // Redirect to login if user doesn't exist
    }

    // Compare entered password with stored password (no encryption)
    if (password === user.password) {
      console.log('Login successful');
      req.session.userId = user._id;  // Store user ID in session
      req.session.username = user.username;  // Store username in session
      res.redirect('/');  // Redirect to home page after successful login
      console.log('User ID from session:', req.session.userId);  // Check if the user is logged in correctly
    } else {
      console.log('Incorrect password!');
      res.redirect('/login');  // If password doesn't match, redirect to login
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');  // If an error occurs, redirect to login
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');  // If an error occurs, redirect back to home
    }
    res.clearCookie('connect.sid');  // Clear the session cookie
    res.redirect('/');  // Redirect to home page after logout
  });
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

    // Route to handle redirection to the original URL
    app.get('/:shortUrl', async (req, res) => {
      const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
      if (!shortUrl) return res.sendStatus(404);  // If the short URL does not exist, return 404

      // Increment the click count by 1
      shortUrl.clicks++;
      await shortUrl.save();

      // Redirect to the original full URL
      res.redirect(shortUrl.full);
    });

// POST route to create a new short URL
app.post('/shortUrls', async (req, res) => {
  const { fullUrl, shortUrl: customUrl } = req.body;

  // Check if the user is logged in by verifying userId in the session
  const userId = req.session.userId;
  
  if (!userId) {
    // If user is not logged in, redirect to login page
    return res.redirect('/login');
  }

  // If no custom short URL is provided, generate a random short URL
  const short = req.body.customUrl || shortId.generate();

  // Check if the custom short URL already exists
  const existingUrl = await ShortUrl.findOne({ short });
  if (existingUrl) {
    return res.status(400).send('Custom short URL already exists. Choose a different one.');
  }

   // Create the short URL
   await ShortUrl.create({ full: fullUrl, short: short, creator: userId });
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