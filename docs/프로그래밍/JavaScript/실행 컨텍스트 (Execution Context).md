---
layout: default
title: 실행 컨텍스트 (Execution Context)
has_children: false
last_modified_date: 2023-08-26 15:55
nav_order: 3
grand_parent: 프로그래밍
parent: JavaScript
---
# 선행

- [스코프 (Scope)](https://devshjeon.github.io/docs/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/2.%EC%8A%A4%EC%BD%94%ED%94%84%20(Scope)/)

# 요약

- 실행 컨텍스트는 함수가 실행될 때 함수를 구성하는 식별자(변수, 함수 등)가 수집되는 공간
- 자바스크립트 엔진은 LIFO 구조의 호출 스택을 사용하여 실행 컨텍스트를 추적
- 실행 컨텍스트는 초기 정보를 저장하는 `Variable Environment`와 초기 정보 저장 후 코드가 실행됨에 따라 최신값이 반영되는 `Lexical Environment`로 구성
- `Lexical Environment`는 `Environment Record`와 `Outer Environment Reference`로 구성된다.
- `Environment Record`에 컨텍스트의 식별자 정보가 저장되고 이러한 과정을 `호이스팅(Hoisting)`이라 한다.
- `Outer Environment Reference`는 현재 실행 컨텍스트의 부모 실행 컨텍스트를 참조하는 포인터로, 변수가 참조될 수 있는 범위가 결정되는 방식은 현재 실행 컨텍스트부터 최대 전역 실행 컨텍스트까지 가장 가까운 변수를 찾는 방식이다.

# 실행 컨텍스트 (Execution Context)란?


실행 컨텍스트는 자바스크립트가 실행되는 환경으로, 변수 및 함수에 전달된 인수 등 코드가 실행되는데 필요한 정보들이 저장되어 있다.


실행 컨텍스트 종류는 **전역 실행 컨텍스트 (global execution context), 함수 실행 컨텍스트 (functional execution context)**가 있다.


전역 실행 컨텍스트는 스크립트가 처음 실행되기 시작할 때 생성되며, 자바스크립트에서 전역 범위를 나타낸다. 


함수 실행 컨텍스트는 함수가 호출될 때마다 생성되며 함수의 로컬 범위를 나타낸다.


블록 스코프의 경우에는 별개의 실행 컨텍스트를 생성하지 않는다.


# 호출 스택 (Call Stack)


현재 어떤 함수가 동작 중인지, 다음에 어떤 함수가 호출될 예정인지 등을 제어하는 자료구조


자바스크립트 엔진은 모든 컨텍스트를 추적하기 위해 호출 스택을 사용한다.


호출 스택은 LIFO 구조로 최초 전역 실행 컨텍스트가 먼저 호출 스택에 적재되고 함수가 호출될 때마다 호출 스택에 적재하고 함수 실행이 완료되면 해당 컨텍스트를 호출 스택에서 제거한다.


![call_stack_u2vvsi.jpg](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/JavaScript/%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%20%28Execution%20Context%29/1.png)


# 실행 컨텍스트 구성


실행 컨텍스트는 **Lexical Environment**와 **Variable Environment**라는 컴포넌트로 구성되어 있다. 초기 Lexical Environment는 Variable Environment의 복사본으로 이후 자바스크립트 코드에 따라 참조가 변경된다.


# Variable Environment


실행 컨텍스트를 구성하는 환경 정보들을 모아 사전처럼 구성한 객체


식별자 정보를 수집하는 용도로 사용하는 객체로 값의 변화에 대해 반영되지 않는다.


# Lexical Environment


실행 컨텍스트를 구성하는 환경 정보들을 모아 사전처럼 구성한 객체


자바스크립트 코드에서 변수나 함수 등의 식별자를 정의하는 데 사용하는 객체로 코드가 실행되어 값의 변화가 발생하면 변경된 값이 반영되어 식별자의 데이터 추적에 사용된다.


Lexical Environment는 식별자와 참조 혹은 값을 기록하는 `Environment Record`와 `outer`라는 부모 Lexical Environment를 참조하는 포인터로 구성된다. `outer`는 중첩된 자바스크립트 코드에서 **스코프 탐색**을 하기 위해 사용된다.


## Environment Record


컨텍스트의 식별자 정보를 저장하는 객체로 현재 컨텍스트의 식별자 정보를 수집해서 environment record에 저장하는 과정을 호이스팅(Hoisting)이라고 한다.


호이스팅이 진행되면 선언된 정보(함수, var, let, const, 클래스 등)가 environment record에 수집된다. 


## Outer Environment Reference


현재 실행 컨텍스트의 부모(호출 스택의 아래) 실행 컨텍스트를 참조한다.


outer environment reference에 의해 스코프 체인이 생성된다. (스코프는 변수의 유효 범위로, 실행 컨텍스트가 수집한 정보만 접근할 수 있기 때문에 스코프는 실행 컨텍스트에 의해 결정된다)


스코프 체인을 통해서 현재 실행 컨텍스트에서 최대 전역 실행 컨텍스트까지 가장 가까운 실행 컨텍스트의 수집 정보에 접근할 수 있다. (shadowing)


outer environment reference를 통해 최대 전역 실행 컨텍스트의 수집 정보(식별자)에 접근할 수 있다. (내부에서 외부로는 접근이 가능, 외부에서 내부로는 접근이 불가, 변수의 유효 범위(스코프)가 결정)


# 참조


[https://velog.io/@shroad1802/environment-record#object-environment-record](https://velog.io/@shroad1802/environment-record#object-environment-record)


[https://babscraig.com/javascript-execution-context-call-stack-event-loop](https://babscraig.com/javascript-execution-context-call-stack-event-loop)


[https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)


[https://262.ecma-international.org/6.0/#sec-lexical-environments](https://262.ecma-international.org/6.0/#sec-lexical-environments)


[https://diganta.hashnode.dev/10-lexical-environments-execution-context-scope-and-hoisting-in-javascript-ck6id2pdo00dmd9s1siz1jasg](https://diganta.hashnode.dev/10-lexical-environments-execution-context-scope-and-hoisting-in-javascript-ck6id2pdo00dmd9s1siz1jasg)

