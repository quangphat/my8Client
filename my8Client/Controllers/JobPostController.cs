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
    public class JobPostController  : BaseController
    {
        public JobPostController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess):base(httpClient,clientConfig,currentProcess)
        {
        }
        [HttpPost]
        [Route("/JobPost/create")]
        public async Task<IActionResult> Create([FromBody] JobPost model)
        {
            if (string.IsNullOrWhiteSpace(model.Content)) return Json(false);
            model.PostBy = AutoMapper.Mapper.Map<Author>(_currentProcess.CurrentAccount.Account);
            model.PersonId = _currentProcess.CurrentAccount.Account.PersonId;
            model.PostingAsType = ActionAsType.Person;
            var result = await _httpClient.SendRequestAsync<ResponseActionJsonModel>(Request, _clientConfig, $"/api/JobPost/create", HttpMethod.Post, model);
            return ToResponse(result);
        }

    }
}