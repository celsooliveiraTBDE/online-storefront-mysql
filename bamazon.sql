DROP DATABASE IF EXISTS bamazon;
-- drop database if exists
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INTEGER (10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    price DECIMAL (10,4) NOT NULL, 
    stock_qty INTEGER (10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Baker's 7 Year Bourbon Whiskey", "Whiskey", 59.99, 25);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Woodford Reserve Kentucky Derby Bourbon Whiskey","Whiskey", 59.99, 25);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Amrut Indian Single Malt Whisky","Scotch", 59.99, 25);


INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Mezcales de Leyende Oaxaca","Mezcal", 37.99, 14);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Uncle Val's Restorative Gin","Gin", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Bummer & Lazarus Dry Gin","Gin", 59.99, 12);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Legendre Herbsaint 100 Proof Liqueur","Absinthe", 69.99, 5);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Pure Kentucky XO Small Batch Straight Bourbon Whiskey","Whiskey", 39.99, 25);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Drumshanbo Gunpowder Irish Gin","Gin", 29.99, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Mestizo Mezcal Joven","Mezcal", 39.99, 40);



