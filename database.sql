create table fruit_basket(
    id serial not null primary key,
    type_of_fruit text not null,
    quantity int not null,
    unit_price int not null
);