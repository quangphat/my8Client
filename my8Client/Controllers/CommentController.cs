using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Client.Infrastructures;
using my8Client.Models;

namespace my8Client.Controllers
{
    public class CommentController : BaseController
    {
        public CommentController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess):base(httpClient,clientConfig,currentProcess)
        {
        }
        [HttpGet]
        [Route("/comment/getbyPost/{Id}/{postType}/{skip}")]
        public async Task<IActionResult> GetCommentByPostId(string Id,int postType,int skip)
        {
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<List<Comment>>>(Request, _clientConfig, $"/api/comment/getbypost/{Id}/{postType}/{skip}", HttpMethod.Get);
            return ToResponse(result);
        }
        [HttpPost]
        [Route("/Comment/Create")]
        public async Task<IActionResult> CreateComment([FromBody] Comment model)
        {
            if (model == null || model.Feed == null) return ToResponse(false);
            model.PersonId = _currentProcess.CurrentAccount.Account.PersonId;
            model.Likes = 0;
            model.Replies = 0;
            model.Commentator = _currentProcess.CurrentAccount.GetAuthor();
            model.Feed.PostingAs = ActionAsType.Person;
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<Notification>>(Request, _clientConfig, "/api/comment/create", HttpMethod.Post, model);
            return ToResponse(result);
        }
    }
}