const crypto = require("crypto")

// Generate a secure random JWT secret
const jwtSecret = crypto.randomBytes(64).toString("hex")

console.log("\n🔐 Your new JWT_SECRET:\n")
console.log(jwtSecret)
console.log("\n📋 Copy this to your .env file:\n")
console.log(`JWT_SECRET=${jwtSecret}`)
console.log("\n⚠️  Keep this secret secure and never commit it to version control!\n")
