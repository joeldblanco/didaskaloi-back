const catchAsync = require("../../utils/catchAsync");
const studentService = require("../services/studentService");

const generatePerClassReport = async (req, res) => {
  res.send("Generando reporte por clase");
};

const generateGeneralReport = async (req, res) => {
  const students = await studentService.getAll();

  const maleStudents = students.filter(
    (student) => student.gender === "male"
  ).length;
  const femaleStudents = students.filter(
    (student) => student.gender === "female"
  ).length;

  const ageGroups = [
    { label: "0-3", value: 0 },
    { label: "4-6", value: 0 },
    { label: "7-10", value: 0 },
    { label: "11-15", value: 0 },
    { label: "16-18", value: 0 },
    { label: "18 >", value: 0 },
  ];

  const maleAgeGroups = [
    { label: "0-3", value: 0 },
    { label: "4-6", value: 0 },
    { label: "7-10", value: 0 },
    { label: "11-15", value: 0 },
    { label: "16-18", value: 0 },
    { label: "18 >", value: 0 },
  ];

  const femaleAgeGroups = [
    { label: "0-3", value: 0 },
    { label: "4-6", value: 0 },
    { label: "7-10", value: 0 },
    { label: "11-15", value: 0 },
    { label: "16-18", value: 0 },
    { label: "18 >", value: 0 },
  ];

  students.forEach((student) => {
    if (student.age <= 3) {
      ageGroups[0].value++;
      if (student.gender == "male") maleAgeGroups[0].value++;
      else femaleAgeGroups[0].value++;
    } else if (student.age <= 6) {
      ageGroups[1].value++;
      if (student.gender == "male") maleAgeGroups[1].value++;
      else femaleAgeGroups[1].value++;
    } else if (student.age <= 10) {
      ageGroups[2].value++;
      if (student.gender == "male") maleAgeGroups[2].value++;
      else femaleAgeGroups[2].value++;
    } else if (student.age <= 15) {
      ageGroups[3].value++;
      if (student.gender == "male") maleAgeGroups[3].value++;
      else femaleAgeGroups[3].value++;
    } else if (student.age <= 18) {
      ageGroups[4].value++;
      if (student.gender == "male") maleAgeGroups[4].value++;
      else femaleAgeGroups[4].value++;
    } else {
      ageGroups[5].value++;
      if (student.gender == "male") maleAgeGroups[5].value++;
      else femaleAgeGroups[5].value++;
    }
  });

  const generalReport = {
    maleStudents,
    femaleStudents,
    ageGroups,
    maleAgeGroups,
    femaleAgeGroups,
  };

  res.status(200).json(generalReport);
};

module.exports = {
  generatePerClassReport: catchAsync(generatePerClassReport),
  generateGeneralReport: catchAsync(generateGeneralReport),
};
