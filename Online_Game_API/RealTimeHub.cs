using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Online_Game_API.Models;
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Diagnostics.Eventing.Reader;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
namespace Online_Game_API
{
    public class RealTimeHub : Hub<IRealTimeHub>
    {
        private readonly IWebHostEnvironment _env;

        public static bool isTest = false;

        /* Quiz Game */
        public static Session session = new Session();
        public static Random rnd = new Random();
        public static List<PowerUp> PowerUps = new List<PowerUp>();
        public static List<Player> ConnectedUsers = new List<Player>();
        public static Stopwatch stopwatch = new Stopwatch();
        public static List<string> random_answers = new List<string>();

        /* 25 Card Game */
        public static Card TrumpCard;
        public static List<(Card, Player)> Pot = new List<(Card, Player)>();
        public static Player Dealer;
        public static Player LastWinner;

        /* Guess Who */

        public static List<(string, Player)> GuessWhoCharacters = new List<(string, Player)>();
        //Asign random character to the player (making sure its different)
        public static List<GuessWhoCharacter> AllGuessWhoCharacters = new List<GuessWhoCharacter>
        {
            new GuessWhoCharacter("Alice", "female", true,  false, false, "blonde", "red", "assets/characters/alice.jpg"),
            new GuessWhoCharacter("Bob", "male", false, true,  true,  "brown", "blue", "assets/characters/bob.jpg"),
            new GuessWhoCharacter("Clara", "female", false, false, false, "black", "green", "assets/characters/clara.jpg"),
            new GuessWhoCharacter("David", "male", true,  false, true,  "red", "yellow", "assets/characters/david.jpg"),
            new GuessWhoCharacter("Ella", "female", true,  true,  false, "brown", "blue", "assets/characters/ella.jpg"),
            new GuessWhoCharacter("Frank", "male", false, true,  false, "blonde", "green", "assets/characters/frank.jpg"),
            new GuessWhoCharacter("Grace", "female", false, false, false, "red", "yellow", "assets/characters/grace.jpg"),
            new GuessWhoCharacter("Henry", "male", true,  false, false, "black", "red", "assets/characters/henry.jpg"),
            new GuessWhoCharacter("Isla", "female", false, true,  false, "black", "green", "assets/characters/isla.jpg"),
            new GuessWhoCharacter("Jack", "male", false, false, true,  "brown", "blue", "assets/characters/jack.jpg"),
            new GuessWhoCharacter("Kate", "female", true,  false, false, "blonde", "red", "assets/characters/kate.jpg"),
            new GuessWhoCharacter("Leo", "male", true,  true,  true,  "red", "yellow", "assets/characters/leo.jpg"),
            new GuessWhoCharacter("Mia", "female", false, true,  false, "brown", "green", "assets/characters/mia.jpg"),
            new GuessWhoCharacter("Noah", "male", true,  false, false, "black", "blue", "assets/characters/noah.jpg"),
            new GuessWhoCharacter("Olivia", "female", true,  true,  false, "red", "yellow", "assets/characters/olivia.jpg"),
            new GuessWhoCharacter("Paul", "male", false, true,  true,  "blonde", "green", "assets/characters/paul.jpg")
        };


        /* Risk */

        public RealTimeHub(IWebHostEnvironment env)
        {
            _env = env;
        }


        public void OnConnected(string username,string avatar)
        {
            Trace.TraceInformation("MapHub started. ID: {0}", Context.ConnectionId);
            bool exists = false;
            Player p = new Player();
            p.Username = username;
            p.Avatar = avatar;
            p.Order = ConnectedUsers.Count;

            if (ConnectedUsers.Count == 0)
                p.IsHost = true;
            // Try to get a List of existing user connections from the cache
            try
            {
                var pl = ConnectedUsers.Where(x => x.Username == username).FirstOrDefault();

                if (pl != null)
                {
                    p = pl;
                    exists = true;
                    //foreach (var c in p.Hand)
                    //{
                    //    Clients.Client(Context.ConnectionId).ShowPlayerHand(c.Number, c.Suit.ToString());
                    //}
                }
            }
            catch (Exception ex)
            {

            }

            if (p.ConnectionIds == null)
            {
                p.ConnectionIds = new List<string>();
            }

            p.ConnectionIds.Add(Context.ConnectionId);

            if (!exists)
                ConnectedUsers.Add(p);

            //Clients.All.DisplayMessage($"Click Next for Question - {ConnectedUsers.Count} Players connected.");
            Clients.All.DisplayPlayers(ConnectedUsers);
            Clients.Caller.CurrentPlayer(p);

            if (session.Status == SessionStatus.Running)
            {
                Clients.Caller.DisplayNewRound(session.RoundName);
                Thread.Sleep(100);
                Clients.Caller.DisplayNewRound("");
                Clients.Caller.DisplayQuestion(session.CurrentQuestion);
                Clients.Caller.DisplayAnswers(random_answers);
            }

        }
        public async void OnDisconnect()
        {

        }

