const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

/**
 * Express router for handling comments API.
 * @module routes/api/comments
 */

module.exports = router;

/**
 * GET route for retrieving all comments.
 * @name GET/api/comments
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the retrieved comments.
 */
router.get("/", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

/**
 * DELETE route for deleting a comment by ID.
 * @name DELETE/api/comments/:id
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the success of the deletion.
 */
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        await comment.remove();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});