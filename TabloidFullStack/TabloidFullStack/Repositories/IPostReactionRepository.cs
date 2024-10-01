using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostReactionRepository
    {
        void AddOrUpdate(PostReaction postReaction);
        List<Reaction> GetReactionsWithCountForPost(int postId);
        PostReaction GetUserReaction(int postId, int userProfileId);
        void RemoveReaction(PostReaction postReaction);
    }
}