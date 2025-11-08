using static System.Net.Mime.MediaTypeNames;

namespace Online_Game_API.Models
{
    public class _Question
    {
        public string? Question { get; set; }
        String getQuestion() { return Question; }
        void setQuestion(String Question) { this.Question = Question; }
        public string? Correct_answer { get; set; }
        String getCorrect_answer() { return Correct_answer; }
        void setCorrect_answer(String Correct_answer) { this.Correct_answer = Correct_answer; }
        public List<string>? Incorrect_answers { get; set; } = new List<string>();
        List<string> getIncorrect_answers() { return Incorrect_answers; }
        void setIncorrect_answers(List<string> Incorrect_answers) { this.Incorrect_answers = Incorrect_answers; }
    }
}
