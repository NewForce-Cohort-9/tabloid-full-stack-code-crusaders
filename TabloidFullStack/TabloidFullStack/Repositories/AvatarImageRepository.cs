using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class AvatarImageRepository : BaseRepository, IAvatarImageRepository
    {
        public AvatarImageRepository(IConfiguration configuration) : base(configuration) { }


        public List<AvatarImage> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = " SELECT Id, ImageLocation FROM AvatarImage ORDER BY Id ASC";
                    var reader = cmd.ExecuteReader();

                    var avatarImages = new List<AvatarImage>();
                    while (reader.Read())

                    {
                        avatarImages.Add(new AvatarImage()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                        });
                    }
                    reader.Close();
                    return avatarImages;
                }

            }
        }


    }  
}
