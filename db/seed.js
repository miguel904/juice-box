const {
   createUser
 } = require('./index');

 async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });

    console.log(albert);

    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}


async function dropTables() {
  try {
    console.log("starting to drop tables...");
    await client.query(`
DROP TABLE IF EXISTS users;
    `);
    console.log("finished dropping tables!");
  } catch (error) {
    console.error("error dropping tables");
    throw error;}
  }

  async function createTables() {
    try {
      console.log("starting to build tables..")


      await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL 
  );
      `);
      console.log("finished building tables!")
    } catch (error) {
      console.error("error building tables!")
      throw error;}
    }
    async function rebuildDB() {
      try {
        client.connect();
    
        await dropTables();
        await createTables();
        await createInitialUsers();
      } catch (error) {
        throw error;
      }
    }

    async function testDB() {
      try {
        console.log("Starting to test database...");
    
        const users = await getAllUsers();
        console.log("getAllUsers:", users);
    
        console.log("Finished database tests!");
      } catch (error) {
        console.error("Error testing database!");
        throw error;
      }
    }
    
    
    
    rebuildDB()
    .then(testDB)
  .catch(console.error)
  .finally(() => client.end());