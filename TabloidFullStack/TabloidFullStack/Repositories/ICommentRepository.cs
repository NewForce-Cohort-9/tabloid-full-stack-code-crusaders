using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentsByPostId(int postId);
        Comment GetCommentById(int id);
        public void AddCommentByPostId(Comment comment);
        public void Delete(int id);
        public void Update(Comment comment);
    }
}