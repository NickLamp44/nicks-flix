const express = require("express");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const Models = require("../models/models");

const router = express.Router();
const Users = Models.User;

// Register new user
router.post(
  "/",
  [
    check("username", "Username is required (min 5 characters)").isLength({
      min: 5,
    }),
    check(
      "username",
      "Username contains non-alphanumeric characters"
    ).isAlphanumeric(),
    check("password", "Password is required").notEmpty(),
    check("Email", "Email is not valid").isEmail(),
  ],
  async (req, res) => {
    console.log("Registration attempt received");
    console.log("Request body:", {
      username: req.body.username,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
      hasPassword: !!req.body.password,
    });
    console.log("Database name:", Users.db.name);
    console.log("Collection name:", Users.collection.name);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, password, Email, Birthday } = req.body;

    try {
      console.log("Checking for existing user...");
      // Check if user already exists
      const existingUser = await Users.findOne({
        $or: [{ username }, { Email }],
      });

      if (existingUser) {
        const field = existingUser.username === username ? "username" : "email";
        console.log("User already exists. Conflicting field:", field);
        return res.status(400).json({
          message: `A user with this ${field} already exists. Please choose a different ${field}.`,
        });
      }

      console.log("Creating new user...");
      const hashedPassword = Users.hashPassword(password);
      const newUser = new Users({
        username,
        password: hashedPassword,
        Email,
        Birthday: Birthday || null,
      });

      console.log("Saving user to database...");
      const savedUser = await newUser.save();
      console.log("User saved successfully! ID:", savedUser._id);
      console.log("User saved to database:", savedUser.db.name);

      // Return user without password
      const userResponse = savedUser.toObject();
      delete userResponse.password;

      return res.status(201).json(userResponse);
    } catch (error) {
      console.error("Error creating user:", error);
      console.error("Error details:", error.message);
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }
);

// Get all users (admin only - should add role check in production)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  }
);

// Get user by username
router.get(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.params.username })
        .select("-password")
        .populate("Watchlist");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({ message: "Error fetching user", error: error.message });
    }
  }
);

// Update user
router.put(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  [
    check("username", "Username must be at least 5 characters")
      .optional()
      .isLength({ min: 5 }),
    check("username", "Username contains non-alphanumeric characters")
      .optional()
      .isAlphanumeric(),
    check("Email", "Email is not valid").optional().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Ensure user can only update their own profile
    if (req.user.username !== req.params.username) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this user" });
    }

    try {
      // Don't allow password updates through this endpoint
      const { password, ...updateData } = req.body;

      const updatedUser = await Users.findOneAndUpdate(
        { username: req.params.username },
        { $set: updateData },
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  }
);

// Delete user
router.delete(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Ensure user can only delete their own account
    if (req.user.username !== req.params.username) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this user" });
    }

    try {
      const deletedUser = await Users.findOneAndDelete({
        username: req.params.username,
      });

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: `User ${req.params.username} was deleted` });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  }
);

// Add movie to watchlist
router.post(
  "/:id/watchlist/:movieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, movieId } = req.params;

    // Ensure user can only modify their own watchlist
    if (req.user._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to modify this watchlist" });
    }

    try {
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { $addToSet: { Watchlist: movieId } },
        { new: true }
      )
        .select("-password")
        .populate("Watchlist");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      res
        .status(500)
        .json({
          message: "Error adding movie to watchlist",
          error: error.message,
        });
    }
  }
);

// Remove movie from watchlist
router.delete(
  "/:id/watchlist/:movieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, movieId } = req.params;

    // Ensure user can only modify their own watchlist
    if (req.user._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to modify this watchlist" });
    }

    try {
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { $pull: { Watchlist: movieId } },
        { new: true }
      )
        .select("-password")
        .populate("Watchlist");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      res
        .status(500)
        .json({
          message: "Error removing movie from watchlist",
          error: error.message,
        });
    }
  }
);

module.exports = router;
