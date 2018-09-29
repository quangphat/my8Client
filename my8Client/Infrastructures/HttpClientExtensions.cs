using Microsoft.AspNetCore.Http;
using my8Client.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace my8Client.Infrastructures
{
    public static class HttpClientExtensions
    {
        public static async Task<HttpClientResult<string>> SendRequestAsync(
            this HttpClient httpClient, HttpRequest request,
            ClientConfig clientConfig, string path, HttpMethod method,
            object data = null)
        {
            var result = await _sendRequestAsync(httpClient, request, clientConfig, path, method, data).ConfigureAwait(false);

            return result != null
                ? HttpClientResult<string>.Create(result.Item1, result.Item2, result.Item3, result.Item4)
                : HttpClientResult<string>.Create(result.Item1, string.Empty, null, false);
        }
        public static async Task<HttpClientResult<T>> SendRequestAsync<T>(
            this HttpClient httpClient, HttpRequest request,
            ClientConfig clientConfig, string path, HttpMethod method,
            object data = null)
        {
            var response = await _sendRequestAsync(httpClient, request, clientConfig, path, method, data).ConfigureAwait(false);

            if (response != null)
            {
                var result = JsonConvert.DeserializeObject<T>(response.Item2);

                if (result is ResponseJsonModel)
                {
                    var obj = result as ResponseJsonModel;

                    if (obj?.error?.code != null)
                        obj.error.message = "Lỗi";
                }

                return HttpClientResult<T>.Create(response.Item1, result, response.Item3, response.Item4);
            }
            else
                return HttpClientResult<T>.Create(response.Item1, TypeExtensions.GetDefaultValue<T>(), null, false);
        }

        public static async Task<HttpClientResult<string>> SendHandShakeRequestAsync<T>(
            this HttpClient httpClient, HttpRequest request,
            ClientConfig clientConfig, string path, HttpMethod method,
            object data = null)
        {
            var result = await _sendRequestAsync(httpClient, request, clientConfig, path, method, data).ConfigureAwait(false);
            string x = "";
            if(result!=null)
            {
                return HttpClientResult<string>.Create(result.Item1, result.Item2, result.Item3, result.Item4);
            }
            return HttpClientResult<string>.Create(result.Item1, null, null, false);
        }

        private static async Task<Tuple<HttpStatusCode, string, string, bool>> _sendRequestAsync(
            HttpClient httpClient, HttpRequest request,
            ClientConfig clientConfig, string path, HttpMethod method,
            object data)
        {
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

            requestMessage.Content = content;

            #region signature

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

            var signature = string.Empty;
            signature = Utils.HmacSha256(clientConfig.ApiKey + originalData, clientConfig.SecretKey);


            #endregion
            requestMessage.Headers.Add("X-my8-Key", clientConfig.ApiKey);
            requestMessage.Headers.Add("X-my8-Signature", signature);
            requestMessage.Headers.Add("X-my8-userId", "test");
            using (var response = await httpClient.SendAsync(requestMessage))
            {
                if (response.Content != null)
                {
                    var responseData = response.StatusCode == HttpStatusCode.Moved || response.StatusCode == HttpStatusCode.Found
                        ? response.Headers.Location.AbsoluteUri
                        : await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                    return new Tuple<HttpStatusCode, string, string, bool>(
                        response.StatusCode,
                        responseData,
                        response.Headers?.ETag?.Tag,
                        response.StatusCode == HttpStatusCode.NotModified);
                }
                else
                    throw new Exception($"request to {url} error {response.StatusCode}");
            }
        }
    }
    public class HttpClientResult<T>
    {
        public static HttpClientResult<T> Create(HttpStatusCode statusCode, T data, string eTag, bool isCache)
        {
            return new HttpClientResult<T>()
            {
                StatusCode = statusCode,
                Data = data,
                ETag = eTag,
                IsCache = isCache
            };
        }

        public HttpStatusCode StatusCode { get; set; }
        public T Data { get; set; }
        public string ETag { get; set; }
        public bool IsCache { get; set; }
    }
    public static class TypeExtensions
    {
        public static T GetDefaultValue<T>()
        {
            return (T)GetDefaultValue(typeof(T));
        }

        public static object GetDefaultValue(this Type type)
        {
            return type.GetTypeInfo().IsValueType ? Activator.CreateInstance(type) : null;
        }
    }
}
