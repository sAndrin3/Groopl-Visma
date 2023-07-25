import sql from 'mssql';
import config from '../db/config.js';
import jwt from 'jsonwebtoken';
import moment from 'moment'


//get posts
// export const getPosts = async (req, res) => {
//   const userId = req.query.userId;
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not logged in!");

//   jwt.verify(token, "secret", async (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     try {
//       const pool = await sql.connect(config.sql);
//       const request = pool.request();

//       let result;
//       if (userId !== "undefined") {
//         result = await request
//           .input("followerUserId", sql.Int, userInfo.id)
//           .input("userId", sql.Int, userId)
//           .query(
//             `SELECT * FROM posts AS p
//             JOIN users AS u ON (u.id = p.userId)
//             JOIN relationships AS r ON (p.userId = r.followedUserId AND r.followerUserId = @followerUserId)`
//           );
//       } else {
//         result = await request
//           .input("followerUserId", sql.Int, userInfo.id)
//           .input("userId", sql.Int, userInfo.id)
//           .query(
//             `SELECT p.*, name, profilePic FROM posts AS p
//             JOIN users AS u ON (u.id = p.userId)
//             LEFT JOIN relationships AS r ON (p.userId = r.followedUserId)
//             WHERE r.followerUserId = @followerUserId OR p.userId = @userId
//             ORDER BY p.createdAt DESC`
//           );
//       }

//       // Fetch the posts created by the logged-in user
//       const userPosts = await request
//         .input("loggedInUserId", sql.Int, userInfo.id)
//         .query(
//           `SELECT * FROM posts AS p
//           JOIN users AS u ON (u.id = p.userId)
//           WHERE p.userId = @loggedInUserId
//           ORDER BY p.createdAt DESC`
//         );

//       await pool.close();

//       // Combine the posts from followed users and the logged-in user's posts
//       const combinedPosts = [...result.recordset, ...userPosts.recordset];

//       return res.status(200).json(combinedPosts);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json(error);
//     }
//   });
// };
export const getPosts = async (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const pool = await sql.connect(config.sql);
      const request =  await pool.request().query(
        `
        SELECT p.*, u.id AS authorId, u.username AS authorUsername, u.name AS authorName, u.profilePic AS authorProfilePic,
        (SELECT COUNT(*) FROM likes l WHERE l.postId = p.id) AS likesCount,
        (SELECT COUNT(*) FROM comments c WHERE c.postId = p.id) AS commentsCount,
        (
          SELECT c.id, c.[desc], c.createdAt, c.userId, cu.name, cu.profilePic
          FROM comments c
          INNER JOIN users cu ON c.userId = cu.id
          WHERE c.postId = p.id
          FOR JSON PATH
        ) AS comments
      FROM posts p
      INNER JOIN users u ON p.userId = u.id
      ORDER BY p.createdAt DESC;
    `
      )

      // Combine the posts from followed users and the logged-in user's posts
      // const combinedPosts = [...result.recordset, ...userPosts.recordset];

      return res.status(200).json(request.recordset);
      // await pool.close();

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

    // await pool.close();
    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred while adding the post" });
  }
};

//getComments
export const getComments = async (req,res)=> {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        `SELECT c.*, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = @id ORDER BY c.createdAt DESC`
      );
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error)// Replace this with your actual access token;
    return res.status(500).json(error.message);
  }
};

//add a comment


export const addComment = async (req, res) => {
  const { desc, createdAt, postId } = req.body;
  console.log(desc, createdAt, postId);
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const userInfo = await new Promise((resolve, reject) => {
      jwt.verify(token, "secret", (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    const userId = userInfo.id;

    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("desc", sql.VarChar, desc)
      .input("userId", sql.Int, userId)
      .input("createdAt", sql.DateTime, createdAt)
      .input("postId", sql.Int, postId)
      .query(
        "INSERT INTO comments ([desc], userId, createdAt, postId) VALUES (@desc, @userId, GETDATE(), @postId)"
      );

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

//get Likes
export const getLikes = async (req, res) => {
  const postId = req.query.postId;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("postId", sql.Int, postId)
      .query(`SELECT userId FROM likes WHERE postId = @postId`);

    // Using optional chaining operator to safely access recordset
    const userIDs = result?.recordset.map((like) => like.userId);

    if (userIDs && userIDs.length > 0) {
      return res.status(200).json(userIDs);
    } else {
      return res.status(404).json({ error: "No likes found for the post" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  }
};

//Add like
export const addLike = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.userInfo.id;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postId", sql.Int, postId)
      .query("INSERT INTO Likes (userId, postId) VALUES (@userId, @postId)");
    res.status(200).json({ message: "Post has been liked successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//delete like
export const deleteLike = async (req, res) => {
  const { postId } = req.body;
  const userId = req.userInfo.id;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postId", sql.Int, postId)
      .query("DELETE FROM likes WHERE userId = @userId AND postId = @postId");
    res.status(200).json({ message: "Post has been disliked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

//get a user
export const getUser = async (req,res)=>{
  const userId = req.params.userId;

  try {
    const pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM users WHERE id = @userId");
    const user = result.recordset[0];
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    } else {
      const { password, ...userData } = user;
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

//get r/ships
export const getRelationships = async (req, res) => {
  const followedUserId = req.query.followedUserId;
  // console.log(followedUserId);
  let pool;
  try {
    pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("followedUserId", sql.Int, followedUserId)
      .query(
        `SELECT followerUserId FROM relationships WHERE followedUserId = @followedUserId`
      );
    return res
      .status(200)
      .json(
        result.recordset.map((relationship) => relationship.followerUserId)
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  } 
}; 

//add r/ship
export const addRelationship = async (req, res) => {
  const { followerUserId, followedUserId } = req.body;

  let pool;
  try {
    pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("followerUserId", sql.Int, followerUserId)
      .input("followedUserId", sql.Int, followedUserId)
      .query(
        "INSERT INTO relationships (followerUserId, followedUserId) VALUES (@followerUserId, @followedUserId)"
      );

    res.status(200).json({ message: "Relationship added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  } 
};

//delete r/ship
export const deleteRelationship = async (req, res) => {
  const { followerUserId, followedUserId } = req.body;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("followerUserId", sql.Int, followerUserId)
      .input("followedUserId", sql.Int, followedUserId)
      .query(
        "DELETE FROM relationships WHERE followerUserId = @followerUserId AND followedUserId = @followedUserId"
      );

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};