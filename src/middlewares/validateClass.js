const validateClass = (req, res, next) => {
  const { name, day, time } = req.body;
  if (!name || !day || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (
    typeof name !== "string" ||
    typeof day !== "string" ||
    typeof time !== "string"
  ) {
    return res.status(400).json({ message: "Invalid data type" });
  }

  const validDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (!validDays.includes(day)) {
    return res.status(400).json({ message: "Invalid day" });
  }

  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return res.status(400).json({ message: "Invalid time" });
  }

  next();
};

module.exports = validateClass;
