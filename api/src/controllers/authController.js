import sql from 'mssql';
import config from '../db/config.js';
import jwt from 'jsonwebtoken';
import moment from 'moment'

//get posts
export const getPosts = async (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const pool = await sql.connect(config.sql);
      const request = pool.request();

      let result;
      if (userId !== "undefined") {
        result = await request
          .input("followerUserId", sql.Int, userInfo.id)
          .input("userId", sql.Int, userId)
          .query(
            `SELECT * FROM posts AS p
            JOIN users AS u ON (u.id = p.userId)
            JOIN relationships AS r ON (p.userId = r.followedUserId AND r.followerUserId = @followerUserId)`
          );
      } else {
        result = await request
          .input("followerUserId", sql.Int, userInfo.id)
          .input("userId", sql.Int, userInfo.id)
          .query(
            `SELECT p.*, name, profilePic FROM posts AS p
            JOIN users AS u ON (u.id = p.userId)
            LEFT JOIN relationships AS r ON (p.userId = r.followedUserId)
            WHERE r.followerUserId = @followerUserId OR p.userId = @userId
            ORDER BY p.createdAt DESC`
          );
      }

      // Fetch the posts created by the logged-in user
      const userPosts = await request
        .input("loggedInUserId", sql.Int, userInfo.id)
        .query(
          `SELECT * FROM posts AS p
          JOIN users AS u ON (u.id = p.userId)
          WHERE p.userId = @loggedInUserId
          ORDER BY p.createdAt DESC`
        );

      await pool.close();

      // Combine the posts from followed users and the logged-in user's posts
      const combinedPosts = [...result.recordset, ...userPosts.recordset];

      return res.status(200).json(combinedPosts);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
};

//Adding a post

export const addPost = async (req, res) => {
  const { desc, userId, img } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const request = pool.request();

    await request
      .input("desc", sql.VarChar, desc)
      .input("userId", sql.Int, userId)
      .input("img", sql.VarChar, img)
      .query(
        "INSERT INTO posts ([desc], userId, createdAt, img) VALUES (@desc, @userId, GETDATE(), @img)"
      );

    await pool.close();

    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred while adding the post" });
  }
};

