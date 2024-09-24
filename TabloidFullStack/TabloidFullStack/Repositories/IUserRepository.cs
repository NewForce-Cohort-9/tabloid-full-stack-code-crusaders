using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        List<UserProfile> GetAllUsers();
        UserProfile GetById(int id);
    }
}