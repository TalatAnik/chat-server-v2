const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./src/db");
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");
const messaging = require("./src/sockets/messaging");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());
// Middleware
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// Socket.io
messaging(io);

// Start Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
