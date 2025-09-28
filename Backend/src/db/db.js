const mongoose = require('mongoose');

function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MongoDB connection error: MONGODB_URI is not set in environment variables (.env).');
        return process.exit(1);
    }

    // Fail fast if cluster unreachable and provide actionable hints
    mongoose
        .connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10s timeout for faster feedback and retry
        })
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err?.message || err);
            console.error(
                'Hints: (1) In MongoDB Atlas > Network Access, add your current IP or temporarily 0.0.0.0/0 with expiry; (2) Verify username/password; (3) If your DB user is scoped to a specific database, include that DB name in the URI path, e.g. mongodb+srv://<user>:<pass>@cluster/dbName; (4) If password has special characters, URL-encode it.'
            );
            return process.exit(1);
        });
}

module.exports = connectDB;