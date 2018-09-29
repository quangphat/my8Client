using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using my8Client.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Principal;
using System.Security.Claims;

namespace my8Client.Infrastructures
{
    public static class WebExtensions
    {
        public static void Addmy8Authentication(this IServiceCollection services, IConfiguration configuration, string applicationName, string cookieName = "my8")
        {

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            //DataProtectionBuilderExtensions.PersistKeysToFileSystem(DataProtectionBuilderExtensions.SetDefaultKeyLifetime(DataProtectionBuilderExtensions.SetApplicationName(DataProtectionServiceCollectionExtensions.AddDataProtection(services), applicationName), TimeSpan.FromDays(36500.0)), new DirectoryInfo("/keys"));
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(option => {
                   
                    option.ExpireTimeSpan = TimeSpan.FromDays(30);
                    option.SlidingExpiration = true;
                    option.Cookie.Name = "my8";
                    option.LoginPath = "/Account/Login";
                });
        }
        public static Account GetUserInfo(this HttpContext context)
        {
            IIdentity identity = (context != null) ? context.User?.Identity : null;
            if (identity != null && identity.IsAuthenticated)
            {
                List<Claim> list = context.User.Claims?.ToList();
                if (list != null && list.Count != 0)
                {
                    string id = string.Empty;
                    string orgId = string.Empty;
                    Person person = new Person();
                    person.PersonId = id;
                    Claim claim = list.FirstOrDefault(p => p.Type == "Email");
                    person.Email = claim.Value;
                    person.DisplayName = list.FirstOrDefault((Claim a) => a.Type == "DisplayName")?.Value;
                    person.Url = list.FirstOrDefault((Claim a) => a.Type == "Url")?.Value;
                    person.PersonId = list.FirstOrDefault((Claim a) => a.Type == "PersonId")?.Value;
                    person.WorkAs = list.FirstOrDefault((Claim a) => a.Type == "WorkAs")?.Value;
                    person.Url = list.FirstOrDefault((Claim a) => a.Type == "OwnerPage")?.Value;
                    Account account = AutoMapper.Mapper.Map<Account>(person);
                    return account;
                }
                return null;
            }
            return null;
        }
    }
}
