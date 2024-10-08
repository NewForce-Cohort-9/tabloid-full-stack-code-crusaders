﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        [HttpGet("GetPublishedPostById/{id}")]
        public IActionResult GetPublishedPostById(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("MyPosts/{userPofileId}")]
        public IActionResult GetUserPostsByUserProfileId(int userProfileId)
        {
            var post = _postRepository.GetUserPostsByUserProfileId(userProfileId);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategory(int categoryId)
        {
            var posts = _postRepository.GetByCategoryId(categoryId);
            return Ok(posts);
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            post.PublishDateTime = DateTime.Now;
            post.UserProfileId = 1;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        // PUT api/<PostController>5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpPost("{id}/tags")]
        public IActionResult AddTagsToPost(int id, List<int> tagIds)
        {
            var post = _postRepository.GetById(id);

            if (post == null)
            {
                return NotFound();
            }

            _postRepository.AddTagsToPost(id, tagIds);
            return NoContent();
        }

        [HttpDelete("{postId}/tags/{tagId}")]
        public IActionResult RemoveTagFromPost(int postId, int tagId)
        {
            var post = _postRepository.GetById(postId);

            if (post == null)
            {
                return NotFound();
            }

            _postRepository.RemoveTagFromPost(postId, tagId);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_postRepository.SearchByTag(q, sortDesc));
        }
    }
}
