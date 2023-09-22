---
layout: default
title: 데이터 타입 - String
has_children: false
last_modified_date: 2023-09-10 17:59
nav_order: 6
grand_parent: 프로그래밍
parent: JavaScript
---
# 선행


---

- 데이터 타입

# 키워드


---

- immutable
- utf-16

# 요약


---

- 문자열은 변경 불가능한 값이다.
- 자바스크립트는 문자열을 UTF-16 코드 단위 수로 나타내기 때문에 문자 1개가 2바이트 또는 4바이트로 구성될 수 있다.
- 특히 이모지의 경우 UTF-16 코드 단위가 2개로 구성되기 때문에 직접 `index`에 접근하면 적절한 유니코드로 변환되지 못하고 `iterator`를 사용하는 함수로 처리해야 한다.

# String


---


문자열 String 타입은 텍스트 데이터를 나타내며, UTF-16 코드 단위 수를 나타내는 16비트 부호 없는 정수 값의 나열로 인코딩된다. 또한 문자열은 작은 따옴표(’) 또는 큰 따옴표(”) 안에 텍스트를 넣어 생성한다. 일반적으로 작은 따옴표를 사용한다.


자바스크립트의 문자열은 원시 타입으로 변경 불가능(immutable)하다. 이것은 한 번 문자열이 생성되면, 그 문자열을 변경할 수 없다는 뜻이다.


```javascript
let name = 'kane';
name = 'jane';
```


첫번째 구문이 실행되면 메모리에 ‘kane’ 문자열이 생성되고 식별자 `name`은 메모리에 생성된 문자열 ‘kane’의 메모리 주소를 가리킨다. 그리고 두번째 구문이 실행되면 이전에 생성된 ‘kane’을 수정하지 않고 새로운 문자열 ‘jane’을 메모리에 생성하고 식별자 `name`은 이것은 가리킨다. 이때, ‘kane’과 ‘jane’ 모두 메모리에 존재한다.


문자열은 유사배열로 인덱스를 통해 일부 문자에 접근할 수 있지만, 변경 불가능하기 때문에 수정이 불가능하다. (수정 시 오류가 발생하지 않고 무시된다)


```javascript
let name = 'kane';
name[0] = 'K';
console.log(name); // 'kane'
```


# 이모지 처리 문제점


유니코드 6.0부터 이모지가 유니코드에 추가되었다. 이모지는 16비트 코드 유닛 2개로 표현되어 이모지를 표현하는데 2개의 유니코드를 사용하는데 이를 해결하기 위해 `코드 포인트 이스케이프 스퀀스`를 사용할 수 있다.


```javascript
console.log("\uD83D\uDE0A"); // 😊
console.log("\u{1F60A}"); // 😊
```


자바스크립트에서는 숫자를 전달받아 유니코드 문자열로 변경해주는 함수가 존재한다.

- String.fromCodePoint()

	코드 포인트를 숫자로 전달받아 해당하는 유니코드 문자열로 변경해준다.


	```javascript
	console.log(String.fromCodePoint(0x1f60a)); // 😊
	console.log(String.fromCodePoint(128522)); // 😊
	```

- String.prototype.codePointAt()

	문자열의 n 번째 인덱스에 있는 문자의 코드 포인트를 얻는다.


	```javascript
	"😊".codePointAt(0); // 128522
	"😊".codePointAt(0).toString(16); // '1f60a'
	```


### 이모지 반복


UTF-16 인코딩은 2바이트(16비트) 또는 유닛 1개 또는 2개로 구성한다. 따라서, 문자 1개가 2바이트 또는 4바이트로 둘 다 구성될 수 있다는 의미다.


문자 1개가 4바이트 (유닛 코드 2개)로 구성되는 경우 인덱스로 문자열을 접근 시 문제가 발생한다.


```javascript
const emoji = "😊";

for (let i = 0; i < emoji.length; i++) {
  console.log(emoji[i]);
}
// �
// �
```


각각의 코드 유닛은 유니코드에 매칭되는 글자가 없기 때문에 깨진 문자로 표현된다.


이럴 때 `for-of` 를 사용해서 적절하게 처리할 수 있다.


```javascript
const emoji = "😊";

for (const c of emoji) {
  console.log(c); // 😊
}
```


### 이모지 쪼개기


문자열을 나누기 위해 `split` 함수를 사용하면 유닛 코드 단위로 잘려 문자가 깨진다. 이를 해결하기 위해 `Array.from` 또는 `spread` 표현식을 사용하면 된다.


```javascript
const emoji = "😊";

console.log(emoji.split("")); //  ['\uD83D', '\uDE0A']
console.log(Array.from(emoji)); //  ['😊']
console.log([...emoji]); //  ['😊']
```


# 참조


---


[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String)


[https://helloworldjavascript.net/pages/140-string.html](https://helloworldjavascript.net/pages/140-string.html)


[https://jake-seo-dev.tistory.com/422](https://jake-seo-dev.tistory.com/422)

