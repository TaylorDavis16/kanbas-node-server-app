import express from "express";
import session from "express-session";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import cors from "cors";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
// mongoose.connect(CONNECTION_STRING);
mongoose.connect('mongodb+srv://sheldonlee:sheldonlee@project-users.totspm0.mongodb.net/Kanbas?retryWrites=true&w=majority');

import UserRoutes from "./users/routes.js";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'https://xingdong.netlify.app',
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
