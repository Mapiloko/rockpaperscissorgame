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
        private readonly string[] _machineSelections;
        public EventHub()
        {
            _machineSelections = new string[] { "rock", "paper", "scissor" };
        }
        public async Task sendSelection(string selected)
        {
            Random rnd = new Random();
            int index = rnd.Next(_machineSelections.Length);
            string machineSelection = _machineSelections[index];
            string result;

            int ind = Array.IndexOf(_machineSelections, selected);

            if(machineSelection == selected)
            {
                result = "draw";
            }
            else
            {
                switch (ind) 
                {
                    case 0:
                        {
                            if(index == 2)
                                result = "win";
                            else
                                result = "loss";
                        }
                        break;
                    case 1:
                        {
                            if(index == 0)
                                result = "win";
                            else
                                result = "loss";
                        }
                        break;
                    default:
                        {
                            if(index == 1)
                                result = "win";
                            else
                                result = "loss";
                        }
                        break;
                }
            }
            await Clients.All.SendAsync("SendSelection", result, machineSelection);
        }
        
    }
}