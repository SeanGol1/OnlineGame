export class GuessWhoCharacter {
  name: string;
  gender: string;
  glasses: boolean;
  hat: boolean;
  beard: boolean;
  hairColor: string;
  shirtColor: string;
  image:string;

  constructor(
    name: string,
    gender: string,
    glasses: boolean,
    hat: boolean,
    beard: boolean,
    hairColor: string,
    shirtColor: string,
    image:string
  ) {
    this.name = name;
    this.gender = gender;
    this.glasses = glasses;
    this.hat = hat;
    this.beard = beard;
    this.hairColor = hairColor;
    this.shirtColor = shirtColor;
    this.image = image;
  }
}


export const CHARACTERS: GuessWhoCharacter[] = [
  new GuessWhoCharacter('Alice', 'female', true,  false, false, 'blonde', 'red','assets/characters/alice.jpg'),
  new GuessWhoCharacter('Bob', 'male', false, true,  true,  'brown', 'blue','assets/characters/bob.jpg'),
  new GuessWhoCharacter('Clara', 'female', false, false, false, 'black', 'green','assets/characters/clara.jpg'),
  new GuessWhoCharacter('David', 'male', true,  false, true,  'red', 'yellow','assets/characters/david.jpg'),
  new GuessWhoCharacter('Ella', 'female', true,  true,  false, 'brown', 'blue','assets/characters/ella.jpg'),
  new GuessWhoCharacter('Frank', 'male', false, true,  false, 'blonde', 'green','assets/characters/frank.jpg'),
  new GuessWhoCharacter('Grace', 'female', false, false, false, 'red', 'yellow','assets/characters/grace.jpg'),
  new GuessWhoCharacter('Henry', 'male', true,  false, false, 'black', 'red','assets/characters/henry.jpg'),
  new GuessWhoCharacter('Isla', 'female', false, true,  false, 'black', 'green','assets/characters/isla.jpg'),
  new GuessWhoCharacter('Jack', 'male', false, false, true,  'brown', 'blue','assets/characters/jack.jpg'),
  new GuessWhoCharacter('Kate', 'female', true,  false, false, 'blonde', 'red','assets/characters/kate.jpg'),
  new GuessWhoCharacter('Leo', 'male', true,  true,  true,  'red', 'yellow','assets/characters/leo.jpg'),
  new GuessWhoCharacter('Mia', 'female', false, true,  false, 'brown', 'green','assets/characters/mia.jpg'),
  new GuessWhoCharacter('Noah', 'male', true,  false, false, 'black', 'blue','assets/characters/noah.jpg'),
  new GuessWhoCharacter('Olivia', 'female', true,  true,  false, 'red', 'yellow','assets/characters/olivia.jpg'),
  new GuessWhoCharacter('Paul', 'male', false, true,  true,  'blonde', 'green','assets/characters/paul.jpg'),
];