const { Student, Mentor, Booking, sequelize } = require("./models/index");

// Function to seed data
const seedData = async () => {
  await sequelize.sync({ force: true }); // This will reset the database

  // Create Mentors
  const mentor1 = await Mentor.create({
    name: "John Doe",
    expertise: "FMCG Sales",
    availableTime: {
      Monday: ["18:00-19:00"],
      Wednesday: ["19:00-20:00"],
    },
  });

  const mentor2 = await Mentor.create({
    name: "Jane Smith",
    expertise: "Equity Research",
    availableTime: {
      Tuesday: ["17:00-18:00"],
      Thursday: ["18:00-19:00"],
    },
  });

  const mentor3 = await Mentor.create({
    name: "Emily Johnson",
    expertise: "Digital Marketing",
    availableTime: {
      Monday: ["18:00-19:00", "19:00-20:00"],
      Sunday: ["16:00-17:00"],
    },
  });

  const mentor4 = await Mentor.create({
    name: "Robert Brown",
    expertise: "E-Commerce",
    availableTime: {
      Friday: ["18:00-19:00"],
      Sunday: ["14:00-15:00"],
    },
  });

  // Create Students
  const student1 = await Student.create({
    name: "Alice Green",
    areaOfInterest: "FMCG Sales",
    availableTime: {
      Monday: ["18:00-19:00"],
      Tuesday: ["17:00-18:00"],
    },
  });

  const student2 = await Student.create({
    name: "Bob White",
    areaOfInterest: "Equity Research",
    availableTime: {
      Thursday: ["18:00-19:00"],
      Saturday: ["15:00-16:00"],
    },
  });

  const student3 = await Student.create({
    name: "Charlie Black",
    areaOfInterest: "Digital Marketing",
    availableTime: {
      Wednesday: ["19:00-20:00"],
      Sunday: ["16:00-17:00"],
    },
  });

  const student4 = await Student.create({
    name: "Diana Blue",
    areaOfInterest: "E-Commerce",
    availableTime: {
      Friday: ["18:00-19:00"],
      Sunday: ["14:00-15:00"],
    },
  });

  console.log("Seed data has been added successfully!");
};

seedData()
  .catch((err) => console.error(err))
  .finally(() => sequelize.close());
