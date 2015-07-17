# Angular Smooth Scrolling Directive

An AngularJS directive that makes scrolling seamless on your page.


## Browser Support
- Chrome, Safari, Opera, FireFox, IE

## Install

Clone the repository and include directly into your project. You can also use bower and install as a dependency:

```
bower install ng-smooth-scroll --save
```

Add the dependency in your Angular's project dependency arguments:

```js
var app = angular.module('MyApp', [
  'ng-smooth-scroll'
]);
```

Make sure you reference the script in your javascript:

```js
<script src="bower_components/ng-smooth-scroll/ng-smooth-scroll.js"></script>
```

** Note: Currently, I am adding `data-ng-smooth-scroll` to my html class, like below. I don't necessarily link this, but will try and come up with a better implementation. **

```html
<html ng-app='example' data-ng-smooth-scroll>
```

## Usage

`ng-smooth-scroll` looks for the target `href` and a class on the link you're looking for, ex. `scroll-to'

Example:

```html
<a href='#one' class='scroll-to'>One</a>
<a href='#two' class='scroll-to'>Two</a>
```
