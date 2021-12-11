DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) --holds department name
)

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30), --holds role title
    salary DECIMAL, --holds role salary
    department_id INT --holds reference to department role belongs to
)

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30), --holds employee first name
    last_name VARCHAR(30), --holds employee last name
    role_id INT, --holds reference to employee role
    manager_id INT --holds reference to another employee that's a manager of the current employee, should be ull if the employee has no manager
)