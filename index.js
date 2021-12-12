const mysql = require("mysql2");
const db = require("./config/connection");
const inquirer = require("inquirer");
const ListPrompt = require("inquirer/lib/prompts/list");

//CREATES DATABASE CONNECTION
const connection = mysql.createConnection({
  host: db.connect.host,
  user: db.connect.user,
  database: employee_db,
});

//INQUIRER QUESTIONS
const initialQuestions = [
  {
    type: "list",
    name: "initialChoice",
    message: "What would you like to do?",
    choices: [
      "View All Employees", //Should show a table of all employees
      "View All Employees By Department", //BONUS Should show a table of employees sorted by department
      "View All Employees By Manager", //BONUS Should show a table of employees sorted by manager
      "Add Employee", //Should kick off the addEmployee questions
      "Remove Employee", //? BONUS
      "Update Employee Role", //Needs to find an employee, then change the role
      "Update Employee Manager", //BONUS Needs to find an employee, then change manager
      "View All Roles", //Should display list of all roles
      "Add Role", //Should kick off the addRole  questions
      "Remove Role", //? BONUS
      "View All Departments", //Should show a list of all departments
      "Add Department", //Should kick off the addDept questions
      "Remove Department", //? BONUS
      "View Total Utilized Budget by Department", //BONUS Should sum the budgets of every department
      "Quit",
    ],
  },
  {
    type: "input",
    name: "deptName",
    message: "What is the name of the department?",
    when: (answers) => answers.initialChoice === "Add Department",
  },
  //Once this is added, needs to add the name to the database and add the message "[deptName] added to the database"
];

inquirer.prompt(initialQuestions).then((response) => {
  switch (response.initialChoice) {
    case "View All Employees":
      console.log("Picked view all employees");
      break;
  }
});
