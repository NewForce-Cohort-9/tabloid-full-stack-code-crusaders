using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IReactionRepository
    {
        public List<PostReaction> GetReactionsByPostId(int id);
    }
}