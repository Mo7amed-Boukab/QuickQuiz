#!/bin/sh

# Seed the database
echo "Running Seeders..."
npm run seed:prod || echo "Seeding failed but continuing..."

# Start the application using exec to replace the shell process
echo "Starting Server..."
exec npm start
