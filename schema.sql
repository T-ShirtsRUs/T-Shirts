DROP TABLE IF EXISTS tshirts;
CREATE TABLE tshirts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price INTEGER,
  quantity INTEGER,
  img_url TEXT
);
DROP TABLE IF EXISTS purchases;
CREATE TABLE purchases (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  tshirt_id INTEGER references tshirts,
  quantity INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
  id INTEGER PRIMARY KEY,
  pword TEXT
);
