const mongoose = require("mongoose");

const dbConnect = () => {
  const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(process.env.MONGODB_URI, clientOptions)
    .then(async () => {
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    })
    .catch((error) => {
      console.log("Issue in DB Connection");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
