---
title: Top Level Await
description: Top Level Await에 대한 mdn 문서번역
keywords: [mdn, top level await]
---

# Top Level Await

:::info
mdn 문서의 JavaScript Modules 내용 중 'Top level await'의 내용을 번역하였습니다.

[원본 바로가기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#top_level_await)
:::

Top level await는 모듈에서 사용할 수 있는 기능입니다. 이 말은 `await` 키워드를 사용할 수 있다는 뜻입니다.이 키워드로 모듈이 커다란 비동기 함수처럼 작동하여 코드가 부모 모듈 안에서 사용되기 전에 평가되지만, 형제 모듈들을 블로킹 없이 불러옵니다.

예제를 함께 살펴봅시다. 이 섹션의 이전 예제로부터 확장한 모든 파일과 코드가 [top-level-await](https://github.com/mdn/js-examples/tree/main/module-examples/top-level-await) 디렉토리 안에 있습니다.

먼저 [colors.json](https://github.com/mdn/js-examples/blob/main/module-examples/top-level-await/data/colors.json)이라는 별도의 파일에 팔레트를 선언해보겠습니다.
```json
{
  "yellow": "#F4D03F",
  "green": "#52BE80",
  "blue": "#5499C7",
  "red": "#CD6155",
  "orange": "#F39C12"
}

```

그런 다음 [getColors.js](https://github.com/mdn/js-examples/blob/main/module-examples/top-level-await/modules/getColors.js)라는 모듈을 만들어서 [colors.json](https://github.com/mdn/js-examples/blob/main/module-examples/top-level-await/data/colors.json) 파일을 fetch request로 불러오고 데이터를 object로 반환하도록 합니다.
```javascript
// fetch request
const colors = fetch("../data/colors.json").then((response) => response.json());

export default await colors;

```

여기 마지막 export 줄에 주목하세요.

우린 export 할 상수 `colors`가 특정되기 전에 `await` 키워드를 사용하고 있습니다. 즉 이 모듈을 포함 다른 모듈은 사용하기 전에 `colors`기 다운로드 되고 파싱 될 때까지 기다린다는 뜻입니다.

[main.js](https://github.com/mdn/js-examples/blob/main/module-examples/top-level-await/main.js)파일 안에 이 모듈을 포함해봅시다.
```javascript
import colors from "./modules/getColors.js";
import { Canvas } from "./modules/canvas.js";

const circleBtn = document.querySelector(".circle");

// …
```

shape 함수를 호출할 때 우린 이전에 사용했던 문자열 대신에 `colors`를 사용하겠습니다.
```javascript
const square1 = new Module.Square(
  myCanvas.ctx,
  myCanvas.listId,
  50,
  50,
  100,
  colors.blue,
);

const circle1 = new Module.Circle(
  myCanvas.ctx,
  myCanvas.listId,
  75,
  200,
  100,
  colors.green,
);

const triangle1 = new Module.Triangle(
  myCanvas.ctx,
  myCanvas.listId,
  100,
  75,
  190,
  colors.yellow,
);
```

이렇게 하는 것은 [getColors.js](https://github.com/mdn/js-examples/blob/main/module-examples/top-level-await/modules/getColors.js)가 완료될 때 까지 [main.js](https://github.com/mdn/js-examples/blob/main/module-examples/top-level-await/main.js) 안의 코드는 실행 되지 않기 때문에 유용합니다. 하지만 이건 다른 모듈들을 불러오는 것을 blocking 하지 않습니다. 예를 들어 [canvas.js](https://github.com/mdn/js-examples/blob/main/module-examples/top-level-await/modules/canvas.js)모듈은 `colors`를 가져오는 동안에도 계속 로드됩니다.