        public async void ResetHub()
        {

        }


        //GUESS WHO
        public async void StartGuessWho()
        {
            var random = new Random();

            foreach (var user in ConnectedUsers)
            {
                int index = random.Next(AllGuessWhoCharacters.Count);
                GuessWhoCharacter selected = AllGuessWhoCharacters[index];
                GuessWhoCharacters.Add((selected.Name, getPlayer(user.ConnectionIds[0]))); // Check all connection ids of user. 
                await Clients.Client(user.ConnectionIds[0]).ChosenCharacter(selected);
            }



        }



        //QUIZ

        public async void ResetQuizHub()
        {
            session = new Session();
            ConnectedUsers = new List<Player>();
            stopwatch = new Stopwatch();
            PowerUps = new List<PowerUp>();
            random_answers = new List<string>();
            await Clients.All.RefreshScreen();
        }

        public async void QuestionStart()
        {
            session.Status = SessionStatus.Running;
            await Clients.All.DisplayMessage("");

            if (session.CurrentRound == 1)
                session.RoundName = session.GetRounds()[0];
            else if (session.CurrentRound == 6)
                session.RoundName = session.GetRounds()[1];
            else if (session.CurrentRound == 11)
                session.RoundName = session.GetRounds()[2];
            else if (session.CurrentRound == 16)
                session.RoundName = session.GetRounds()[3];
            else if (session.CurrentRound == 21)
                session.RoundName = session.GetRounds()[0];

            await Clients.All.DisplayNewRound(session.RoundName);
            Thread.Sleep(2000);
            await Clients.All.DisplayNewRound("");

            if (session.RoundName == "Countries")
                GetCountryQuestion();
            else
                GetNewQuestion();
        }
        public async void QuestionEnd()
        {
            AddScores();

            if (session.RoundName != "Countries")
                await Clients.All.DisplayCorrectAnswer(getAnswerLetter(session.CurrentQuestion.Correct_answer));

            await Clients.All.DisplayPowerUps(PowerUps);
            Thread.Sleep(3000);
            await Clients.All.DisplayMessage("");

            //Display Scores Every 5 Rounds
            if (session.CurrentRound % 5 == 0)
            {
                await Clients.All.ToggleScoreboard();
                Thread.Sleep(8000);
                await Clients.All.ToggleScoreboard();
            }

            OnReset();
            session.CurrentRound += 1;
            await Clients.All.DisplayPowerUps(PowerUps);
            await Clients.All.DisplayPlayers(ConnectedUsers);

            QuestionStart();
        }
        public async void GetNewQuestion()
        {
            _Question question = new _Question();
            using var client = new HttpClient();
            client.BaseAddress = new Uri("https://opentdb.com/api.php");
            client.DefaultRequestHeaders.Accept.Add(
               new MediaTypeWithQualityHeaderValue("application/json"));

            string parameters = "?amount=1&type=multiple";
            if (session.RoundName == "General Knowledge")
                parameters += "&category=9";
            else if (session.RoundName == "Books")
                parameters += "&category=10";
            else if (session.RoundName == "Films")
                parameters += "&category=11";
            else if (session.RoundName == "Music")
                parameters += "&category=12";
            else if (session.RoundName == "Musicals & Theatre")
                parameters += "&category=13";
            else if (session.RoundName == "TV")
                parameters += "&category=14";
            else if (session.RoundName == "Video Games")
                parameters += "&category=15";
            else if (session.RoundName == "Board Games")
                parameters += "&category=16";
            else if (session.RoundName == "Science & Nature")
                parameters += "&category=17";
            else if (session.RoundName == "Computers")
                parameters += "&category=18";
            else if (session.RoundName == "Mathematics")
                parameters += "&category=19";
            else if (session.RoundName == "Mythology")
                parameters += "&category=20";
            else if (session.RoundName == "Sports")
                parameters += "&category=21";
            else if (session.RoundName == "Geography")
                parameters += "&category=22";
            else if (session.RoundName == "History")
                parameters += "&category=23";
            else if (session.RoundName == "Politics")
                parameters += "&category=24";
            else if (session.RoundName == "Art")
                parameters += "&category=25";
            else if (session.RoundName == "Celebrity")
                parameters += "&category=26";
            else if (session.RoundName == "Animals")
                parameters += "&category=27";
            else
            {
                parameters += "";//"&category=9";
            }

            try
            {
                HttpResponseMessage response = client.GetAsync(parameters).Result;
                // HttpResponseMessage response = await client.GetAsync(parameters).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();

                    dynamic jsonObj = JsonConvert.DeserializeObject(jsonString);

                    question.Question = jsonObj.results[0].question;
                    question.Correct_answer = jsonObj.results[0].correct_answer;
                    foreach (string ia in jsonObj.results[0].incorrect_answers)
                    {
                        question.Incorrect_answers.Add(ia);
                    }
                    session.CurrentQuestion = question;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                client.Dispose();
            }

            Random r = new Random();
            random_answers.Clear();
            List<string> temp_answers = new List<string>([session.CurrentQuestion.Correct_answer, session.CurrentQuestion.Incorrect_answers[0], session.CurrentQuestion.Incorrect_answers[1], session.CurrentQuestion.Incorrect_answers[2]]);

            for (int i = 0; i < 4; i++)
            {
                int index = r.Next(0, (temp_answers.Count() - 1));
                random_answers.Add(temp_answers[index]);
                temp_answers.Remove(temp_answers[index]);
            }
            session.CurrentAnswers = random_answers;
            session.CurrentQuestion.Question = String.Format("{0}: {1}", session.CurrentRound, session.CurrentQuestion.Question);
            await Clients.All.DisplayQuestion(session.CurrentQuestion);
            await Clients.All.DisplayAnswers(random_answers);
            startTimer();
        }
        public async void GetCountryQuestion()
        {
            if (session.CountryQuestions == null || session.CountryQuestions.Count == 0)
                LoadCountryQuestions();

            _Question question = new _Question();
            CountryQuestion cQuestion = session.CountryQuestions[rnd.Next(session.CountryQuestions.Count)];
            session.CountryQuestions.Remove(cQuestion);

            question.Question = session.CurrentRound + ": " + cQuestion.text;
            question.Correct_answer = cQuestion.answer;
            session.CurrentQuestion = question;

            await Clients.All.DisplayQuestion(session.CurrentQuestion);
            startTimer();
        }
        public async void LoadCountryQuestions()
        {
            session.CountryQuestions = CountryQuestion.GetAll();
        }
        public async void OnReset()
        {
            session.CurrentQuestion = null;
            session.CurrentAnswers.Clear();
            PowerUps.Clear();
            stopwatch.Stop();
            stopwatch.Restart();

            foreach (Player p in ConnectedUsers)
            {
                p.Guess = "";
                p.Timer = 0;
            }
            await Clients.All.ResetScreen();
        }
        public Player getPlayer(string conId)
        {
            return ConnectedUsers.Where(p => p.ConnectionIds.Contains(conId)).FirstOrDefault();
        }
        public Player getPlayerbyName(string username)
        {
            return ConnectedUsers.Where(p => p.Username == username).FirstOrDefault();
        }
        public int getTotalGuesses()
        {
            return ConnectedUsers.Where(p => p.Guess != "").Count();
        }

