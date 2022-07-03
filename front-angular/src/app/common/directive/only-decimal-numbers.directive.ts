import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyDecimalNumbers]'
})
export class OnlyDecimalNumbersDirective {

  constructor() { }
  @HostListener('keypress',["$event"]) onKeyPress(event) {

    const pattern = /^\d*(?:[.,]\d{1,2})?$/; 
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  @HostListener('paste',["$event"]) onPaste(event) {
    event.preventDefault();
  }

}
