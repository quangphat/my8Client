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
    [Route("JobPosts")]
    public class JobPostController  : BaseController
    {
        public JobPostController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess)
            :base(httpClient,clientConfig,currentProcess)
        {
        }
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] JobPost model)
        {
            if (string.IsNullOrWhiteSpace(model.Content)) return Json(false);
            model.PostBy = AutoMapper.Mapper.Map<Author>(_currentProcess.CurrentAccount.Account);
            model.PersonId = _currentProcess.CurrentAccount.Account.PersonId;
            model.PostingAsType = ActionAsType.Person;
            //var result = await _httpClient.SendRequestAsync<ResponseActionJsonModel>(Request, _clientConfig, $"/JobPosts/create", HttpMethod.Post, model);
            //return ToResponse(result);
            return await PostAsync(Request, "/JobPosts/create", null, model);
        }
        [HttpGet]
        [Route("{authorId}/{authorType}/{page}/{limit}")]
        public async Task<IActionResult> GetByAuthor(string authorId, int authorType, int page, int limit)
        {
            //var results = await _httpClient.SendRequestAsync<ResponseJsonModel<List<JobPost>>>(Request, _clientConfig,
            //    $"/JobPosts/{authorId}/{authorType}/{page}/{limit}", HttpMethod.Get);
            //return ToResponse(results);
            return await GetAsync(Request, $"/JobPosts/{authorId}/{authorType}/{page}/{limit}");
        }
    }
}