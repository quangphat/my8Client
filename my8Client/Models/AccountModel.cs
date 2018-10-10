using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class Account
    {
        public Account() { }
        public string PersonId { get; set; }
        public string DisplayName { get; set; }
        public string ProfileName { get; set; }
        public string Avatar { get; set; }
        public string WorkAs { get; set; }
        public string Company { get; set; }
        public double Rate { get; set; }//Đánh giá 
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        
    }
    public class SignalRAccount
    {
        public string PersonId { get; set; }
        public string ConnectionId { get; set; }
    }
    public class AccountModel
    {
        public AccountModel(Account account)
        {
            this.Account = account;
        }
        public Account Account { get; set; }
        public string AccountJson { get { return Account != null ? JsonConvert.SerializeObject(Account) : null; } }
        public Author GetAuthor()
        {
            if (Account == null) return null;
            return AutoMapper.Mapper.Map<Author>(Account);
        }
    }
}