        public async void PauseQuiz()
        {
            if (session.Status != SessionStatus.Paused)
            {
                session.Status = SessionStatus.Paused;
                stopwatch.Stop();
                await Clients.All.DisplayMessage("Game Paused");
                await Clients.Caller.isPauseAdmin(true);
            }
            else
            {
                await Clients.All.DisplayMessage("");
                await Clients.Caller.isPauseAdmin(false);
                session.Status = SessionStatus.Running;
                stopwatch.Start();
            }
        }

        public async void PlayerGuess(string answer)
        {
            Player player = getPlayer(Context.ConnectionId);
            if (player != null)
            {
                player.Guess = answer;
                //player.Timer = stopwatch.Elapsed.TotalSeconds;
                await Clients.Caller.DisplayMessage("Awaiting all players..");
                await Clients.All.DisplayPlayers(ConnectedUsers);

                // TODO: set this up with stopwatch. 
                //if (getTotalGuesses() == (ConnectedUsers.Count() - 1))
                //{
                //    QuestionEnd();
                //}
            }
        }

        public async void startTimer()
        {
            int timer = 15;
            stopwatch.Start();

            //await Clients.Caller.ToggleStopwatch();

            while (stopwatch.Elapsed.TotalSeconds < timer)
            {
                if (stopwatch.IsRunning)
                {
                    //wait until timer is up.
                    for (int i = 0; i < (timer + 1); i++)
                    {
                        float second = timer - i;
                        float n = (second / timer);
                        float perc = n * 100;

                        await Clients.All.DisplayStopwatch(perc);
                        Thread.Sleep(1000);
                        while (!stopwatch.IsRunning || session.Status != SessionStatus.Running)
                        {
                            Console.WriteLine("Paused");
                        }
                    }
                }
            }
            stopwatch.Stop();
            stopwatch.Restart();
            await Clients.Caller.ToggleStopwatch();
            QuestionEnd();
        }
        public string getAnswerLetter(string answer)
        {
            int i = 0;
            string letter = string.Empty;
            foreach (string ans in session.CurrentAnswers)
            {
                if (ans == answer)
                {
                    switch (i)
                    {
                        case 0:
                            letter = "A";
                            break;
                        case 1:
                            letter = "B";
                            break;
                        case 2:
                            letter = "C";
                            break;
                        case 3:
                            letter = "D";
                            break;
                    }
                    return letter;
                }
                i++;
            }

            return "";
        }
        public void AddScores()
        {
            foreach (Player p in ConnectedUsers)
            {
                string guess_wording = string.Empty;
                if (session.RoundName != "Countries")
                {
                    switch (p.Guess)
                    {
                        case "A":
                            guess_wording = session.CurrentAnswers[0];
                            break;
                        case "B":
                            guess_wording = session.CurrentAnswers[1];
                            break;
                        case "C":
                            guess_wording = session.CurrentAnswers[2];
                            break;
                        case "D":
                            guess_wording = session.CurrentAnswers[3];
                            break;
                    }
                }
                else if (session.RoundName == "Countries")
                {
                    guess_wording = p.Guess;
                }

                if (PowerUps == null || PowerUps.Count() == 0)
                {
                    if (guess_wording == session.CurrentQuestion.Correct_answer)
                    {
                        p.Score += 10;
                    }
                }
                else
                {
                    foreach (PowerUp powerUp in PowerUps)
                    {
                        if (powerUp.Receiver == p.Username && powerUp.Type == "Block")
                        {
                            //blocker used so no score added. 
                        }
                        else
                        {
                            if (guess_wording == session.CurrentQuestion.Correct_answer)
                            {
                                p.Score += 10;
                            }
                        }
                    }
                }
            }

        }
        public async Task<_Question> GetQuestionApi()
        {
            _Question question = new _Question();
            //List<Question> result = new List<Question>();
            using var client = new HttpClient();
            client.BaseAddress = new Uri("https://opentdb.com/api.php");
            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
               new MediaTypeWithQualityHeaderValue("application/json"));
            // Get data response

