---
layout: default
title: 스코프 (Scope)
has_children: false
last_modified_date: 2023-08-24 14:41
nav_order: 6
grand_parent: 프로그래밍
parent: JavaScript
---
# 요약


---

- 스코프란 변수(또는 객체)를 참조할 수 있는 범위 개념
- 전역, 상위, 하위와 같이 계층 구조로 이루어져 있고, 하위 스코프는 상위 스코프에 접근이 가능
- 범위에 따라 전역, 지역(함수, 블록) 스코프로 나뉘고, 시점에 따라 렉시컬, 동적 스코프로 나뉜다.

# 스코프 (scope)란?


---


자바스크립트에서 스코프(scope)란 런타임 동안 코드 영역에서 식별자(변수, 함수 등 객체)에 대한 참조 가능한 범위로, 범위와 시점에 따라 여러 종류가 있다.


상위 스코프, 하위 스코프와 같이 계층 구조로 이루어져 있어 하위 스코프는 상위 스코프에 접근할 수 있지만 반대인 경우에는 접근할 수 없다.


> 보통 스코프(scope)에서 다루는 대상은 변수로, 변수의 참조 가능 여부를 결정한다.


# 스코프 종류


---


### 범위

- 전역 스코프 (global scope)
- 지역 스코프 (local scope)
	- 함수 스코프 (function scope)
	- 블록 스코프 (block scope, ES6 이후부터)

### 시점

- 렉시컬 스코프 (lexical scope, 선언 시점)
- 동적 스코프 (dynamic scope, 실행 시점)

# 전역 스코프 (global scope)


---


함수 외부에 선언된 영역으로 자바스크립트 런타임 동안 단 하나의 전역 스코프가 존재한다.


전역 스코프에 선언된 변수는 모든 지역 스코프에서 참조가 가능하다.


자바스크립트 런타임 환경에 따라 브라우저에서는 `window` 객체가 전역 객체이고, Node.js에서는 `Global` 객체가 전역 객체로 존재한다.


```javascript
var global = 'global';

function foo() {
  var local = 'local';
  console.log(global); // global; 전역 변수 참조 가능
  console.log(local); // local; 지역 변수
}
foo();

console.log(global); // global; 전역 변수
console.log(local); // ReferenceError; 지역 변수 참조 불가능
```


# 함수 스코프 (function scope)


---


함수가 실행될 때 형성되는 영역으로 함수 스코프에 선언된 변수는 전역에서 참조할 수 없다. (반면, 전역에서 생성된 변수는 함수에서 참조가 가능하다)


`var` 키워드로 변수를 선언하면 함수 스코프 내에서 참조가 가능하다.


```javascript
// example 1
function showName() {
  var name1 = "kane";
  console.log (name1); // kane; 지역 변수
}
showName();
console.log (name1); // ReferenceError; 함수 스코프 밖에서는 참조 불가능


// example 2
if (true) {
  var name2 = 'kane';
}
console.log(name2); // kane; 블록 스코프 밖에서 참조 가능
```


# 블록 스코프 (block scope)


---


ECMAScript 6부터 키워드 `let`, `const` 가 도입되면서 모든 코드 블록(함수, if, while, try/catch 등) 내에서 선언되는 변수는 블록 내에서만 참조가 가능하다.


```javascript
// example 1
if (true) {
  let name1 = 'kane1';
  const name2 = 'kane2';
  let name3 = 'kane3';
  const name4 = 'kane4';
  console.log(name1); // kane1;
  console.log(name2); // kane2;
}
console.log(name3); // ReferenceError; 블록 스코프 밖에서는 참조 불가능
console.log(name4); // ReferenceError; 블록 스코프 밖에서는 참조 불가능
```


# 렉시컬 스코프 (lexical scope)


---


함수를 **선언**한 시점에 생성되는 스코프로, 이때 상위 스코프가 결정된다.


아래 예제에서 함수 bar는 전역 스코프에 설정되었으므로 함수 bar의 상위 스코프는 전역 스코프이다.


```javascript
// example 1
var name1 = 'kane';

function foo() {
  var name1 = 'jack';
  bar();
}

function bar() {
  console.log(name1);
}

foo(); // kane
bar(); // kane
```


# 동적 스코프 (dynamic scope)


---


함수가 **호출**되는 시점에 생성되는 스코프로, 이때 상위 스코프가 결정된다.


동적 스코프는 `this` 키워드와 연관성이 높다.


# 참조


---


[https://developer.mozilla.org/ko/docs/Glossary/Scope](https://developer.mozilla.org/ko/docs/Glossary/Scope)


[http://www.devdic.com/javascript/refer/grammar/document:2869/Scope-vs-Context](http://www.devdic.com/javascript/refer/grammar/document:2869/Scope-vs-Context)


[https://www.digitalocean.com/community/tutorials/understanding-scope-in-javascript#global-scope](https://www.digitalocean.com/community/tutorials/understanding-scope-in-javascript#global-scope)

