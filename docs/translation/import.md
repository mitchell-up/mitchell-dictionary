# import()

:::info
mdn 문서의 import()를 번역하였습니다.

[원본 바로가기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
:::

흔히 다이나믹 임포트라고 불리는 `import()` 문법은 ECMAScript 모듈을 비동기적이고 역동적이게 잠재적으로 모듈이 아닌 환경에 불러오는 함수와 같은 표현식입니다.

[선언-스타일 카운터파트](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)와 다르게, 다이나믹 임포트는 필요할 때만 평가되며, 문법적인 유연함을 더 허용합니다.

## 문법
```js
import(moduleName)
```

`import()` 실행은 함수의 실행과 매우 유사한 문법입니다. 하지만 `import` 자체는 키워드이지 함수가 아닙니다. 따라서 `const myImport = import`와 같은 별칭을 둘 수 없으며, 사용시 문법오류가 발생할 것입니다.

### Parameters
`moduleName`
  불러올 모듈 specifier의 평가는 host-specified이지만, 정적 import 항상 동일한 알고리즘을 따릅니다.

### Return value
프로미스를 반환합니다. 그 프로미스는 [모듈 네임스페이스 객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#module_namespace_object)를 만족합니다. 모듈 네임스페이스 객체: `moduleName` 내보내진 모든 것을 담고 있는 객체.

`import()` 평가는 절대 동기적으로 오류를 발생시키지 않습니다. `moduleName`은 [string으로 강제되며](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion), 그 강제가 발생하면, 프로미스는 오류와 함께 거절됩니다.

## 상세
import 선언 문법 (`import something from "somewhere"`)은 정적이며 항상 로드타임에 평가된 모듈을 가져옵니다. 다이나믹 임포트