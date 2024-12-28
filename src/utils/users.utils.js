const onlineUsers = new Map(); // Map of socketId -> username
const userSocketIds = {}; // New structure to map username to socketId

const addUser = (socketId, username) => {
  onlineUsers.set(socketId, username);
  userSocketIds[username] = socketId; // Store the socketId for the username
};

const removeUser = (socketId) => {
  const username = onlineUsers.get(socketId);
  if (username) {
    delete userSocketIds[username]; // Remove username from the parallel map
    onlineUsers.delete(socketId);
  }
};

const getOnlineUsers = () => {
  // Return an array of objects containing socketId and username
  return Array.from(onlineUsers.entries()).map(([socketId, username]) => ({
    socketId,
    username,
  }));
};

// New function to return the user details (with socketId) for a specific recipient
const getUserDetailsForRecipient = (recipientUsername) => {
  const socketId = userSocketIds[recipientUsername]; // Look up the socketId using the parallel structure
  if (socketId) {
    return { username: recipientUsername, socketId }; // Return both username and socketId
  }
  return null; // Return null if the user is not found
};

module.exports = {
  addUser,
  removeUser,
  getOnlineUsers,
  getUserDetailsForRecipient,
};
