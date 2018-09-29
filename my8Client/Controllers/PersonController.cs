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
    public class PersonController:BaseController
    {
        public PersonController(HttpClient httpClient, 
            IOptions<ClientConfig> clientConfig,
            CurrentProcess currentProcess):base(httpClient,clientConfig,currentProcess)
        {
        }
        [HttpGet]
        [Route("/Person/GetFollowingPages")]
        public async Task<IActionResult> Get()
        {
            string personId = _currentProcess.CurrentAccount.Account.PersonId;
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<List<Page>>>(Request, _clientConfig, $"/api/person/FollowingPage/{personId}", HttpMethod.Get);
            return ToResponse(result);
        }
        [HttpGet]
        [Route("/Person/GetByUrl/{url}")]
        public async Task<IActionResult> GetByUrl(string url)
        {
            string personId = _currentProcess.CurrentAccount.Account.PersonId;
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<Person>>(Request, _clientConfig, $"/api/person/GetbyUrl/{url}", HttpMethod.Get);
            return ToResponse(result);
        }
        [HttpGet]
        [Route("/person/GetTopFriend")]
        public async Task<IActionResult> GetTopFriend()
        {
            string personId = _currentProcess.CurrentAccount.Account.PersonId;
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<List<PersonAllin>>>(Request, _clientConfig, $"/api/person/getTopInteractiveFriends/{personId}", HttpMethod.Get);
            return ToResponse(result);
        }
    }
}