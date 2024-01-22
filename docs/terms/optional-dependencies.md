# Optional Dependencies
만약 의존성이 사용될 수 있지만, npm이 그 의존성을 찾지 못하거나 설치하는데 실패해도 게속 진행하길 원한다면, 그 의존성을 optionalDependencies 객체에 넣었을 겁니다. 이건 dependencies 객체와 같이 패키지이름과 버전, 또는 url의 맵 자료입니다. 그 둘의 차이는 빌드의 실패가 설치의 실패를 만들지 않는다는 것입니다. npm install --omit=optional을 실행하면 그 의존성이 설치되지 않을 것입니다.

의존성의 누락을 다루는건 여전히 당신 프로그램의 책임입니다. 예를 들어 보면:
```js
try {
  var foo = require("foo");
  var fooVersion = require("foo/package.json").version;
} catch (er) {
  foo = null;
}
if (notGoodFooVersion(fooVersion)) {
  foo = null;
}

// .. then later in your program ..

if (foo) {
  foo.doFooThings();
}
```
optionalDependencies의 엔트리는 같은 이름의 dependencies에 있는 엔트리를 덮어씌울 것이며, 이건 보통 한 장소에 놓은 최고의 방법입니다.