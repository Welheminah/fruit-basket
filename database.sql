create table fruit_basket(
    id serial not null primary key,
    type_of_fruit text not null,
    quantity int not null,
    unit_price int not null
);

INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES ('Apples', 25, 40);
INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES ('Oranges', 24, 45);
INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES ('Bananas', 20, 52);
INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES ('Pears', 25, 67);
INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES ('Plums', 20, 75);