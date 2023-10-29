const express = require("express");
const router = express.Router();
const { FollowUser, UnfollowUser, getUser } = require("../Controllers/UserController");
const verify = require("./../verifyToken")

router.put("/:id/follow", verify, FollowUser);

router.put("/:id/unfollow", verify, UnfollowUser)

router.get("/:userId", verify, getUser)

module.exports = router