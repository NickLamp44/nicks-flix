const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Movie Schema
const movieSchema = mongoose.Schema(
  {
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: {
      Name: String,
      Description: String,
    },
    Director: {
      Name: String,
      Bio: String,
      Birth: String,
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean,
  },
  {
    timestamps: true,
  }
);

// User Schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    Birthday: Date,
    Watchlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    Ratings: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        ratedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Validate password
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

movieSchema.index({ Title: 1 });
movieSchema.index({ "Genre.Name": 1 });
movieSchema.index({ "Director.Name": 1 });

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ Email: 1 }, { unique: true });

const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Movie, User };
