const validateAssistance = (req, res, next) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  next();
};

module.exports = validateAssistance;
