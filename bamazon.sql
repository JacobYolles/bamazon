DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(4, 2) ZEROFILL NOT NULL,
    stock_quantity  INTEGER(11) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 1
VALUES               ("Windex", "Housewares", 5.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 2
VALUES               ("Biotene", "Housewares", 2.50, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 3
VALUES               ("Blackout Curtains", "Window Treatments", 50.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 4
VALUES               ("Basketball", "Sports", 20.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 5
VALUES               ("Smoke Alarm", "Electronics", 45.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 6
VALUES               ("Pillow Protector", "Linens", 30.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 7
VALUES               ("Clorox Wipes", "Housewares", 7.50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 8
VALUES               ("Bannanas", "Food", 0.33, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 9
VALUES               ("Blazer", "Clothing", 75.25, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity) -- 10
VALUES               ("Lamb Shank", "Meat Department", 8.37, 8);

SELECT * FROM products