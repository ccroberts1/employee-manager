require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const ListPrompt = require("inquirer/lib/prompts/list");
const cTable = require("console.table");
// const Connection = require("mysql2/typings/mysql/lib/Connection");

//GLOBAL VARIABLES

//CREATES DATABASE CONNECTION
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "employee_db",
});

//INQUIRER QUESTIONS

function createQuestions(managerArray) {
  return [
    {
      type: "list",
      name: "initialChoice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        // "View All Employees By Department",
        // "View All Employees By Manager",
        "Add Employee",
        // "Remove Employee",
        "Update Employee Role",
        // "Update Employee Manager",
        "View All Roles",
        "Add Role",
        // "Remove Role",
        "View All Departments",
        "Add Department",
        // "Remove Department",
        // "View Total Utilized Budget by Department",
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
      name: "empRole",
      message: "What is the employee's role?",
      choices: [
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
      //Better if this could be dynamically generated instead of hard coded
      when: (answers) => answers.initialChoice === "Add Employee",
    },
    {
      type: "list",
      name: "empManager",
      message: "Who is the employee's manager?",
      choices: managerArray,
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
      choices: ["Engineering", "Finance", "Legal", "Sales", "Support"],
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
}

//FUNCTIONS REQUIRED FOR PROMPTS - MOVE TO CLASS IF POSSIBLE
async function findRole(empRole, callback) {
  connection.execute(
    "SELECT `id` FROM `role` WHERE `title` = ?",
    [empRole],
    function (err, results, fields) {
      callback(results[0].id);
    }
  );
}

async function findManager(empManagerFirst, empManagerLast, callback) {
  connection.execute(
    "SELECT `id` FROM `employee` WHERE `first_name` = ? || `last_name` = ?",
    [empManagerFirst, empManagerLast],
    function (err, results, fields) {
      callback(results[0].id);
    }
  );
}

async function findAllEmployees(callback) {
  connection.execute(
    "SELECT `first_name`, `last_name`, `id` FROM `employee`",
    function (err, results, fields) {
      callback(results);
    }
  );
}

async function findAllDepts(callback) {
  connection.execute(
    "SELECT `name`, `id` FROM `department`",
    function (err, results, fields) {
      callback(results);
    }
  );
}
async function findAllRoles(callback) {
  connection.execute(
    "SELECT `id`, `title`, `department_id`, `salary` FROM `role`",
    function (err, results, fields) {
      callback(results);
    }
  );
}

findAllEmployees((empList) => {
  let managerArray = empList.map((obj) => {
    return { name: `${obj.first_name} ${obj.last_name}`, value: obj.id };
  });
  // console.log(managerArray);
  let questions = createQuestions(managerArray);
  init(questions);
});

//RUN INQUIRER
function init(questions) {
  inquirer.prompt(questions).then((response) => {
    switch (response.initialChoice) {
      case "View All Employees":
        findAllEmployees((empList) => {
          console.table(empList);
        });
        break;
      // case "View All Employees By Department":
      //   console.log("Picked view all employees by department");
      //   break;
      // case "View All Employees By Manager":
      //   console.log("Picked view all employees by manager");
      //   break;
      case "Add Employee":
        findRole(response.empRole, (roleID) => {
          connection.execute(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [
              response.firstName,
              response.lastName,
              roleID,
              response.managerArray.value,
            ]
          );
        });
        console.log(
          `${response.firstName} ${response.lastName} has been added to the database.`
        );
        break;
      // case "Remove Employee":
      //   console.log("Picked remove employee");
      //   break;
      case "Update Employee Role":
        console.log("Picked update employee role");
        break;
      // case "Update Employee Manager":
      //   console.log("Picked update employee manager");
      //   break;
      case "View All Roles":
        findAllRoles((roleList) => {
          console.table(roleList);
        });
        break;
      case "Add Role":
        findRole(response.roleDept, (roleID) => {
          connection.execute(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [response.roleName, response.roleSalary, roleID],
            function (err, results, fields) {
              if (err) throw err;
              console.log(
                `${response.roleName} has been added to the database.`
              );
            }
          );
        });
        break;
      // case "Remove Role":
      //   console.log("Picked remove role");
      //   break;
      case "View All Departments":
        findAllDepts((deptList) => {
          console.table(deptList);
        });
        break;
      case "Add Department":
        connection.execute(
          "INSERT INTO department (name) VALUES (?)",
          [response.deptName],
          function (err, results, fields) {
            if (err) throw err;
            console.log(`${response.deptName} has been added to the database.`);
          }
        );
        break;
      // case "Remove Department":
      //   console.log("Picked remove department");
      //   break;
      // case "View Total Utilized Budget by Department":
      //   console.log("Picked view total utilized budget by department");
      //   break;
      case "Quit":
        console.log("Have a good day!");
        break;
    }
  });
}
