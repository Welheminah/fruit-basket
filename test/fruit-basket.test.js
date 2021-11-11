let assert = require("assert");
let FruitBasket = require("../fruit-factory");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codx:pg123@localhost:5432/fruit_basket';

const pool = new Pool({
    connectionString : connectionString, ssl:{ rejectUnauthorized: false}
});

describe('The fruit basket function', function () {


    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from fruit_basket;");

        
    });

    it('should find all the fruit baskets for a given fruit type', async function () {
        const fruits = FruitBasket(pool);

        await fruits.addFruit('Apples', 25, 4);
        await fruits.addFruit('Oranges', 24, 5);
        
        let results = await fruits.getFruit();
        let fruitResults = results[0].type_of_fruit;
        let fruitResults2 = results[1].type_of_fruit;
        

        // console.log(fruitResults)
        // console.log(fruitResults2)
    
       
        assert.equal('Apples', fruitResults);
        assert.equal('Oranges', fruitResults2);
        

    });

    it('should find all the fruit baskets for a given fruit type,', async function () {
        const fruits = FruitBasket(pool);
        
        await fruits.addFruit('Oranges', 24, 5);
        await fruits.addFruit('Apples', 25, 4);

       let findingFruit =  await fruits.findfFruit('Apples');

    //    console.log(findingFruit[0].type_of_fruit);


      assert.equal('Apples', findingFruit[0].type_of_fruit);



    });

    it.skip('should delete everything in the fruit_basket', async function () {
        const fruits = FruitBasket(pool);

        await fruits.addFruit('Bananas', 24, 5);
        await fruits.addFruit('Plums', 20, 5);

        let clearingDB = await fruits.resetBasket()

        assert.equal(0, clearingDB.rows.length)
        
    })

    // it('should update the number of fruits in a given basket', async function () {
        
    // })

    it('should show the total price for a given fruit basket', async function () {
        const fruits = FruitBasket(pool);

        await fruits.addFruit('Bananas', 24, 5);
        await fruits.addFruit('Plums', 20, 5);

        let thePriceOfFruit = await fruits.showPrice('Bananas');

        let results = thePriceOfFruit[0].unit_price;

        console.log(results)

        assert.equal(5, results)
    })

    // it('should show the sum of the total of the fruit baskets for a given fruit type', async function () {

       
    // });

    after(function () {
        pool.end();
    })
});