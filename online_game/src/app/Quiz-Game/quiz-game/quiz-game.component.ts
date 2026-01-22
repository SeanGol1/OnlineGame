import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from 'src/app/player';
import { PowerUp } from 'src/app/powerups/powerups';
import { UsePowerupPopupComponent } from 'src/app/powerups/use-powerup-popup/use-powerup-popup.component';
import { Question } from 'src/app/Quiz-Game/question';
import { SignalRService } from 'src/app/signalr.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  standalone: false,
  styleUrls: ['./quiz-game.component.css']
})
export class QuizGameComponent {
 game?: string;
 selectedAvatar?: string;
  question?: Question;
  username?: string;
  host?: boolean;
  answers?: Array<string>;
  players?: Array<Player>;
  powerUps?: Array<PowerUp>;
  serverConnected: boolean;
  message?: string;
  powerUpWindow?: boolean;
  currentPlayer: Player;
  powerup: any;
  powerupPlayer: any;
  scoreboard: boolean;
  toggleStopwatch: boolean;
  seconds: number;
  progBarColor: string;
  private modalService = inject(NgbModal);
  closeResult = '';
  questionAnimation = false;
  @ViewChild('matSelectPowerUp') matSelectPowerup: MatSelect;
  @ViewChild('matSelectPlayer') matSelectPlayer: MatSelect;

  avatars = ['homer', 'witcher', 'jack_sparrow', 'lemmy'];


  constructor(private route: ActivatedRoute,public signalRService: SignalRService, public dialog: MatDialog) {
    this.game = 'quiz';
    this.question = null;
    this.host = false;
    this.username = '';
    this.serverConnected = false;
    this.message = '';
    this.powerUpWindow = false;
    this.toggleStopwatch = false;
    this.seconds = 100;
    this.progBarColor = "success";
    this.questionAnimation = false;
    this.scoreboard = false;
    this.currentPlayer = {
      username: '',
      connectionIds: [],
      isHost: false,
      avatar: '',
      score: '',
      guess: '',
      timer: '',
      hand: [],
      order: 0,
      total: 0
    }

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      if (this.username) {
        this.signalRService.startConnection(this.username,this.selectedAvatar);
      }
    });

  }


  ngOnInit(): void {
    this.signalRService.question.subscribe((question: Question) => {
      this.questionAnimation = false; 
      this.question = question;
      setTimeout(() => {
        this.questionAnimation = true;
      }, 10);
    });

    this.signalRService.message.subscribe(async (message: string) => {
      this.message = message;
    });

    this.signalRService.seconds.subscribe((seconds: number) => {
      this.seconds = seconds;
      if (this.seconds > 50) {
        this.progBarColor = "success"
      }
      else if (this.seconds < 50 && this.seconds > 20) {
        this.progBarColor = "warning"
      }
      else if (this.seconds < 20) {
        this.progBarColor = "danger"
      }
    });

    this.signalRService.players.subscribe((players: Array<Player>) => {
      this.players = players;
    });

    this.signalRService.powerUps.subscribe((powerUps: Array<PowerUp>) => {
      this.powerUps = powerUps;
    });

    this.signalRService.answers.subscribe((answers: Array<string>) => {
      this.answers = answers;
    });

    this.signalRService.serverConnected.subscribe((serverConnected: boolean) => {
      this.serverConnected = serverConnected;
    });

    this.signalRService.toggleStopwatch.subscribe((toggleStopwatch: boolean) => {
      this.toggleStopwatch = toggleStopwatch;
    });

    this.signalRService.currentPlayer.subscribe((player: Player) => {
      this.currentPlayer = player;
    });

    // this.signalRService.scoreboard.subscribe((scoreboard: boolean) => {
    //   this.scoreboard = scoreboard;
    // });


  }

  openDialog(): void {
    this.powerUpWindow = !this.powerUpWindow;

  }

  // resetHub() {

  // }

  public joinGame(): void {
    if (this.username != '') {
      this.signalRService.startConnection(this.username, this.selectedAvatar);

      // this.signalRService.connection
      //   .invoke('OnConnected', this.username)
      //   .then(() => {
      //     this.players.forEach(p => {
      //       if (p.connectionIds.find(this.signalRService.connection.connectionId)) {
      //         this.currentPlayer = p;
      //       }
      //     })
      //   })
      //   .catch((error: any) => {
      //     console.log(` error: ${error}`);
      //     alert(`${error}`);
      //   });
    }
    else {
      alert("Please enter username.");
    }
  }


    public nextQuestion(): void {
      this.signalRService.connection
        // .invoke('GetNewQuestion')
        .invoke('QuestionStart')
        .catch((error: any) => {
          console.log(` error: ${error}`);
        });
    }
  
    public playerGuess(answer: string): void {
      const elems = document.querySelectorAll('.' + answer);
      elems[0].classList.add('selected-answer');
      console.log();
      try{
      this.signalRService.connection
        .invoke('PlayerGuess', answer)
        .catch((error: any) => {
          console.log(` error: ${error}`);
          //alert(`${error}`);
        });
      }
      catch(error){
        console.log(` error: ${error}`);
          //alert(`${error}`);
      }
    }
  
    public changeHost() {
      this.host = !this.host;
    }
  
    public pause() {
      this.signalRService.connection
        .invoke('PauseQuiz')
        .catch((error: any) => {
          console.log(` error: ${error}`);
          //alert(`${error}`);
        });
    }
    public powerUpWindowEnable() {
      //this.powerUpWindow = !this.powerUpWindow;
      const dialogRef = this.dialog.open(UsePowerupPopupComponent, {
        data: {},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.animal = result;
      });
    }
  
    openPowerUp(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.usePowerUp();
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
  
    private getDismissReason(reason: any): string {
      switch (reason) {
        case ModalDismissReasons.ESC:
          return 'by pressing ESC';
        case ModalDismissReasons.BACKDROP_CLICK:
          return 'by clicking on a backdrop';
        default:
          return `with: ${reason}`;
      }
    }
  
    public selectPowerUp() {
      var desc = "";
      switch (this.powerup) {
        case "Block":
          desc = "Block an opponent from getting points this round.";
          break;
        case "Spy":
          desc = "View another players guess.";
          break;
        case "5050":
          desc = "Remove two wrong answers.";
          break;
      }
      document.getElementById('powerup-desc').innerHTML = desc;
    }
  
    public usePowerUp() {
      if ((this.powerup == null) || (this.powerupPlayer == null && this.powerup != "5050")) {
        alert("Make sure you fill out the values provided.");
      }
      else {
        this.signalRService.connection
          .invoke('UsePowerUp', this.powerup, this.powerupPlayer)
          .then(() => {
            //alert('Power Up Used.')
          })
          .catch((error: any) => {
            console.log(` error: ${error}`);
            //alert(`${error}`);
          });
  
      }
    }

     public selectAvatar(avatar: string) {
     this.selectedAvatar = avatar;  
    }

    public ResetHub() {
      this.signalRService.connection
        .invoke('ResetQuizHub')
        .catch((error: any) => {
          console.log(` error: ${error}`);
          //alert(`${error}`);
        });

        
    }
}
