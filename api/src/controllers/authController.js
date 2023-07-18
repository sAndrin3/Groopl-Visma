import sql from 'mssql';
import config from '../db/config.js';

export const getPosts = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
      const result = await pool.request().query("SELECT * FROM posts AS p JOIN users AS u ON (u.id=p.userId)");
  
      if (!result.recordset[0]) {
        return res.status(404).json({ message: 'Posts not found' });
      } else {
        return res.status(200).json(result.recordset);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    } finally {
      sql.close();
    }
  };