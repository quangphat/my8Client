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
    [Route("StatusPosts")]
    public class StatusPostController  : BaseController
    {
        public StatusPostController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess):base(httpClient,clientConfig,currentProcess)
        {
        }
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] StatusPost model)
        {
            if (string.IsNullOrWhiteSpace(model.Content)) return Json(false);
            model.IsAds = false;
            model.PostBy = AutoMapper.Mapper.Map<Author>(_currentProcess.CurrentAccount.Account);//temperary
            model.PostTime = DateTime.UtcNow;
            model.Privacy = (int)PostPrivacyType.All;
            model.Comments = 0;
            model.Likes = 0;
            model.Shares = 0;
            model.Views = 0;
            model.PersonId = _currentProcess.CurrentAccount.Account.PersonId;
            model.PostingAsType = ActionAsType.Person;//temperary
            if (!ModelState.IsValid)
            {
                return ToResponse(false);
            }
            var result = await _httpClient.SendRequestAsync<ResponseActionJsonModel>(Request, _clientConfig, "/StatusPosts/create", HttpMethod.Post,model);
            return ToResponse(result);
        }

    }
}