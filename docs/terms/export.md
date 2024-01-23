# Export
`export`는 JavaScript에서 모듈을 내보낼 때 사용하는 키워드입니다. 어떤 모듈을 `import` 하기 위해서는 모듈을 `export` 하는 것이 선행되야합니다. `export`는 다음의 특징을 가지고 있습니다.
- 함수, 객체, 원시 값을 내보낼 수 있다.
- export된 모듈은 무조건 strict 모드이다.
- HTML 문서 안에서는 export 할 수 없다.
- 내보내기에는 named와 default 두 종류가 있다.

<br/>

## named export
- 해석하면 이름이 붙은 내보내기입니다. 즉 할당되거나 선언된 식별자를 내보내는 방식이다.
- 값이 할당된 변수, 선언된 함수, 클래스를 내보낼 수 있습니다.

```js
export const a = 1;
export const b = '2';
export const c = { c: 'c' };

export function d() {
  return 'd';
}

export class e {
  constructor() {
    //...
  }
}

// 이렇게 한번에 묶어서 내보내도 됩니다.
export { a, b, c, d, e }

// 별칭을 붙여서 내보낼 수도 있습니다.
export { a as A, b as B, c, d, e }
```

<br/>

## default export
- 해석하면 기본 내보내기입니다. 모듈에서 기본이 된다는 의미로 모듈 내에서 하나만 존재할 수 있습니다. 
- 원하는 이름으로도 할당하여 `import` 할 수 있습니다.
- `var`, `let`, `const`로 변수를 선언하면서 `export default` 할 수 없습니다.
- 식별자 없이도 `export` 할 수 있습니다.
```js
// 먼저 선언한 식별자 내보내기
export default myFunction;
export { myFunction as default };

// 각각의 식별자 내보내기
export default function () { ... };
export default class { ... }
```

<br/>

## 다시 내보내기
```js
// 주의: 아래와 같은 다시 내보내기에는 default가 포함되지 않습니다.
export * from './user.js'

// 위 코드는 아래의 코드의 축약이라고 봐도 됩니다.
import { user, ... } from './user.js'
export { user, ... }

// default를 다시 내보내기
export { default } from './user.js'

// default와 named를 같이 다시 내보내려면 두 구문을 따로 써야합니다.
export * from './user.js'
export { default } from './user.js'
```
이런식으로 모듈을 다른 파일에서 다시 내보내는게 유용한 경우가 있습니다. 플러그인이나 라이브러리에서 외부개발자가 내부구조를 건드리지 않고 원하는 모듈을 import 할 수 있게 할 때, 또는 원하는 모듈만 내보내고 싶을 때 사용할 수 있습니다.

주로 폴더의 index.js 파일에 필요한 모듈을 내보내기하는 방식으로 이루어집니다.

<br/>

## export Recommendations
`export default`의 특성상 모듈의 사용자가 이름을 임의로 지을 수 있습니다. 따라서 그러한 혼란을 줄이기 위해 다음의 방법을 고려할 수 있습니다.

#### 파일명과 동일한 이름을 식별자로 두기
```js
import User from './user.js'
```

그러나 이름짓기의 컨벤션일 뿐이기에 규칙이 깨질 가능성은 여전히 존재합니다. 따라서 아래의 권고사항을 따를 수도 있습니다.

#### named export만 사용하도록 강제하기
```js
export function getUser() {}
```
```js
import { getUser } from './user.js'
```
<br/>

#### 하나의 export 방법만 선택하기
`default export`와 `named export`를 함께 사용할 수는 있습니다. 그러나 코드의 일관성을 유지하고 유지보수를 고려하였을 때 두 방식을 혼합하는 것 보다는 한가지 방식을 채택하는 것이 더 현명한 판단입니다.

특히 Webpack과 같은 번들러는 `named export`일 때 사용하지 않는 코드에 대해 더 쉽게 식별할 수 있기 때문에 트리쉐이킹에 유리합니다.