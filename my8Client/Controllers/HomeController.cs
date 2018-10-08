using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Client.Infrastructures;
using my8Client.Models;

namespace my8Client.Controllers
{
    [Produces("application/json")]
    public class HomeController : BaseController
    {
        public HomeController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess)
            :base(httpClient,clientConfig,currentProcess)
        {
        }
        [Authorize]
        public async Task<IActionResult> Index()
        {
            return View(_currentProcess.CurrentAccount);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        
    }
}
