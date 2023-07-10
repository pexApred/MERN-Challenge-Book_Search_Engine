// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
    Query: {
        // get a single user by either their id or their username
        me: async (parent, args, context) => {
            try {
                if (context.User) {
                    const foundUserData = await User.findOne({ _id: context.user.id }).select('-__v -password');
                return foundUserData;    
                }
                throw new AuthenticationError('Not logged in');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        createUser: async (parent, args) => {
            try {
                const user = await User.create(args);
                if (!user) {
                    throw new Error("Something is wrong!");
                }
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                throw new Error(err);
            }
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        login: async (parent, { email, password }) => {
            try {
                const user = await User.findOne({email });
                if (!user) {
                    throw new Error("Can't find this user");
                }
                const correctPw = await user.isCorrectPassword(password);

                if (!correctPw) {
                    throw new AuthenticationError("Wrong password!");
                }
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                throw new Error(err);
            }
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (parent, { bookData }, context) => {
            try {
                if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedUser;
                }
                throw new AuthenticationError("You need to be logged in!")
            } catch (err) {
                throw new Error(err);
            }
        },
        // delete a book from `savedBooks`
        deleteBook: async (parent, { bookId }, context) => {
            try {
                if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
                }
                throw new AuthenticationError("You need to be logged in!")
            } catch (err) {
                throw new Error(err);
            }
        },
    }
};