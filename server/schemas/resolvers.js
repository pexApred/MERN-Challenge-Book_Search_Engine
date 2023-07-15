// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
    Query: {
        // get a single user by either their id or their username
        me: async (parent, args, context) => {
            const userId = context.user._id;
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error(err);
                throw new AuthenticationError('Something went wrong with finding myself!');
            }
        },
    },
    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        createUser: async (parent, args) => {
            console.log(args);
            const user = await User.create(args);
            if (!user) {
                throw new Error("Something is wrong!");
            }
            const token = signToken(user);
            return { token, user };
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Wrong password!");
            }
            const token = signToken(user);
            return { token, user };
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                console.log(bookData);
                console.log("Context.user", context.user)
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );
                console.log("Updated User", updatedUser);
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!")
        },
        // delete a book from `savedBooks`
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!")
        },
    }
};