const Book = require("../Models/Book")
const User = require("../Models/User");

const PostBook = async(req, res) => {
    console.log(req.body);

    const user = await User.findById(req.user.id)
    console.log(user);
    const newPost = new Book({
        ...req.body,
        user: user._id
    });

    try {
        const savedPost = await newPost.save();
        await user.updateOne({
            $push: {
                posts: savedPost._id
            }
        })
        res
            .status(200)
            .json(savedPost);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
};


const FollowingBooks = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const following = user.following;

        let users = await Promise.all(following.map((followingId) => {
            return User.findById(followingId);
        }));

        let postsIds = []; 

        users.map((user) => postsIds.push(...user.posts));

        let posts = await Promise.all(postsIds.map((postId) => {
            return Book
                .findById(postId)
                .populate({path: 'user', select: 'name _id following'})
        }));

        res
            .status(200)
            .json(posts);
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

const LikeBook = async(req, res) => {
    try {
        const post = await Book.findById(req.params.bookId)

        if (!post.likes.includes(req.user.id)) {
            await post.updateOne({
                $push: {
                    likes: req.user.id
                }
            });
            res
                .status(200)
                .json("You just liked the post");
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.user.id
                }
            });
            res
                .status(200)
                .json("You just disliked the post");
        }
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

const BookLikes = async(req, res) => {
    try {
        const post = await Book.findById(req.params.bookId)
        res
            .status(200)
            .json(post.likes)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

const SearchBooks = async(req, res) => {
    try {
        const searchTerm = req.params.searchTerm
        let books = await Book.find({
            $or: [
                {
                    author: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                }, {
                    review: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                }, {
                    genres: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                },
                {
                    title: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                }
            ]
        }).populate("user", "_id name following")
        res
            .status(200)
            .json(books)
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
}

const getAllBooks = async(req, res) => {

    try {
        let books = await Book
            .find({
            user: {
                $ne: req.user.id
            }
        })
            .populate("user", "_id name following");
        if(books.length > 0) {

            console.log(books)

            return res
                .status(200)
                .json(books);
        }
    } catch (error) {
        return res
            .status(500)
            .json(error)
    }
}

const getUserBooks = async(req, res) => {

    try {
        let books = await Book
            .find({user: req.user.id})
        return res
            .status(200)
            .json(books);
    } catch (error) {
        return res
            .status(500)
            .json(error)
    }
}

module.exports = {
    PostBook,
    FollowingBooks,
    LikeBook,
    BookLikes,
    SearchBooks,
    getAllBooks,
    getUserBooks
}