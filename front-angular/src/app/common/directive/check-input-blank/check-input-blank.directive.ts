import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appCheckInputBlank]'
})
export class CheckInputBlankDirective implements OnInit {

  constructor(private renderer: Renderer2,private el: ElementRef) {

    this.addOrRemoveClass();                          
  }

  ngOnInit() {
    this.addOrRemoveClass();
  }

  @HostListener('blur') onMouseEnter() {
    this.addOrRemoveClass();
  }

  @HostListener('focus') onMouseLeave() {
    this.addOrRemoveClass();
  }


  private addOrRemoveClass() {

    let value = this.el.nativeElement.value.trim();

    this.el.nativeElement.value = this.el.nativeElement.value.trim();
 
    const className = 'has-content';
    value.length > 0 ? this.renderer.addClass(this.el.nativeElement, className) : this.renderer.removeClass(this.el.nativeElement, className);
  }
}
