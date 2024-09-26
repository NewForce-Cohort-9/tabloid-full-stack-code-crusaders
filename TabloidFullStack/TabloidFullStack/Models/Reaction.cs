using System.ComponentModel.DataAnnotations;

namespace TabloidFullStack.Models
{
    public class Reaction
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string ImageLocation { get; set; }

    }
}
