const mysql = require("mysql2");
// const db = require("./config/connection");
const inquirer = require("inquirer");
const ListPrompt = require("inquirer/lib/prompts/list");

//CREATES DATABASE CONNECTION
// const connection = mysql.createConnection({
//   host: db.connect.host,
//   user: db.connect.user,
//   database: employee_db,
// });

//INQUIRER QUESTIONS
const questions = [
  {
    type: "list",
    name: "initialChoice",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "Add Role",
      "Remove Role",
      "View All Departments",
      "Add Department",
      "Remove Department",
      "View Total Utilized Budget by Department",
      "Quit",
    ],
  },
  {
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?",
    when: (answers) => answers.initialChoice === "Add Employee",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employee's last name?",
    when: (answers) => answers.initialChoice === "Add Employee",
  },
  {
    type: "list",
    name: "roleDept",
    message: "Which department does the role belong to?",
    choice: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
      "Customer Service",
    ],
    when: (answers) => answers.initialChoice === "Add Employee",
  },
  {
    type: "list",
    name: "empManager",
    choice: ["None"], //find a way to add in list of managers
    when: (answers) => answers.initialChoice === "Add Employee",
  },
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role?",
    when: (answers) => answers.initialChoice === "Add Role",
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is the salary of the role?",
    when: (answers) => answers.initialChoice === "Add Role",
  },
  {
    type: "list",
    name: "roleDept",
    message: "Which department does the role belong to?",
    choice: ["Engineering", "Finance", "Legal", "Sales", "Support"],
    //Better if this could be generated from the table instead of hard coded
    when: (answers) => answers.initialChoice === "Add Role",
  },
  {
    type: "input",
    name: "deptName",
    message: "What is the name of the department?",
    when: (answers) => answers.initialChoice === "Add Department",
  },
];

inquirer.prompt(questions).then((response) => {
  switch (response.initialChoice) {
    case "View All Employees":
      console.log("Picked view all employees");
      break;
    case "View All Employees By Department":
      console.log("Picked view all employees by department");
      break;
    case "View All Employees By Manager":
      console.log("Picked view all employees by manager");
      break;
    case "Add Employee":
      console.log("Picked add employee");
      break;
    case "Remove Employee":
      console.log("Picked remove employee");
      break;
    case "Update Employee Role":
      console.log("Picked update employee role");
      break;
    case "Update Employee Manager":
      console.log("Picked update employee manager");
      break;
    case "View All Roles":
      console.log("Picked view all roles");
      break;
    case "Add Role":
      console.log("Picked add role");
      break;
    case "Remove Role":
      console.log("Picked remove role");
      break;
    case "View All Departments":
      console.log("Picked view all departments");
      break;
    case "Add Department":
      console.log("Picked add department");
      break;
    case "Remove Department":
      console.log("Picked remove department");
      break;
    case "View Total Utilized Budget by Department":
      console.log("Picked view total utilized budget by department");
      break;
    case "Quit":
      console.log("Have a good day!");
      break;
  }
});
