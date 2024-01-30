---
title: Optional Dependencies
description: Optional Dependency에 대한 정의
keywords: [depenency, optional dependency, npm, package]
---

# Optional Dependencies
패키지를을 사용할 수 있지만, 그 패키지를 찾지 못하거나 설치하는데 실패해도 npm이 게속 진행하길 원한다면, 그 패키지를 `optionalDependencies` 넣을 수 있습니다. `optionalDependencies`는 `dependencies` 같이 패키지 이름과 버전 또는 url의 맵 자료형입니다. 그 둘의 차이는 빌드의 실패가 설치의 실패를 만들지 않는다는 것입니다. npm install --omit=optional을 실행하면 그 패키지가 설치되지 않습니다.

여전히 당신 프로그램은 패키지의 누락을 다룰 책임이 있습니다. 예를 들어 다음과 같습니다:
```js
try {
  var foo = require("foo");
  var fooVersion = require("foo/package.json").version;
} catch (er) {
  foo = null;
}
// foo 패키지가 올바르지 않다면, foo가 없다고 판단합니다.
if (notGoodFooVersion(fooVersion)) {
  foo = null;
}

// .. then later in your program ..

if (foo) {
  foo.doFooThings();
}
```
`optionalDependencies`의 항목은 같은 이름의 `dependencies`에 있는 항목을 덮어씌웁니다. 그래서 한 장소에 명시하는 것이 보통 최고의 방법입니다.

### 실사용례
1. 특정 OS에서만 샤용되는 패키가 있는 경우
2. 기존 기능을 강화하는 모듈이나 라이브러리가 있는 경우
3. 대체 가능한 여러 패키지 중 하나를 선택적으로 사용하는 경우