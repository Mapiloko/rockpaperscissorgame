using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Rockpaperbackend.Models;

namespace Rockpaperbackend.Hubs
{
    public class EventHub: Hub 
    {
        private readonly string _botUser;
        public EventHub()
        {
            _botUser = "Hey everyone";
        }
        public async Task JoinRoom(UserConnections userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            await Clients.Group(userConnection.Room).SendAsync("RecieveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");
        }
        public async Task SendMessage(EventMessage message)
        {
            await Clients.All.SendAsync("SendMessage", message);
        }
        
    }
}