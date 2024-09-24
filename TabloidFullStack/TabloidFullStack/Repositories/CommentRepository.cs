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
                        SELECT c.Id AS CommentId, c.PostId, c.UserProfileId, c.Subject, c.Content AS CommentContent,
                        c.CreateDateTime AS CommentCreateDateTime, up.Id AS CommenterId, up.DisplayName,
                        p.Id AS Post_Id, p.Title AS PostTitle
                        FROM Comment c
                        LEFT OUTER JOIN UserProfile up
                        ON c.UserProfileId = up.Id
                        LEFT OUTER JOIN Post p
                        On c.PostId = p.Id
                        WHERE c.PostId = @postId
                        ORDER BY c.CreateDateTime DESC";

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
                            CreateDateTime = DbUtils.GetDateTime(reader, "CommentCreateDateTime"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "CommenterId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            },
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "Post_Id"),
                                Title = DbUtils.GetString(reader, "PostTitle"),
                            },
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
