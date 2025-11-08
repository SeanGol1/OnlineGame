using Online_Game_API.Models;
using System.Collections.Concurrent;

namespace Online_Game_API
{
    public interface IRealTimeHub
    {
        /* Hub Functions */
        Task ResetScreen();
        Task ResetHub();
        Task OnConnected();

        /* Guess Who */
        //Task StartGuessWho();
        Task ChosenCharacter(GuessWhoCharacter character);

        /* Quiz Game*/
        Task DisplayQuestion(_Question question);
        Task DisplayAnswers(List<string> answers);
        Task DisplayMessage(string message);
        Task DisplayNewRound(string round);
        Task DisplayPlayers(List<Player> players);
        Task DisplayPowerUps(List<PowerUp> powerUps);
        Task DisplayAlert(string message);
        Task DisplayCorrectAnswer(string letter);
        Task RemoveAnswers(List<string> answers);
        Task ToggleScoreboard();
        Task ToggleStopwatch();
        Task DisplayStopwatch(float seconds);


        /* 25 Card Game */
        Task Start25();
        Task DealCards();
        Task ShowPlayerHand(string value, string suit);
        Task GetTrumpCard(string value, string suit);
        Task ClearDeck();
        Task ClearAll();
        Task BroadcastDealer(string dealer);
        Task SelectCard(Card card, string value);
        Task DisplayPlayerTurn(Player turn);
        Task AddPotCard(string value, string suit, string username);
        Task DisplayHandWinner(string username);
        Task DisplayRoundWinner(string username);

       
    }
}
