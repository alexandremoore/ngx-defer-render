# ngx-defer-render
Angular library to defer the rendering of an element until it enters the viewport using the [IntersectionObserver](https://developer.mozilla.org/en/docs/Web/API/IntersectionObserver).

To support older browsers such as IE11, you need to install a polyfill in order for the [IntersectionObserver](https://developer.mozilla.org/en/docs/Web/API/IntersectionObserver) to work properly.

```
npm install intersection-observer
```

And then import it in your polyfills.ts:
```
import 'intersection-observer'; 
```
