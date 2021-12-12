const inquirer = require("inquirer");
const ListPrompt = require("inquirer/lib/prompts/list");

const initialQuestion = [
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
];

const addDept = [
  {
    type: "input",
    name: "deptName",
    message: "What is the name of the department?",
  },
  //Once this is added, needs to add the name to the database and add the message "[deptName] added to the database"
  {},
];

const addRole = [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role?",
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is the salary of the role?",
  },
  {
    type: "list",
    name: "roleDept",
    message: "Which department does the role belong to?",
    choice: ["Engineering", "Finance", "Legal", "Sales", "Service"],
  },
];

const addEmployee = [
  {
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employee's last name?",
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
  },
  {
    type: "list",
    name: "empManager",
    choice: ["None"], //find a way to add in list of managers
  },
];
