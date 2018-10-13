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
    [Route("Experiences")]
    public class ExperienceController  : BaseController
    {
        public ExperienceController(HttpClient httpClient, 
            IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess)
            :base(httpClient,clientConfig,currentProcess)
        {
        }
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] Experience model)
        {
            if (model == null) return ToResponse(false);
            model.PersonId = _currentProcess.CurrentAccount.Account.PersonId;
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<string>>(Request, _clientConfig, "/Experiences/create", HttpMethod.Post,model);
            return ToResponse(result);
        }
        [HttpGet]
        [Route("{Id}")]
        public async Task<IActionResult> Get(string experienceId)
        {
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<Experience>>(Request, _clientConfig, $"/Experiences/{experienceId}", HttpMethod.Get);
            return ToResponse(result);
        }
        [HttpGet]
        [Route("{profileId}/{page}/{limit}")]
        public async Task<IActionResult> GetExperiencesByPerson(string profileId, int page, int limit)
        {
            string personId = _currentProcess.CurrentAccount.Account.PersonId;
            //var result = await _httpClient.SendRequestAsync<ResponseJsonModel<Pagination<Experience>>>(Request, _clientConfig, 
            //    $"/Experiences/{page}/{limit}/person/{personId}", HttpMethod.Get,null);
            return await GetAsync(Request ,$"/Experiences/{profileId}/{page}/{limit}");
            
            //return ToResponse(result);
        }
    }
}