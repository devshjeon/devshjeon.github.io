---
layout: default
title: 블로그 댓글&반응 추가 (giscus)
has_children: false
last_modified_date: 2023-10-19 16:05
nav_order: 6
grand_parent: 개인 프로젝트
parent: 개인 블로그
---
이번에는 블로그에 댓글을 추가해보겠습니다.


댓글 기능을 추가하기 위해 [GitHub Discussions](https://docs.github.com/en/discussions)로 작동하는 댓글 시스템인 [giscus](https://giscus.app/ko) 을 사용했습니다.


# giscus 설정


giscus에서 제공하는 [페이지](https://giscus.app/ko)에서 쉽게 설정할 수 있습니다.


## 저장소


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_14.59.48.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/1.png)


블로그 저장소에 giscus를 추가하려면 다음 조건이 선행되어야 합니다.

1. [**공개**](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public) **저장소여야 합니다.** 그렇지 않으면 방문자들은 Discussion을 볼 수 없습니다.
2. [**giscus**](https://github.com/apps/giscus) **앱이 설치되어 있어야 합니다.** 그렇지 않으면 방문자들은 댓글과 반응을 남길 수 없습니다.
3. **Discussions 기능이** [해당 저장소에서 활성화되어 있어야 합니다](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository).

## 페이지 ↔ Discussions 연결


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.13.01.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/2.png)


Discussion 제목이 페이지 <title>을 포함을 선택해서 댓글 생성 시 title로 discussion을 생성하도록 해주었습니다.


## Discussion 카테고리


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.04.50.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/3.png)


카테고리는 GitHub Discussions에서 구분할 카테고리로 `General`을 선택했습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.16.21.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/4.png)


## 기능


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.05.01.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/5.png)


댓글과 추가로 반응을 남길 수 있도록 `메인 포스트에 반응 남기기` 를 선택했습니다.


## 테마


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.05.25.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/6.png)


## giscus 사용


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.17.30.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/7.png)


위에서 선택한 설정이 스크립트 태그 형태로 만들어지고 이를 마크다운 파일을 html 파일로 만들어 주는 부분에 넣어줍니다.


저의 경우는 [just-the-docs](https://github.com/just-the-docs/just-the-docs)를 사용하고 있어 아래 경로에 있는 default.html 파일에 추가해 주었습니다.


`_layouts/default.html`


```html
---
layout: table_wrappers
---

<!DOCTYPE html>

<html lang="{{ site.lang | default: 'en-US' }}">
{% include head.html %}
<body>
  <a class="skip-to-main" href="#main-content">Skip to main content</a>
  {% include icons/icons.html %}
  {% include components/sidebar.html %}
  <div class="main" id="top">
    {% include components/header.html %}
    <div class="main-content-wrap">
      {% include components/breadcrumbs.html %}
      <div id="main-content" class="main-content">
        <main>
          {% if site.heading_anchors != false %}
            {% include vendor/anchor_headings.html html=content beforeHeading="true" anchorBody="<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><use xlink:href=\"#svg-link\"></use></svg>" anchorClass="anchor-heading" anchorAttrs="aria-labelledby=\"%html_id%\"" %}
          {% else %}
            {{ content }}
          {% endif %}

          {% if page.has_children == true and page.has_toc != false %}
            {% include components/children_nav.html %}
          {% endif %}

          {% if page.has_children == false %}
          <script src="https://giscus.app/client.js"
                  data-repo="devshjeon/devshjeon.github.io"
                  data-repo-id="R_kgDOJ0EQOQ"
                  data-category="General"
                  data-category-id="DIC_kwDOJ0EQOc4CaQfX"
                  data-mapping="title"
                  data-strict="0"
                  data-reactions-enabled="1"
                  data-emit-metadata="0"
                  data-input-position="bottom"
                  data-theme="light"
                  data-lang="ko"
                  crossorigin="anonymous"
                  async>
          </script>
          {% endif %}
        </main>
        {% include components/footer.html %}
      </div>
    </div>
    {% if site.search_enabled != false %}
      {% include components/search_footer.html %}
    {% endif %}
  </div>

  {% if site.mermaid %}
    {% include components/mermaid.html %}
  {% endif %}
</body>
</html>
```


댓글은 자식 글에만 남기고 싶어 `{% if page.has_children == false %}` 조건을 추가했습니다.


# 테스트


테스트를 하면 글에 댓글이 잘 구성된 것을 확인할 수 있고, 댓글 입력 시 GitHub Discussions에 입력한 댓글을 확인할 수 있습니다.


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.14.19.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/8.png)


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.14.36.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/9.png)


![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-10-21_15.14.48.png](https://devshjeon-blog-images.s3.ap-northeast-2.amazonaws.com/_images/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B0%9C%EC%9D%B8%20%EB%B8%94%EB%A1%9C%EA%B7%B8/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EB%8C%93%EA%B8%80%26%EB%B0%98%EC%9D%91%20%EC%B6%94%EA%B0%80%20%28giscus%29/10.png)

