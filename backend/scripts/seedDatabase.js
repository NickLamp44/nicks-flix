require("dotenv").config();
const mongoose = require("mongoose");
const { Movie } = require("../models/models");

const movies = [
  {
    Title: "The Shawshank Redemption",
    Description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Genre: { Name: "Drama" },
    Director: { Name: "Frank Darabont", Bio: "American filmmaker" },
    ImagePath: "/images/shawshankredemptionposter.jpg",
    Featured: true,
  },
  {
    Title: "The Godfather",
    Description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    Genre: { Name: "Crime" },
    Director: { Name: "Francis Ford Coppola", Bio: "American filmmaker" },
    ImagePath: "/placeholder.svg?height=400&width=300",
    Featured: true,
  },
  {
    Title: "Pulp Fiction",
    Description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    Genre: { Name: "Crime" },
    Director: { Name: "Quentin Tarantino", Bio: "American filmmaker" },
    ImagePath: "/images/pulpfictionposter.jpg",
    Featured: true,
  },
  {
    Title: "The Silence of the Lambs",
    Description:
      "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
    Genre: { Name: "Thriller" },
    Director: { Name: "Jonathan Demme", Bio: "American filmmaker" },
    ImagePath: "/images/silenceofthelambsposter.webp",
    Featured: true,
  },
  {
    Title: "The Good, the Bad and the Ugly",
    Description:
      "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold.",
    Genre: { Name: "Western" },
    Director: { Name: "Sergio Leone", Bio: "Italian filmmaker" },
    ImagePath: "/images/thegoodthebadtheuglyposter.jpg",
    Featured: false,
  },
  {
    Title: "Django Unchained",
    Description:
      "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner.",
    Genre: { Name: "Western" },
    Director: { Name: "Quentin Tarantino", Bio: "American filmmaker" },
    ImagePath: "/images/djangounchainedposter.jpg",
    Featured: false,
  },
  {
    Title: "Gladiator",
    Description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
    Genre: { Name: "Action" },
    Director: { Name: "Ridley Scott", Bio: "British filmmaker" },
    ImagePath: "/images/gladiatorposter.jpg",
    Featured: false,
  },
  {
    Title: "Fight Club",
    Description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
    Genre: { Name: "Drama" },
    Director: { Name: "David Fincher", Bio: "American filmmaker" },
    ImagePath: "/images/fightclubposter.jpg",
    Featured: false,
  },
  {
    Title: "Interstellar",
    Description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Genre: { Name: "Science Fiction" },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker" },
    ImagePath: "/images/interstellarposter.jpg",
    Featured: true,
  },
  {
    Title: "The Martian",
    Description:
      "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
    Genre: { Name: "Science Fiction" },
    Director: { Name: "Ridley Scott", Bio: "British filmmaker" },
    ImagePath: "/images/themartianposter.jpg",
    Featured: true,
  },
  {
    Title: "Bullet Train",
    Description:
      "Five assassins aboard a fast moving bullet train find out their missions have something in common.",
    Genre: { Name: "Action" },
    Director: { Name: "David Leitch", Bio: "American filmmaker" },
    ImagePath: "/images/bullettrainposter.jpg",
    Featured: false,
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log("Connected to MongoDB");

    console.log("Clearing existing movies...");
    await Movie.deleteMany({});

    console.log("Inserting movies...");
    const result = await Movie.insertMany(movies);
    console.log(`Successfully inserted ${result.length} movies`);

    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
