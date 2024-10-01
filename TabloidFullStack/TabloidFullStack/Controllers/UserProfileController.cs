using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;
        public UserProfileController(IUserRepository userRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("admincount")]
        public IActionResult GetAdminCount()
        {
            var adminCount = _userRepository.GetAdminCount();
            return Ok(adminCount);
        }


        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByEmail",
                new { email = userProfile.Email },
                userProfile);
        }

        [HttpPut("deactivate/{id}")]
        public IActionResult DeactivateUser(int id)
        {
            _userRepository.DeactivateUser(id); // Calls the repository method
            return NoContent();
        }


        [HttpPut("reactivate/{id}")]
        public IActionResult ReactivateUser(int id)
        {
            _userRepository.ReactivateUser(id);
            return NoContent();
        }

        [HttpGet("deactivated")]
        public IActionResult GetDeactivatedUsers()
        {
            var deactivatedUsers = _userRepository.GetDeactivatedUsers();
            return Ok(deactivatedUsers);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUserType(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userRepository.UpdateUserType(userProfile);
            return NoContent();
        }


    }
}
