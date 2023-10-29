const User = require("../Models/User")

const FollowUser = async(req, res) => {
    if (req.user.id !== req.params.id) {
        const currentUser = await User.findById(req.user.id)

        if (!currentUser.following.includes(req.params.id)) {
            await currentUser.updateOne({
                $push: {
                    following: req.params.id
                }
            })
            res
                .status(200)
                .json("User has been followed")
        } else {
            res
                .status(403)
                .json("You alrady following the user")
        }
    } else {
        res
            .status(403)
            .json("You can't follow yourself")
    }
}

const UnfollowUser = async(req, res) => {
    if (req.user.id !== req.params.id) {
        const currentUser = await User.findById(req.user.id)

        if (currentUser.following.includes(req.params.id)) {
            await currentUser.updateOne({
                $pull: {
                    following: req.params.id
                }
            })
            res
                .status(200)
                .json("User has been unfollowed")
        } else {
            res
                .status(403)
                .json("You are not following the user")
        }
    } else {
        res
            .status(403)
            .json("You can't unfollow yourself")
    }
}

const getUser = async(req, res) => {

    try {
        const userId = req.params.userId;
        let user = User.find({ _id: userId });
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }

}

module.exports = {
    FollowUser,
    UnfollowUser,
    getUser
}