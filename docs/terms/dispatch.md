# Dispatch
사전적으로 '급파하다', '발송하다', '빨리 처리하다'라는 뜻입니다. 소프트웨어에서는 이벤트나 액션, 메세지 등을 **다른 부분으로 전달하는 과정**을 의미합니다. 주로 어떤 작업을 직접 실행하지 않고 전달되는 이벤트, 액션, 메세지에 따라 함수나 메서드가 호출되는 메커니즘에서 사용되는 용어입니다.

이 용어가 흔히 사용되는 Redux에서 예시로 확인할 수 있습니다.

```js
// 액션 타입 정의
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 액션 생성자 함수 정의
function increment() {
  return { type: INCREMENT };
}

function decrement() {
  return { type: DECREMENT };
}

// 리듀서 함수 정의
function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
```

그리고 아래와 같이 `dispatch`를 통해서 액션을 전달함으로써 로직을 실행시키도록 합니다. dispatch의 의미 그대로 액션을 '전달'하기만 합니다.

```js
// Redux 스토어 생성
import { createStore } from 'redux';

const store = createStore(counter);

// 액션을 dispatch하여 상태 변경
store.dispatch(increment());

store.dispatch(decrement());
```