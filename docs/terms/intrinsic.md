---
title: intrinsic
description: intrinsic의 의미
keywords: [intrinsic]
---

# Intrinsic
사전적으로 본질적인이라는 뜻이다. 소프트웨어에서는 빌트인된 속성이나 기능, 구현체들을 의미한다.

예시로 타입스크립트 4.1버전 이상에서 문자열과 관련된 intrinsic 기능이 있다.

```ts
type Uppercase<S extends string> = intrinsic;
```