using System.ComponentModel.DataAnnotations;

namespace TabloidFullStack.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreateDateTime { get; set; }
    }
}
