# Foobar Server App

The Foobar Server App is a backend application that powers the Foobar social network. It follows the Model-View-Controller (MVC) architecture for better organization and separation of concerns. Below is an overview of the project structure:

## Project Structure

### Model

The Model directory contains MongoDB schemas and related methods for interacting with the database:

- **post.js**: Defines the schema for posts and includes methods for CRUD operations related to posts.
- **user.js**: Defines the schema for users and includes methods for CRUD operations related to users.
- **token.js**: Contains methods for managing authentication tokens.

### Controller

The Controller directory contains route handlers that process incoming HTTP requests and invoke corresponding methods from the Model:

- **post.js**: Handles HTTP requests related to posts, such as creating, updating, or deleting posts.
- **user.js**: Handles HTTP requests related to users, such as creating, updating, or deleting user accounts.
- **token.js**: Handles HTTP requests related to authentication and token management.

### Services

The Services directory contains business logic methods for handling user and post-related operations:

- **post.js**: Contains methods for performing business logic operations related to posts, such as fetching posts or managing post data.
- **user.js**: Contains methods for performing business logic operations related to users, such as authentication or user data management.

### Routes

The Routes directory contains Express.js route definitions for different API endpoints:

- **post.js**: Defines routes for handling HTTP requests related to posts.
- **user.js**: Defines routes for handling HTTP requests related to users.
- **token.js**: Defines routes for handling HTTP requests related to authentication and token management.

### No Viewer

As this is a backend server application, there is no Viewer directory. The application only returns JSON responses and does not render HTML views.

## MVC Architecture Benefits

- **Organization**: Separation of concerns into distinct directories makes the codebase easier to navigate and maintain.
- **Scalability**: The modular structure allows for easier scaling by adding new features or modifying existing ones.
- **Clarity**: The MVC architecture provides clear separation between different components, improving code readability and understanding.

---

With this project structure and adherence to the MVC architecture, the Foobar Server App aims to provide a robust and scalable backend foundation for the Foobar social network.

## Project Overview

Foobar Server App serves as the backend for the Foobar social network, handling user authentication, post management, and other backend functionalities.

## Features

- **User Authentication**: Handles user registration, login, and logout functionalities.
- **User Management**: Manages posts uploaded by users, including creation, editing, deletion, and retrieval.
- **Comment Management**: Handles comments on posts, allowing users to add, edit, delete, and retrieve comments.
- **Database Integration**: Integrates with a MongoDB database to store user data, posts, and comments.
- **RESTful API**: Provides a RESTful API for communication with the client-side application.

## Components

### User Authentication

- **Sign Up**: Allows users to register for a new account by filling out a registration form.
- **Sign In**: Provides users with a form to sign in to their accounts.

### Post Management

- **FeedPage**: Serves as the main feed where users can view posts uploaded by themselves and others.

## Full Application Pictures

### Sign Up

![Screenshot 2024-03-14 203337](https://github.com/Eliaddr119/Foobar-Server/assets/113431442/35285dae-6193-4d3d-8071-187188bdc135)

### Sign In

![Screenshot 2024-03-14 203543](https://github.com/Eliaddr119/Foobar-Server/assets/113431442/4696b54a-f3e1-4fe7-afe6-ac0228d5b5fb)


### Feed Page

![Screenshot 2024-03-14 203632](https://github.com/Eliaddr119/Foobar-Server/assets/113431442/08494e00-d613-4768-a2d9-e1a5900f5128)


### Profile Page

![Screenshot 2024-03-14 203710](https://github.com/Eliaddr119/Foobar-Server/assets/113431442/442e5532-6403-47ca-9402-99813c3ffafc)


## How to Run the Server App

To run the server app locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Eliaddr119/Foobar-Server.git
```

2. Navigate to the project directory:

```
cd foobar_server
```

3. Install dependencies:

```
npm install
```

4. Start the server:

```
npm start
```

## Note

- Make sure you have MongoDB installed and running locally on port 27017.
- The server initializes the database with 25 posts and 4 users by default. The users are named "shlomi", "yael", "roni", and "evya". Shlomi is friends with all other users. The password for all users is "Zx123456789".
- Posts are ordered by date, with the newest posts appearing first.
- If you prefer not to add the default posts to the database, you can comment out the following code block in `app.js`:

```javascript
try {
    await User.insertMany(usersData);
    await Post.insertMany(postsData);
} catch (error) {
    console.log(error);
}
```
