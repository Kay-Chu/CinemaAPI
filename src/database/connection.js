import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'code.kaying.site',
  database: "cinema",
  user: 'cinema',
  password: 'wPMqYR',
  connectionLimit: 5
});

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("SHOW tables");
    // console.log(res);
    return res;
  //   const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
  //   console.log(res);

  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

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

export { testConnection, getJWTSecret, getUserById, getUserByUsername };