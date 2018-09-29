using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Client.Infrastructures;
using my8Client.Models;

namespace my8Client.Controllers
{
    public class BaseController : Controller
    {
        protected readonly HttpClient _httpClient;
        protected readonly ClientConfig _clientConfig;
        protected readonly CurrentProcess _currentProcess;
        public BaseController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess)
        {
            _httpClient = httpClient;
            _clientConfig = clientConfig.Value;
            _currentProcess = currentProcess;
        }
        public IActionResult ToResponse<T>(HttpClientResult<ResponseJsonModel<T>> result) where T:class
        {
            if(result.StatusCode== System.Net.HttpStatusCode.OK)
            {
                return Json(result.Data);
            }
            return StatusCode((int)HttpStatusCode.BadRequest);
        }
        public IActionResult ToResponse(HttpClientResult<ResponseActionJsonModel> result)
        {
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                result.Data.success = true;
                return Json(result.Data);
            }
            return StatusCode((int)HttpStatusCode.BadRequest);
        }
        public IActionResult ToResponse(bool result)
        {
            ResponseActionJsonModel response = new ResponseActionJsonModel();
            response.success = false;
            return Json(response);
        }
    }
}