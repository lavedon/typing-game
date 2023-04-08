import { flush, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TypingGameComponent } from './typing-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TypingGameComponent', () => {
  let component: TypingGameComponent;
  let fixture: ComponentFixture<TypingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingGameComponent ],
      imports: [ReactiveFormsModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should have the correct initial state', () => {
    expect(component.displayText).toBe('game.');
    expect(component.userInput.value).toBe('');
    expect(component.currentLevel).toBe(1);
    expect(component.correctInputs).toBe(0);
    expect(component.gameOver).toBe(false);
  });

  it('should update display text when the level changes', () => {
    component.currentLevel = 2;
    component.updateDisplayText();
    expect(component.displayText).toBe('typing game.');
  });

  it('The typing two words correctly should advance us to level 3', () => {
    const inputWords = 'game. typing game. typing game. typing game. typing game.'.split(' ');

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        component.userInput.setValue(inputWords[i]);
      }
    }

    expect(component.currentLevel).toBe(2);
    expect(component.displayText).toBe('typing game.');
  });

  it('should set game over when all levels are completed', () => {
    const inputText: string = 'This is a sample text for the typing game.';
    const inputWords: string[] = inputText.split(' ').reverse();

      for (const word of inputWords) {
        console.log('Typing this word: ');
        console.log(word);
        for (let i = 0; i < 5; i++) {
          console.log('Number of word correct attempts: ');
          console.log(i + 1);
          component.userInput.setValue(word);
          fixture.detectChanges();
      }
      console.log('Current level: ');
      console.log(component.currentLevel);
      console.log('Max level: ');
      console.log(component.maxLevel);
      console.assert(component.currentLevel <= component.maxLevel, 'Current level is greater than max level');
      console.log('Game over state: ');
      console.log(component.gameOver);
      console.assert(component.gameOver === false, 'Game over state is true');
    }
    debugger;
    expect(component.gameOver).toBe(true);
  });

  fit('A simple three word sentence should be won in three levels', () => {
    const inputText: string = "This is test.";
    const inputWords: string[] = inputText.split(' ').reverse();

    for (const word of inputWords) {
      console.log('Typing this word: ');
      console.log(word);
      for (let i = 0; i < 5; i++) {
        component.userInput.setValue(word);
        fixture.detectChanges();
        console.log('Number of word correct attempts: ');
        console.log(component.correctInputs);
      }
      console.log('Current level: ');
      console.log(component.currentLevel);
      console.log('Max level: ');
      console.log(component.maxLevel);
      console.assert(component.currentLevel <= component.maxLevel, 'Current level is greater than max level');
      console.log('Game over state: ');
      console.log(component.gameOver);
      console.assert(component.gameOver === false, 'Game over state is true');
      debugger;
    }
    debugger;
    expect(component.gameOver).toBe(true);
    expect(component.currentLevel).toBe(3);
  });
});