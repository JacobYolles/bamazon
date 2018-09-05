DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;
USE departments_db;

CREATE TABLE departments (
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs DECIMAL(10, 2)  NOT NULL,
    total_sales DECIMAL (10, 2)  NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs, total_sales) 
VALUES                 ("Housewares", 5000.00, 1500.00);

INSERT INTO departments (department_name, over_head_costs, total_sales)  
VALUES                 ("Window Treatments", 3000.00, 2010.00);

INSERT INTO departments (department_name, over_head_costs, total_sales)  
VALUES                ("Sports", 4030.00, 2000.00);

INSERT INTO departments( department_name, over_head_costs, total_sales)  
VALUES                 ("Electronics", 1000.00, 900.00);

INSERT INTO departments (department_name, over_head_costs, total_sales)  
VALUES                 ("Linens", 6090.00, 9080.00);

INSERT INTO departments (department_name, over_head_costs, total_sales)  
VALUES                 ("Food", 2000.00, 7060.00);

INSERT INTO departments (department_name, over_head_costs, total_sales)  
VALUES                 ("Clothing", 5462.00, 4444.00);

INSERT INTO departments (department_name, over_head_costs, total_sales)  
VALUES                 ("Meat Department", 2232.00, 6472.00);

SELECT * FROM departments