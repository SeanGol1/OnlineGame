namespace Online_Game_API.Models
{
    public class Player
    {
        public string Username { get; set; }
        public List<string> ConnectionIds { get; set; }
        public bool IsHost { get; set; } = false;
        public string Avatar { get; set; }
        public int Score { get; set; } = 0;
        public int Total { get; set; } = 0;

        public string Guess { get; set; } = string.Empty;
        public double Timer = 0;
        public int PowerUps { get; set; } = 3;
        public List<Card> Hand {get;set;} = new List<Card> { };
        public int Order { get; set; } = 0;

        public Player() { 
            Score = 0;
            Guess = string.Empty;
            PowerUps = 3;
            Timer = 0;
            Hand = new List<Card> { };
            Order = 0;
            Total = 0;
        }
    }

    public class  RiskPlayer : Player
    {
        public int RiskScore { get; set; } = 0;
        public RiskPlayer() : base()
        {
            RiskScore = 0;
        }

    }
}
