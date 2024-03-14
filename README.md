# Welcome to foobar Server App! 🖥️

Foobar Server App is the backend application that powers the Foobar social network. This server app handles user authentication, manages posts and comments, and provides data to the client-side application.

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
