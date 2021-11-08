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

        await fruits.givenFruit();
        let theFunction = await fruits.givenFruit()
        console.log(await fruits.givenFruit())


        assert.deepEqual([], theFunction)
    

    });

    it('should find all the fruit baskets for a given fruit type,', async function () {
        const fruits = fruitBasket(pool);
        
        await fruits.findfFruit('Apple');
        console.log(await fruits.findfFruit('Apple'))
        let theFunction = await fruits.findfFruit()

      assert.deepEqual([], theFunction)

    });

    it('should update the number of fruits in a given basket', async function () {
        const fruits = fruitBasket(pool);
        await fruits.updateFruit();
        let now = await fruits.updateFruit()
        console.log(now)

        // let passed = now[2];
        // console.log(passed)

        assert.deepEqual([], now)

    })

    // it('should show the total price for a given fruit basket', async function () {

      
    // })

    // it('should show the sum of the total of the fruit baskets for a given fruit type', async function () {

       
    // });

    after(function () {
        pool.end();
    })
});