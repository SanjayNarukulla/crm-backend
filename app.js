const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./models");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const interactionRoutes = require("./routes/interactionRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/interactions", interactionRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
