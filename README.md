# URL Shrinkator

## Overview
URL Shrinkator is a website that lets you shorten long URLs, create custom short URLs, and delete unused links. The website is easy to use and keeps track of click counts on each link, so you can monitor the popularity of your shortened URLs.

## Features
- **Shorten URLs**: Generate a shorter link for any long URL.
- **Custom Short URLs**: Choose your own custom URL text if you prefer.
- **Click Tracking**: Counts how many times each shortened link is used.
- **Delete Links**: Remove shortened URLs you no longer need, keeping the database clean and organized.
- **User Authentication**: Register and log in to create and manage your own URLs securely.
- **User-Specific URL Visibility**: Each user can only view, manage, and delete the URLs they created.
- **Additional Pages**: Includes "About," "Service," "Why Choose Us," "Team," and "Login" pages for a complete website experience.

## How it Works
1. **Submit URL**: Enter a long URL in the form. Optionally, you can provide a custom short URL.
2. **Custom URL Check**: If a custom short URL is entered, the system checks to make sure it’s unique. If the custom URL is already taken, you’ll be prompted to try another.
3. **Link Creation**: If no custom URL is provided, a random short URL is generated automatically.
4. **User-Specific Management**: After logging in, users can view only the URLs they have created and manage those URLs individually.
5. **Redirection**: When a shortened URL is accessed, it redirects to the original full URL.

## Technical Details
- **Frontend**: Uses HTML and CSS for the basic interface, with forms for inputting URLs.
- **Backend**: Node.js and Express handle routing, URL generation, and interaction with the database.
- **Database**: MongoDB stores the long URLs, custom short URLs, and click counts.
- **Session Management**: Express-session handles user authentication, allowing each user to see only their own links.
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
    npm run devStart
    ```
4. Open `http://localhost:5000` in your browser to use the app.

## Technologies Used
- **Node.js & Express**: Backend server and API.
- **MongoDB**: Database to store URLs, custom URLs, and click counts.
- **EJS**: Template engine for dynamic HTML rendering.
- **Express-Session**: Middleware for managing user sessions and ensuring secure user login.

## Project Purpose
This project was created for the second round of CodeWars 2024/2025, focusing on creating a clean, functional URL shortener with added custom and various features. The addition of user authentication and user-specific URL visibility makes the application more secure and personalized. It’s designed to be user-friendly, with a range of additional pages to demonstrate a complete website experience.

Good luck, and happy shrinking!
