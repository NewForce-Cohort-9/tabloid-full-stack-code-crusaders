using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetCommentsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id AS CommentId, c.PostId, c.UserProfileId, c.Subject, c.Content AS CommentContent, c.CreateDateTime AS CommentCreateDateTime
                        FROM Comment c
                        WHERE c.PostId = @postId";

                    DbUtils.AddParameter(cmd, "@postId", postId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        var comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "CommentContent"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CommentCreateDateTime")
                        };

                        comments.Add(comment);
                    }

                    reader.Close();
                    return comments;
                }
            }
        }


    }
}
