INSERT INTO department (name)
VALUES  ("Engineering"), 
        ("Finance"), 
        ("Legal"), 
        ("Sales"), 
        ("Support");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 60000, 4), 
        ("Salesperson", 45000, 4), 
        ("Lead Engineer", 180000, 1), 
        ("Software Engineer", 120000, 1), 
        ("Account Manager", 65000, 5), 
        ("Accountant", 50000, 2), 
        ("Legal Team Lead", 150000, 3), 
        ("Lawyer", 125000, 3), 
        ("Customer Service", 40000, 5);
        
INSERT INTO employee (first_name, last_name, role_id) 
VALUES  ("Bob", "Adams", 1),
        ("Hana", "Lee", 3),
        ("Hugo", "Wells", 4),
        ("Ilse", "Gardner", 5),
        ("Hasan", "Ali", 6),
        ("Katy", "Crawford", 2),
        ("Mohammed", "Stone", 8),
        ("Leona", "Gutierrez", 9);
