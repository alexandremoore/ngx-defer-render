import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  OnInit
} from '@angular/core';

export const DEFAULT_DEFER_RENDER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

@Directive({
  selector: '[ngxDeferRender]'
})
export class DeferRenderDirective implements OnInit {
  @Input()
  public ngxDeferRenderOptions: IntersectionObserverInit = DEFAULT_DEFER_RENDER_OPTIONS;

  @Output()
  public ngxDeferRender: EventEmitter<any> = new EventEmitter();

  public element: Element;

  private observer: IntersectionObserver;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.ngxDeferRenderOptions = { ...DEFAULT_DEFER_RENDER_OPTIONS, ...this.ngxDeferRenderOptions };
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
      this.ngxDeferRenderOptions
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
