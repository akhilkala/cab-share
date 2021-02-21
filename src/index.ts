import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";

const socketio = require("socket.io");
import { Socket } from "socket.io";
import socketHandler from "./socket";

import tripRoutes from "./routes/Trip";
import authRoutes from "./routes/Auth";
import statusRoutes from "./routes/Status";

const app = express();
dotenv.config();
app.use(cors());
connectDB();

const httpServer = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);

const io = socketio(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use("/trip", tripRoutes);
app.use("/auth", authRoutes);

io.on("connection", (socket: Socket) => socketHandler(socket, io));
