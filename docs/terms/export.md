# Export
- 모듈을 내보낼 때 사용하는 키워드이다.
- 함수, 객체, 원시 값을 내보낼 수 있다.
- export된 모듈은 무조건 strict 모드이다.
- HTML 문서 안에서는 export 할 수 없다.
- 내보내기에는 named와 default 두 종류가 있다.
- named export는 모듈 내에서 여러개가 존재할 수 있다.
  
  ```js
    // 먼저 선언한 식별자 내보내기
    export { myFunction, myVariable };

    // 각각의 식별자 내보내기
    // (변수, 상수, 함수, 클래스)
    export let myVariable = Math.sqrt(2);
    export function myFunction() { ... };
  ```
- default export는 모듈 내에서 하나만 존재할 수 있다.
  ```js
    // 먼저 선언한 식별자 내보내기
    export { myFunction as default };

    // 각각의 식별자 내보내기
    export default function () { ... };
    export default class { ... }

  ```
- named export는 alias를 하지 않은 이상 정해진 이름으로 import 해야합니다.
- default export는 어떤 이름으로든 import가 가능합니다.

### 다시 내보내기
```js
export foo from "bar.js";

// 위는 아래와 동일합니다.
import foo from 'bar.js';
export foo;
```


- default export에서는 var, let, const는 사용할 수 없습니다.

- 한 모듈에서 named와 default export를 섞어쓰는 경우가 흔치 않다. (왜?)
- default export 할 때에는 이름이 필요없다.
  
  ```js
    export default class {

    }

    export default function() {

    }
  ```

### as default
```js
  function sayHi(user) {
    alert(`Hello, ${user}!`);
  }

  // 함수 선언부 앞에 'export default'를 붙여준 것과 동일합니다.
  export {sayHi as default};
```


import 하는 여러가지 방법
```js
  import {default as User, sayHi} from './user.js';

  new User('John');

  ///////////

  import * as user from './user.js';

  let User = user.default; // default export
  new User('John');
```

### export default를 import 할 때 이름짓기의 규칙을 정해라
ex) 파일이름과 동일한 이름으로 가져온다.

```js
  import User from './user.js'
```

그러나 이름짓기의 규칙이 파괴될 가능성은 여전히 존재하여
named export만 강제하는 경우도 있다. (네이밍의 혼란을 줄여줄 수 있다.)


다시 내보내기가 유용한 경우 (플러그인이나 라이브러리에서)
index에 원하는 모듈만 내보내고 나머지는 숨기고 싶을 떄.

외부 개발자가 내부구조를 건드리지 않고 import 할 수 있게 할 때

export default를 다시 내보낼 때
```js
export {default} from './user.js'; // default export를 다시 내보내기
```