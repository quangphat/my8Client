using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Client.Infrastructures;
using my8Client.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace my8Client.Controllers
{
    [Produces("application/json")]
    public class AccountController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ClientConfig _clientConfig;
        public AccountController(HttpClient httpClient, IOptions<ClientConfig> clientConfig)
        {
            _httpClient = httpClient;
            _clientConfig = clientConfig.Value;
        }

        public async Task<IActionResult> Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(Person model)
        {
            Person person = await LoginUser(model);
            if (person == null) return View();

            var claims = new List<Claim>
             {
                    new Claim("Email", person.Email),
                    new Claim("DisplayName",person.DisplayName),
                    new Claim("PersonId",person.PersonId),
                    new Claim("WorkAs",person.WorkAs),
                    new Claim("OwnerPage",person.ProfileName)
             };
            var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true
            };
            await HttpContext.SignInAsync(principal, authProperties);
            return RedirectToAction("Index", "Home");
        }
        private async Task<Person> LoginUser(Person model)
        {
            if (model == null)
            {
                return null;
            }
            if (string.IsNullOrWhiteSpace(model.Password) || string.IsNullOrWhiteSpace(model.Email))
            {
                return null;
            }
            model.Password = Utils.GetSHA256Hash(model.Password);
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<Person>>(Request, _clientConfig, "/persons/login", HttpMethod.Post, model);
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                if (result.Data != null)
                    return (Person)result.Data.data;
            }
            return null;
        }
    }
}