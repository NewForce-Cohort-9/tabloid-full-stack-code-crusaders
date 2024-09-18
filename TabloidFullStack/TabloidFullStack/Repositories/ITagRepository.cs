using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int tagId);
        List<Tag> GetAll();
        Tag GetTagById(int id);
        void Update(Tag tag);
    }
}