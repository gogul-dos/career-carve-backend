const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

// Initialize the app and sequelize
const app = express();
const sequelize = new Sequelize("career.db", "user", "password", {
  dialect: "sqlite",
  storage: "./career.db",
});

// Middleware
app.use(bodyParser.json());

// Models
const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaOfInterest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availableTime: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

const Mentor = sequelize.define("Mentor", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expertise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availableTime: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

const Booking = sequelize.define("Booking", {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  premiumService: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// Relationships
Student.hasMany(Booking);
Mentor.hasMany(Booking);
Booking.belongsTo(Student);
Booking.belongsTo(Mentor);

// Routes
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
});

app.post("/mentors", async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create mentor" });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Payment route
app.post("/payment", async (req, res) => {
  const { studentId, mentorId, duration, premiumService } = req.body;

  // Calculate the payment amount
  let amount = 0;
  if (duration === 30) amount = 2000;
  else if (duration === 45) amount = 3000;
  else if (duration === 60) amount = 4000;

  if (premiumService) {
    amount += 1000; // Extra charge for premium service
  }

  try {
    // Mock payment success
    const paymentStatus = "success"; // Assume the payment went through

    if (paymentStatus === "success") {
      // Create the booking in the database
      const booking = await Booking.create({
        studentId,
        mentorId,
        date: new Date(),
        duration,
        premiumService,
      });

      res.json({ message: "Payment successful", booking });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during payment processing" });
  }
});

// Sync database and start server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
