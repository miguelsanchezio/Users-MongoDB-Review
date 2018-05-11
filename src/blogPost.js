const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogPost', blogPostSchema);
module.exports = BlogPost;