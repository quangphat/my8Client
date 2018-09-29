using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using my8Client.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace my8Client.Infrastructures
{
    public class UserManager
    {
        private readonly HttpClient _httpClient;
        private readonly ClientConfig _clientConfig;
        public UserManager(HttpClient httpClient, IOptions<ClientConfig> clientConfig)
        {
            _httpClient = httpClient;
            _clientConfig = clientConfig.Value;
        }
        public async void SignIn(HttpContext httpContext, Person user)
        {
            //var result = await _httpClient.SendRequestAsync<Person>(Request, _clientConfig, $"/api/account/login", HttpMethod.Post, temp);
        }
    }
}
