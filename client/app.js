import { io } from "socket.io-client";

// Variables
const socket = io("http://localhost:3000");
const messageSubmitButton = document.getElementById("submit-message");

socket.on("connect", () => {
  displayMessage(`You connected with id: ${socket.id}`);
  //   socket.emit("custom-event", 10, "Hi", { a: "A" });
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

  socket.emit("send-message", {
    message: messageInput.value,
  });

  messageInput.value = "";
});
