using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
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
        //protected HttpRequest _request;
        public BaseController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess)
        {
            _httpClient = httpClient;
            _clientConfig = clientConfig.Value;
            _currentProcess = currentProcess;
            //_request = request;
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
        protected async Task<IActionResult> GetAsync(HttpRequest request, string path = "/", object param = null)
        {
            return await _httpClient.Get(_clientConfig, request, path, param,_currentProcess);
        }
        protected async Task<IActionResult> DeleteAsync(HttpRequest request, string path = "/", object data = null)
        {
            return await _httpClient.Delete(_clientConfig, request, path, data, _currentProcess);
        }

        protected async Task<IActionResult> PostAsync(HttpRequest request, string path = "/", object param = null, object data = null)
        {
            return await _httpClient.Post(_clientConfig, request, path, param, data, _currentProcess);
        }

        protected async Task<IActionResult> PutAsync(HttpRequest request, string path = "/", object param = null, object data = null)
        {
            return await _httpClient.Put(_clientConfig, request, path, param, data, _currentProcess);
        }
    }
}