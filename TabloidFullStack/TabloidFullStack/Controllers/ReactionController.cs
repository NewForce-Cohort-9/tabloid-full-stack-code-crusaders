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

        // GET: api/<ReactionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepository.GetAll());
        }

        // GET api/<ReactionController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var reaction = _reactionRepository.GetReactionById(id);
            if (reaction == null) 
            {
                return NotFound();
            }
            return Ok(reaction);    
        }

        // POST api/<ReactionController>
        [HttpPost]
        public IActionResult Post(Reaction reaction)
        {
            _reactionRepository.Add(reaction);
            return CreatedAtAction("Get", new {id =reaction.Id}, reaction);
        }

        // PUT api/<ReactionController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Reaction reaction)
        {
            if (id != reaction.Id)
            {
                return BadRequest();
            }
            _reactionRepository.Update(reaction);   
            return NoContent();
        }

        // DELETE api/<ReactionController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _reactionRepository.Delete(id);
            return NoContent();
        }

        // ReactionController.cs
        [HttpGet("post/{postId}")]
        public IActionResult GetReactionsForPost(int postId)
        {
            var reactions = _reactionRepository.GetReactionsWithCountForPost(postId);
            return Ok(reactions);
        }
    }
}
