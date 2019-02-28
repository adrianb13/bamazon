DROP DATABASE bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
item_id int(11) AUTO_INCREMENT NOT NULL,
product_name varchar(50) NOT NULL,
department_name varchar(50) NOT NULL,
price decimal(10,2),
stock_quantity int(11),
product_sales decimal(10,2) DEFAULT 0.00,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dish Soap (20oz)", "Cleaning", 2.99, 50), 
	("Wash Cloth (5 Pack)", "Cleaning", 4.99, 20),
    ("Dish Sponge (3 Pack)", "Cleaning", 2.49, 50),
    ("Kitchen Cleaner (12oz)", "Cleaning", 3.99, 30),
    ("Soap Dispenser", "Cleaning", 2.99, 15),
    ("Paper Towels (6 Pack)", "Cleaning", 7.99, 40),
    ("Scrubbing Brush", "Cleaning", 1.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Non-Stick Pans (3 Piece Set)", "Cooking", 24.99, 10),
	("Pots & Pans Collection (10 Piece Set)", "Cooking", 69.99, 5),
    ("Kitchen Utensil Set (6 Piece Set)", "Cooking", 12.99, 20),
    ("Dishware Collection (24 Piece Set)", "Cooking", 29.99, 10),
    ("Glassware Collection (12 Piece Set)", "Cooking", 19.99, 10),
    ("Tupperware Set (18 Piece Set)", "Cooking", 14.99, 20),
    ("Dining Utensils (18 Piece Set)", "Cooking", 20.99, 15);

-- USE bazamon_db;

CREATE TABLE departments (
department_id int(11) AUTO_INCREMENT NOT NULL,
department_name varchar(50) NOT NULL,
overhead_costs decimal(10,2) NOT NULL,
product_sales decimal(10,2) DEFAULT 0.00,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Cleaning", 917.65),
	("Cooking", 1974.1);

-- USE bamazon_db;    
SELECT * FROM products;
SELECT * FROM departments;
