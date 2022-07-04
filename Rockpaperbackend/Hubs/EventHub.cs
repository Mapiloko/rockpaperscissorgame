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
        private readonly Random rnd;
        public EventHub()
        {
            _machineSelections = new string[] { "rock", "paper", "scissor" };
            rnd = new Random();
        }

        public async Task startGame()
        {
    
            int index1 = rnd.Next(_machineSelections.Length);
            string machineSelection1 = _machineSelections[index1];
            int winner;

            int index2 = rnd.Next(_machineSelections.Length);
            string machineSelection2 = _machineSelections[index2];
            
            if(machineSelection1 == machineSelection2)
            {
                winner = 0;
            }
            else
            {
                switch (index1) 
                {
                    case 0:
                        {
                            if(index2 == 2)
                                winner = 1;
                            else
                                winner = 2;
                        }
                        break;
                    case 1:
                        {
                            if(index2 == 2)
                                winner = 2;
                            else
                                winner = 1;
                        }
                        break;
                    default:
                        {
                            if(index2 == 1)
                                winner = 1;
                            else
                                winner = 2;
                        }
                        break;
                }
            }

            await Clients.All.SendAsync("gameResults", machineSelection1, machineSelection2, winner);
        }
        public async Task sendSelection(string selected)
        {
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