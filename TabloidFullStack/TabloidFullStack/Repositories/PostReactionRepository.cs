using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostReactionRepository : BaseRepository, IPostReactionRepository
    {
        public PostReactionRepository(IConfiguration config) : base(config) { }
   
        public PostReaction GetUserReaction(int postId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, PostId, ReactionId, UserProfileId
                FROM PostReaction
                WHERE PostId = @PostId AND UserProfileId = @UserProfileId";

                    DbUtils.AddParameter(cmd, "@PostId", postId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", userProfileId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new PostReaction()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                ReactionId = DbUtils.GetInt(reader, "ReactionId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                            };
                        }
                        return null;
                    }
                }
            }
        }


        public void AddOrUpdate(PostReaction postReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();

                // Check if the user already has a reaction
                var existingReaction = GetUserReaction(postReaction.PostId, postReaction.UserProfileId);

                if (existingReaction != null)
                {
                    // If the user clicks the same reaction, remove it (toggle off)
                    if (existingReaction.ReactionId == postReaction.ReactionId)
                    {
                        using (var cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = @"DELETE FROM PostReaction WHERE Id = @Id";
                            DbUtils.AddParameter(cmd, "@Id", existingReaction.Id);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    else
                    {
                        // If the reaction is different, update to the new reaction (toggle)
                        using (var cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = @"UPDATE PostReaction SET ReactionId = @ReactionId 
                                        WHERE PostId = @PostId AND UserProfileId = @UserProfileId";
                            DbUtils.AddParameter(cmd, "@ReactionId", postReaction.ReactionId);
                            DbUtils.AddParameter(cmd, "@PostId", postReaction.PostId);
                            DbUtils.AddParameter(cmd, "@UserProfileId", postReaction.UserProfileId);
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
                else
                {
                    // If the user has no reaction, add a new one
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO PostReaction (PostId, ReactionId, UserProfileId) 
                                    VALUES (@PostId, @ReactionId, @UserProfileId)";
                        DbUtils.AddParameter(cmd, "@PostId", postReaction.PostId);
                        DbUtils.AddParameter(cmd, "@ReactionId", postReaction.ReactionId);
                        DbUtils.AddParameter(cmd, "@UserProfileId", postReaction.UserProfileId);
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }

        public List<Reaction> GetReactionsWithCountForPost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT r.Id, r.Name, r.ImageLocation, COUNT(pr.Id) AS ReactionCount
                FROM Reaction r
                LEFT JOIN PostReaction pr ON pr.ReactionId = r.Id AND pr.PostId = @postId
                GROUP BY r.Id, r.Name, r.ImageLocation";

                    cmd.Parameters.AddWithValue("@postId", postId);
                    using (var reader = cmd.ExecuteReader())
                    {
                        var reactions = new List<Reaction>();
                        while (reader.Read())
                        {
                            reactions.Add(new Reaction()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                ReactionCount = reader.GetInt32(reader.GetOrdinal("ReactionCount"))
                            });
                        }
                        return reactions;
                    }
                }
            }
        }

        public void RemoveReaction(PostReaction postReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PostReaction 
                                WHERE PostId = @PostId AND UserProfileId = @UserProfileId AND ReactionId = @ReactionId";
                    DbUtils.AddParameter(cmd, "@PostId", postReaction.PostId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", postReaction.UserProfileId);
                    DbUtils.AddParameter(cmd, "@ReactionId", postReaction.ReactionId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