            string parameters = "?amount=1&type=multiple";

            try
            {
                HttpResponseMessage response = client.GetAsync(parameters).Result;        //.ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();

                    dynamic jsonObj = JsonConvert.DeserializeObject(jsonString);

                    question.Question = jsonObj.results[0].question;
                    question.Correct_answer = jsonObj.results[0].correct_answer;
                    foreach (string ia in jsonObj.results[0].incorrect_answers)
                    {
                        question.Incorrect_answers.Add(ia);
                    }

                    session.CurrentQuestion = question;

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return question;
        }
        public async void UsePowerUp(string powerup, string? user)
        {
            Player p = getPlayer(Context.ConnectionId);
            if (p.PowerUps > 0)
            {
                switch (powerup)
                {
                    case "Block":
                        PowerUps.Add(new PowerUp() { Type = "Block", Sender = p.Username, Receiver = user });
                        break;
                    case "Spy":
                        PowerUps.Add(new PowerUp() { Type = "Spy", Sender = p.Username, Receiver = user });
                        await Clients.Caller.DisplayAlert($"{user} is guessing {getPlayerbyName(user).Guess}");
                        break;
                    case "5050":
                        PowerUps.Add(new PowerUp() { Type = "5050", Sender = p.Username, Receiver = "Themselves" });
                        await Clients.Caller.RemoveAnswers(Get5050List());
                        break;
                }

                p.PowerUps -= 1;

                await Clients.Caller.DisplayAlert($"Power Up used! {p.PowerUps} left.");
            }
            else
            {
                await Clients.Caller.DisplayAlert("No Power Ups Left!");
            }

        }

