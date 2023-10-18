---
layout: default
title: 배열 (Array)
has_children: false
last_modified_date: 2023-10-18 12:00
nav_order: 2
grand_parent: 프로그래밍
parent: 자료구조
---
# 키워드


---

- 고정된 길이
- 연속된 메모리 블럭 (chunk)
- Random Access에 강함
- 일반적으로 삽입/삭제에 약함
- cache friendly
- 메모리 낭비 가능성
- 요소가 사라질 때마다 GC 되지 않음

# 개념


---


### C, Java, Go 등… 

- 고정된 길이의 자료구조
- 연속된 메모리 블럭 할당
- Cache 친화적 (by 연속된 메모리 할당)
- 고정된 길이로 메모리가 할당되어 메모리 사용하지 않는 메모리가 낭비됨

### JavaScript

- 동적 길이의 자료구조
- 불연속 메모리 할당 (코드에 따라 자바스크립트 엔진에서 최적화 과정으로 연속 메모리로 할당되는 경우도 존재)
- 객체 구조이기 때문에 선언 시 메모리 할당이 발생하지 않음

	```javascript
	const arr = new Array(1000); // 메모리 할당 x
	```

- 객체 구조 이기 때문에 다양한 타입의 데이터를 저장할 수 있음

	```javascript
	const arr = [];
	const obj = { name: 'kane' };
	const isBool = true;
	
	arr.push(obj);
	arr[1] = isBool;
	```

- 연속된 메모리를 할당하는 `TypedArrays` 도 존재 (no boxing)

# 성능


---


### Big O Notation

- **시간 복잡도**

	접근: O(1)


	삽입

	- 마지막 인덱스: O(1)
	- 나머지 인덱스: O(n)

	변경: O(1)


	삭제

	- 마지막 인덱스: O(1)
	- 나머지 인덱스: O(n)

	탐색: O(n)

- **공간 복잡도**

	배열의 길이: O(n)


### V8 Engine

- **배열의 처리 (struct-like, dictionary mode)**

	struct-like array 또는 hash table (dictionary mode) 형태로 처리


	위 형태를 구분하는 수 많은 요인들이 존재하고, 2가지 방식은 각각 장단점이 존재


	|                                        | **struct-like properties** | **dictionary properties** |
	| -------------------------------------- | -------------------------- | ------------------------- |
	| adding a property to an object         | `--`                       | `+`                       |
	| deleting a property                    | `---`                      | `+`                       |
	| reading/writing a property, first time | `-`                        | `+`                       |
	| reading/writing, cached, monomorphic   | `+++`                      | `+`                       |
	| reading/writing, cached, few shapes    | `++`                       | `+`                       |
	| reading/writing, cached, many shapes   | `--`                       | `+`                       |
	| colloquial name                        | fast                       | slow                      |

undefined
	```javascript
	// bad idea
	const a = new Array(); // dictionary mode로 처리
	a[1000] = 8;
	
	// good idea
	const b = new Array(1000); // struct-like 배열로 처리
	a[0] = 13;
	a[1000] = 21;
	```

- **배열 요소 구분 (packed, holey)**

	배열 요소에 따라 V8 엔진은 요소를 약 20가지 방식으로 구분한다.


	```javascript
	const array = [1, 2, 3];
	// element kind: PACKED_SMI_ELEMENTS
	array.push(4.56);
	// element kind: PACKED_DOUBLE_ELEMENTS
	array.push('x');
	// element kind: PACKED_ELEMENTS
	```


	SMI → DOUBLE → GENERAL 한 방향으로만 전환된다.


	배열 사이에 빈 공간이 있으면 V8 엔진은 유형을 변경한다.


	```javascript
	array.length; // 5
	array[9] = 1;
	// array[5] until array[8] are now holes
	// element kind: HOLEY_ELEMENTS
	
	array[8]; // -> ??? 답변 x
	8 >= 0 && 8 < array.length; // bounds check
	// -> true -> ??? 답변 x
	hasOwnProperty(array, '8');
	// -> false -> ??? 답변 x
	hasOwnProperty(Array.prototype, '8');
	// -> false -> ??? 답변 x
	hasOwnProperty(Object.property, '8');
	// -> false -> undefined -> 답변 o
	```


	PACKED 타입은 위와 같은 조회 작업을 할 필요가 없어 효율적이다. ([성능 차이가 거의 없다 by jmrk](https://stackoverflow.com/questions/54481918/how-does-v8-optimise-the-creation-of-very-large-arrays/54485509#54485509))


# 참조


---


[[Stack Overflow] How are JavaScript arrays represented in physical memory?](https://stackoverflow.com/questions/20321047/how-are-javascript-arrays-represented-in-physical-memory)


[[Youtube] GDC 2012: From Console to Chrome](https://youtu.be/XAqIpGU8ZZk?t=986&si=dYj1Hdf2DpUD67XM)


[[Stack Overflow] Pros and Cons](https://stackoverflow.com/questions/23455678/pros-and-cons-of-dictionary-mode)


[[Youtube] Mathias Bynens - V8 internals for JavaScript developers](https://www.youtube.com/watch?v=m9cTaYI95Zc&ab_channel=CSSConfAustralia)


[[Stack Overflow] How does Bluebird's util.toFastProperties function make an object's properties "fast"?](https://stackoverflow.com/questions/24987896/how-does-bluebirds-util-tofastproperties-function-make-an-objects-properties/72592730#72592730)

