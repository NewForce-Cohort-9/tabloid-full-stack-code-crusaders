using System.ComponentModel.DataAnnotations;

namespace TabloidFullStack.Models
{
    public class AvatarImage
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string ImageLocation { get; set; }
    }
}
