module.exports = function fruitBasket(pool){
    
    async function givenFruit(){
       
      let theFruit = await pool.query("INSERT INTO fruit_basket (type_of_fruit, quantity, unit_price) VALUES ('Peaches', 20, 47)");
      return theFruit.rows;
    } 

    async function findfFruit(fruit){
        let find = await pool.query("SELECT * FROM fruit_basket WHERE type_of_fruit = $1", [fruit])
        return find.rows;

    }
    //update the number of fruits in a given basket
    async function updateFruit(){
        let update = await pool.query("UPDATE fruit_basket SET quantity = 22 WHERE type_of_fruit = 'Bananas'")
        return update.rows
    }

    //

    return {
        givenFruit,
        findfFruit,
        updateFruit
    }

}

SELECT
	phone_number
FROM
	petrol_station
INNER JOIN  cars
    ON petrol_station.cars_id = petrol_station.petrol_id
;