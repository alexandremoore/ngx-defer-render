import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';

@Directive({
  selector: '[ngxDeferRender]'
})
export class DeferRenderDirective {
  @Output()
  public ngxDeferRender: EventEmitter<any> = new EventEmitter();

  public element: Element;

  private observer: IntersectionObserver;

  constructor(private elementRef: ElementRef, private zone: NgZone) {
    this.observer = null;
    this.element = this.elementRef.nativeElement;

    this.registerIntersectionObserver();
    if (this.observer && this.element) {
      this.observer.observe(<Element>this.element);
    }
  }

  private registerIntersectionObserver(): void {
    if (!!this.observer) {
      return;
    }
    this.observer = new IntersectionObserver(
      entries => {
        this.handleIntersectionUpdate(entries);
      },
      { threshold: [0.5] }
    );
  }

  private handleIntersectionUpdate = (
    entries: IntersectionObserverEntry[]
  ): void => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.ngxDeferRender.emit();
      }
    }
  }
}
