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

module.exports = questions;
