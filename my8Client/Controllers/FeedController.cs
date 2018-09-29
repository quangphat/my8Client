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
    public class FeedController  : BaseController
    {
        public FeedController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess):base(httpClient,clientConfig,currentProcess)
        {
            //_lastSkip = 0;
        }
        [HttpGet]
        [Route("/feeds/gets/{skip}")]
        public async Task<IActionResult> GetFeeds(int skip)
        {
            string personId = _currentProcess.CurrentAccount.Account.PersonId;
            var feeds = await _httpClient.SendRequestAsync<ResponseJsonModel<List<Feed>>>(Request, _clientConfig, $"/api/feed/get/{personId}/{skip}", HttpMethod.Get);
            return ToResponse(feeds);
        }
        [HttpPost]
        [Route("/feed/like")]
        public async Task<IActionResult> Like([FromBody] FeedLike feedlike)
        {
            if (feedlike == null) return ToResponse(false);
            string personId = _currentProcess.CurrentAccount.Account.PersonId;
            feedlike.Author = AutoMapper.Mapper.Map<Author>(_currentProcess.CurrentAccount.Account);
            feedlike.PersonId = personId;
            var result = await _httpClient.SendRequestAsync<ResponseActionJsonModel>(Request, _clientConfig, $"/api/feedlike/create", HttpMethod.Post,feedlike);
            return ToResponse(result);
        }
        [HttpPost]
        [Route("/feed/init")]
        public async Task<IActionResult> InitBroadcast()
        {
            string personId = _currentProcess.CurrentAccount.Account.PersonId;
            var result = await _httpClient.SendRequestAsync<ResponseActionJsonModel>(Request, _clientConfig, $"/api/Feed/Init/{personId}", HttpMethod.Post);
            return ToResponse(result);
        }
        //[HttpGet]
        //[Route("/feed/startHubConnection")]
        //public async Task<IActionResult>
    }
}