---
layout: default
title: 평가 전략 (Evaluation Strategy)
has_children: false
last_modified_date: 2023-09-10 17:58
nav_order: 11
grand_parent: 프로그래밍
parent: JavaScript
---
# 선행


---

- 데이터 타입

# 키워드


---

- pass by value
- pass by sharing

# 요약


---

- 평가 전략은 식을 평가하기 위한 일련의 규칙으로 프로그래밍 언어마다 평가 전략은 조금씩 다르다.
- 평가 전략의 종류는 크게 엄격 평가와 비엄격 평가가 있다.
- 자바스크립트는 엄격 평가 중 pass by value 방식만 사용한다.
- 인자가 참조형 값일 경우 속성과 객체 변경에 대한 차이 때문에 pass by sharing이 등장했다.

# 평가 전략 (Evaluation Strategy)이란?


---


식을 평가하기 위한 일련의 규칙으로 인수가 언제, 어떤 순서로 평가되는지, 그리고 인수가 평가되는 대상, 즉 값이나 참조가 무엇인지 정의하는 규칙이다.


평가 전략에는 크게 엄격 평가(strict evaluation)와 비엄격 평가(non-strict evaluation)이 있고 둘의 차이는 인수의 표현식이 함수에서 사용되기 이전에 평가 되는지, 사용될 때 평가 되는지 여부로 구분된다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-09-19_15.45.05.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%ED%8F%89%EA%B0%80%20%EC%A0%84%EB%9E%B5%20%28Evaluation%20Strategy%29/1.png)


자바스크립트는 엄격 평가를 사용하며 인수를 값으로 전달한다. 따라서, 엄격 평가에 대해서만 내용을 정리했다.


# 엄격 평가 (Strict Evaluation)


함수가 실행되기 전 모든 함수의 인수를 평가하는 전략으로 2가지 종류가 있다.

- pass by value (call by value)
- pass by reference (call by reference)
- pass by sharing (call by sharing)

### pass by value


함수 호출자가 인수로 전달할 값을 **복사**하여 함수에 사용할 수 있도록 전달하는 방식으로, 해당 값은 다른 메모리 주소에 있는 복사본이기 때문에 함수가 인수의 값에 대해 수행한 모든 수정사항은 호출자에게 표시되지 않는다. (영향이 없다)


자바스크립트는 인수가 원시형 값일 경우 pass by value 방식으로 평가한다.


```javascript
const add = (age) => age + 1;

let age = 34;
let newAge = add(age);
console.log(newAge); // 35
console.log(age); // 34
```


### pass by reference


호출자가 평가되는 표현식을 값 대신 참조로 전달하는 방식으로, 복사본이 만들어지지 않고 대신 인수가 전달된 값이 메모리 위치를 가리키는 참조값이다.


### pass by sharing


자바스크립트는 pass by value 방식만 존재하고, 참조를 전달하는 경우, pass by reference 방식을 사용하는 것처럼 보이지만, 경우에 따라 다르게 동작한다.


함수 인자로 참조형 값을 전달하면 메모리 값을 갖는 참조 값에 대한 복사본을 전달하기 때문에 객체 속성을 변경하면 영향을 주지만, 객체를 재할당하는 경우에는 메모리 주소값이 변경되기 때문에 원본에는 영향을 주지 않는다.


이러한 개념이 pass by reference와 혼동을 주기 때문에 pass by sharing이 등장했다.


```javascript
const kane = { age: 34 };
const add1 = (human) => {
  human.age = human.age + 1;
  console.log(human); // 35
}
const add2 = (human) => {
  human = { age: human.age + 1 };
  console.log(human); // 36
}

console.log(kane); // 34
add1(kane);
console.log(kane); // 35
add2(kane);
console.log(kane); // 35
```


`add1`의 경우 객체 속성을 변경하기 때문에 원본 객체인 kane 속성에 영향을 받는 반면, `add2`의 경우 참조에 새로운 객체 주소를 할당하기 떄문에 원본 객체인 kane 객체가 영향을 받지 않는다.


# 참조


---


[https://tomekkolasa.com/evaluation-strategies-in-the-context-of-javascript-comprehensive-guide-with-examples](https://tomekkolasa.com/evaluation-strategies-in-the-context-of-javascript-comprehensive-guide-with-examples)


[https://growy.tistory.com/43](https://growy.tistory.com/43)

