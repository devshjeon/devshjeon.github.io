---
layout: default
title: Jekyll 블로그 Github Action 연결
has_children: false
published_date: 2023-06-27
last_modified_date: 2023-10-23
nav_order: 6
grand_parent: 개인 프로젝트
parent: 개인 블로그
permalink: 개인-프로젝트/개인-프로젝트/Jekyll-블로그-Github-Action-연결
---
Github Action을 통해 로컬 환경에서 구축한 블로그를 배포해보겠습니다.


배포 전 GitHub 토큰을 발급 받아야 합니다.


## GitHub Token 발급


Github 페이지에서 우측 상단 아바타 → Settings → 좌측 메뉴 Developer settings → Personal access tokens에서 아래 권한을 갖는 토큰을 생성합니다.

- repo
- workflow
- admin:repo_hook

생성한 토큰은 안전하게 보관합니다.


다음으로, 배포하고자 하는 repository → Settings → 좌측 메뉴 중 Secrets and variables → Actions에서 이전에 생성한 Notion 데이터베이스 아이디와 Notion API 키, AWS 키와 GitHub Token을 등록합니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-07-03_20.44.42.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Jekyll%20%EB%B8%94%EB%A1%9C%EA%B7%B8%20Github%20Action%20%EC%97%B0%EA%B2%B0/1.png)


## Github Action 프로세스


배포 프로세스는 2단계로 분리하였습니다.

1. Notion 포스트를 Markdown 파일로 생성하는 스크립트 실행 및 생성된 파일 commit & push
2. Jekyll 빌드 및 Deploy

### 1단계 스크립트


1단계 스크립트는 다음 프로세스로 실행됩니다.

1. [RUN_WORKFLOW_DISPATCH] 이벤트를 받아 실행
2. 파일 생성 스크립트 (notion-import.js) 실행 환경 구성
3. 스크립트 실행
4. 생성된 파일 commit & push
5. [RUN_WORKFLOW_DISPATCH_NEXT] 이벤트 발생

`.github/workflows/notion-sync.yml`


{% raw %}
```
yaml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

# Sample workflow for building and deploying a Jekyll site to GitHub Pages
name: Notion sync

on:
  repository_dispatch:
    types: [ RUN_WORKFLOW_DISPATCH ]

  # Allows you to run this workflow manually from the Actions tab
#  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: write
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "devshjeon-notion-sync"
  cancel-in-progress: true

jobs:
  importer:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Create file
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: node _scripts/notion-import.js
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          DATABASE_ID: ${{ secrets.DATABASE_ID }}
          AWS_ACCESS_KEY: ${{ secrets.AWS_ACCESS_KEY }}
          AWS_SECRET_KEY: ${{ secrets.AWS_SECRET_KEY }}

      - name: Commit and push changes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: Update Importer posts
          branch: local
          commit_user_name: importer-bot 🤖
          commit_user_email: devshjeon@gmail.com
          commit_author: importer-bot 🤖 <devshjeon@github.com>

      - run: gh api /repos/devshjeon/devshjeon/dispatches -f event_type='RUN_WORKFLOW_DISPATCH_NEXT'
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}

```
{% endraw %}


### 2단계 스크립트


2단계 스크립트는 다음 프로세스로 실행됩니다.

1. [RUN_WORKFLOW_DISPATCH_NEXT] 이벤트를 받아 실행
2. Jekyll 빌드
3. GitHub Pages Deploy

`.github/workflows/deploy.yml`


{% raw %}
```
yaml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

# Sample workflow for building and deploying a Jekyll site to GitHub Pages
name: Deploy Jekyll site to Pages

on:
  repository_dispatch:
    types: [ RUN_WORKFLOW_DISPATCH_NEXT ]

  # Allows you to run this workflow manually from the Actions tab
#  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "devshjeon-deploy"
  cancel-in-progress: true

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.2"
          bundler-cache: true # runs 'bundle install' and caches installed gems automatically
          cache-version: 0 # Increment this number if you need to re-download cached gems

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v3

      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${ { steps.pages.outputs.base_path } }"
        env:
          JEKYLL_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2

```
{% endraw %}


## GitHub Action 실행 버튼 생성


Notion에서 글을 작성하고 GitHub Action을 실행 하기 위해, [링크](https://www.notion-tools.com/embeds/html)에서 HTML 코드를 작성하여 버튼을 만들 수 있습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_16.07.33.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Jekyll%20%EB%B8%94%EB%A1%9C%EA%B7%B8%20Github%20Action%20%EC%97%B0%EA%B2%B0/2.png)


{% raw %}
```
html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    .trigger-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .trigger-button {
      display: inline-block;
      margin-bottom: 10px;
      padding: 10px 20px;
      background-color: #4c9aff;
      color: white;
      font-size: 16px;
      border: none;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
    }

    .trigger-button:hover {
      background-color: #2e86ff;
    }

    .message {
      font-size: 16px;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="trigger-container">
    <button id="triggerButton" class="trigger-button">갱신</button>
    <div id="message" class="message"></div>
  </div>

  <script>
    document.getElementById("triggerButton").addEventListener("click", function() {
      var messageElement = document.getElementById("message");
      messageElement.textContent = "요청 전송 중...";

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.github.com/repos/**USERNAME/REPO_NAME**/dispatches", true);
      xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
      xhr.setRequestHeader("Authorization", "Bearer **GITHUB_ACCESS_TOKEN**");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 204) {
          messageElement.textContent = "요청이 성공적으로 전송되었습니다.";
        }
      };
      xhr.send(JSON.stringify({"event_type": "RUN_WORKFLOW_DISPATCH"}));
    });
  </script>
</body>
</html>

```
{% endraw %}


생성된 링크를 임베드 기능을 이용하면 버튼이 생성되고 버튼을 클릭 시, GitHub Action에서 workflow가 실행되는 모습을 확인할 수 있습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_16.09.22.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/Jekyll%20%EB%B8%94%EB%A1%9C%EA%B7%B8%20Github%20Action%20%EC%97%B0%EA%B2%B0/3.png)


## Reference


[https://lourcode.kr/posts/Jekyll-기반-Github-Pages와-Notion-Page-연동/](https://lourcode.kr/posts/Jekyll-%EA%B8%B0%EB%B0%98-Github-Pages%EC%99%80-Notion-Page-%EC%97%B0%EB%8F%99/)

