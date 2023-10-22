---
layout: default
title: Notion 코드 블럭 이슈 개선
has_children: false
published_date: 2023-10-23
last_modified_date: 2023-10-23
nav_order: 9
grand_parent: 개인 프로젝트
parent: 개인 블로그
permalink: 개인-프로젝트/개인-프로젝트/Notion-코드-블럭-이슈-개선
---
## P**rerequisite**

- Jekyll Theme 로컬 환경 구축

## Notion 코드 블럭 이슈


블로그 배포 후 Notion 코드 블럭 중 아래와 같이 특정 문자가 있으면 다르게 동작하는 것을 확인했습니다.


`배포 전 (Notion 원본)`


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-23_01.21.43.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Notion%20%EC%BD%94%EB%93%9C%20%EB%B8%94%EB%9F%AD%20%EC%9D%B4%EC%8A%88%20%EA%B0%9C%EC%84%A0/1.png)


`배포 후 (블로그)` 


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-23_01.21.32.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Notion%20%EC%BD%94%EB%93%9C%20%EB%B8%94%EB%9F%AD%20%EC%9D%B4%EC%8A%88%20%EA%B0%9C%EC%84%A0/2.png)


Notion 원본글에 있는 특정 문자가 배포 후에는 해당 정보가 사라져있었습니다.


확인해보니 Jekyll 빌드 시 코드로 동작하는 scope라는 것을 확인하고, [just-the-docs 예제](https://just-the-docs.com/docs/customization/#custom-search-placeholder)에서 해당 문자를 사용하는 방법을  [저장소](https://github.com/just-the-docs/just-the-docs/blob/fad37122aed1864f6c7cd55c25dbccd90035033c/docs/customization.md?plain=1#L243)에서 확인했습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-23_01.34.19.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Notion%20%EC%BD%94%EB%93%9C%20%EB%B8%94%EB%9F%AD%20%EC%9D%B4%EC%8A%88%20%EA%B0%9C%EC%84%A0/3.png)


위의 방법대로 코드 블럭 전, 후로 raw, endraw를 붙여주어야 정상 작동한다는 것을 확인하고, Notion API 호출 후 가져오는 내용에 코드 블럭 escape function을 추가했습니다.


`_scripts/notion-import.js`


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-23_01.37.35.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Notion%20%EC%BD%94%EB%93%9C%20%EB%B8%94%EB%9F%AD%20%EC%9D%B4%EC%8A%88%20%EA%B0%9C%EC%84%A0/4.png)


해당 스크립트 실행 후 코드 블럭 전, 후로 escape 코드가 추가된 것을 확인하였고 배포 후에도 정상적으로 보여지는 것을 확인했습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-23_01.31.16.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Notion%20%EC%BD%94%EB%93%9C%20%EB%B8%94%EB%9F%AD%20%EC%9D%B4%EC%8A%88%20%EA%B0%9C%EC%84%A0/5.png)

