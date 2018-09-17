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
Simply add the ngxDeferRender directive to the element that you want to lazy render and bind it to a method or an expression.

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
