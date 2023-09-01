import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'code.chu.ljc42.com',
  database: "cinema",
  user: 'cinema',
  password: 'wPMqYR',
  connectionLimit: 5
});

async function getJWTSecret() {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("SELECT value FROM variables WHERE name='jwt_secret'");
    return res[0].value;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

async function getUserById(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("SELECT id,username,password_hash FROM users WHERE id=?",[id]);
    return res;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

async function getUserByUsername(username) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("SELECT id,username,password_hash FROM users WHERE username=?",[username]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

async function saveMovieToDatabase(movie) {

}

async function getMovieFromDatabaseByEntryId(entryId) {

}

export { getJWTSecret, getUserById, getUserByUsername, saveMovieToDatabase, getMovieFromDatabaseByEntryId };