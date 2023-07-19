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

  export const login = async (req, res) => {
    const { username, password } = req.body;
  
    let pool;
    try {
      pool = await sql.connect(config.sql);
      let result = await pool
        .request()
        .input("username", sql.VarChar, username)
        .query("SELECT * FROM users WHERE username = @username");
  
      const user = result.recordset[0];
      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      } else {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          return res.status(400).json({ error: "Invalid username or password" });
        } else {
          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
              name: user.name,
              email: user.email,
            },
            config.jwt_secret
          );
          const { password, ...userWithoutPassword } = user;

          res
            .cookie("accessToken", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .status(200)
            .json(userWithoutPassword);
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error occurred while logging in" });
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  };
// logout user
export const logout = (req, res) => {
    // Clear the authentication token on the client-side
    res.clearCookie('jwtToken');
  
    // Return a success response
    res.status(200).json({ message: 'Logged out successfully.' });
  };
