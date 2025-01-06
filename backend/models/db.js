const mongose = require("mongoose");
// require("dotenv").config({ path: "./.env" });
const url =
  process.env.MONGO_DB ||
  "mongodb+srv://farhandazzler1999:1234@backenddb.aw3vz5r.mongodb.net/auth-webapp?retryWrites=true&w=majority&appName=BackendDB";
mongose
  .connect(url)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("ERR in connection DB", err);
  });
