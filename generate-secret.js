#!/usr/bin/env node

/**
 * Generate Secure JWT Secret
 * ===========================
 * This script generates a cryptographically secure JWT secret
 * for production use.
 */

const crypto = require("crypto");

console.log("\nQuickQuiz - JWT Secret Generator\n");
console.log("=".repeat(80));

// Generate 64 bytes (512 bits) of random data
const secret = crypto.randomBytes(64).toString("hex");

console.log("\nYour secure JWT secret (copy this to your .env):\n");
console.log(`JWT_SECRET=${secret}\n`);
console.log("=".repeat(80));
console.log("\n\nKeep this secret safe and do not share it publicly!\n");
