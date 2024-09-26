using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration config) : base(config) { }

        public List<Reaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, ImageLocation FROM Reaction";

                    var reader = cmd.ExecuteReader();
                    var reactions = new List<Reaction>();
                    while (reader.Read()) 
                    {
                        reactions.Add(new Reaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ImageLocation = DbUtils.GetString(reader,"ImageLocation"),
                        });
                    }
                    reader.Close(); 
                    return reactions;
                }
            }
        }
        public Reaction GetReactionById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], ImageLocation
                        FROM Reaction
                        WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Reaction reaction = new Reaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                        };

                        reader.Close();
                        return reaction;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
        public void Add(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Reaction (Name), ImageLocation
                    OUTPUT INSERTED.ID
                    VALUES (@name), (@imageLocation);
                ";

                    DbUtils.AddParameter(cmd, "@name", reaction.Name);
                    DbUtils.AddParameter(cmd, "@imageLocation", reaction.ImageLocation);

                    int id = (int)cmd.ExecuteScalar();

                    reaction.Id = id;
                }
            }
        }
        public void Update(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Reaction
                            SET 
                                [Name] = @name
                                ImageLocation = @imageLocation
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", reaction.Name);
                    DbUtils.AddParameter(cmd, "@imageLocation", reaction.ImageLocation);
                    DbUtils.AddParameter(cmd, "@id", reaction.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int reactionId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Reaction
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", reactionId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
