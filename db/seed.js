const {
  client,
  getAllUsers,
   createUser,
 } = require('./index');


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

 async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({ username: 'albert', password: 'bertie99' });

    console.log(albert);

    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }

  
}
async function rebuildDB() {
      try {
        createInitialPosts();
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

        console.log("Calling getAllUsers")
        const users = await getAllUsers();
        console.log("Result:", users);

        console.log("calling updateUser on users[0]")
        const updateUserResult = await updateUserResult(users[0].id, {
          name: "Newname Sogood",
          location: "Lesterville, KY"
        });
        console.log("Result:", updateUserResult);

    console.log("Calling getAllPosts");
    const posts = await getAllPosts();
    console.log("Result:", posts);

        console.log("Calling getUserById with 1");
        const albert = await getUserById(1);
        console.log("Result:", albert);

        console.log("Finished database tests!");
      } catch (error) {
        console.error("Error testing database!");
        throw error;
      }
    }
    async function createInitialPosts() {
      try {
        const [albert, sandra, glamgal] = await getAllUsers();
    
        await createPost({
          authorId: albert.id,
          title: "First Post",
          content: "This is my first post. I hope I love writing blogs as much as I love writing them."
        });
    
        // a couple more
      } catch (error) {
        throw error;
      }
    }
    rebuildDB()
    .then(testDB)
  .catch(console.error)
  .finally(() => client.end());