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

    public class CountryQuestion
    {
        public string text { get; set; } = string.Empty;
        public string answer { get; set; } = string.Empty;

        public static List<CountryQuestion> GetAll()
        {
            return new List<CountryQuestion>
               {
                new CountryQuestion {
                                    text = "Which country is shaped like a boot?",
                    answer =  "Italy"
                  },
                new CountryQuestion {
                                    text = "Which country is home to the Great Wall?",
                    answer =  "China"
                  },
                new CountryQuestion {
                                    text = "Which country is famous for maple syrup?",
                    answer =  "Canada"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Paris?",
                    answer =  "France"
                  },
                new CountryQuestion {
                                    text = "Which country’s flag has a red circle on a white background?",
                    answer =  "Japan"
                  },
                new CountryQuestion {
                                    text = "Which country borders both the Atlantic and Pacific Oceans in South America?",
                    answer =  "Chile"
                  },
                new CountryQuestion {
                                    text = "Which country is home to the Amazon rainforest?",
                    answer =  "Brazil"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is London?",
                    answer =  "United Kingdom"
                  },
                new CountryQuestion {
                                    text = "Which country is known for its pyramids?",
                    answer =  "Egypt"
                  },
                new CountryQuestion {
                                    text = "Which country is both an island and a continent?",
                    answer =  "Australia"
                  },
                new CountryQuestion {
                                    text = "Which country has the city of Istanbul, once called Constantinople?",
                    answer =  "Turkey"
                  },
                new CountryQuestion {
                                    text = "Which country is the most populous in Africa?",
                    answer =  "Nigeria"
                  },
                new CountryQuestion {
                                    text = "Which country’s flag features a red maple leaf?",
                    answer =  "Canada"
                  },
                new CountryQuestion {
                                    text = "Which country hosts the city of Marrakech?",
                    answer =  "Morocco"
                  },
                new CountryQuestion {
                                    text = "Which country was formerly known as Persia?",
                    answer =  "Iran"
                  },
                new CountryQuestion {
                                    text = "Which European country borders both Germany and the Netherlands?",
                    answer =  "Belgium"
                  },
                new CountryQuestion {
                                    text = "Which country has the longest coastline in the world?",
                    answer =  "Canada"
                  },
                new CountryQuestion {
                                    text = "Which country is known as the Land of the Rising Sun?",
                    answer =  "Japan"
                  },
                new CountryQuestion {
                                    text = "Which country is home to Mount Kilimanjaro?",
                    answer =  "Tanzania"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Buenos Aires?",
                    answer =  "Argentina"
                  },
                new CountryQuestion {
                                    text = "Which country completely surrounds Lesotho?",
                    answer =  "South Africa"
                  },
                new CountryQuestion {
                                    text = "Which country has Nicosia as its capital?",
                    answer =  "Cyprus"
                  },
                new CountryQuestion {
                                    text = "Which landlocked European country has Vaduz as its capital?",
                    answer =  "Liechtenstein"
                  },
                new CountryQuestion {
                                    text = "Which country shares the island of Borneo with Malaysia and Indonesia?",
                    answer =  "Brunei"
                  },
                new CountryQuestion {
                                    text = "Which country’s official language is Amharic?",
                    answer =  "Ethiopia"
                  },
                new CountryQuestion {
                                    text = "Which South American country has two capitals, La Paz and Sucre?",
                    answer =  "Bolivia"
                  },
                new CountryQuestion {
                                    text = "Which country has the city of Gdańsk on the Baltic coast?",
                    answer =  "Poland"
                  },
                new CountryQuestion {
                                    text = "Which country used to be called Burma?",
                    answer =  "Myanmar"
                  },
                new CountryQuestion {
                                    text = "Which country shares a border with both Ecuador and Chile?",
                    answer =  "Peru"
                  },
                new CountryQuestion {
                                    text = "Which country is home to the world’s southernmost city, Ushuaia?",
                    answer =  "Argentina"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Helsinki?",
                    answer =  "Finland"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Bangkok?",
                    answer =  "Thailand"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Nairobi?",
                    answer =  "Kenya"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Lima?",
                    answer =  "Peru"
                  },
                new CountryQuestion {
                                    text = "Which country is home to Machu Picchu?",
                    answer =  "Peru"
                  },
                new CountryQuestion {
                                    text = "Which country has the Eiffel Tower?",
                    answer =  "France"
                  },
                new CountryQuestion {
                                    text = "Which country has the Taj Mahal?",
                    answer =  "India"
                  },
                new CountryQuestion {
                                    text = "Which country’s landmark is the Christ the Redeemer statue?",
                    answer =  "Brazil"
                  },
                new CountryQuestion {
                                    text = "Which country’s flag is made up of green, white, and orange vertical stripes?",
                    answer =  "Ireland"
                  },
                new CountryQuestion {
                                    text = "Which country is famous for its tulips and windmills?",
                    answer =  "Netherlands"
                  },
                new CountryQuestion {
                                    text = "Which country is known for the city of Dubai?",
                    answer =  "United Arab Emirates"
                  },
                new CountryQuestion {
                                    text = "Which country is home to the Great Barrier Reef?",
                    answer =  "Australia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Berlin?",
                    answer =  "Germany"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Madrid?",
                    answer =  "Spain"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Cairo?",
                    answer =  "Egypt"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Moscow?",
                    answer =  "Russia"
                  },
                new CountryQuestion {
                                    text = "Which country is home to the Sahara Desert?",
                    answer =  "Algeria"
                  },
                new CountryQuestion {
                                    text = "Which country has the city of Reykjavik as its capital?",
                    answer =  "Iceland"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Warsaw?",
                    answer =  "Poland"
                  },
                new CountryQuestion {
                                    text = "Which country is known for having fjords?",
                    answer =  "Norway"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Stockholm?",
                    answer =  "Sweden"
                  },
                new CountryQuestion {
                                    text = "Which country’s flag has a red cross on a white background?",
                    answer =  "Switzerland"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Lisbon?",
                    answer =  "Portugal"
                  },
                new CountryQuestion {
                                    text = "Which country has the ancient ruins of Petra?",
                    answer =  "Jordan"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Seoul?",
                    answer =  "South Korea"
                  },
                new CountryQuestion {
                                    text = "Which country is home to the Serengeti National Park?",
                    answer =  "Tanzania"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Oslo?",
                    answer =  "Norway"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Athens?",
                    answer =  "Greece"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Vienna?",
                    answer =  "Austria"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Budapest?",
                    answer =  "Hungary"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Prague?",
                    answer =  "Czech Republic"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Brussels?",
                    answer =  "Belgium"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Amsterdam?",
                    answer =  "Netherlands"
                  },
                new CountryQuestion {
                                    text = "Which country is home to Mount Everest (shared with China)?",
                    answer =  "Nepal"
                  },
                new CountryQuestion {
                                    text = "Which country is famous for pizza and pasta?",
                    answer =  "Italy"
                  },
                new CountryQuestion {
                                    text = "Which country is known for the city of Casablanca?",
                    answer =  "Morocco"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is New Delhi?",
                    answer =  "India"
                  },
                new CountryQuestion {
                                    text = "Which country is home to the city of Havana?",
                    answer =  "Cuba"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Buenos Aires?",
                    answer =  "Argentina"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Santiago?",
                    answer =  "Chile"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Bogotá?",
                    answer =  "Colombia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Lima?",
                    answer =  "Peru"
                  },
                new CountryQuestion {
                                    text = "Which country is known for samba and carnival?",
                    answer =  "Brazil"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Mexico City?",
                    answer =  "Mexico"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Ottawa?",
                    answer =  "Canada"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Washington, D.C.?",
                    answer =  "United States"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Wellington?",
                    answer =  "New Zealand"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Manila?",
                    answer =  "Philippines"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Bangkok?",
                    answer =  "Thailand"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Jakarta?",
                    answer =  "Indonesia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Kuala Lumpur?",
                    answer =  "Malaysia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Hanoi?",
                    answer =  "Vietnam"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Singapore?",
                    answer =  "Singapore"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Riyadh?",
                    answer =  "Saudi Arabia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Doha?",
                    answer =  "Qatar"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Abu Dhabi?",
                    answer =  "United Arab Emirates"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Tehran?",
                    answer =  "Iran"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Islamabad?",
                    answer =  "Pakistan"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Kabul?",
                    answer =  "Afghanistan"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Jerusalem?",
                    answer =  "Israel"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Baghdad?",
                    answer =  "Iraq"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Addis Ababa?",
                    answer =  "Ethiopia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Nairobi?",
                    answer =  "Kenya"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Pretoria?",
                    answer =  "South Africa"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Dakar?",
                    answer =  "Senegal"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Accra?",
                    answer =  "Ghana"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Rabat?",
                    answer =  "Morocco"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Algiers?",
                    answer =  "Algeria"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Tunis?",
                    answer =  "Tunisia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Tripoli?",
                    answer =  "Libya"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Cairo?",
                    answer =  "Egypt"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Reykjavik?",
                    answer =  "Iceland"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Tallinn?",
                    answer =  "Estonia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Riga?",
                    answer =  "Latvia"
                  },
                new CountryQuestion {
                                    text = "Which country’s capital is Vilnius?",
                    answer =  "Lithuania"
                  }

            };
        }
    }
}
    
