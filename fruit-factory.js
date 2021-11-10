module.exports = function fruitBasket(pool){
    
    async function addFruit(fruit, quantity, price){
       
     var dbFruit = await pool.query("SELECT type_of_fruit FROM fruit_basket WHERE type_of_fruit = $1", [fruit]);

     if(dbFruit === 0){
         await pool.query("INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES($1, $2, $3)", [fruit, quantity, price])
     }
    }

    async function getFruit(){
        var gotFruit = await pool.query("SELECT * FROM fruit_basket")
        return gotFruit.rows;
    }

    async function findfFruit(fruit){
        

    }
    //update the number of fruits in a given basket
    async function updateFruit(){
     
    }

    //

    return {
        addFruit,
        getFruit,
        findfFruit,
        updateFruit
    }

}
