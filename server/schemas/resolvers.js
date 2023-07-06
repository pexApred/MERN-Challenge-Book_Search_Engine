// import user model
const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
    Query: {
        // get a single user by either their id or their username
        getSingleUser: async (parent, { user, params }, context) => {
            try {
                const foundUser = await User.findOne({
                    $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
                });

                if (!foundUser) {
                    throw new Error("Cannot find a user with this id!");
                }

                return foundUser;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        createUser: async (parent, { body }, context) => {
            try {
                const user = await User.create(body);

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
        login: async (parent, { body }, context) => {
            try {
                const user = await User.findOne({
                    $or: [{ username: body.username }, { email: body.email }]
                });
                if (!user) {
                    throw new Error("Can't find this user");
                }

                const correctPw = await user.isCorrectPassword(body.password);

                if (!correctPw) {
                    throw new Error("Wrong password!");
                }

                const token = signToken(user);
                return { token, user };
            } catch (err) {
                throw new Error(err);
            }
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (parent, { user, body }, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                throw new Error(err);
            }
        },
        // delete a book from `savedBooks`
        deleteBook: async (parent, { user, params }, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: params.bookId } } },
                    { new: true }
                );

                if (!updatedUser) {
                    throw new Error("Couldn't find user with this id!");
                }

                return updatedUser;
            } catch (err) {
                throw new Error(err);
            }
        },
    }
};