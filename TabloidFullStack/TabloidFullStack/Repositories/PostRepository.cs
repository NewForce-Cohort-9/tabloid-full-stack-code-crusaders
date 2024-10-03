using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }


        public List<Post> GetAllPublishedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime <= CURRENT_TIMESTAMP
                        ORDER BY p.PublishDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetPublishedPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                              AND p.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime, p.UserProfileId, up.DisplayName,
                               t.Id as TagId, t.Name as TagName
                        FROM Post p
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        LEFT JOIN PostTag pt ON p.Id = pt.PostId
                        LEFT JOIN Tag t ON pt.TagId = t.Id
                        WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Post post = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Tags = new List<Tag>() // Initialize the Tags list
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            post.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
                    }

                    reader.Close();

                    return post;
                }
            }
        }


        public List<Post> GetUserPostsByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, 
                               p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, 
                               c.Name AS CategoryName, u.DisplayName as AuthorName
                        FROM Post p
                        LEFT JOIN Category c ON p.CategoryId = c.Id
                        LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                        WHERE p.UserProfileId = @userProfileId
                        ORDER BY p.CreateDateTime DESC";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        var post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Category = new Category()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("AuthorName"))
                            }
                        };
                        posts.Add(post);
                    }
                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetByCategoryId(int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                               p.CategoryId, c.Name as CategoryName, u.DisplayName as AuthorName
                        FROM Post p
                        JOIN UserProfile u ON p.UserProfileId = u.Id
                        JOIN Category c ON p.CategoryId = c.Id
                        WHERE p.CategoryId = @categoryId
                        ORDER BY p.CreateDateTime DESC";

                    cmd.Parameters.AddWithValue("@categoryId", categoryId);

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = reader.GetString(reader.GetOrdinal("AuthorName"))
                            }
                        });
                    }

                    reader.Close();
                    return posts;
                }
            }
        }


        // CRUD Methods
        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Post (Title, Content, ImageLocation, 
                                                         CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Content, @ImageLocation, 
                                                @CreateDateTime, @PublishDateTime, @IsApproved, @CategoryId, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET Title = @Title,
                               Content = @Content,
                               ImageLocation = @ImageLocation,
                               CategoryId = @CategoryId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
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
                    // First delete any related reactions
                    cmd.CommandText = "DELETE FROM PostReaction WHERE PostId = @PostReactionPostId";
                    DbUtils.AddParameter(cmd, "@PostReactionPostId", id);
                    cmd.ExecuteNonQuery();

                    // Then delete any related comments
                    cmd.CommandText = "DELETE FROM Comment WHERE PostId = @CommentPostId";
                    DbUtils.AddParameter(cmd, "@CommentPostId", id);
                    cmd.ExecuteNonQuery();

                    // Now delete the post
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        // Tags for Posts
        public void AddTagsToPost(int postId, List<int> tagIds)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    foreach (var tagId in tagIds)
                    {
                        cmd.CommandText = @"
                    INSERT INTO PostTag (PostId, TagId)
                    VALUES (@postId, @tagId)";

                        DbUtils.AddParameter(cmd, "@postId", postId);
                        DbUtils.AddParameter(cmd, "@tagId", tagId);

                        // Execute the query for each tag
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }


        public void RemoveTagFromPost(int postId, int tagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM PostTag
                WHERE PostId = @postId AND TagId = @tagId";

                    DbUtils.AddParameter(cmd, "@postId", postId);
                    DbUtils.AddParameter(cmd, "@tagId", tagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        // Search Posts by Tag
        public List<Post> SearchByTag(string criterion, bool sortDescending)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql =
                        @"SELECT p.Id AS PostId, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, 
                               p.CategoryId, p.UserProfileId, up.DisplayName,
                               t.Id as TagId, t.Name as TagName, 
                               c.Name AS CategoryName
                        FROM Post p
                        LEFT JOIN Category c ON p.CategoryId = c.Id 
                        LEFT JOIN UserProfile up ON p.UserProfileId = up.Id
                        LEFT JOIN PostTag pt ON p.Id = pt.PostId
                        LEFT JOIN Tag t ON pt.TagId = t.Id
                        WHERE t.Name LIKE @Criterion"; // Search by tag name

                    if (sortDescending)
                    {
                        sql += " ORDER BY p.CreateDateTime DESC";
                    }
                    else
                    {
                        sql += " ORDER BY p.CreateDateTime";
                    }

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Category = new Category()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                            },
                            Tags = new List<Tag>() // Initialize the Tags list
                        });

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            var Tags = new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            };
                        }
                    }

                    reader.Close();

                    return posts;
                }
            }
        }




        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }

    }
}
