using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my8Client.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace my8Client.Infrastructures
{
    public static class CoreApiClient
    {

        public static async Task<IActionResult> Get(this HttpClient httpClient, ClientConfig clientConfig, 
            HttpRequest request, string path = "/", object param = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, request, HttpMethod.Get, path, param,null,process);
        }

        public static async Task<IActionResult> Delete(this HttpClient httpClient, ClientConfig clientConfig, 
            HttpRequest request, string path = "/", object data = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, request, HttpMethod.Delete, path, null, data,process);
        }

        public static async Task<IActionResult> Post(this HttpClient httpClient, ClientConfig clientConfig, 
            HttpRequest request, string path = "/", object param = null, object data = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, request, HttpMethod.Post, path, param, data,process);
        }

        public static async Task<IActionResult> Put(this HttpClient httpClient, ClientConfig clientConfig, 
            HttpRequest request, string path = "/", object param = null, object data = null, CurrentProcess process=null)
        {
            return await httpClient.Call(clientConfig, request, HttpMethod.Put, path, param, data,process);
        }

        private static async Task<IActionResult> Call(this HttpClient httpClient, ClientConfig clientConfig, HttpRequest request, 
            HttpMethod method, string path = "/", object param = null, object data = null,CurrentProcess process = null)
        {
            if (param != null)
                path = path.AddQuery(param);
            var url = $"{clientConfig.ServiceUrl}{path}";
            var requestMessage = new HttpRequestMessage(method, url);
            string json = null;

            HttpContent content = null;

            if (data != null)
                if (data is string)
                    content = new StringContent((string)data, Encoding.UTF8, "application/json");
                else if (data is IDictionary<string, object>)
                {
                    var formData = new MultipartFormDataContent();

                    foreach (var pair in data as IDictionary<string, object>)
                        if (pair.Value is byte[])
                            formData.Add(new ByteArrayContent(pair.Value as byte[]), pair.Key, pair.Key);
                        else
                            formData.Add(new StringContent(pair.Value.ToString()), pair.Key);

                    content = formData;
                }
                else
                {
                    json = JsonConvert.SerializeObject(data, new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore
                    });

                    content = new StringContent(json, Encoding.UTF8, "application/json");
                }
            var signature = string.Empty;
            var originalData = string.Empty;
            if (method == HttpMethod.Get)
            {
                var list = new List<string>();

                if (url.Contains("?"))
                    foreach (var q in url.Split('?')[1].Split('&'))
                        if (q.Contains("="))
                            list.Add(q.Split('=')[1]);

                originalData = string.Join(string.Empty, list);
            }
            else if (data != null)
                originalData = json;

            if (string.IsNullOrWhiteSpace(originalData))
                originalData = string.Empty;
            signature = Utils.HmacSha256(clientConfig.ApiKey + originalData, clientConfig.SecretKey);
            string personId = process != null ? process.CurrentAccount.Account.PersonId : string.Empty;

            
            requestMessage.Headers.Add("X-my8-Key", clientConfig.ApiKey);
            requestMessage.Headers.Add("X-my8-Signature", signature);
            requestMessage.Headers.Add("X-my8-PersonId", personId);
            requestMessage.Content = content;



            var response = await httpClient.SendAsync(requestMessage).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();

            return new HttpContentActionResult(response.Content);
        }
        

    }
    public class HttpContentActionResult : IActionResult
    {
        private readonly HttpContent content;
        public HttpContentActionResult(HttpContent content)
        {
            this.content = content;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            using (var stream = await content.ReadAsStreamAsync())
            {
                context.HttpContext.Response.ContentType = content.Headers.ContentType.ToString();

                await stream.CopyToAsync(context.HttpContext.Response.Body);
            }
        }
    }
}
