using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvatarImageController : Controller
    {
        private readonly IAvatarImageRepository _avatarImageRepository;

        public AvatarImageController(IAvatarImageRepository avatarImageRepository)
        {
            _avatarImageRepository = avatarImageRepository;
        }
        // GET: api/<AvatarImageController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_avatarImageRepository.GetAll());
        }
    }
}
