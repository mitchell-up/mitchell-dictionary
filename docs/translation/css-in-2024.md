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
항공권을 예약하기 위해 구글에 방문한다고 해보겠습니다. 당신의 의도를 미리 알 수 없기 때문에, 첫 UI로 검색창을 마주합니다. '샌프란시스코에서 뉴욕으로 가는 항공권'을 검색하면, 서버는 날짜를 선택하기 위한 항공권 위젯을 스트림합니다.

구글이 미리 가능한 모든 위젯을 포함할 수 있는 방법은 없습니다. 당신이 입력한 화폐 변환, 타이머, 실시간 스포츠 점수 등. 그런 위젯을 위한 UI와 스타일은 동적으로 스트리밍 될 필요가 있습니다.

React(그리고 Next.js)는 현재 그런 패턴을 [streaming SSR](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)과 [CSS](https://github.com/reactwg/react-18/discussions/108)로 지원합니다. React 모델에서는, UI를 스타일에 의존성이 있는 컴포넌트로 정의합니다. 어떻게 페이지에 영향 없이 위젯을 위한 스타일을 안전하게 스트링할 수 있을까요?

스타일을은 범위로 구분되거나 원자적이여야 합니다. 그렇게 하면 DOM 콘텐츠 보다 먼저 로드되어도, 이미 페이지에 있는 요소의 스타일을 바꾸지 않습니다.

예를 들어, [CSS Modules](https://leerob.io/blog/css#css-modules)은 그 스타일을 불러온 컴포넌트 범위로 지정되는 스타일링 규칙이 있습니다. [Tailwind](https://leerob.io/blog/css#tailwind-css)는 원자적 유틸리티 클래스를 사용합니다. 그 유틸리티 클래스는 어떤 클래스가 사용되기 전에 로드된 단일 스타일시트로 컴파일 됩니다. [StyleX](https://leerob.io/blog/css#stylex) 또한 원자적 유틸리티 클래스를 생성합니다. 글로벌 스타일은 스트림의 첫 부분에서 로드되지 않는다면 잘 작동하지 않습니다.

## 추천사항

### CSS Modules
CSS Modules는 vanilla CSS 위에 작지만 영향력 있는 개선입니다.

그것은 바람직한 사용자 경험 제약사항과 대부분의(전부는 아니지만) 개발자 경험의 제약사항을 충족합니다. 또한 [거의 대부분의 현대 번들러와 프레임워크에](https://github.com/css-modules/css-modules/blob/master/docs/get-started.md)서도 사용가능합니다. 이미 존재하는 CSS 선택자들을 복사 붙여넣기만 하면 어떤 변화 없이도 CSS Moudule 안에서 작동할 것입니다.

원자적 스타일을 생성할 수는 없습니다. 많은 테마(단지 CSS variables만)를 사용하는 걸 지원하지 않습니다. 그리고 스타일링 코드가 타입스크립트 파일 밖에 있기 때문에, 타입 안정성과 자동완성 기능을 누릴 수 없습니다. 하지만 그런 제한들은 괜찮을 지도 모릅니다.

:::info
CSS Modules가 지원하는 [Lightning CSS](https://lightningcss.dev/)는 Vite가 사용하고, 곧 Tailwind와 Next.js도 그럴 것입니다. `postcss`와 `autoprefixer` 같은 도구들은 [all-in-one Rust toolchains](https://leerob.io/blog/rust)로 빠르게 대체될 것입니다.
:::

### Tailwind CSS
Tailwind는 단지 사용되는 클래스들을 생성하기 위해 컴파일러를 사용합니다. 그래서 유틸리티 CSS 프레임워크는 많은 가능한 클래스 이름들을 포함하면서도, 사용된 클래스들만(예로 "font-bold text-2x1") 컴파일된 단일 CSS 파일안에 포함될 것입니다.

Tailwind로만 작성한다고 했을 때, 번들은 사용되는 Tailwind 클래스들의 총합보다 절대로 커지지 않습니다. 모든 클래스를 사용할 가능성은 극도로 낮고요. 그 말은 즉 최선의 성능을 위해 생성된 후 축소되고, 압축되며, 캐시되는 CSS file 크기에 고정된 상한선이 있다는 뜻입니다.

Tailwind로만 스타일을 작성해야하는 것은 아닙니다. Tailwind 클래스들은 단지 디자인 시스템을 준수하는 평범한 CSS를 위한 유틸리티일 뿐입니다. 예를 들어 Tailwind와 CSS Modules를 섞어 사용할 수 있습니다.

Tailwind로 트레이드오프가 있습니다. 함께 사용되는 도구들이 한 묶음 있습니다.
- 자동완성, 린팅, 구문 하이라이팅 등을 위한 [VSCode 통합](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code)
- 클래스 자동정렬을 위한 [Prettier 통합](https://tailwindcss.com/docs/editor-setup#automatic-class-sorting-with-prettier)

Tailwind에 대한 대부분의 논란이 있는 부분은 구문입니다. 사랑받기도 하고 싫어하기도 합니다. Tailwind를 사용해서 무언가 만들기까지는 그 차지를 몰랐지만, 당신의 첫 반응이 부정적이라면 한번 시도해보는 것을 추천합니다.
  
[Open Sandbox](https://codesandbox.io/p/sandbox/modern-sea-z7gkmc?file=%2Findex.html&utm_medium=sandpack)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minimal Blog</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 font-sans">
    <header class="text-center text-3xl font-bold py-8 bg-neutral-800 text-white">
      <h1>Minimal Blog</h1>
    </header>
    <main class="w-full px-4">
      <article class="my-4 p-4 bg-white shadow-md">
        <h2 class="text-neutral-800 mb-4 font-bold">The Art of CSS</h2>
        <p class="text-neutral-600 leading-5">
          Discovering the latest features in CSS can transform the way we design
          and interact with web content.
        </p>
      </article>
      <article class="my-4 p-4 bg-white shadow-md">
        <h2 class="text-neutral-800 mb-4 font-bold">Exploring Web Design</h2>
        <p class="text-neutral-600 leading-5">
          A journey through the evolution of web design, from static pages to
          dynamic, responsive experiences.
        </p>
      </article>
    </main>
    <footer class="text-center py-8 bg-neutral-800 text-white">
      <p>&copy; 2023 Minimal Blog</p>
    </footer>
  </body>
</html>
```

### StyleX
대부분의 CSS in JS 라이브러리에는 두가지 문제가 있습니다.
1. 성능: 컴포넌트가 렌더링 시에 JS로 작성된 스타일은 CSS로 변환하고 문서에 삽입되도록 해야합니다. 그러한 것은 [분명한](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) 비용이 있어 [라이브러리들](https://panda-css.com/docs/overview/why-panda)이 StyleX와 같은 "zero runtime"으로 이동하고 있는 이유가 됩니다.
2. 호환성: 많은 CSS in JS 라이브러리들은 Reactd의 스트리밍 서버렌더링을 지원을 추가했습니다. 하지만 애플리케이션을 [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)로 이동하는 부분같은 다른 성능 최적화는 아직 호환되지 않습니다.

이러한 문제를 해결하기 위해서, [Vanilla Extract](https://vanilla-extract.style/), [Panda](https://panda-css.com/) 등 "zero runtime" CSS in JS 라이브러리들이 탄생하고 있습니다.

StyleX는 [그러한 문제들](https://stylexjs.com/docs/learn/thinking-in-stylex/)을 해결하는 가장 최신의 CSS in JS 라이브러리입니다. 더 자세히 알고 싶으시다면 ["Thinking in StyleX"](https://stylexjs.com/docs/learn/thinking-in-stylex/)를 읽어보는 것을 추천합니다.

[이 예제](https://codesandbox.io/p/devbox/cocky-tu-x7twwd?file=%2FApp.tsx)는 저의 첫 StyleX 사용을 다룹니다. 아직 새로운 오픈소스(그리고 생태계가 이를 반영)이지만, 새로운 라이브러리는 아닙니다. Facebook, Instagram, Whatsapp 그리고 Threads 같은 모든 메타 사이트에서 사용됩니다.

여전히 네이밍 해야합니다. `buttonWrapperContainer`를 입력해서 말이죠. 🫠

## 결론
이제 CSS가.. 저한테 재밌는게 되었냐고요? 그런거 같네요. 몇 년 동안 어떤 변화가 있을지 기대 됩니다.