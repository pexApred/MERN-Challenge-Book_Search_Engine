# MERN-Challenge-Book_Search_Engine

## Application Links

* GitHub Repository for Application: https://github.com/pexApred/MERN-Challenge-Book_Search_Engine.git

* Heroku Deployed Application: https://searchbookenginemern-8d13c16dfe0b.herokuapp.com/

## Description

The MERN Challenge: Book Search Engine is a web application that allows readers to search for books to read and keep a list to purchase. The motivation behind this project is to demonstrate the implementation of a GraphQL API using Apollo Server and refactoring an existing RESTful API. By using the MERN stack (MongoDB, Express.js, React, and Node.js), users can easily search for books, save their searches, create user accounts, and manage their saved books.

Through this challenge, experience was gained in setting up an Apollo Server, working with GraphQL queries and mutations, integrating authentification middleware in a GraphQL API, and deploying the application to Heroku. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)

## Installation

Follow these steps to get the development environment running:

1. Clone repository to local machine.
2. cd into root directory
3. Install dependencies ``npm install``
4. Create a MongoDBAtlas account and set up a new database.
5. Create ``.env`` file in server directory and add env variables:
```md
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```
6. Run ``npm start`` or ``npm run develop`` to start application
7. Access the application at ``http://localhost:3000`` in web browser

## Usage

1. When the application has been accessed, presented with ``Search for Books`` and ``Login/Signup``
2. Search for a book in input field and submit
3. If not logged in, you will see results
4. Click on the ``Login/Signup`` to fill out form and submit
5. Once logged in, the menu will update and allow you to see your saved books and logout
6. Searched results will now have a save button to save to your account
7. Screenshots below:

    ![Landing Page](./screenshots/Screenshot%202023-07-15%20at%201.50.45%20PM.png)
    ![Search for Books](./screenshots/Screenshot%202023-07-15%20at%201.51.46%20PM.png)
    ![Save Book Function](./screenshots/Screenshot%202023-07-15%20at%201.52.02%20PM.png)
    ![Saved Books Page](./screenshots/Screenshot%202023-07-15%20at%201.52.12%20PM.png)

## Features

The main features of the Book Search Engine include:

* User authentication: Users can sign up and log in to their accounts.
* Book search: Users can search for books using keywords.
* Search results: Users are presented with search results including the book's title, author, description, image, and a link to the book on the Google Books site.
* Saving books: Users can save books to their accounts for future reference.
* Saved books: Users can view a list of books they have saved, including the book's details and a link to the book on the Google Books site.
* Removing books: Users can remove books from their saved list.
* Logout: Users can log out of their accounts.

## Credits

Completed individually using starter code by: Emmanuel Lakis (https://github.com/pexApred)

## License

This project is covered under the [MIT License](./LICENSE). For more details, please click the license icon below under 'Badges'.

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)