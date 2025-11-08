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
    }
}
