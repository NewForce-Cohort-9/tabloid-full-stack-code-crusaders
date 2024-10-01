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


        public Comment GetCommentById(int id)
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
                          WHERE c.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Comment comment = null;
                    if (reader.Read())
                    {
                        comment = new Comment()
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

                    }

                    reader.Close();
                    return comment;
                }
            }
        }


        public void AddCommentByPostId(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@PostId, @UserProfileId, @Subject, @Content, @CreateDateTime)";

                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                           SET Subject = @Subject,
                               Content = @Content
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
