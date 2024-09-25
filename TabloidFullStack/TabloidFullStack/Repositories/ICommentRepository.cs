using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentsByPostId(int postId);
        public void AddCommentByPostId(Comment comment);
    }
}