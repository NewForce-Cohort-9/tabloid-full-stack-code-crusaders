using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;
using TabloidFullStack.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : Controller
    {
        private readonly IReactionRepository _reactionRepository;

        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;
        }

        // GET api/<PostReactionController>/5
        [HttpGet("GetReactionsByPostId/{id}")]
        public IActionResult GetReactionsByPostId(int id)
        {
            var reactions = _reactionRepository.GetReactionsByPostId(id);
            if (reactions == null)
            {
                return NotFound();
            }
            return Ok(reactions);
        }
    }
}
