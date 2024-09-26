using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IReactionRepository
    {
        List<Reaction> GetAll();
        public Reaction GetReactionById(int id);
        public void Add(Reaction reaction);
        public void Update(Reaction reaction);
        public void Delete(int reactionId);
    }
}