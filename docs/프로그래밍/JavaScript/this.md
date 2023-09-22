---
layout: default
title: this
has_children: false
last_modified_date: 2023-08-26 15:55
nav_order: 15
grand_parent: 프로그래밍
parent: JavaScript
---
# 선행


---

- [스코프 (Scope)](https://devshjeon.github.io/docs/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%EC%8A%A4%EC%BD%94%ED%94%84%20(Scope))
- [실행 컨텍스트 (Execute Context)](https://devshjeon.github.io/docs/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%20(Execution%20Context))

# 요약


---

- `this`는 함수를 호출하는 방식에 따라 바인딩 되는 객체가 달라진다.
- 일반적으로 함수 호출 시 `this`는 전역 객체를 나타낸다.
- 화살표 함수의 경우 `this`는 상위 실행 컨텍스트의 `this`를 그대로 사용한다.
- 메서드 함수의 경우 `this`는 메서드를 호출하는 객체를 나타낸다.
- 콜백 함수의 경우
- 생성자 함수의 경우

# this 란?


---


실행 컨텍스트가 생성될 때 (일반적으로 함수 호출 시) 바인딩되는 객체로, 함수를 호출하는 방식에 따라 `this`에 바인딩 되는 객체가 달라진다.

- 전역공간
- 함수 호출
- 메서드 호출
- 콜백 호출
- 생성자 함수 호출

## 전역공간


전역 공간에서의 `this`는 전역 객체를 나타낸다. 


런타임 환경에 따라 브라우저에서는 `window` 노드에서는 `global` 객체를 나타낸다.


## 함수 호출 시 


### 선언


선언된 함수 안에서 `this`는  전역 객체를 나타낸다. 


```javascript
function foo() {
  console.dir(this); // Window
}
foo();
```


내부 함수에서도 `this`는 전역 객체를 나타낸다.


```javascript
function foo() {
  console.dir(this); // Window
  function bar() {
	  console.dir(this); // Window
  }
  bar();
}
foo();
```


### 화살표 함수


arrow 함수의 경우 상위 컨텍스트의 `this`를 그대로 사용한다.


```javascript
// example 1
const foo = () => {
	console.dir(this); // Window; 상위 실행 컨텍스트인 전역 실행 컨텍스트의 this 값을 사용
}

foo();

// example 2
const obj1 = {
  foo: function() {
    console.dir(this); // obj1 Object
    const bar = () => {
      console.dir(this); // obj1 Object; 상위 실행 컨텍스트인 foo의 this를 사용
    }
    bar();
  }
}

obj1.foo();
```


### 메소드


메소드 형태로 함수를 호출하면 메소드를 호출한 객체가 `this`로 바인딩된다.


```javascript
const obj1 = {
  foo: function() {
    console.dir(this); // obj1 Object
  }
}

obj1.foo();
```


메소드 안에 내부함수의 경우 `this`는 전역 객체를 나타낸다.


```javascript
const obj1 = {
  foo: function() {
    console.dir(this); // obj1 Object
    function bar() {
      console.dir(this); // Window
    }
    bar();
  }
}

obj1.foo();
```


메소드 내부함수 안에 있는 this가 전역 객체가 되지 않도록 우회하는 방법

- `self`, `that` 과 같은 변수에 상위 `this`를 할당해서 사용

	```javascript
	const obj1 = {
	  foo: function() {
	    console.dir(this); // obj1 Object
	    const that = this;
	    function bar() {
	      console.dir(that); // obj1 Object
	    }
	    bar();
	  }
	}
	
	obj1.foo();
	```

- 내부함수를 arrow function 형태로 사용

	```javascript
	const obj1 = {
	  foo: function() {
	    console.dir(this); // obj1 Object
	    const bar = () => {
	      console.dir(this); // obj1 Object
	    }
	    bar();
	  }
	}
	
	obj1.foo();
	```


## 콜백 함수 호출 시


기본적으로는 함수 내부에서 사용하는것과 동일


```javascript
const callback = function() {
  console.dir(this); // Window
}

var obj = {
  foo: function(cb) {
    console.dir(this); // obj Object
    cb();
  }
}

obj.foo(callback);
```


이런 경우 콜백 함수에서 obj의 `this`를 명시적으로 지정해줄 수 있는 함수가 있다.


### call, apply, bind


3가지 함수는 모두 특정 함수를 실행시키는데 어떤 `this`를  사용할 것인지를 정할 수 있는 함수다.


### call


`func.call(thisArg[, arg1[, arg2[, …]]])`


thisArg 파라미터에 func에서 사용할 this를 넣어 함수를 실행시킨다.


### apply


`func.apply(thisArg, [argsArray])`


thisArg 파라미터에 func에서 사용할 this를 넣어 함수를 실행시킨다.


func의 파라미터는 배열 형태로 넘겨준다.


### bind


`func.bind(thisArg[, arg1[, arg2[, …]]])`


thisArg 파라미터에 func에서 사용할 this를 넣어 함수를 리턴한다.


```javascript
function foo(x, y) {
  console.dir(this, x, y);
}

const obj = {
  name: 'kane'
};

foo.call(obj, 1, 2);
foo.call(obj, [1, 2]);

const bar = foo.bind(obj);
bar(1, 2);

const bar = foo.bind(obj, 1);
bar(2);
```


## 생성자 함수 호출 시


생성자 함수 호출의 경우 `this`는 해당 인스턴스 객체를 나타낸다.


```javascript
function Foo(a, b) {
  this.a = a;
  this.b = b;
}

const foo = Foo('a', 'b'); // new 연산자가 없으면 전역 객체에 추가된다.
console.log(window.a, window.n);


const foo = new Foo('a', 'b');
console.log(foo.a, foo.b);
```


# 참조


---


[http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)

