let assert = require("assert");
let fruitBasket = require("../fruit-factory");
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
        const fruits = fruitBasket(pool);

        await fruits.addFruit('Apples', 25, 40);
        await fruits.addFruit('Oranges', 24, 45);
        
        let results = await fruits.getFruit();
        let fruitResults = results[0].type_of_fruit;
        let fruitResults2 = results[1].type_of_fruit;
        

        // console.log(fruitResults)
    
       
        assert.equal('Apples', fruitResults);
        assert.equal('Oranges', fruitResults2);
        

    });

    it.skip('should find all the fruit baskets for a given fruit type,', async function () {
        const fruits = fruitBasket(pool);
        
        await fruits.addFruit('Oranges', 24, 45);
        await fruits.addFruit('Apples', 25, 40);

       let findingFruit =  await fruits.findfFruit('Apples');

       console.log(findingFruit.type_of_fruit);

      assert.equal('Apples', findingFruit.type_of_fruit);

    });

    it('should delete everything in the fruit_basket', async function () {
        const fruits = fruitBasket(pool);

        await fruits.addFruit('Bananas', 24, 45);
        await fruits.addFruit('Plums', 20, 50);

        let clearingDB = await fruits.resetBasket()

        assert.equal(0, clearingDB.rows.length)
        
    })

    // it('should update the number of fruits in a given basket', async function () {
        
    // })

    // it('should show the total price for a given fruit basket', async function () {

      
    // })

    // it('should show the sum of the total of the fruit baskets for a given fruit type', async function () {

       
    // });

    after(function () {
        pool.end();
    })
});