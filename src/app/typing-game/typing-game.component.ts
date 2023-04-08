import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-typing-game',
  templateUrl: './typing-game.component.html',
  styleUrls: ['./typing-game.component.scss'],
})
export class TypingGameComponent implements OnInit {
  displayText = '';
  userInput = new FormControl('');
  customText = new FormControl('');
  currentLevel = 1;
  correctInputs = 0;
  gameOver = false;
  shakeState = 'inactive';
  private isResetting = false;
  targetWords: string = '';
  maxLevel!: number;

  constructor() {
    this.updateDisplayText();
    /* Initialize max level before the user can supply text */
    this.updateMaxLevel('');
    this.userInput.valueChanges.subscribe(value => {
    if (!this.isResetting) {
      this.checkInput(value || '');
    }
    });
    this.customText.valueChanges.subscribe(value => this.updateMaxLevel(value || ''));
  }

  ngOnInit(): void {

  }

  updateMaxLevel(value: string) {
    console.log('Updating max level: ');
    this.maxLevel = value.trim().split(' ').length;
    console.log('Max level: ' + this.maxLevel);
  }

  updateDisplayText() {
    const text = this.customText.value || '';
    const words = text.split(' ');
    this.displayText = words.slice(-this.currentLevel).join(' ');
    this.targetWords = this.displayText;
  }

  checkInput(value: string) {
  const inputWords = value.trim();

  if (inputWords === this.targetWords) {
    console.log('Correct input!');
    console.log('Current correct inputs: ' + this.correctInputs);
    this.correctInputs++;
    this.isResetting = true;
    this.userInput.setValue('');
    this.isResetting = false;

    if (this.correctInputs === 4) {
      console.assert(this.currentLevel < this.maxLevel, 'We should not be able to advance past the max level');
      console.log('Current level: ');
      console.log(this.currentLevel);

      this.currentLevel++;
      this.correctInputs = 0;

      if (this.currentLevel === this.maxLevel) {
        console.log('The game was won');
        console.assert(this.gameOver === false, 'Game over state is true');
        this.gameOver = true;
      } else {
        console.log('Updating the display text for the next level.');
        this.updateDisplayText();
      }
    }
  }
}


}
