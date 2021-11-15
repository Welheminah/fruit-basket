module.exports = function FruitBasket(pool) {

   
    async function addFruit(fruit, quantity, price) {
  
         await pool.query("INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES($1, $2, $3)", [fruit, quantity, price])
        
        
    }

    
    async function getFruit() {
        var gotFruit = await pool.query("SELECT * FROM fruit_basket")
        const allFruitsAdded = [];

        for (let i = 0; i < gotFruit.rows.length; i++ ){
            const currentFruits = gotFruit.rows[i];
            allFruitsAdded.push(currentFruits.type_of_fruit);
        }
        return allFruitsAdded;

    }

    async function addedFruits(){
        var theFruit = await pool.query("SELECT * FROM fruit_basket")
        return theFruit.rows;
    }

   
    async function findfFruit(fruit) {
        var theFruit = await pool.query("SELECT type_of_fruit FROM fruit_basket WHERE type_of_fruit = $1", [fruit]);
        return theFruit.rows;

    }

    async function updateFruit(fruit, quantity) {
       await pool.query(`UPDATE fruit_basket SET quantity = quantity + ${quantity} WHERE type_of_fruit = $1`, [fruit]);
       var updateFruitQuantity = await pool.query("SELECT quantity FROM fruit_basket WHERE type_of_fruit = $1", [fruit])
        
       return updateFruitQuantity.rows;
     
    }

  
    async function showPrice() {

        var price = await pool.query("SELECT SUM(unit_price) FROM fruit_basket");
        // console.log(price.rows);
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
        addedFruits
    }

}