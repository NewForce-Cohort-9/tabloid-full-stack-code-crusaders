namespace TabloidFullStack.Models
{
    public class PostReaction
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int ReactionId { get; set; }
        public Reaction? Reaction { get; set; }
        public int UserProfileId { get; set; }
        public int ReactionCount { get; set; }
    }
}