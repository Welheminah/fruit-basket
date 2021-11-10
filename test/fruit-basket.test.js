let assert = require("assert");
let fruitBasket = require("../fruit-factory");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codx:pg123@localhost:5432/fruit_basket';

const pool = new Pool({
    connectionString
});

describe('The fruit basket function', function () {


    beforeEach(async function () {
        // clean the tables before each test run
        // await pool.query("delete from fruit_basket;");

        
    });

    it('should find all the fruit baskets for a given fruit type', async function () {
        const fruits = fruitBasket(pool);

        await fruits.addFruit('Apples', 25, 40);
        await fruits.addFruit('Oranges', 24, 45);
        
        let results = await fruits.getFruit();

        console.log(results)
       
        assert.deepEqual([], results)
    

    });

    it('should find all the fruit baskets for a given fruit type,', async function () {
        const fruits = fruitBasket(pool);
        
        

      assert.deepEqual()

    });

    it('should update the number of fruits in a given basket', async function () {
        const fruits = fruitBasket(pool);

        

        assert.deepEqual()

    })

    // it('should show the total price for a given fruit basket', async function () {

      
    // })

    // it('should show the sum of the total of the fruit baskets for a given fruit type', async function () {

       
    // });

    after(function () {
        pool.end();
    })
});