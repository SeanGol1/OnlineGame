namespace Online_Game_API.Models
{
    public class GuessWhoCharacter
    {
            public string Name { get; set; }
            public string Gender { get; set; }
            public bool Glasses { get; set; }
            public bool Hat { get; set; }
            public bool Beard { get; set; }
            public string HairColor { get; set; }
            public string ShirtColor { get; set; }
            public string Image { get; set; }

            public GuessWhoCharacter(string name, string gender, bool glasses, bool hat, bool beard, string hairColor, string shirtColor, string image)
            {
                Name = name;
                Gender = gender;
                Glasses = glasses;
                Hat = hat;
                Beard = beard;
                HairColor = hairColor;
                ShirtColor = shirtColor;
                Image = image;
            }
        
    }
}
