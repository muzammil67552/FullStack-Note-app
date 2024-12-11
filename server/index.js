const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth"); 
const noteRouter = require("./routes/note"); 
const connectToMongoDB = require("./db/db")
const app = express();


app.use(cors());
app.use(express.json());
//api creating
app.use("/api/auth", authRouter,);
app.use("/api/note", noteRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
