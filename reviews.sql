CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommended BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(60),
  email VARCHAR(60),
  response TEXT,
  helpfulness INT
);


CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(20)
);

CREATE TABLE char_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(review_id),
  rating INT
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT REFERENCES reviews(review_id),
  url TEXT
);

-- add indices --
CREATE INDEX product_id_idx ON reviews(product_id) WITH (deduplicate_items = off);

--load csv files--
\COPY reviews FROM '~/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;
\COPY characteristics FROM '~/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;
\COPY char_reviews FROM '~/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM '~/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;


