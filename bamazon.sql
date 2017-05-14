USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR (160) NOT NULL,
department_name VARCHAR (160) NOT NULL,
price DECIMAL  (7,2) NOT NULL,
stock_quantity INTEGER (100) NOT NULL,
PRIMARY KEY(item_id)
);

USE bamazon;
DELETE FROM products
WHERE item_id = 9;

USE bamazon;
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUE ("Ravensburger Labyrinth", "Board Games", 29.99, 200);

SELECT * FROM products;

SELECT item_id FROM products WHERE ?;