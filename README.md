# URL Shrinkator

## Overview
URL Shrinkator is a website that lets you shorten long URLs, create custom short URLs, and delete unused links. The website is easy to use and keeps track of click counts on each link, so you can monitor the popularity of your shortened URLs.

## Features
- **Shorten URLs**: Generate a shorter link for any long URL.
- **Custom Short URLs**: Choose your own custom URL text if you prefer.
- **Click Tracking**: Counts how many times each shortened link is used.
- **Delete Links**: Remove shortened URLs you no longer need, keeping the database clean and organized.
- **Additional Pages**: Includes "About," "Service," "Why Choose Us," "Team," and "Login" pages for a complete website experience.

## How it Works
1. **Submit URL**: Enter a long URL in the form. Optionally, you can provide a custom short URL.
2. **Custom URL Check**: If a custom short URL is entered, the system checks to make sure it’s unique. If the custom URL is already taken, you’ll be prompted to try another.
3. **Link Creation**: If no custom URL is provided, a random short URL is generated automatically.
4. **Redirection**: When a shortened URL is accessed, it redirects to the original full URL.

## Technical Details
- **Frontend**: Uses HTML and CSS for the basic interface, with forms for inputting URLs.
- **Backend**: Node.js and Express handle routing, URL generation, and interaction with the database.
- **Database**: MongoDB stores the long URLs, custom short URLs, and click counts.
- **Deletion**: Provides an option to delete URLs from the database for easy management.

## How to Run
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    node server.js
    ```
4. Open `http://localhost:5000` in your browser to use the app.
