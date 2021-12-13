require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

//GLOBAL VARIABLES

//CREATES DATABASE CONNECTION
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "employee_db",
});

//INQUIRER QUESTIONS

function createQuestions(managerArray, deptArray, roleArray) {
  return [
    {
      type: "list",
      name: "initialChoice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
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
      choices: roleArray,
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
      choices: deptArray,
      when: (answers) => answers.initialChoice === "Add Role",
    },
    {
      type: "input",
      name: "deptName",
      message: "What is the name of the department?",
      when: (answers) => answers.initialChoice === "Add Department",
    },
    {
      type: "list",
      name: "updateEmpName",
      message: "Select the employee that you would like to update",
      choices: managerArray,
      when: (answers) => answers.initialChoice === "Update Employee Role",
    },
    {
      type: "list",
      name: "updateEmpRole",
      message: "What is the new role?",
      choices: roleArray,
      when: (answers) => answers.initialChoice === "Update Employee Role",
    },
  ];
}

//FUNCTIONS REQUIRED FOR PROMPTS
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
    "SELECT `id`, `title`, `salary`, `department_id` FROM `role`",
    function (err, results, fields) {
      callback(results);
    }
  );
}

findAllEmployees((empList) => {
  let managerArray = empList.map((obj) => {
    return { name: `${obj.first_name} ${obj.last_name}`, value: obj.id };
  });
  findAllDepts((deptList) => {
    let deptArray = deptList.map((obj) => {
      return { name: `${obj.name}`, value: obj.id };
    });
    findAllRoles((roleList) => {
      let roleArray = roleList.map((obj) => {
        return { name: `${obj.title}`, value: obj.id };
      });
      let questions = createQuestions(managerArray, deptArray, roleArray);
      init(questions);
    });
  });
});

//RUN INQUIRER
function init(questions) {
  inquirer.prompt(questions).then((response) => {
    switch (response.initialChoice) {
      case "View All Employees":
        findAllEmployees((empList) => {
          console.table(empList);
          init(questions);
        });

        break;
      case "Add Employee":
        connection.execute(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [
            response.firstName,
            response.lastName,
            response.empRole,
            response.empManager,
          ]
        );
        console.log(
          `${response.firstName} ${response.lastName} has been added to the database.`
        );
        init(questions);
        break;
      case "Update Employee Role":
        connection.execute(
          "UPDATE `employee` SET `role_id` = ? WHERE `id` = ?",
          [response.updateEmpRole, response.updateEmpName],
          function (err, results, fields) {
            if (err) throw err;
            console.log("Employee record has been updated!");
            init(questions);
          }
        );
        break;
      case "View All Roles":
        findAllRoles((roleList) => {
          console.table(roleList);
          init(questions);
        });
        break;
      case "Add Role":
        connection.execute(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [response.roleName, response.roleSalary, response.roleDept],
          function (err, results, fields) {
            if (err) throw err;
            console.log(`${response.roleName} has been added to the database.`);
            init(questions);
          }
        );
        break;
      case "View All Departments":
        findAllDepts((deptList) => {
          console.table(deptList);
          init(questions);
        });
        break;
      case "Add Department":
        connection.execute(
          "INSERT INTO department (name) VALUES (?)",
          [response.deptName],
          function (err, results, fields) {
            if (err) throw err;
            console.log(`${response.deptName} has been added to the database.`);
            init(questions);
          }
        );
        break;
      case "Quit":
        console.log("Have a good day!");
        break;
    }
  });
}
