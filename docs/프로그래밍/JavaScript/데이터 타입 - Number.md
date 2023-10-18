---
layout: default
title: 데이터 타입 - Number
has_children: false
last_modified_date: 2023-09-10 17:59
nav_order: 5
grand_parent: 프로그래밍
parent: JavaScript
---
# 선행


---

- [데이터 타입](https://devshjeon.github.io/docs/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/)

# 키워드


---

- IEEE 754 배정밀도 64비트 부동소수점

# 요약


---

- 자바스크립트는 IEEE 754의 부동소수점 표현 방식 중 배정밀도 64비트 부동소수점 형식을 따른다.
- 배정밀도 64비트 부동소수점은 부호(1bit), 지수(11bit), 가수(52bit) 부분으로 구성되어 있고, 가수 부분에서 52개를 넘어가면 반올림을 하는데, 이때 미세한 오차가 발생할 수 있다. (예를들어 0.1 + 0.2)
- 이를 해결하기 위해서는 toFixed, round 같은 함수를 사용하면 된다.

# Number


---


자바스크립트는 IEEE 754의 부동소수점 표현 형식 중 배정밀도 64비트 부동소수점 형식을 따른다. 자바의 경우, 정수와 실수를 구분해서 int, long, flaot, double 등과 같은 타입을 사용하지만 자바스크립트는 모든 수를 실수로 처리한다.


2진수, 8진수, 16진수 리터럴은 메모리에 배정밀도 64비트 부동소수점 형식의 2진수로 저장된다. 자바스크립트는 2진수, 8진수, 16진수 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 10진수로 해석된다.


```javascript
const binary = 0b01000001; // 2진수
const octal = 0o101;       // 8진수
const hex = 0x41;          // 16진수

console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65

// 표기법만 다를 같은 값
console.log(binary === octal); // true
console.log(octal === hex);    // true
```


# IEEE 754란?


IEEE 754는 IEEE(Institute of Electrical and Electronics Engineers) 즉 전기 전자 기술자 협회에서 개발한 것으로 컴퓨터에서 부동소수점을 표현하는 방법을 정의한 것으로 가장 널리 사용되는 표준이다.


IEEE 754 부동소수점을 표현하는 형식의 종류에는 2진법 부동소수점 형식과 10진법 부동소수점 형식이 있다.


| 이름                | 비트수 | 지수 비트 | 가수 비트 | 지수 편향 |
| ----------------- | --- | ----- | ----- | ----- |
| binary16 (반정밀도)   | 16  | 5     | 10    | 15    |
| binary32 (단정밀도)   | 32  | 8     | 23    | 127   |
| binary64 (배정밀도)   | 64  | 11    | 52    | 1023  |
| binary128 (사배정밀도) | 128 | 15    | 112   | 16383 |
| decimal32         | 32  | 7     | 23    | 96    |
| decimal64         | 64  | 9     | 53    | 384   |
| decimal128        | 128 | 13    | 113   | 6144  |


# 배정밀도 64비트 부동소수점


부동소수점 표현은 크게 **부호**, **지수**, **가수** 이렇게 3가지 부분으로 구성된다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-09-21_23.36.02.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85%20-%20Number/1.png)


지금부터 0.1 (10)을 배정밀도 64비트 부동소수점 형식으로 표현해보자.


### 부호부분 (1bit)

- 양수이면 0, 음수이면 1이 된다. 0.1은 양수이므로 부호부분은 0이다.

### 지수부분 (11bit)

- 0.1 (10)을 2진법으로 바꾸면 0.00011001100…(2)로 순환 소수가 나온다.
- 소수점 자리를 1.xxx가 되도록 왼쪽 또는 오른쪽으로 옮긴다. 0.00011001100…(2)의 경우, 오른쪽으로 4칸 이동을 해야하므로 1.1001100…(2) x 2^-4와 같다.
- 지수부분을 구하려면 지수인 -4에다 Bias를 더하고 2진법으로 변환해야 한다.
- Bias란 지수 편향으로, 양수를 2진법으로 표현할 수 있는 반면 음수는 2진법으로 표현할 수 없기 때문에 Bias를 더해서 2진법으로 표현한다.
- 지수부분은 -4 + 1023 = 1019 값을 2진법으로 변환한 1111111011인데 지수 부분인 11bit를 채우기 위해 앞에 0을 붙여 01111111011이 된다.

### 가수부분 (52bit)

- 가수부분은 1.xxx에서 소수점의 오른쪽 부분이다. 소수점 왼쪽 부분은 무조건 1이기 때문에 따로 저장하지 않으며, 이를 hidden bit라 한다. 오른쪽 부분은 계속 순환하므로 52비트에 넣으면 53번째 값을 반올림한다. 51, 52, 53번째 값은 011인데 53번째에서 반올림 했으므로 51, 52번째는 10이 된다. 만약 소수점 오른쪽 부분이 52개보다 작으면 앞에 0으로 채워 넣는다.

![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-09-21_23.52.04.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85%20-%20Number/2.png)


# 소수점 계산을 올바르게 하는 방법


가수부분이 52개를 넘어가게되면 반올림을 하게되어 근사값이 저장되어 계산이 부정확해지기 때문에 이를 방지하기 위해서 다음의 방법을 사용한다.


`numObj.toFixed([digits])`

- toFixed()는 Number 객체에 주어진 digits 만큼의 소수점 이하 자리수를 정확하게 갖는 문자열 표현으로 반환한다.
- 소수점 이하가 길면 숫자를 반올림하고, 짧으면 뒤에 0을 채운다.
- digits는 0 이상 20 이하의 값을 사용할 수 있다.

`Math.round(x)`

- 입력값을 반올림한 값과 가장 가까운 정수를 반환한다.

실수 외에도 3가지 특별한 값들도 있다.

- `Infinity` : 양의 무한대
- -`Infinity` : 음의 무한대
- `NaN` : 산술 연산 불가 (not-a-number)

# 참조


---


[https://floating-point-gui.de/basic/](https://floating-point-gui.de/basic/)


[https://helloworldjavascript.net/pages/130-number.html](https://helloworldjavascript.net/pages/130-number.html)

