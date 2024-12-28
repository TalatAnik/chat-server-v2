const {
  addUser,
  removeUser,
  getOnlineUsers,
  getUserDetailsForRecipient,
} = require("../utils/users.utils");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // User joins
    socket.on("join", (username) => {
      addUser(socket.id, username.user);

      // Broadcast updated online users list
      const onlineUsers = getOnlineUsers();

      console.log(onlineUsers);
      io.emit("onlineUsers", onlineUsers);
    });

    // Handle direct messaging
    socket.on("privateMessage", ({ sender, recipient, content }) => {
      console.log(
        `Received message from ${sender} to ${recipient}: ${content}`
      );

      // Use the new function to get the recipient's details
      const recipientDetails = getUserDetailsForRecipient(recipient);

      if (recipientDetails) {
        console.log("Recipient found:", recipientDetails);
        // Emit the message to the recipient's socketId
        io.to(recipientDetails.socketId).emit("privateMessage", {
          sender,
          recipient,
          content,
        });
      } else {
        console.log("User not online:", recipient);
        console.log(
          recipientDetails.socketId,
          "::",
          sender,
          " ",
          recipient,
          " ",
          content
        );
      }
    });

    // User disconnects
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      removeUser(socket.id);

      // Broadcast updated online users list
      const onlineUsers = getOnlineUsers();
      io.emit("onlineUsers", onlineUsers);
    });
  });
};
