---
layout: default
title: 호이스팅 (Hoisting)
has_children: false
last_modified_date: 2023-08-26 15:55
nav_order: 14
grand_parent: 프로그래밍
parent: JavaScript
---
# 선행


---

- [실행 컨텍스트 (Execute Context)](https://devshjeon.github.io/docs/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%20(Execution%20Context))

# 요약


---

- 호이스팅은 실행 컨텍스트가 생성되는 단계에서 식별자 정보를 environment record에 저장하는 과정이다.
- 호이스팅은 변수, 함수, 모듈에서 발생한다.
- 호이스팅은 선언에만 관련이 있다.

# 호이스팅 (Hoisting)이란?


---


호이스팅이란 실행 컨텍스트가 생성되는 단계에서 현재 컨텍스트의 식별자 정보를 lexical environment의 environment record에 저장하는 과정을 의미한다.


호이스팅은 변수, 함수, 모듈에서 발생하고 이들의 선언에만 관련이 있다.


이때, 변수, 함수를 어떻게 선언하느냐에 따라서 environment record에 저장되는 방식이 달라진다.


### 변수


변수를 선언하는 방식에는 `var`, `let`, `const`가 있다.


`var`로 생성한 변수는 environment record에 저장될 때, 선언과 함께 `undefined`로 초기화를 진행한다.


```javascript
console.log(x); // undefined
var x = 1;
```


아래 예제는 호이스팅이 아닌 `var`의 스코프 영역과 관련이 있다.


```javascript
{
  var x = 1;
}
console.log(x); // 1
```


반면, `let`, `const`로 생성한 변수는 선언된 값을 저장하지만 초기화를 진행하지 않는다. (이때, TDZ 단계로 진입하여 이 단계에서 참조 시 참조 에러가 발생한다)


```javascript
const x = 1;
{
  console.log(x); // ReferenceError
  const x = 2;
}
```


### 함수


함수의 경우 선언식, 표현식으로 나눌 수 있는데, 선언식의 경우 함수 그대로 environment record에 저장된다. 


따라서 함수를 선언하기 이전에 사용할 수 있다.


```javascript
foo(); // bar
function foo() {
  console.log('bar');
}
```


반면, 표현식의 경우 함수가 변수에 할당되기 때문에 함수가 저장되지 않고 변수 호이스팅 과정이 진행된다.


```javascript
foo(); // Uncaught TypeError: foo is not a function
var foo = function () {
  console.log('bar');
}
```


### 모듈


모듈도 호이스팅이 진행된다.


```javascript
const myCanvas = new Canvas("myCanvas", document.body, 480, 320);
myCanvas.create();
import { Canvas } from "./modules/canvas.js";
myCanvas.createReportList();
```


# 참조


---


[https://developer.mozilla.org/en-US/docs/Glossary/Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)


[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#import_declarations_are_hoisted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#import_declarations_are_hoisted)

