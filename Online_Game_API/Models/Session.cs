namespace Online_Game_API.Models
{
    public enum SessionStatus
    {
        Stopped,
        Running,
        Paused
    } 

    public class Session
    {
        public int CurrentRound { get; set; } = 1;
        public string RoundName { get; set; }
        public SessionStatus Status { get; set; } = SessionStatus.Stopped;
        public _Question CurrentQuestion { get; set; }
        public List<CountryQuestion>? CountryQuestions { get; set; }
        public List<string> CurrentAnswers { get; set; } = new List<string>();
        public List<string> GetRounds()
        {
            return [
                "General Knowledge",
                "Science",
                "Countries",
                "Musicals & Theatre"
                ];
        }

    }
}
