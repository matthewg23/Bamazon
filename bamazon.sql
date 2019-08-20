DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(25) NOT NULL,
    department_name VARCHAR(25),
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
('Tablet', 'Computers', 200.00, 100),
('Macbook Pro', 'Computers', 1500.00, 75),
('iPhone', 'Mobile Device', 800.00, 50),
('Nerf Gun', 'Toys', 50.00, 25),
('Flashcards', 'Toys', 5.00, 75),
('Brain Puzzle', 'Toys', 10.00, 500),
('Suit', 'Clothes', 500.00, 10),
('T-shirt', 'Clothes', 35.00, 20),
('Jacket', 'Clothes', 65.00, 30),
('Curf Links', 'Clothes', 45.00, 15);
