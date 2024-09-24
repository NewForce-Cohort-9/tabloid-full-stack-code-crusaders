using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace TabloidFullStack.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [DisplayName("Image URL")]
        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }

        [DisplayName("Published")]
        [DataType(DataType.Date)]
        public DateTime? PublishDateTime { get; set; }

        public bool IsApproved { get; set; }

        public int CategoryId { get; set; }

        public int UserProfileId { get; set; }

        public Category? Category { get; set; }

        public UserProfile? UserProfile { get; set; }

        public List<Tag> Tags { get; set; } = new List<Tag>();
    }
}
