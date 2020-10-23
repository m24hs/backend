module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {   
    title: DataTypes.STRING,   
    image: DataTypes.STRING,   
    content: DataTypes.TEXT("medium"),
  });

  return Post;
};
