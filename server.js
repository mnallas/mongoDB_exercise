const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//const mongojs = require("mongojs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require("./routes/test-routes");
const notesRoutes = require("./routes/mongo-routes");

app.use(apiRoutes, notesRoutes);

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
