
import User from './models/User'; // Import your User model
import Post from './models/Post'; // Import your Post model

// Function to populate initial data
const populateInitialData = async () => {
    try {
        // Add users
        const users = [
            {
                id: 1,
                username: 'user1',
                password: 'password1',
                displayName: 'User One',
                profilePic: 'user1.jpg'
            },
            {
                id: 2,
                username: 'user2',
                password: 'password2',
                displayName: 'User Two',
                profilePic: 'user2.jpg'
            }
            // Add more users as needed
        ];

        // Insert users into the database
        await User.insertMany(users);

        // Add posts
        const posts = [
            {
                username: 'user1',
                displayName: 'User One',
                profilePic: 'user1.jpg',
                content: 'This is the first post by User One'
            },
            {
                username: 'user2',
                displayName: 'User Two',
                profilePic: 'user2.jpg',
                content: 'This is the first post by User Two'
            }
            // Add more posts as needed
        ];

        // Insert posts into the database
        await Post.insertMany(posts);

        console.log('Initial data populated successfully');
    } catch (error) {
        console.error('Error populating initial data:', error);
    }
};

// Call the function to populate initial data when server starts
populateInitialData();