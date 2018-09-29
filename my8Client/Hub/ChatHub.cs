using Microsoft.AspNetCore.SignalR;
using my8Client.Infrastructures;
using my8Client.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client
{
    public class ChatHub : Hub
    {
        protected SignalRAccount _currentAccount;
        protected static List<SignalRAccount> _ConnectingAccounts = new List<SignalRAccount>();
        public void NotifyComment(Notification commentNotify)
        {
            if (commentNotify == null) return;
            IReadOnlyList<string> receiverIds = GetConnectionIdsFromPersonIds(commentNotify.ReceiversId);
            if (receiverIds == null) return;
            Clients.Clients(receiverIds).SendAsync("NotifyComment",commentNotify);
            string id = Context.ConnectionId;
            string names = Context.User.Identity.Name;

            //Clients.Group(names).InvokeAsync("dd",names, message);
        }
        public override async Task OnConnectedAsync()
        {
            AccountModel accountModel = new AccountModel(Context.GetHttpContext().GetUserInfo());
            if(accountModel!=null)
            {
                _currentAccount = AutoMapper.Mapper.Map<SignalRAccount>(accountModel.Account);
                _currentAccount.ConnectionId = Context.ConnectionId;
                SignalRAccount exists = _ConnectingAccounts.Where(p => p.PersonId == _currentAccount.PersonId).FirstOrDefault();
                if(exists==null)
                    _ConnectingAccounts.Add(_currentAccount);
            }
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            AccountModel accountModel = new AccountModel(Context.GetHttpContext().GetUserInfo());
            if (accountModel != null)
            {
                _currentAccount = AutoMapper.Mapper.Map<SignalRAccount>(accountModel.Account);
                _currentAccount.ConnectionId = Context.ConnectionId;
                SignalRAccount exists = _ConnectingAccounts.Where(p => p.PersonId == _currentAccount.PersonId).FirstOrDefault();
                if (exists != null)
                    _ConnectingAccounts.Remove(exists);
            }
            await base.OnDisconnectedAsync(exception);
        }
        private IReadOnlyList<string> GetConnectionIdsFromPersonIds(string[] personIds)
        {
            List<string> Ids = new List<string>();
            for(int i=0;i<personIds.Length;i++)
            {
                SignalRAccount signalRAccount = _ConnectingAccounts.Where(p => p.PersonId == personIds[i]).FirstOrDefault();
                if(signalRAccount!=null)
                {
                    Ids.Add(signalRAccount.ConnectionId);
                }
            }
            return Ids;
        }
    }
}
