using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : Controller
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        // GET: api/<CommentController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("GetCommentsByPostId/{id}")]
        public IActionResult GetCommentsByPostId(int id)
        {
            var comments = _commentRepository.GetCommentsByPostId(id);
            if (comments == null)
            {
                return NotFound();
            }
            return Ok(comments);
        }

        // GET: CommentController/Details/5
        [HttpGet("{id}")]
        public IActionResult Details(int id)
        {
            return Ok();
        }

        // GET: CommentController/Comments/
        [HttpPost]
        public IActionResult Comment([FromBody] Comment comment)
        {
            if (comment == null)
            {
                return BadRequest();
            }

            _commentRepository.AddCommentByPostId(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }


        // GET: CommentController/Edit/5
        [HttpPut("{id}")]
        public IActionResult Edit(int id)
        {
            return Ok();
        }


        // GET: CommentController/Delete/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }


    }
}
