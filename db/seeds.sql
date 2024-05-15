USE TeamGoat_db;

INSERT INTO Customers (first_name, last_name, email_address, passwords,session_id)
VALUES 
  ('Gagan', 'Gagan', 'gaganjitv@gmail.com', 'TeamGoat','100cxbieoyknyq3gq22nqdsl2fd50014'),
  ('Gary', 'Wu', 'garykachunwu@gmail.com', 'TeamGoat','200cxbieoyknyq3gq22nqdsl2fd50014'),
  ('Felix', 'Teng', 'fsmunozteng@gmail.com', 'TeamGoat','300cxbieoyknyq3gq22nqdsl2fd50014'),
  ('Saim', 'Diaz', 'odiazstrandberg@gmail.com', 'TeamGoat','400cxbieoyknyq3gq22nqdsl2fd50014'),
  ('Romulo', 'Apostol', 'romuloapostol@gmail.com', 'TeamGoat','500cxbieoyknyq3gq22nqdsl2fd50014'),
  ('Yong', 'Yun', 'yongwooyun@hotmail.com', 'TeamGoat','700cxbieoyknyq3gq22nqdsl2fd50014');

  INSERT INTO Products (product_name, product_description, product_url, price)
VALUES 
  ('COMPLETE WEAR POWDER', 
  'MOIRA Complete Wear Powder Foundation is a buildable Medium to full coverage with a natural matte finish With Sodium Hyaluronate Allantoin Vegan Squalane Aloe Vera and Camellia Extract', 
  'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2159068_001_1.jpg',
   120.00),

  ('MOIRA LOOSE SETTING POWDER', 
  'TRANSLUCENT 2 - BANANA 3 - MEDIUM 4 - DEEP 5 - MEDIUM LIGHT 6 - LIGHT MOIRA Loose Setting Powder is a weightless powder that delivers a silky smooth matte finish Infused with Collagen and Vitamin E',
   'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2053586_003_1.jpg', 
   200.00),

  ('MOIRA CHROMA LIGHT SHADOW', 
  'Get ready to elevate your eye game with Moira Chroma Light Shadow! This incredible product delivers a highly pigmented metallic finish with a foiled effect that is sure to turn heads',
   'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2183902_004_1.jpg', 
   300.00),

  ('MOIRA STARSTRUCK CHROME LOOSE POWDER', 
  'Get ready to dazzle with MOIRA Starstruck Chrome Loose Powder This magical color-shifting powder turns any moment into a mesmerizing spectacle',
   'https://joiaweb.s3-us-west-2.amazonaws.com/ItemImages/2180565_001_2.jpg', 
   400.00);

   INSERT INTO TransactionMain (Total, customer_id, ordered)
   VALUES 
  (700.00, 1, 0),

  (120.00, 2, 1);

  
INSERT INTO TransactionDetail (Transaction_id, Product_id, ordered)
VALUES 
  (1, 3, 0),
  (1, 3, 0),
  (1, 3, 0),
  
   (1, 4,  0),

  (2, 1, 1);
