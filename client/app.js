import { io } from "socket.io-client";

// Variables
const socket = io("http://localhost:3000");
const messageSubmitButton = document.getElementById("submit-message");
const joinRoomButton = document.getElementById("submit-room-join");

socket.on("connect", () => {
  displayMessage(`You connected with id: ${socket.id}`);
  //   socket.emit("custom-event", 10, "Hi", { a: "A" });
});

socket.on("receive-message", (message) => {
  displayMessage(message.message);
});

function displayMessage(message) {
  const messageTextElement = document.createTextNode(message);
  const newMessageDivElement = document.createElement("div");
  newMessageDivElement.appendChild(messageTextElement);
  newMessageDivElement.classList.add("message");
  const messageBoxElement = document.getElementsByClassName("message-box")[0];
  messageBoxElement.appendChild(newMessageDivElement);
}

// Event handlers
messageSubmitButton.addEventListener("click", ($event) => {
  $event.preventDefault();

  const messageInput = document.getElementById("message-input");
  const roomInput = document.getElementById("room-input");
  displayMessage(`Me: ${messageInput.value}`);

  socket.emit("send-message", {
    message: messageInput.value,
    room: roomInput.value,
  });

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", ($event) => {
  $event.preventDefault();

  const roomInput = document.getElementById("room-input");

  socket.emit("join-room", roomInput.value);

  displayMessage(`You have joined room ${roomInput.value}`);
});
