const mongoose = require("mongoose");

export const connect = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    //await mongoose.connect("mongodb://host.docker.internal:27017/hail");
    console.log("MongoDB Connected!");
  } catch (exp) {
    console.error(exp);
    console.error("MongoDB Failed to connect!");
  }
};