        public static void Shuffle<T>(IList<T> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rnd.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }

        public List<string> Get5050List()
        {
            List<string> mixAnswers = session.CurrentAnswers.OrderBy(_ => rnd.Next()).ToList();
            List<string> newAnswers = new List<string>();
            mixAnswers.Remove(session.CurrentQuestion.Correct_answer);
            newAnswers.Add(mixAnswers[0]);
            newAnswers.Add(mixAnswers[1]);

            List<string> newLetters = new List<string>();
            foreach (string item in newAnswers)
            {
                newLetters.Add(getAnswerLetter(item));
            }
            return newLetters;
        }



        ///
        ///  25 Card Game
        ///

        public async void Start25()
        {
            await Clients.All.ClearDeck();
            Dealer = ConnectedUsers.FirstOrDefault();
            await Clients.All.BroadcastDealer(Dealer.Username);
            DealCards();
        }

        public async void ClearDeck()
        {
            await Clients.All.ClearDeck();
            Pot.Clear();
        }

        public async void ClearAll()
        {
            await Clients.All.ClearAll();
            LastWinner = null;
            TrumpCard = null;
            Pot.Clear();
            foreach (Player p in ConnectedUsers)
            {
                p.Hand.Clear();
            }
            TrumpCard = null;
        }

        public void TestDeal()
        {
            TrumpCard = new Card(Suits.hearts, "2");

            ConnectedUsers[0].Hand = new List<Card>();
            ConnectedUsers[0].Hand.Add(new Card(Suits.hearts, "A"));
            ConnectedUsers[0].Hand.Add(new Card(Suits.spades, "2"));
            ConnectedUsers[0].Hand.Add(new Card(Suits.diamonds, "5"));
            ConnectedUsers[0].Hand.Add(new Card(Suits.spades, "3"));
            ConnectedUsers[0].Hand.Add(new Card(Suits.clubs, "8"));

            ConnectedUsers[1].Hand = new List<Card>();
            ConnectedUsers[1].Hand.Add(new Card(Suits.hearts, "7"));
            ConnectedUsers[1].Hand.Add(new Card(Suits.hearts, "10"));
            ConnectedUsers[1].Hand.Add(new Card(Suits.hearts, "9"));
            ConnectedUsers[1].Hand.Add(new Card(Suits.hearts, "6"));
            ConnectedUsers[1].Hand.Add(new Card(Suits.hearts, "8"));

        }

        public async void DealCards()
        {
            ClearAll();
            if (Dealer != null)
                await Clients.All.BroadcastDealer(Dealer.Username);

            if (isTest)
                TestDeal();
            else
            {
                Deck deck = new Deck();
                deck.Shuffle(deck);
                List<Card> remainingDeck = deck.Cards.ToList();

                //Players Hands
                foreach (Player pl in ConnectedUsers)
                {
                    pl.Hand = new List<Card>();
                    for (int i = 0; i < 5; i++)
                    {
                        pl.Hand.Add(remainingDeck[0]);
                        remainingDeck.Remove(remainingDeck[0]);
                    }
                }

                //Trump Card
                TrumpCard = (Card)remainingDeck[0];
                remainingDeck.Remove(remainingDeck[0]);

            }
            //Send To Players
            await Clients.All.GetTrumpCard(TrumpCard.Number, TrumpCard.Suit.ToString());

            foreach (Player po in ConnectedUsers)
            {
                foreach (var cid in po.ConnectionIds)
                {
                    List<(string, string)> hand = new List<(string, string)>();
                    foreach (Card c in po.Hand)
                    {
                        hand.Add((c.Number, c.Suit.ToString()));
                        await Clients.Client(cid).ShowPlayerHand(c.Number, c.Suit.ToString());
                    }
                    //await Clients.Client(cid).ShowPlayerHand(hand);
                }

            }
            int turn = GetPlayerTurn();
            Player p = ConnectedUsers.Where(p => p.Order == turn).FirstOrDefault();
            await Clients.All.DisplayPlayerTurn(p);

            //Console.WriteLine(deck.Cards);


        }

