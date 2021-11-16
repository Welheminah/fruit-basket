module.exports = function FruitBasket(pool) {

    async function addFruit(fruit, quantity, price) {
  
         await pool.query("INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES($1, $2, $3)", [fruit, quantity, price]);  
    }

    async function getFruit(){
        var theFruit = await pool.query("SELECT type_of_fruit, quantity, unit_price FROM fruit_basket")
        return theFruit.rows;
    }

   
    async function findfFruit(fruit) {
        var theFruit = await pool.query("SELECT type_of_fruit FROM fruit_basket WHERE type_of_fruit = $1", [fruit]);
        return theFruit.rows;
    }

    async function updateFruit(fruit, quantity) {
       await pool.query(`UPDATE fruit_basket SET quantity = quantity + ${quantity} WHERE type_of_fruit = $1`, [fruit]);       
    }

  
    async function showPrice() {
        var price = await pool.query("SELECT SUM(unit_price) FROM fruit_basket");
         return price.rows;  
    }
    
    async function showSum() {
        var theSum = await pool.query("SELECT SUM(quantity* unit_price) AS total FROM fruit_basket")
        return theSum.rows;
    }


    return {
        addFruit,
        getFruit,
        findfFruit,
        updateFruit,
        showPrice,
        showSum,
       
    }

}