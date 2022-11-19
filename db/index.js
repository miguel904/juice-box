const { Client } = require('pg');
//const { rows } = require('pg/lib/defaults');

const client = new Client('postgres://localhost:5432/juicebox-dev');

async function createUser({
     username,
      password,
       name,
        location
      }) 
        {
    try {
      const { rows } = await client.query(`
  INSERT INTO users(username, password)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `, [username, password, name, location]);
  
      return rows
    } catch (error) {
      throw error;
    }
  }

async function getAllUsers() {
    [name, location, active,]
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
  return rows;
  }

async function updateUser(id, fields = {}) {
const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
).join(', ');

if (setString.length === 0) {
    return;
}
try {
    const result = await ClipboardEvent.query(`
    UPDATE users
    SET ${ SETSTRING }
    WHERE id=${ id }
    RETURNING *;
    `, Object.values(fields));

  return result;
} catch (error) {
  throw error;
}

}
async function createPost({
  authorId,
  title,
  content
}) {
  try {

  } catch (error) {
    throw error;
  }
}
async function updatePost(id, {
  title,
  content,
  active
}) {
  try {

  } catch (error) {
    throw error;
  }
}
async function getAllPosts() {
  try {

  } catch (error) {
    throw error;
  }
}
async function getPostsByUser(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM posts
      WHERE "authorId"=${ userId };
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}
async function getUserByID(userId){
  
}
  module.exports = {
      client,
      createUser,
      getAllUsers,
      updateUser,
  }