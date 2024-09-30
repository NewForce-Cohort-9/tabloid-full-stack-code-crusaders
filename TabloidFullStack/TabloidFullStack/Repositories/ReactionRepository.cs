using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration config) : base(config) { }

        public List<PostReaction> GetReactionsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                              pr.PostId,
                              pr.ReactionId, 
                              r.Name, 
                              r.ImageLocation, 
                        COUNT(pr.ReactionId) as ReactionCount
                        FROM PostReaction pr
                        LEFT JOIN Reaction r ON r.Id = pr.ReactionId
                        WHERE pr.PostId = @id
                        GROUP BY pr.PostId, pr.ReactionId, r.Name, r.ImageLocation";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<PostReaction> postReactions = new List<PostReaction>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        postReactions.Add(new PostReaction()
                        {
                            Id = DbUtils.GetInt(reader, "ReactionId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Reaction = new Reaction()
                            {
                                Id = DbUtils.GetInt(reader, "ReactionId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            },
                            ReactionCount = DbUtils.GetInt(reader, "ReactionCount")
                        });

                    }
                    reader.Close();

                    return postReactions;
                }
            }
        }
    }
}
