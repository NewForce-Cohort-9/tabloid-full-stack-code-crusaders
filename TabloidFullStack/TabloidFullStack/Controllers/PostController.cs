using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TabloidFullStack.Repositories;
using TabloidFullStack.Models;
using TabloidFullStack.Models.ViewModel;

namespace TabloidFullStack.Controllers
{
    [Authorize]
    [Route("api/[posts]")]
    public class PostController : Controller
    {
        private readonly IPostRepository _postRepository;
        private readonly ICategoryRepository _categoryRepository;

        public PostController(IPostRepository postRepository, ICategoryRepository categoryRepository)
        {
            _postRepository = postRepository;
            _categoryRepository = categoryRepository;
        }

        public IActionResult Index()
        {
            var posts = _postRepository.GetAllPublishedPosts();
            return View(posts);
        }

        public IActionResult Details(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);
            if (post == null)
            {
                int userId = GetCurrentUserProfileId();
                post = _postRepository.GetUserPostsByUserProfileId(userId)
                                      .FirstOrDefault(p => p.Id == id);
                if (post == null)
                {
                    return NotFound();
                }
            }
            return View(post);
        }

        public IActionResult Create()
        {
            var vm = new PostCreateViewModel();
            vm.CategoryOptions = _categoryRepository.GetAll();
            return View(vm);
        }

        [HttpPost]
        public IActionResult Create(PostCreateViewModel vm)
        {
            try
            {
                vm.Post.CreateDateTime = DateTime.Now;
                vm.Post.IsApproved = true;
                vm.Post.UserProfileId = GetCurrentUserProfileId();

                _postRepository.Add(vm.Post);

                return RedirectToAction("Details", new { id = vm.Post.Id });
            }
            catch
            {
                vm.CategoryOptions = _categoryRepository.GetAll();
                return View(vm);
            }
        }

        public IActionResult MyPosts()
        {
            // Retrieve the current logged-in user's ID
            var userId = GetCurrentUserProfileId();

            // Fetch all posts authored by the current user
            var posts = _postRepository.GetUserPostsByUserProfileId(userId);

            // Pass the list of posts to the view
            return View(posts);
        }

        public IActionResult Edit(int id)
        {
            var userId = GetCurrentUserProfileId();
            var post = _postRepository.GetUserPostsByUserProfileId(userId)
                                       .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound(); // Return 404 if the post is not found or doesn't belong to the user
            }

            var vm = new PostCreateViewModel
            {
                Post = post,
                CategoryOptions = _categoryRepository.GetAll()
            };

            return View(vm);
        }

        // POST: Post/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, PostCreateViewModel vm)
        {
            try
            {
                var userId = GetCurrentUserProfileId();
                var post = _postRepository.GetUserPostsByUserProfileId(userId)
                                           .FirstOrDefault(p => p.Id == id);

                if (post == null)
                {
                    return NotFound(); // Return 404 if the post is not found or doesn't belong to the user
                }

                post.Title = vm.Post.Title;
                post.Content = vm.Post.Content;
                post.ImageLocation = vm.Post.ImageLocation;
                post.CategoryId = vm.Post.CategoryId;

                _postRepository.Update(post);

                return RedirectToAction("Details", new { id = post.Id });
            }
            catch
            {
                vm.CategoryOptions = _categoryRepository.GetAll();
                return View(vm);
            }
        }

        public IActionResult Delete(int id)
        {
            // Retrieve the current logged-in user's ID
            var userId = GetCurrentUserProfileId();

            // Retrieve the post by its ID and ensure it belongs to the current user
            var post = _postRepository.GetUserPostsByUserProfileId(userId)
                                      .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound(); // Return 404 if the post is not found or doesn't belong to the user
            }
            return View(post);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var userId = GetCurrentUserProfileId();
            var post = _postRepository.GetUserPostsByUserProfileId(userId)
                                      .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            _postRepository.Delete(id);
            return RedirectToAction(nameof(MyPosts));
        }

        private int GetCurrentUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.Parse(id);
        }
    }
}
