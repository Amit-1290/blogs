import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictWhiteSpace]'
})
export class RestrictWhiteSpaceDirective {

  constructor(private renderer: Renderer2,private el: ElementRef) {

  }

  @HostListener('keypress', ['$event']) onKeypress(event) {

    this.disAllowWhiteSpace(event);
  }

  private disAllowWhiteSpace(event) {

      if(event.keyCode == 32 || event.charCode == 32)
      {
        event.preventDefault();
      }

  }
}
