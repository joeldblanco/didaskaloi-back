const validateStudent = (req, res, next) => {
  const { firstName, lastName, age, gender } = req.body;
  if (!firstName || !lastName || !age || !gender) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (typeof firstName !== "string" || typeof lastName !== "string") {
    return res
      .status(400)
      .json({ message: "First and last name must be strings" });
  }

  if (typeof age !== "number") {
    return res.status(400).json({ message: "Age must be a number" });
  }

  if (age < 0 || age > 120) {
    return res.status(400).json({ message: "Age must be between 0 and 120" });
  }

  const validGenders = ["male", "female"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({ message: "Invalid gender" });
  }

  next();
};

module.exports = validateStudent;
