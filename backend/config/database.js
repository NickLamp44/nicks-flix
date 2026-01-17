const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connectionString = process.env.CONNECTION_URI;

    if (!connectionString) {
      throw new Error("CONNECTION_URI is not defined in environment variables");
    }

    const dbName = connectionString.split("/").slice(-1)[0].split("?")[0];
    console.log(" Attempting to connect to MongoDB...");
    console.log(
      "Connection string format:",
      connectionString.replace(/:[^:@]+@/, ":****@")
    );
    console.log(
      "Username being used:",
      connectionString.split("://")[1].split(":")[0]
    );
    console.log(
      "🎯 TARGET DATABASE FROM CONNECTION STRING:",
      dbName
    );

    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000,
    });

    const actualDbName = mongoose.connection.name;
    console.log("Database connected successfully");
    console.log("ACTUAL CONNECTED DATABASE:", actualDbName);
    console.log("Connection host:", mongoose.connection.host);

    if (actualDbName !== dbName) {
      console.warn(
        `⚠️  WARNING: Connected to '${actualDbName}' but expected '${dbName}'`
      );
    }

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
    });
  } catch (error) {
    console.error("✗ Database connection failed:", error.message);
    if (error.message.includes("bad auth")) {
      console.error("\n💡 Authentication failed. Please verify:");
      console.error("   1. Username is correct in CONNECTION_URI");
      console.error(
        "   2. Password is correct and URL-encoded (! = %21, @ = %40, etc.)"
      );
      console.error("   3. Database user exists in MongoDB Atlas");
      console.error("   4. Database user has correct permissions\n");
    }
    process.exit(1);
  }
};

module.exports = connectDatabase;
