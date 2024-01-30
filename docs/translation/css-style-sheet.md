---
title: CSSStyleSheet
description: CSSStyleSheet 한글 번역
keywords: [css, style, sheet, mdn, translation]
---

# CSSStyleSheet
:::info
mdn 문서의 'CSSStyleSheet'를 번역하였습니다.<br/>
[원본 바로가기](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)
:::


`CSSStyleSheet` 인터페이스는 딘일 CSS 스타일시트를 나타냅니다, 그리고 그 스타일시트 안에 포함된 규칙들을 검사하고 수정할 수 있게 해줍니다. 이것은 [StyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet)라는 부모로부터 속성들과 메소드들을 상속합니다.

스타일시트는 그 안에 있는 각각의 규칙을 나타내는 객체인 [`CSSRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSRule)의 집합으로 구성되어 있습니다. 그 규칙들은 스타일시트의 [`cssRules`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/cssRules) 속성으로부터 얻을 수 있는 [`CSSRuleList`](https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList) 안에 들어있습니다.

예를 들어, 하나의 규칙은 다음과 같은 스타일을 포함하는 [`CSSStyleRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule) 객체가 될 것입니다.
```css
h1,
h2 {
  font-size: 16pt;
}
```

또 다른 규칙은 [`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) 또는 [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) 등과 같은 at-규칙이 될 것입니다.

`CSSStyleSheet` 객체를 얻을 수 있는 다양한 방법을 알아보려면 스타일시트 가져오기 섹션을 살펴보세요. `CSSStyleSheet` 객체를 직접 생성할 수 있습니다. 생성자, `CSSStyleSheet.replace()`, 그리고 `CSSStyle.replaceSync()` 메소드들은 새롭게 추가된 명세들로 생성가능한 스타일시트를 가능하게 합니다.

## Obtaining a StyleSheet
스타일시트는 그것이 적용된 하나의 다큐먼트에 가장 연관이 되어있습니다. 주어진 다큐먼트의 `CSSStyleSheet` 객체 리스트는 `Document.styleSheets`로 가져올 수 있습니다. 특정 스타일시트는 존재한다면, 그것을 포함한 객체(`Node` 또는 `CSSImportRule`)로부터 또한 접근할 수 있습니다.

`CSSStyleSheet` 객체는 스타일시트가 다큐먼트에 로드되는 시점에 다큐먼트의 `Document.styleSheets` 리스트에 브라우저에 의해서 자동으로 생성되고 삽입됩니다.