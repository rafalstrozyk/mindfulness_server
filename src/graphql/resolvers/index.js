import Post from '../../models/post.model';

const resolvers = {
  Query: {
    hello: () => 'hello world!',
    getAllPosts: async () => Post.find(),
    getPost: async (parent, { id }) => Post.findById(id),
  },
  Mutation: {
    createPost: async (parent, args) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },

    deletePost: async (parent, { id }) => {
      await Post.findByIdAndDelete(id);
      return 'Success delete post!';
    },

    updatePost: async (parent, args) => {
      const { title, description } = args.post;
      const { id } = args;
      const post = await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true },
      );
      return post;
    },
  },
};

export default resolvers;
