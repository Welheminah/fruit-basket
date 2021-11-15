let assert = require("assert");
let FruitBasket = require("../fruit-factory");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codx:pg123@localhost:5432/fruit_basket';

const pool = new Pool({connectionString : connectionString, ssl:{ rejectUnauthorized: false}
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
        await fruits.addFruit('Pears', 30, 3);

        let results = await fruits.getFruit();
        assert.deepEqual(['Apples', 'Oranges', 'Pears'], results)      
    });

    it('should find all the fruit baskets for a given fruit type,', async function () {
        const fruits = FruitBasket(pool);
        
        await fruits.addFruit('Oranges', 24, 5);
        await fruits.addFruit('Apples', 25, 4);

       let findingFruit =  await fruits.findfFruit('Apples');
      assert.equal('Apples', findingFruit[0].type_of_fruit);
    });



    it('should update the number of fruits in a given basket', async function () {
        const fruits = FruitBasket(pool);

        await fruits.addFruit('Bananas', 24, 5);

       let results = await fruits.updateFruit('Bananas', 5);
    
        let updatedBasket = results[0].quantity;
       assert.equal(29,updatedBasket );

    })

    it('should show the total price for a given fruit basket', async function () {
        const fruits = FruitBasket(pool);

        await fruits.addFruit('Bananas', 24, 5);
        await fruits.addFruit('Plums', 20, 5);
        await fruits.addFruit('Oranges', 24, 5);
        await fruits.addFruit('Apples', 25, 4);

        let thePriceOfFruit = await fruits.showPrice();

        let results = thePriceOfFruit[0].sum
        assert.equal(19, results)
    })

    it('should show the sum of the total of the fruit baskets for a given fruit type', async function () {
        const fruits = FruitBasket(pool);

        await fruits.addFruit('Bananas', 24, 5);
        await fruits.addFruit('Plums', 20, 5);

       let showingTheSum = await fruits.showSum('Plums')

       let totalIs = showingTheSum[0].total;

        assert.equal(220, totalIs);     
    });

    after(function () {
        pool.end();
    })
});