using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetCategoryById(int id);
        public void Add(Category category);
        public void Update(Category category);
        public void Delete(int id);
    }
}
