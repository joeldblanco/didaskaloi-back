const app = require("./src/server");
const { PORT } = require("./src/config/envs");
const dbCon = require("./src/config/dbCon");

dbCon()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
