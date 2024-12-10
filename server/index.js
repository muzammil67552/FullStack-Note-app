const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth"); // Use require for consistency
const connectToMongoDB = require("./db/db")
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
