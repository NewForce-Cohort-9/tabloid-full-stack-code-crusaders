using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        public List<Post> GetAllPublishedPosts();
    }
}
