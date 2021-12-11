DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL --holds department name
)

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30), --holds role title
    salary DECIMAL, --holds role salary
    department_id INT, --holds reference to department role belongs to
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
)

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30), --holds emp first name
    last_name VARCHAR(30), --holds emp last name
    role_id INT, --holds reference to emp role
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
    manager_id INT, --holds ref to another employee who manages current emp
    FOREIGN KEY (id) 
    REFERENCES employee(id)
    ON DELETE SET NULL
)