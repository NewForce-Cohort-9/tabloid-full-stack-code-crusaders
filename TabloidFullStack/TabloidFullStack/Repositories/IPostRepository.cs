using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        public List<Post> GetAllPublishedPosts();
        public Post GetById(int id);
        public Post GetPublishedPostById(int id);
        public List<Post> GetUserPostsByUserProfileId(int userProfileId);
        void Add(Post post);
        void Update(Post post);
        void Delete(int id);
    }
}
