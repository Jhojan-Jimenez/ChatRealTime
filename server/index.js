import express from "express";
import logger from "morgan";
import WebSocket, { WebSocketServer } from "ws";
import { createServer } from "node:http";
import { messageModel } from "../database/mySQL.js";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", async (socket) => {
  console.log("a user has connected");
  const messages = await messageModel.getAll();
  try {
    messages.forEach((element) => {
      socket.send(element.content);
      socket.emit
    });
  } catch (error) {
    console.log(error);
  }
  socket.on("close", async () => {
    const id = await messageModel.lastId();
    const index = id[0].id ?? 0;
    socket.send(`type=${index}`);
    console.log("a user has disconnected, ultimo id: ", index);
  });

  socket.on("message", async (data, isBinary) => {
    const messageText = data.toString("utf-8");

    try {
      messageModel.addMessage(messageText);

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
  });
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

const PORT = process.env.PORT ?? 4000;

server.listen(PORT, () => {
  console.log("Server en express iniciado en el port: ", PORT);
});
