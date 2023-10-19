---
layout: default
title: just-the-docs 한글 검색 개선
has_children: false
last_modified_date: 2023-06-28 18:26
nav_order: 3
grand_parent: 개인 프로젝트
parent: 개인 블로그
---
# P**rerequisite**

- Jekyll Theme 로컬 환경 구축

# 한글 검색 이슈


로컬 환경에서 [just-the-docs](https://github.com/just-the-docs/just-the-docs)를 실행한 후 기능 테스트를 진행하다 한글 검색이 안되는 것을 확인했습니다ㅠ


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_18.37.45.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/1.png)


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_18.37.52.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/2.png)


한글 검색이 안 되는 원인을 찾아보니 [just-the-docs](https://github.com/just-the-docs/just-the-docs)는 전문 검색으로 [lunr.js](https://lunrjs.com/)라이브러리를 사용하고 있는데, 지원하는 언어 중 한글이 존재하지 않았습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_18.47.27.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/3.png)


Jekyll Theme을 바꿔야 하나 고민하면서 Github 이슈 창을 기웃거리는 도중, 저와 동일한 이슈에 대한 해결책을 찾았다는 [댓글](https://github.com/just-the-docs/just-the-docs/discussions/437#discussioncomment-259198)을 발견했습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_18.55.17.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/4.png)


해당 저장소에 들어가서 설정을 확인해 보니 Lunr에서 공식 지원하지 않는 언어에 대해 [Addon](https://github.com/MihaiValentin/lunr-languages)이 존재했습니다.


적용방법은 다음과 같습니다.

1. lunr.ko.min.js, lunr.multi.min.js, lunr.stemmer.support.min,js를 다운받아 lunr.min.js 위치로 이동시킵니다.

	![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_19.08.53.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/5.png)

2. 프로젝트에서 lunr.min.js를 검색해서 import 하는 부분을 찾아 추가한 파일에 대해서 import 합니다.

	![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_19.13.33.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/6.png)

3. `.prettierignore` 도 추가해 주었습니다.

	![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_19.10.31.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/7.png)

4. 검색 처리하는 부분에 `this.use(lunr.multiLanguage('en', 'ko'));` 코드 추가했습니다.

적용 후 한글 검색이 잘 되는 것을 확인할 수 있습니다!!


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-06-28_19.15.44.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/just-the-docs%20%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%20%EA%B0%9C%EC%84%A0/8.png)

