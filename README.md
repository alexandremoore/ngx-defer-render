# ngx-defer-render
Angular library to defer the rendering of an element until it enters the viewport using the [IntersectionObserver](https://developer.mozilla.org/en/docs/Web/API/IntersectionObserver).

[![Build Status](https://img.shields.io/travis/alexandremoore/ngx-defer-render.svg)](https://travis-ci.org/alexandremoore/ngx-defer-render)
[![GitHub issues](https://img.shields.io/github/issues/alexandremoore/ngx-defer-render.svg)](https://github.com/alexandremoore/ngx-defer-render/issues)
[![GitHub license](https://img.shields.io/github/license/alexandremoore/ngx-defer-render.svg)](https://github.com/alexandremoore/ngx-defer-render/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/alexandremoore/ngx-defer-render.svg)](https://www.npmjs.com/package/ngx-defer-render)

## Installation
```
npm install ngx-defer-render
```

## Usage
1- Import DeferRenderModule in your AppModule
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your DeferRenderModule
import { DeferRenderModule } from 'ngx-defer-render';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify DeferRenderModule as an import
    DeferRenderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

2- Add the ngxDeferRender directive to the element(s) that you want to lazy render and bind it to a method or an expression.
Here's an example inside a ngFor loop:

```
<div class="user-list">
  <div *ngFor="let user of users">
    <div class="user" (ngxDeferRender)="user.show = true">
      <ng-container *ngIf="user.show">
        <ngx-avatar name="{{user.name.first}} {{user.name.last}}" size="80" [round]="true"  [src]="user.picture.large"></ngx-avatar>
        <span class="user-name">{{user.name.first}} {{user.name.last}}</span>
      </ng-container>
    </div>
  </div>
</div>
```

## Options
You can pass an object of type [IntersectionObserverInit](https://www.w3.org/TR/intersection-observer/#intersection-observer-init) to ngxDeferRenderOptions. These options will then be passed into the [IntersectionObserver](https://developer.mozilla.org/en/docs/Web/API/IntersectionObserver) constructor.

Here's the [IntersectionObserverInit](https://www.w3.org/TR/intersection-observer/#intersection-observer-init) object definition:

### root
The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.

### rootMargin
Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.

### threshold
Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.

## Demo
Check out the [live demo](https://ngx-defer-render-demo.stackblitz.io) or [edit it on StackBlitz](https://stackblitz.com/edit/ngx-defer-render-demo). 

You can also clone the repo and run the following npm commands to run it locally:
```
npm install
npm run build:lib:prod
npm start
```

## Browsers compatibility
To support older browsers such as IE11, you need to install a polyfill in order for the [IntersectionObserver](https://developer.mozilla.org/en/docs/Web/API/IntersectionObserver) to work properly.

```
npm install intersection-observer
```

And then import it in your polyfills.ts:
```
import 'intersection-observer'; 
```
