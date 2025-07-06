import express, { Application } from "express";
import { PORT } from "./config/config"; 
import { connectDB } from "./db/database"; 
import userRoutes from "./routes/userRoutes"; 
import authRoutes from "./routes/auth.route"; 
import ApplicationRoutes from "./routes/ApplicationRoutes"; 
import cookieParser from "cookie-parser"; 
import cors from "cors"; 
import caseRoutes from "./routes/caseRoutes";
import violationRoutes from "./routes/violationRoute";
import dashboardRoutes from "./routes/dashboardRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express(); 

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.FRONT_END_URL || "",
      process.env.VICTIM_FRONT_END_URL || "",
    ],
    credentials: true,
  })
);

app.use(cookieParser()); 

app.use("/api/auth", authRoutes);

app.use("/api/applications", ApplicationRoutes);

app.use("/api/users", userRoutes);

app.use("/api/cases", caseRoutes);

app.use("/api/violations", violationRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`Server ${PORT} üzerinde çalışıyor.`);
});

app.use("/api/dashboard", dashboardRoutes);
