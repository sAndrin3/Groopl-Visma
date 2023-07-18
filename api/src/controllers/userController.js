import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//Registering a new user
export const register = async (req, res) => {
    const { username, name, email, password} = req.body;
    console.log(password, email, name, username);
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      let pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input('username', sql.VarChar, username)
        .input('Name', sql.VarChar, name)
        .input('Email', sql.VarChar, email)
        .query('SELECT * FROM users WHERE username = @username OR Name = @name OR Email = @email');
      const user = result.recordset[0];
      if (user) {
        return res.status(409).json({ error: 'User already exists!' });
      } else {
        await pool
          .request()
          .input('username', sql.VarChar, username)
          .input('Name', sql.VarChar, name)
          .input('hashedpassword', sql.VarChar, hashedPassword)
          .input('Email', sql.VarChar, email)
        
          .query(
            'INSERT INTO users (username, Name, Password, Email) VALUES (@username, @name, @hashedpassword, @email)'
          );
        return res.status(200).send({ message: 'User created successfully' });
      }
    } catch (error) {
      res.status(500).json(error.message);
    } finally {
      sql.close();
    }
  };

  //login user
  export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    let pool = await sql.connect(config.sql);
    const userResult = await pool.request()
        .input("username", sql.VarChar, username)
        .query("select * from users where username = @username");
    const user = userResult.recordset[0];

    if (!user) {
        res.status(401).json({ error: 'Authentication failed. User not found.' });
    } else if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ error: 'Authentication failed. Wrong password' });
        } else {
            let token = `JWT ${jwt.sign({username: user.username, name:user.name, email: user.email, id: user.id }, `${process.env.JWT_SECRET}`)}`;
            const { id,name,  username, email } = user;
            return res.json({ id: id, name: name, username: username, email: email, token: token });
        }
    }
}

// logout user
export const logout = (req, res) => {
    // Clear the authentication token on the client-side
    res.clearCookie('jwtToken');
  
    // Return a success response
    res.status(200).json({ message: 'Logged out successfully.' });
  };
