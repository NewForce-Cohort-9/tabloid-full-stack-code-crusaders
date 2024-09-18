using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        public List<Post> GetAllPublishedPosts();
        public Post GetPublishedPostById(int id);
        void Add(Post post);
        void Update(Post post);
        void Delete(int id);
    }
}
