const mongoose = require("mongoose");

export const connect = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected!");
  } catch (exp) {
    console.error(exp);
    console.error("MongoDB Failed to connect!");
  }
};
