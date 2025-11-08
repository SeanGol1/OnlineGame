namespace Online_Game_API.Models
{

    public enum Suits
    {
        hearts,
        diamonds,
        spades,
        clubs
    }

    public class Card
    {
        public Suits Suit;
        public string Number;
        public Card()
        {
        }
        public Card(Suits suit2, string value2)
        {
            Suit = suit2;
            Number = value2;
        }
        public override string ToString()
         {
             return string.Format("{0} of {1}", Number, Suit);
         }

        public int GetCardScore(Card card, Suits trump, Suits raised)
        {
            if (card.Suit == Suits.hearts && card.Number.ToUpper() == "A")
                return 2;

            if (card.Suit == trump)
            {
                if (card.Suit == Suits.hearts || card.Suit == Suits.diamonds)
                {
                    switch (card.Number.ToUpper())
                    {
                        case "5": return 0;
                        case "J": return 1;
                        case "A": return 3;
                        case "K": return 4;
                        case "Q": return 5;
                        case "10": return 6;
                        case "9": return 7;
                        case "8": return 8;
                        case "7": return 9;
                        case "6": return 10;
                        case "4": return 11;
                        case "3": return 12;
                        case "2": return 13;

                        default:
                            break;
                    }
                }
                else
                {
                    switch (card.Number.ToUpper())
                    {
                        case "5": return 0;
                        case "J": return 1;
                        case "A": return 3;
                        case "K": return 4;
                        case "Q": return 5;
                        case "2": return 6;
                        case "3": return 7;
                        case "4": return 8;
                        case "6": return 9;
                        case "7": return 10;
                        case "8": return 11;
                        case "9": return 12;
                        case "10": return 13;

                        default:
                            break;
                    }
                }
            }
            else if (card.Suit == raised)
            {
                
                if (card.Suit == Suits.hearts || card.Suit == Suits.diamonds)
                {
                    //Reds
                    switch (card.Number.ToUpper())
                    {
                        case "K": return 14;
                        case "Q": return 15;
                        case "J": return 16;
                        case "10": return 17;
                        case "9": return 18;
                        case "8": return 19;
                        case "7": return 20;
                        case "6": return 21;
                        case "5": return 22;
                        case "4": return 23;
                        case "3": return 24;
                        case "2": return 25;
                        case "A": return 26;

                        default:
                            break;
                    }
                }
                else
                {
                    //Blacks
                    switch (card.Number.ToUpper())
                    {
                        case "K": return 14;
                        case "Q": return 15;
                        case "J": return 16;
                        case "A": return 17;
                        case "2": return 18;
                        case "3": return 19;
                        case "4": return 20;
                        case "5": return 21;
                        case "6": return 22;
                        case "7": return 23;
                        case "8": return 24;
                        case "9": return 25;
                        case "10": return 26;

                        default:
                            break;
                    }
                }
            }
            else
            {
                return 100;
            }

            return 100;


        }
    }

    public class Deck
    {
        Card[] cards = new Card[52];
        string[] numbers = new string[] {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" };
        public Deck()
        {
            int i = 0;
            foreach (string s in numbers)
            {
                cards[i] = new Card(Suits.clubs, s);
                i++;

            }
            foreach (string s in numbers)
            {
                cards[i] = new Card(Suits.spades, s);
                i++;

            }
            foreach (string s in numbers)
            {
                cards[i] = new Card(Suits.hearts, s);
                i++;

            }
            foreach (string s in numbers)
            {
                cards[i] = new Card(Suits.diamonds, s);
                i++;

            }
        }

        public Card[] Cards
        {
            get
            {
                return cards;


            }
        }

        static Random r = new Random();
        public Deck Shuffle(Deck deck)
        {
            for (int n = deck.Cards.Length - 1; n > 0; --n)
            {
                int k = r.Next(n + 1);
                Card temp = deck.Cards[n];
                deck.Cards[n] = deck.Cards[k];
                deck.Cards[k] = temp;
            }

            return deck;
        }

        //public Deck TakeCard(Deck deck)
        //{

        //}

    }

    static public class DeckFunctions
    {
        static Random r = new Random();

        static Deck Shuffle(Deck deck)
        {
            for (int n = deck.Cards.Length - 1; n > 0; --n)
            {
                int k = r.Next(n + 1);
                Card temp = deck.Cards[n];
                deck.Cards[n] = deck.Cards[k];
                deck.Cards[k] = temp;
            }

            return deck;
        }
    }

}
