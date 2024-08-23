// app.js
const express = require("express");
const bodyParser = require("body-parser");
const { Student, Mentor, Booking, Payment, sequelize } = require("./models");

const app = express();
app.use(bodyParser.json());

// Routes
app.get("/mentors", async (req, res) => {
  const { areaOfInterest } = req.query;
  const mentors = await Mentor.findAll({
    where: { expertise: areaOfInterest },
  });
  res.json(mentors);
});

app.post("/book", async (req, res) => {
  const { studentId, mentorId, date, duration, premiumService } = req.body;

  const booking = await Booking.create({
    studentId,
    mentorId,
    date,
    duration,
    premiumService,
  });

  let amount = duration === 30 ? 2000 : duration === 45 ? 3000 : 4000;
  if (premiumService) amount += 1000;

  const payment = await Payment.create({
    bookingId: booking.id,
    amount,
    status: "pending",
  });

  res.json({ booking, payment });
});

app.post("/payment/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const payment = await Payment.findByPk(id);
  if (!payment) return res.status(404).json({ error: "Payment not found" });

  payment.status = status;
  await payment.save();

  res.json(payment);
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
