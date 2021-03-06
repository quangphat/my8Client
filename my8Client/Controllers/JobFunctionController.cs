using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Client.Infrastructures;
using my8Client.Models;

namespace my8Client.Controllers
{
    [Route("jobFunctions")]
    public class JobFunctionController  : BaseController
    {
        public JobFunctionController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess)
            :base(httpClient,clientConfig,currentProcess)
        {
        }
        [HttpGet]
        [Route("{searchStr}")]
        public async Task<IActionResult> Get(string searchStr)
        {
            if (string.IsNullOrWhiteSpace(searchStr))
                return ToResponse(null);
            string formated = searchStr.NonUnicode();
            //var result = await _httpClient.SendRequestAsync<ResponseJsonModel<List<JobFunction>>>(Request, _clientConfig, $"/JobFunctions/search/{formated}", HttpMethod.Get);
            //return ToResponse(result);
            return await GetAsync(Request, $"/JobFunctions/search/{formated}");
        }

    }
}