// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Use SQLite for simplicity
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "career.db"), // This will create a career.db file in the root directory
});

const Student = sequelize.define("Student", {
  name: DataTypes.STRING,
  areaOfInterest: DataTypes.STRING,
  availableTime: DataTypes.JSON,
});

const Mentor = sequelize.define("Mentor", {
  name: DataTypes.STRING,
  expertise: DataTypes.STRING,
  availableTime: DataTypes.JSON,
});

const Booking = sequelize.define("Booking", {
  date: DataTypes.DATE,
  duration: DataTypes.INTEGER,
  premiumService: DataTypes.BOOLEAN,
});

const Payment = sequelize.define("Payment", {
  amount: DataTypes.FLOAT,
  status: DataTypes.STRING,
});

// Define associations
Student.belongsToMany(Mentor, { through: Booking });
Mentor.belongsToMany(Student, { through: Booking });
Booking.hasOne(Payment);

// Sync models with the database
sequelize
  .sync({ force: true }) // Use `force: true` to drop and recreate tables
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error(err));

module.exports = { Student, Mentor, Booking, Payment, sequelize };
