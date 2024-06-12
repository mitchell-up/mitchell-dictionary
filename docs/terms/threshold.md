---
title: threshold
description: threshold의 의미
keywords: [threshold]
---

# Threshold
임계값, 한계점이라는 뜻으로 소프트웨어에서는 어떤 사건이 발생하기 위한 최솟값을 의미한다.

예시로 테스팅 프레임워크의 `jest`의 `jest.config.js`에서 성공해야하는 테스트 커버리지를 설정하는 쪽에서 `threshold` 용어가 사용된다.

```js
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```