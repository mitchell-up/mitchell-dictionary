# import()

:::info
mdn 문서의 import()를 번역하였습니다.

[원본 바로가기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
:::

흔히 동적 임포트라고 불리는 `import()` 구문은 ECMAScript 모듈을 잠재적으로 모듈이 아닌 환경에 비동기적이고 동적으로 사용할 수 있게 하는 함수와 유사한 표현입니다.

[선언 스타일](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)과는 다르게, 동적 임포트는 필요할 때만 평가되며, 더 큰 구문적인 유연함을 허용합니다.

<br/>

## 문법
```js
import(moduleName)
```

`import()` 실행은 함수의 실행과 매우 유사한 구문입니다. 하지만 `import` 자체는 키워드이지 함수가 아닙니다. 따라서 `const myImport = import`와 같은 별칭을 둘 수 없으며, 사용시 구문오류가 발생합니다.

### Parameters
`moduleName`
임포트할 모듈의 명시자의 평가는 호스트 지정식 이지만, 정적 임포트와 항상 동일한 알고리즘을 따릅니다.

### Return value
`moduleName` 내보내진 모든 것을 담고 있는 객체인 [모듈 네임스페이스 객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#module_namespace_object)를 이행하는 프로미스를 반환합니다.

`import()` 평가는 절대 동기적으로 오류를 발생시키지 않습니다. `moduleName`은 [string으로 강제되며](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion), 그 강제가 발생하면, 프로미스는 오류와 함께 거절됩니다.

<br/>

## 상세설명
 import 선언 문법 (`importd something from "somewhere"`)은 정적이며 항상 로드타임에 평가된 모듈을 가져옵니다. 동적 임포트는 import 선언의 구문적 제한을 우회할 수 있게 해주며 조건부로 또는 필요에 따라 모듈을 불러올 수 있게 해줍니다. 동적 임포트가 필요한 이유는 다음과 같습니다.

- 정적 임포트가 확연히 코드를 불러오는 것을 느리게 하거나 메모리 사용을 증가시킬때, 그리고 가져온 코드가 필요할 가능성이 낮거나, 당장은 필요하지 않을 때.
- 가져오려는 모듈이 로드시점에 존재하지 않을 때
- import 지시어 문자열이 동적으로 생성되어야 할 때 (정적 임포트는 정적 지시어만 지원합니다.)
- import된 모듈이 부수효과가 있고, 특정 조건에만 그 부수효과를 원할 때. (모듈 안에서 어떠한 부수효과를 가지는것을 추천하지 않지만, 때로는 모듈 의존성을 제어할 수 없는 경우가 있습니다.)
- 모듈이 아닌 환경에 있을 때 (예를 들어, `eval` 또는 스크립트 파일)

꼭 필요할 때만 다이나믹 임포트를 사용하세요. 초기 의존성 로드에는 정적 임포트가 더 선호되며, 정적 분석툴과 트리쉐이킹으로부터 즉각적인 이점을 취할 수 있습니다.

당신의 파일이 모듈로 동작하지 않는다면(HTML 파일 안에서 참조된다면, 스크립트 태그는 `type="module"을 가져야합니다.`), 정적 임포트 선언을 사용할 수 없습니다. 하지만 비동기적인 동적 임포트 문법은 언제나 사용할 수 있어 모듈이 아닌 환경에서도 모듈을 가져올 수 있게 합니다.

동적 모듈 임포트는 모든 실행 문맥에서 허용되지 않습니다. 예를 들어, `import()`는 메인 쓰레드, shared worker, dedicated worker에서 사용될 수 있지만, [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 또는 [worklet](https://developer.mozilla.org/en-US/docs/Web/API/Worklet)과 함께 사용된다면 오류가 발생할 것입니다.

### 모듈 네임스페이스 객체
모듈 네임스페이스 객체는 한 모듈에서 내보내진 모든 것을 표현하는 객체입니다. 이 정적 객체는 모듈이 평가될 때 생성됩니다. 어떤 모듈의 모듈 네임스페이스 객체에 접근하는 두가지 방법이 있습니다: 네임스페이스 import를 통하거나(`import * as name from moduleName`), 동적 import의 이행된 값을 통해서.

모듈 네임스페이스 객체는 [`null` prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects)으로 [sealed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)된 객체입니다. 즉 객체의 모든 문자열 키가  그 모듈의 내보내진 것들과 일치하며 그 외의 키는 존재 하지 않는다는 의미입니다. 모든 키들은 사전 순서로(즉, [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description)의 기본동작입니다.) [나열(enumable)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)됩니다. 동시에 default export는 `default`라는 키로 사용가능합니다. 게다가, 모듈 네임스페이스 객체는 [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)에서 사용되는 `"Module"`을 값으로 가진 [`@@toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 속성을 가지고 있습니다.

문자열 속성들은 그 속성들의 기술자를 가져오려고 [`Object.getOwnPropertyDescriptors()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)을 사용할 때 설정불가하고 기록가능하지만 그들은 사실상 읽기전용입니다, 왜냐하면 새로운 값으로 속성을 재할당할 수 없기 때문입니다. 그 행동은 정적임포트가 "[`live bindings`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#imported_values_can_only_be_modified_by_the_exporter)" 모듈이 exporting하여 재당할될 수 있지만 가져오는 모듈에서는 재할당 될 수 없는 값-을 생성할 수 있다는 사실을 반영합니다. 속성의 기록가능성은 값이 변화할 수 있다는 가능성을 반영합니다, 왜냐하면 조정할 수 없고 쓸 수 없는 속성은 상수여야하기 때문입니다. 예를 들어 당신은 내보내진 변수를 재할당할 수 있고, 새로운 값은 모듈 네임스페이스 객체에서 관찰될 수 있습니다.

각 모듈 지시자는 유일한 모듈 네임스페이스 객체와 일치하기 때문에 다음은 일반적으로 참입니다.:
```js
import * as mod from "/my-module.js";

import("/my-module.js").then((mod2) => {
  console.log(mod === mod2); // true
});
```

하나의 특이한 케이스를 제외합니다: 프로미스는 결코 `thenable`로 이행되지 않으므로 `my-module.js` 모듈이 t`hen()`이라는 함수를 내보낸 경우 해당 함수가 동적 임포트의 프로미스가 이행될 때 자동으로 호출됩니다. 이는 프로미스 처리 프로세스의 일부로서 발생합니다.

```js
// my-module.js
export function then(resolve) {
  console.log("then() called");
  resolve(1);
}
```
```js
// main.js
import * as mod from "/my-module.js";

import("/my-module.js").then((mod2) => {
  // Logs "then() called"
  console.log(mod === mod2); // false
});
```