        public int GetPlayerTurn()
        {
            if (ConnectedUsers.Count == 1)
                return 0;


            int turn = Pot != null ? Pot.Count() : 0;
            //int turn = TrickCounter;
            if (LastWinner != null)
            {
                //if start of hand
                if (turn <= 0)
                {
                    return LastWinner.Order;
                }
                else
                {
                    //if dealer is last in order
                    if (LastWinner.Order == (ConnectedUsers.Count() - 1))
                        return 0;
                    else
                        return LastWinner.Order + 1;
                }
            }
            else
            {

                //int turn = Pot != null ? Pot.Count() : 0;
                //if start of round
                if (turn <= 0)
                {
                    //if dealer is last in order
                    if (Dealer.Order == (ConnectedUsers.Count() - 1))
                        return 0;
                    else
                        return Dealer.Order + 1;
                }
                //if dealers go
                else if (turn == (ConnectedUsers.Count() - 1))
                {
                    return Dealer.Order;
                }
                else
                {
                    //if next user is last user
                    if (Dealer.Order + turn + 1! > ConnectedUsers.Count())
                    {
                        return Dealer.Order + turn + 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }

        }

        public async void SelectCard(string number, string suit)
        {
            if (Pot.Count() <= ConnectedUsers.Count())
            {
                Card card = new Card() { Number = number, Suit = (Suits)Enum.Parse(typeof(Suits), suit) };
                Player player = getPlayer(Context.ConnectionId);

                Pot.Add((card, player));
                await Clients.All.AddPotCard(card.Number, card.Suit.ToString(), player.Username);
            }
            else
            {
                throw new Exception("Not your Turn!");
            }

            //if last card played
            if (Pot.Count() == ConnectedUsers.Count())
            {
                FinishRound();
            }
            else
            {
                int turn = GetPlayerTurn();
                Player p = ConnectedUsers.Where(p => p.Order == turn).FirstOrDefault();
                await Clients.All.DisplayPlayerTurn(p);
            }
        }

        public async void FinishRound()
        {
            bool isFinish = false;

            List<(Card, Player)> cards = new List<(Card, Player)>();
            List<(int, Player)> tempscore = new List<(int, Player)>();

            //Change Dealer
            if ((Dealer.Order + 1) < ConnectedUsers.Count())
                Dealer = ConnectedUsers.Where(x => x.Order == (Dealer.Order + 1)).FirstOrDefault();
            else
                Dealer = ConnectedUsers.Where(x => x.Order == 0).FirstOrDefault();


            //Add Scores
            foreach (var card in Pot)
            {
                int score = card.Item1.GetCardScore(card.Item1, TrumpCard.Suit, Pot.FirstOrDefault().Item1.Suit);
                tempscore.Add((score, card.Item2));
            }

            //Display Winner 
            Player winner = tempscore.OrderBy(x => x.Item1).FirstOrDefault().Item2;
            if (winner != null)
            {
                ConnectedUsers.Find(x => x == winner).Score += 5;

                //Is End of Round
                if (ConnectedUsers.Find(x => x == winner).Score == 25)
                {
                    await Clients.All.DisplayPlayers(ConnectedUsers);
                    await Clients.All.DisplayRoundWinner(winner.Username);
                    foreach (Player p in ConnectedUsers)
                    {
                        p.Score = 0;
                        if (p == winner)
                            p.Total += 1;
                    }
                    isFinish = true;
                }
                else
                {
                    await Clients.All.DisplayPlayers(ConnectedUsers);
                    await Clients.All.DisplayHandWinner(winner.Username);
                }
            }


            //await Clients.All.DisplayPlayers(ConnectedUsers);
            //await Clients.All.DisplayHandWinner(winner.Username);

            Thread.Sleep(5000);

            await Clients.All.DisplayPlayers(ConnectedUsers);

            int totalPs = 0;
            foreach (var u in ConnectedUsers)
            {
                totalPs += u.Score;
            }


            if (isFinish || totalPs % 25 == 0)
                DealCards();
            else
            {
                LastWinner = winner;
                await Clients.All.DisplayPlayerTurn(winner);
                ClearDeck();
            }
        }
    }
}
