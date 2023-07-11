# Project Name

Project Description: A brief description of the project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Database](#database)
- [Backend](#backend)
- [Frontend](#frontend)
- [Schema Definitions](#schema-definitions)

## Installation

To install the necessary dependencies, go to each directory (frontend or backend) and run `npm install`. To run the backend run `npm run start`. This command will first build the entire backend, transpiling it, saves all the files in **dist/** directory, and then finally runs the backend. The frontend can be run with just `npm run dev`. This simply runs the NextJS app. Keep in mind that you'll need to use your own `.env` for the backend and `.env.local` for the frontend.  

## Usage

To use the app, you'll first have to register on the **/register** page. After registering, you'll be redirected to the **/login** page where you'll log in. After that enter the right country code and you'll see the search result. You can also see your previous search results.

## Technologies

The project utilizes the following technologies:

- **Backend**: The backend uses technologies such as Bcrypt, CORS, Dotenv, Express, JSON Web Token (jsonwebtoken), Mongoose, rimraf, and TypeScript.
- **Frontend**: The frontend employs technologies including Redux Toolkit, Next.js, NextAuth.js, React, React Redux, and Tailwind CSS.

## Database

The project uses MongoDB as the database. It consists of two documents:

- **User**: Contains user information.
- **Result**: Stores search results made by the user.

## Backend

The backend of the project can be found in the `mine-marketing-test-task-backend` folder. It is responsible for user registration, login authentication, and handling API requests. The backend utilizes technologies such as Bcrypt, CORS, Dotenv, Express, JSON Web Token (jsonwebtoken), Mongoose, rimraf, and TypeScript.

## Frontend

The frontend of the project can be found in the `mine-marketing-test-task-frontend` folder. It includes the user interface and search functionality. The frontend employs technologies including Redux Toolkit, Next.js, NextAuth.js, React, React Redux, and Tailwind CSS.

## Schema Definitions

The project uses MongoDB as the database. The database has two documents: User and Result. The User schema has the first name, last name, email, and password fields while the Result schema has user email, country name, capital city, country code, and country phone code fields.
