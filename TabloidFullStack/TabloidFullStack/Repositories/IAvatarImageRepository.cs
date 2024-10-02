using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IAvatarImageRepository
    {
        public List<AvatarImage> GetAll();
    }
}
