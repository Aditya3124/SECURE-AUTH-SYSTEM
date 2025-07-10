import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connectDB from "./db/db.js";
import authRoute from "./routes/auth.route.js";


const app = express();
dotenv.config();
app.use(cookieParser());
const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 4000;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use("/api/auth",authRoute)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
