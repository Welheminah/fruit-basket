module.exports = function fruitBasket(pool){
    
    //create a new fruit basket for a given fruit type, qty & fruit price
    async function addFruit(fruit, quantity, price){
       
     var dbFruit = await pool.query("SELECT * FROM fruit_basket WHERE type_of_fruit = $1", [fruit]);
     console.log(dbFruit)

     if(dbFruit.rows.length === 0){
         await pool.query("INSERT INTO fruit_basket(type_of_fruit, quantity, unit_price) VALUES($1, $2, $3)", [fruit, quantity, price])
     }
    }

    //getting the results
    async function getFruit(){
        var gotFruit = await pool.query("SELECT * FROM fruit_basket")
        return gotFruit.rows;
    }

    //find all the fruit baskets for a given fruit type
    async function findfFruit(fruit){
        var theFruit = await pool.query("SELECT type_of_fruit FROM fruit_basket WHERE type_of_fruit = $1", [fruit]);
        return theFruit.rows;

    }
    //update the number of fruits in a given basket
    async function updateFruit(){
     //Would if be possible to update as an else statement from the addFruit() 
    }

    //show the total price for a given fruit basket
    async function showPrice(fruit){
        var price = await pool.query("SELECT unit_price FROM fruit_basket WHERE type_of_fruit = $1", [fruit]);
        return price.rows;
    }

   //show the sum of the total of the fruit baskets for a given fruit type.
   async function showSum(){
       var theSum = await pool.query("SELECT SUM(quantity) FROM fruit_basket")
       return theSum.rows;
   }

   async function resetBasket(){
       var clear = await pool.query("DELETE * FROM fruit");
       return clear;
   }

    return {
        addFruit,
        getFruit,
        findfFruit,
        updateFruit,
        showPrice,
        showSum,
        resetBasket
    }

}
