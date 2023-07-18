CREATE DATABASE SocialMedia

CREATE TABLE users (
  id INT IDENTITY(1,1) NOT NULL,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(45) NOT NULL,
  coverPic VARCHAR(100) NULL,
  profilePic VARCHAR(100) NULL,
  city VARCHAR(45) NULL,
  website VARCHAR(45) NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id)
);

 CREATE TABLE posts (
    id INT IDENTITY(1,1) NOT NULL,
    [desc] VARCHAR(200) NULL,
    img VARCHAR(200) NULL,
    userId INT NULL,
    createdAt DATETIME NULL,
    PRIMARY KEY(id),
    CONSTRAINT uc_id_UNIQUE UNIQUE(id ASC),
    INDEX userId_idx(userId ASC),
    CONSTRAINT userId
        FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
 );

  CREATE TABLE comments (
    id INT IDENTITY(1,1) NOT NULL,
    [desc] VARCHAR(200) NULL,
    createdAt DATETIME NULL,
    userId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT uc_comments_id_UNIQUE UNIQUE(id ASC),
    INDEX postId_idx(postId ASC),
    INDEX commentUserId_idx(userId ASC),
    CONSTRAINT commentUserId
        FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT postId
        FOREIGN KEY(postId)
        REFERENCES posts(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
 );


 CREATE TABLE stories (
    id INT IDENTITY(1,1) NOT NULL,
    img VARCHAR(200) NULL,
    userId INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT uc_stories_id_UNIQUE UNIQUE(id ASC),
    INDEX userId_idx(userId ASC),
    CONSTRAINT FK_UserId
        FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
 );



 CREATE TABLE relationships (
    id INT IDENTITY(1,1) NOT NULL,
    followerUserId INT NOT NULL,
    followedUserId INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT uc_relationship_id_UNIQUE UNIQUE(id ASC),
    INDEX followerUserId_idx(followerUserId ASC),
    INDEX followedUserId_idx(followedUserId ASC),
    CONSTRAINT followerUser
        FOREIGN KEY(followerUserId)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT followedUser
        FOREIGN KEY(followedUserId)
        REFERENCES users(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
   
 );

 CREATE TABLE likes (
    id INT IDENTITY(1,1) NOT NULL,
    userId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT uc_likes_id_UNIQUE UNIQUE(id ASC),
    INDEX likeeUserId_idx(userId ASC),
    INDEX likePostId_idx(postId ASC),
    CONSTRAINT likeeUserId
        FOREIGN KEY(userId)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT likePostId
        FOREIGN KEY(postId)
        REFERENCES posts(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
 );
