require("dotenv").config();
const mongoose = require("mongoose");
const { Movie } = require("../models/models");

// ImagePath uses TMDB poster URLs (https://image.tmdb.org/t/p/w500/<poster_path>)
// so no local image files are required. Re-running this script is safe — it
// upserts by Title rather than wiping the collection.

const movies = [
  // ── Marvel Cinematic Universe ──────────────────────────────────────────────
  {
    Title: "Iron Man",
    Description:
      "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Jon Favreau", Bio: "American actor and filmmaker." },
    Actors: ["Robert Downey Jr.", "Jeff Bridges", "Gwyneth Paltrow"],
    ImagePath: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBBS0D9OBN.jpg",
    Featured: true,
  },
  {
    Title: "The Avengers",
    Description:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki from enslaving humanity with the aid of the tesseract.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Joss Whedon", Bio: "American screenwriter and filmmaker." },
    Actors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    ImagePath: "https://image.tmdb.org/t/p/w500/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    Featured: true,
  },
  {
    Title: "Avengers: Infinity War",
    Description:
      "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Anthony Russo", Bio: "American filmmaker." },
    Actors: ["Robert Downey Jr.", "Chris Hemsworth", "Josh Brolin"],
    ImagePath: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    Featured: true,
  },
  {
    Title: "Avengers: Endgame",
    Description:
      "After the devastating events of Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos's actions and restore balance.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Anthony Russo", Bio: "American filmmaker." },
    Actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    ImagePath: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    Featured: true,
  },
  {
    Title: "Black Panther",
    Description:
      "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Ryan Coogler", Bio: "American filmmaker." },
    Actors: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
    ImagePath: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    Featured: true,
  },

  // ── The Dark Knight Trilogy ────────────────────────────────────────────────
  {
    Title: "Batman Begins",
    Description:
      "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker." },
    Actors: ["Christian Bale", "Liam Neeson", "Katie Holmes"],
    ImagePath: "https://image.tmdb.org/t/p/w500/8RW2runSEc34IwKN2D1aPcJd2UL.jpg",
    Featured: false,
  },
  {
    Title: "The Dark Knight",
    Description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker." },
    Actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    ImagePath: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    Featured: true,
  },
  {
    Title: "The Dark Knight Rises",
    Description:
      "Eight years after the Joker's reign of anarchy, Batman is forced from his exile to defend Gotham City from the brutal guerrilla terrorist Bane.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker." },
    Actors: ["Christian Bale", "Tom Hardy", "Anne Hathaway"],
    ImagePath: "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn41nA.jpg",
    Featured: false,
  },

  // ── Star Wars ──────────────────────────────────────────────────────────────
  {
    Title: "Star Wars: A New Hope",
    Description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "George Lucas", Bio: "American filmmaker and entrepreneur." },
    Actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    ImagePath: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    Featured: true,
  },
  {
    Title: "Star Wars: The Empire Strikes Back",
    Description:
      "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Irvin Kershner", Bio: "American film director." },
    Actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    ImagePath: "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
    Featured: true,
  },
  {
    Title: "Star Wars: The Force Awakens",
    Description:
      "As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "J.J. Abrams", Bio: "American filmmaker and producer." },
    Actors: ["Daisy Ridley", "John Boyega", "Oscar Isaac"],
    ImagePath: "https://image.tmdb.org/t/p/w500/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg",
    Featured: false,
  },
  {
    Title: "Rogue One: A Star Wars Story",
    Description:
      "The daughter of an Imperial scientist joins a motley crew of rebels on a mission to steal the plans for the Death Star.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Gareth Edwards", Bio: "British filmmaker." },
    Actors: ["Felicity Jones", "Diego Luna", "Ben Mendelsohn"],
    ImagePath: "https://image.tmdb.org/t/p/w500/i0yw1mFbB7sNGHCs7EXZPzFkdA1.jpg",
    Featured: false,
  },

  // ── The Lord of the Rings ──────────────────────────────────────────────────
  {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth.",
    Genre: { Name: "Fantasy", Description: "Films set in imaginary worlds with magic and myth." },
    Director: { Name: "Peter Jackson", Bio: "New Zealand filmmaker." },
    Actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    ImagePath: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    Featured: true,
  },
  {
    Title: "The Lord of the Rings: The Two Towers",
    Description:
      "While Frodo and Samwise edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally.",
    Genre: { Name: "Fantasy", Description: "Films set in imaginary worlds with magic and myth." },
    Director: { Name: "Peter Jackson", Bio: "New Zealand filmmaker." },
    Actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
    ImagePath: "https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYspV.jpg",
    Featured: false,
  },
  {
    Title: "The Lord of the Rings: The Return of the King",
    Description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    Genre: { Name: "Fantasy", Description: "Films set in imaginary worlds with magic and myth." },
    Director: { Name: "Peter Jackson", Bio: "New Zealand filmmaker." },
    Actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    ImagePath: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    Featured: true,
  },

  // ── Harry Potter ──────────────────────────────────────────────────────────
  {
    Title: "Harry Potter and the Sorcerer's Stone",
    Description:
      "An orphaned boy discovers he is a wizard and enrolls in Hogwarts School of Witchcraft and Wizardry.",
    Genre: { Name: "Fantasy", Description: "Films set in imaginary worlds with magic and myth." },
    Director: { Name: "Chris Columbus", Bio: "American filmmaker." },
    Actors: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
    ImagePath: "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    Featured: false,
  },
  {
    Title: "Harry Potter and the Prisoner of Azkaban",
    Description:
      "It's Harry's third year at Hogwarts; not only does he have a new Defense Against the Dark Arts teacher, but there is also trouble brewing.",
    Genre: { Name: "Fantasy", Description: "Films set in imaginary worlds with magic and myth." },
    Director: { Name: "Alfonso Cuarón", Bio: "Mexican filmmaker." },
    Actors: ["Daniel Radcliffe", "Emma Watson", "Gary Oldman"],
    ImagePath: "https://image.tmdb.org/t/p/w500/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
    Featured: false,
  },
  {
    Title: "Harry Potter and the Deathly Hallows: Part 2",
    Description:
      "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord.",
    Genre: { Name: "Fantasy", Description: "Films set in imaginary worlds with magic and myth." },
    Director: { Name: "David Yates", Bio: "British filmmaker." },
    Actors: ["Daniel Radcliffe", "Emma Watson", "Ralph Fiennes"],
    ImagePath: "https://image.tmdb.org/t/p/w500/Or4KBPbV0WqXRKzRAnXrxfNLLJ.jpg",
    Featured: true,
  },

  // ── Mission: Impossible ───────────────────────────────────────────────────
  {
    Title: "Mission: Impossible – Fallout",
    Description:
      "Ethan Hunt and his IMF team race against time to prevent a global catastrophe after a mission gone wrong.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Christopher McQuarrie", Bio: "American filmmaker." },
    Actors: ["Tom Cruise", "Henry Cavill", "Ving Rhames"],
    ImagePath: "https://image.tmdb.org/t/p/w500/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    Featured: true,
  },
  {
    Title: "Mission: Impossible – Ghost Protocol",
    Description:
      "The IMF is shut down when it's implicated in the bombing of the Kremlin, causing Ethan Hunt and his new team to go rogue.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Brad Bird", Bio: "American filmmaker and animator." },
    Actors: ["Tom Cruise", "Jeremy Renner", "Simon Pegg"],
    ImagePath: "https://image.tmdb.org/t/p/w500/s5V5bCdJMGJLmBLCsECTRJecGPj.jpg",
    Featured: false,
  },

  // ── James Bond ────────────────────────────────────────────────────────────
  {
    Title: "Casino Royale",
    Description:
      "Armed with a licence to kill, secret agent James Bond sets out on his first mission as 007, where he must defeat a private banker funding terrorists.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Martin Campbell", Bio: "New Zealand filmmaker." },
    Actors: ["Daniel Craig", "Judi Dench", "Eva Green"],
    ImagePath: "https://image.tmdb.org/t/p/w500/oEQLlqvvZFDOFahYTfzu1d3GPbP.jpg",
    Featured: true,
  },
  {
    Title: "Skyfall",
    Description:
      "Bond's loyalty to M is tested when her past comes back to haunt her, as MI6 comes under attack.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Sam Mendes", Bio: "British filmmaker." },
    Actors: ["Daniel Craig", "Javier Bardem", "Judi Dench"],
    ImagePath: "https://image.tmdb.org/t/p/w500/xa2fPUMGfPYmQxnFnzJGHMB0UAT.jpg",
    Featured: true,
  },
  {
    Title: "GoldenEye",
    Description:
      "James Bond teams up with the lone survivor of a destroyed Russian research center to stop the hijacking of a nuclear space weapon.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Martin Campbell", Bio: "New Zealand filmmaker." },
    Actors: ["Pierce Brosnan", "Sean Bean", "Judi Dench"],
    ImagePath: "https://image.tmdb.org/t/p/w500/balmjCTAGFHOFBHkIEzVCRLrmXd.jpg",
    Featured: false,
  },

  // ── Fast & Furious ────────────────────────────────────────────────────────
  {
    Title: "The Fast and the Furious",
    Description:
      "Los Angeles police officer Brian O'Conner must decide where his loyalties lie when he becomes enamored with the underground world of street racing.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Rob Cohen", Bio: "American filmmaker." },
    Actors: ["Vin Diesel", "Paul Walker", "Jordana Brewster"],
    ImagePath: "https://image.tmdb.org/t/p/w500/ugkCRBSFECFbALkYAHn7sU3XZDW.jpg",
    Featured: false,
  },
  {
    Title: "Furious 7",
    Description:
      "Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "James Wan", Bio: "Australian filmmaker." },
    Actors: ["Vin Diesel", "Paul Walker", "Jason Statham"],
    ImagePath: "https://image.tmdb.org/t/p/w500/dPaHqmHHTmhsHbNJiIXZ9Nl6Gum.jpg",
    Featured: false,
  },

  // ── John Wick ─────────────────────────────────────────────────────────────
  {
    Title: "John Wick",
    Description:
      "An ex-hitman comes out of retirement to track down the gangsters that took everything from him.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Chad Stahelski", Bio: "American stuntman and filmmaker." },
    Actors: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"],
    ImagePath: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    Featured: true,
  },
  {
    Title: "John Wick: Chapter 2",
    Description:
      "After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Chad Stahelski", Bio: "American stuntman and filmmaker." },
    Actors: ["Keanu Reeves", "Riccardo Scamarcio", "Ian McShane"],
    ImagePath: "https://image.tmdb.org/t/p/w500/hXWBc0ioZP3cN4zCu6sqbeFdUCF.jpg",
    Featured: false,
  },
  {
    Title: "John Wick: Chapter 3 – Parabellum",
    Description:
      "Super-assassin John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million bounty on his head.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Chad Stahelski", Bio: "American stuntman and filmmaker." },
    Actors: ["Keanu Reeves", "Halle Berry", "Ian McShane"],
    ImagePath: "https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg",
    Featured: false,
  },

  // ── The Matrix ────────────────────────────────────────────────────────────
  {
    Title: "The Matrix",
    Description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Lana Wachowski", Bio: "American filmmaker." },
    Actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    ImagePath: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    Featured: true,
  },
  {
    Title: "The Matrix Reloaded",
    Description:
      "Freedom fighters Neo, Trinity, and Morpheus lead the revolt against the Machine Army, unlocking the door to the Oracle, the Keymaker and Zion.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Lana Wachowski", Bio: "American filmmaker." },
    Actors: ["Keanu Reeves", "Laurence Fishburne", "Hugo Weaving"],
    ImagePath: "https://image.tmdb.org/t/p/w500/9TBe3J3d5VLQfOxAsWrOneKBJhQ.jpg",
    Featured: false,
  },

  // ── Indiana Jones ─────────────────────────────────────────────────────────
  {
    Title: "Raiders of the Lost Ark",
    Description:
      "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis.",
    Genre: { Name: "Adventure", Description: "Films driven by exploration, discovery, and excitement." },
    Director: { Name: "Steven Spielberg", Bio: "American filmmaker and producer." },
    Actors: ["Harrison Ford", "Karen Allen", "Paul Freeman"],
    ImagePath: "https://image.tmdb.org/t/p/w500/ceG9VzoRAVGwivFU403Wc3AHRys.jpg",
    Featured: true,
  },
  {
    Title: "Indiana Jones and the Last Crusade",
    Description:
      "In 1938, after his father goes missing while pursuing the Holy Grail, Indiana Jones must find him and prevent the Grail from falling into Nazi hands.",
    Genre: { Name: "Adventure", Description: "Films driven by exploration, discovery, and excitement." },
    Director: { Name: "Steven Spielberg", Bio: "American filmmaker and producer." },
    Actors: ["Harrison Ford", "Sean Connery", "Alison Doody"],
    ImagePath: "https://image.tmdb.org/t/p/w500/4ZDkPxWNOqFRBMcBHRplNlXt5KR.jpg",
    Featured: false,
  },

  // ── Jurassic Park ─────────────────────────────────────────────────────────
  {
    Title: "Jurassic Park",
    Description:
      "A pragmatic paleontologist visits a theme park created by a billionaire where cloned dinosaurs roam freely.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Steven Spielberg", Bio: "American filmmaker and producer." },
    Actors: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    ImagePath: "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    Featured: true,
  },
  {
    Title: "Jurassic World",
    Description:
      "A new theme park is built on the original site of Jurassic Park. When the prehistoric creature escapes and wreaks havoc, a former dinosaur trainer steps up.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Colin Trevorrow", Bio: "American filmmaker." },
    Actors: ["Chris Pratt", "Bryce Dallas Howard", "Vincent D'Onofrio"],
    ImagePath: "https://image.tmdb.org/t/p/w500/dkMD5qlogeRMiEixC4YNPUvax2T.jpg",
    Featured: false,
  },

  // ── The Hunger Games ──────────────────────────────────────────────────────
  {
    Title: "The Hunger Games",
    Description:
      "Katniss Everdeen voluntarily takes her younger sister's place in the Hunger Games, a televised competition where two teenagers from each district are chosen to fight to the death.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Gary Ross", Bio: "American filmmaker." },
    Actors: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"],
    ImagePath: "https://image.tmdb.org/t/p/w500/samTF8sOCCQNqaFcSQiCxTrqkfE.jpg",
    Featured: false,
  },
  {
    Title: "The Hunger Games: Catching Fire",
    Description:
      "After winning the 74th Hunger Games, Katniss Everdeen and Peeta Mellark are forced to compete in a special edition of the Hunger Games.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Francis Lawrence", Bio: "American filmmaker." },
    Actors: ["Jennifer Lawrence", "Josh Hutcherson", "Philip Seymour Hoffman"],
    ImagePath: "https://image.tmdb.org/t/p/w500/jTBBUQsOuOtqeymNSYjflkCmHoE.jpg",
    Featured: false,
  },

  // ── Alien ─────────────────────────────────────────────────────────────────
  {
    Title: "Alien",
    Description:
      "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
    Genre: { Name: "Horror", Description: "Films designed to frighten and disturb the audience." },
    Director: { Name: "Ridley Scott", Bio: "British filmmaker." },
    Actors: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
    ImagePath: "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    Featured: true,
  },
  {
    Title: "Aliens",
    Description:
      "Fifty-seven years after surviving an apocalyptic attack aboard her space vessel, Ellen Ripley awakens to find that terra-formers on the alien moon have lost contact with Earth.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "James Cameron", Bio: "Canadian filmmaker." },
    Actors: ["Sigourney Weaver", "Michael Biehn", "Bill Paxton"],
    ImagePath: "https://image.tmdb.org/t/p/w500/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg",
    Featured: false,
  },

  // ── Terminator ────────────────────────────────────────────────────────────
  {
    Title: "The Terminator",
    Description:
      "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "James Cameron", Bio: "Canadian filmmaker." },
    Actors: ["Arnold Schwarzenegger", "Linda Hamilton", "Michael Biehn"],
    ImagePath: "https://image.tmdb.org/t/p/w500/qvktm0BHcnmDpul4Hz01GIazWPr.jpg",
    Featured: false,
  },
  {
    Title: "Terminator 2: Judgment Day",
    Description:
      "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son John from a more advanced and powerful cyborg.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "James Cameron", Bio: "Canadian filmmaker." },
    Actors: ["Arnold Schwarzenegger", "Linda Hamilton", "Edward Furlong"],
    ImagePath: "https://image.tmdb.org/t/p/w500/weVXMD5QBGeQil4HEATZqFaDSIm.jpg",
    Featured: true,
  },

  // ── Toy Story ─────────────────────────────────────────────────────────────
  {
    Title: "Toy Story",
    Description:
      "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    Genre: { Name: "Animation", Description: "Films made using animated characters and worlds." },
    Director: { Name: "John Lasseter", Bio: "American animator and filmmaker." },
    Actors: ["Tom Hanks", "Tim Allen", "Don Rickles"],
    ImagePath: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPl9KaI82.jpg",
    Featured: false,
  },
  {
    Title: "Toy Story 3",
    Description:
      "The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college.",
    Genre: { Name: "Animation", Description: "Films made using animated characters and worlds." },
    Director: { Name: "Lee Unkrich", Bio: "American filmmaker." },
    Actors: ["Tom Hanks", "Tim Allen", "Joan Cusack"],
    ImagePath: "https://image.tmdb.org/t/p/w500/AbbXspMOwdvwWZgVP0GSuDfRrJm.jpg",
    Featured: false,
  },

  // ── The Lion King / Disney Classics ──────────────────────────────────────
  {
    Title: "The Lion King",
    Description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    Genre: { Name: "Animation", Description: "Films made using animated characters and worlds." },
    Director: { Name: "Roger Allers", Bio: "American animator and director." },
    Actors: ["Matthew Broderick", "James Earl Jones", "Jeremy Irons"],
    ImagePath: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    Featured: true,
  },
  {
    Title: "Up",
    Description:
      "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.",
    Genre: { Name: "Animation", Description: "Films made using animated characters and worlds." },
    Director: { Name: "Pete Docter", Bio: "American filmmaker and animator." },
    Actors: ["Edward Asner", "Jordan Nagai", "John Ratzenberger"],
    ImagePath: "https://image.tmdb.org/t/p/w500/psmtPMo69NCRnSMHiOP3jQLvHJe.jpg",
    Featured: false,
  },

  // ── Horror Franchises ─────────────────────────────────────────────────────
  {
    Title: "It",
    Description:
      "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster that exploits the fears and phobias of its victims.",
    Genre: { Name: "Horror", Description: "Films designed to frighten and disturb the audience." },
    Director: { Name: "Andy Muschietti", Bio: "Argentine filmmaker." },
    Actors: ["Bill Skarsgård", "Jaeden Martell", "Finn Wolfhard"],
    ImagePath: "https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVHRowKjgejhTSPq6p.jpg",
    Featured: true,
  },
  {
    Title: "Get Out",
    Description:
      "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception grows into dread.",
    Genre: { Name: "Horror", Description: "Films designed to frighten and disturb the audience." },
    Director: { Name: "Jordan Peele", Bio: "American comedian and filmmaker." },
    Actors: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    ImagePath: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    Featured: false,
  },
  {
    Title: "A Quiet Place",
    Description:
      "In a post-apocalyptic world, a family is forced to live in near silence while hiding from creatures that hunt by sound.",
    Genre: { Name: "Horror", Description: "Films designed to frighten and disturb the audience." },
    Director: { Name: "John Krasinski", Bio: "American actor and filmmaker." },
    Actors: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
    ImagePath: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    Featured: false,
  },

  // ── Drama / Oscar Bait ────────────────────────────────────────────────────
  {
    Title: "Forrest Gump",
    Description:
      "The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an below-average IQ.",
    Genre: { Name: "Drama", Description: "Character-driven stories exploring the human condition." },
    Director: { Name: "Robert Zemeckis", Bio: "American filmmaker." },
    Actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    ImagePath: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    Featured: true,
  },
  {
    Title: "Schindler's List",
    Description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    Genre: { Name: "Drama", Description: "Character-driven stories exploring the human condition." },
    Director: { Name: "Steven Spielberg", Bio: "American filmmaker and producer." },
    Actors: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    ImagePath: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    Featured: true,
  },
  {
    Title: "Parasite",
    Description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    Genre: { Name: "Drama", Description: "Character-driven stories exploring the human condition." },
    Director: { Name: "Bong Joon-ho", Bio: "South Korean filmmaker." },
    Actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    ImagePath: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    Featured: true,
  },

  // ── Comedy ────────────────────────────────────────────────────────────────
  {
    Title: "The Grand Budapest Hotel",
    Description:
      "A writer encounters the owner of an aging European hotel between the wars and learns of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    Genre: { Name: "Comedy", Description: "Films intended to entertain and amuse." },
    Director: { Name: "Wes Anderson", Bio: "American filmmaker." },
    Actors: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"],
    ImagePath: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    Featured: false,
  },
  {
    Title: "Superbad",
    Description:
      "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    Genre: { Name: "Comedy", Description: "Films intended to entertain and amuse." },
    Director: { Name: "Greg Mottola", Bio: "American filmmaker." },
    Actors: ["Jonah Hill", "Michael Cera", "Emma Stone"],
    ImagePath: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
    Featured: false,
  },

  // ── Original entries preserved ─────────────────────────────────────────────
  {
    Title: "The Shawshank Redemption",
    Description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Genre: { Name: "Drama", Description: "Character-driven stories exploring the human condition." },
    Director: { Name: "Frank Darabont", Bio: "American filmmaker." },
    Actors: ["Tim Robbins", "Morgan Freeman"],
    ImagePath: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    Featured: true,
  },
  {
    Title: "The Godfather",
    Description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    Genre: { Name: "Crime", Description: "Films centered on criminal activities and their consequences." },
    Director: { Name: "Francis Ford Coppola", Bio: "American filmmaker." },
    Actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    ImagePath: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLlegkAzin1x.jpg",
    Featured: true,
  },
  {
    Title: "Pulp Fiction",
    Description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    Genre: { Name: "Crime", Description: "Films centered on criminal activities and their consequences." },
    Director: { Name: "Quentin Tarantino", Bio: "American filmmaker." },
    Actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    ImagePath: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    Featured: true,
  },
  {
    Title: "The Silence of the Lambs",
    Description:
      "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
    Genre: { Name: "Thriller", Description: "Suspenseful films designed to keep audiences on edge." },
    Director: { Name: "Jonathan Demme", Bio: "American filmmaker." },
    Actors: ["Jodie Foster", "Anthony Hopkins"],
    ImagePath: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    Featured: true,
  },
  {
    Title: "The Good, the Bad and the Ugly",
    Description:
      "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold.",
    Genre: { Name: "Western", Description: "Films set in the American frontier era." },
    Director: { Name: "Sergio Leone", Bio: "Italian filmmaker." },
    Actors: ["Clint Eastwood", "Lee Van Cleef", "Eli Wallach"],
    ImagePath: "https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
    Featured: false,
  },
  {
    Title: "Django Unchained",
    Description:
      "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner.",
    Genre: { Name: "Western", Description: "Films set in the American frontier era." },
    Director: { Name: "Quentin Tarantino", Bio: "American filmmaker." },
    Actors: ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio"],
    ImagePath: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWAb8X.jpg",
    Featured: false,
  },
  {
    Title: "Gladiator",
    Description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "Ridley Scott", Bio: "British filmmaker." },
    Actors: ["Russell Crowe", "Joaquin Phoenix"],
    ImagePath: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    Featured: false,
  },
  {
    Title: "Fight Club",
    Description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
    Genre: { Name: "Drama", Description: "Character-driven stories exploring the human condition." },
    Director: { Name: "David Fincher", Bio: "American filmmaker." },
    Actors: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    ImagePath: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    Featured: false,
  },
  {
    Title: "Interstellar",
    Description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker." },
    Actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    ImagePath: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lZtvFaT71Ae.jpg",
    Featured: true,
  },
  {
    Title: "The Martian",
    Description:
      "An astronaut becomes stranded on Mars after his team assumes him dead, and must rely on his ingenuity to signal to Earth that he is alive.",
    Genre: { Name: "Science Fiction", Description: "Speculative fiction exploring futuristic concepts." },
    Director: { Name: "Ridley Scott", Bio: "British filmmaker." },
    Actors: ["Matt Damon", "Jessica Chastain", "Kristen Wiig"],
    ImagePath: "https://image.tmdb.org/t/p/w500/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
    Featured: true,
  },
  {
    Title: "Bullet Train",
    Description:
      "Five assassins aboard a fast moving bullet train find out their missions have something in common.",
    Genre: { Name: "Action", Description: "High-energy films featuring physical feats and heroics." },
    Director: { Name: "David Leitch", Bio: "American filmmaker." },
    Actors: ["Brad Pitt", "Joey King", "Aaron Taylor-Johnson"],
    ImagePath: "https://image.tmdb.org/t/p/w500/j8szC8FgKiDohXcCdlWM8BmBjH0.jpg",
    Featured: false,
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log("Connected to MongoDB");

    console.log(`Upserting ${movies.length} movies (safe to re-run)...`);

    let inserted = 0;
    let updated = 0;

    for (const movie of movies) {
      const result = await Movie.findOneAndUpdate(
        { Title: movie.Title },
        { $set: movie },
        { upsert: true, new: true }
      );
      if (result.__v === undefined || result.isNew) {
        inserted++;
      } else {
        updated++;
      }
    }

    console.log(`Done! Inserted: ${inserted}, Updated/skipped: ${movies.length - inserted}`);

    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
