---
title: 2024년에 내가 CSS를 작성하는 법
description: 2024년에 CSS를 작성시 고려해야할 사항
---

# 2024년에 내가 CSS를 작성하는 법

:::note
Nextjs의 회사 Vercel의 프로덕트 VP인 leerob님의 블로그 *How I'm writing CSS in 2024*를 번역하였습니다.  
[원본 바로가기](https://leerob.io/blog/css)
:::

2024년의 CSS는 놀랍습니다.
- [nesting]( https://caniuse.com/css-nesting), [:has()](https://caniuse.com/css-has), [container queries](https://caniuse.com/css-container-queries) 등의 크로스 브라우저 지원
- [강력](https://stylexjs.com/)하고 [빠른](https://lightningcss.dev/) 새로운 CSS 도구들
- CSS 로드 성능을 최적화해주는 많은 프레임워크와 컴파일러들
이 글은 CSS 생태계와 제가 현재 사용중인 도구들에 대한 기록와 생각들을 정리한 것입니다.

## 디자인 제약사항

### 사용자 경험
웹사이트를 방문할 때 스타일 시트를 불러오는 최고의 경험은 어떤 모습인가요?
1. 스타일 시트를 최대한 빠르게 불러와야 합니다(작은 파일 크기)
2. 스타일 시트가 변경된게 아니라면 다시 다운로드되지 않아야 합니다(적절한 캐싱 헤더)
3. 페이지 콘텐츠는 레이아웃 이동을 최소화하거나 없도록 해야합니다.
4. 글꼴은 가능한 빠르게 불러와야하고 레이아웃 이동을 최소화 해야합니다.

### 개발자 경험
도구들은 사용자 경험을 더 낫게 만들어야 합니다. 개발자 경험은 물론 중요하지만, 사용자 경험보다 앞설 수 없습니다.

어떻게 우리가 사용하는 스타일링 도구의 개발자 경험이 더 나은 사용자 경험을 만들 수 있게 할까요?
1. 사용되지 않는 스타일을 제거하고, CSS를 더 작은 크기로 축소하고 압축하세요.
2. 안전하고 변경불가한 캐싱을 위해 해시 파일 이름을 생성하세요.
3. 더 적은 네트워크 요청을 위해 CSS 파일들을 번들링하세요.
4. 스타일 깨짐을 피하기 위해 네이밍 충돌을 방지하세요.

우리가 유지보수가 쉽고, 즐겁게 CSS를 작성하도록 돕는건 어떻게 할까요?
1. UI 코드를 삭제할 때, 연관된 스타일을 삭제하기 쉬워야 합니다.
2. 디자인 시스템 또는 테마를 쉽게 따를 수 있어야 합니다.
3. 타입스크립트 지원, 자동완성, 린트의 편집기 피드백이 있어야 합니다.
4. 에러를(타입 체킹, 린팅) 방지하기 위해서 편집기 안에서 도구의 피드백을 받아아 합니다.

## 2024년의 CSS
어떤 추가적인 도구 없이도 훌륭한 스타일을 더 쉽게 작성할 수 있습니다.

아래의 예시는 어떤 빌드 과정 없이 크로스 브라우저가 지원되는 많은 최신의 CSS 기능을 사용합니다. 아마 Sass나 Less가 더 이상 필요 없을 수 있습니다!

[Open Sandbox](https://codesandbox.io/p/sandbox/async-http-jyftfw?file=%2Fstyles.css&utm_medium=sandpack)

```css
:root {
  --main-bg-color: #f3f4f6;
  --title-color: #262626;
  --text-color: #525252;
  --font-family: "Arial", sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--main-bg-color);
  font-family: var(--font-family);
}

.blog-header,
.blog-footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--title-color);
  color: white;
}

.blog-post {
  container-type: inline-size;
  margin: 1rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  & .post-title {
    color: var(--title-color);
    margin: 0 0 1rem 0;
    text-wrap: balance;
    font-size: 1em;
  }

  & .post-content {
    color: var(--text-color);
  }
}

@container (min-inline-size: 500px) {
  .blog-post {
    padding: 1.5rem;

    & .post-title {
      font-size: 1.25em;
    }
  }
}
```

이런 것들이 더 이상 도구들이 필요하지 않다는 것을 의미할까요? 어떤 분들에겐 그렇습니다.

### 빌드 과정
[위의 디자인 제약사항](#디자인-제약사항)을 충족하기 위해서, 빌드 과정이 필요할 것입니다.

모든 사용자가 최신 버전의 브라우저를 사용하지는 않습니다. 더 중요한건, 당신이 사용하고 싶지만 아직 크로스 브라우징을 지원하지 않는 새로운 구문이 항상 존재한다는 것입니다.

브라우저 지원을 확인하기 위해 [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) 규칙을 일일히 작성할 수 있습니다만, 모든 문제를 해결해주지는 않습니다. CSS 최적화를 사람에게 떠넘기기 보다는, [기계가 다루게 하는건 어떤가요?](https://csswizardry.com/2023/10/the-three-c-concatenate-compress-cache/)

### 컴파일
컴파일러는 다음의 과정을 쉽게 만들어줍니다.
1. 자동으로 사용하지 않은 스타일을 제거하고, 적은 네트워크 요청을 위햇 파일을 하나로 합치며, 벤더 프리픽스를 붙여주고, 여백과 주석을 제거하여 결과물을 더 작게 만듭니다.
2. 자동으로 고유한 파일 이름을 생성하여 프레임워크가 콘텐츠가 절대 변하지 않는다고 브라우저에게 표시하는 `immutable`과 같은 캐싱 헤더를 붙이도록 해줍니다.
3. 목표 브라우저([browerlist](https://browsersl.ist/))를 명시하고, 현대 CSS 기능이 그 브라우저에서도 작동하도록 컴파일하는 [syntax lowering](https://lightningcss.dev/transpilation.html)을 해줍니다.

### 스트리밍 CSS

## 추천사항

### CSS Modules

### Tailwind CSS

### StyleX

## 결론