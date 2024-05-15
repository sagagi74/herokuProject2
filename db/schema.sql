DROP DATABASE IF EXISTS TeamGoat_db;
CREATE DATABASE TeamGoat_db;
USE TeamGoat_db;

CREATE TABLE Customers (
  customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email_address VARCHAR(30) NOT NULL,
  passwords VARCHAR(255) NOT NULL, 
  session_id VARCHAR(255) Not NUll,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE Products (
  Product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  product_description TEXT NOT NULL,
  product_url VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE TransactionMain (
  Transaction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Total DECIMAL(10,2) NOT NULL,
  customer_id INT NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  ordered TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE TransactionDetail (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Transaction_id INT NOT NULL,
  Product_id INT NOT NULL,
  ordered TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (Transaction_id) REFERENCES TransactionMain(Transaction_id),
  FOREIGN KEY (Product_id) REFERENCES Products(Product_id)
);


