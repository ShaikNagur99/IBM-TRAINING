import express from "express";
import accountRoutes from "./routes/accountRoutes";

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Register Routes
app.use("/api", accountRoutes);

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});