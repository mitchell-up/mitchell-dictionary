# Array.from과 Array.fill로 빈 이중배열을 만들면 안되요.

빈 이중배열을 생성하기 위해 다음과 같이 하였다.

```ts
const nested = Array.from({ length: n }).fill(Array.from({ length: n }))
```

그리고 특정 위치의 원소에 대해 값을 바꾸었다.

```ts
nested[0, 0] = 1
```

그런데 nested의 값이 이상하다. [0, 1]의 원소만 바뀔 것으로 예상되었으나 그렇지 않다.

```ts
console.log(nested)
// [[1, 0, 0, ... ,0], [1, 0, 0, ... ,0], ...]
```

## 왜 이상한 이중배열이 만들어졌을까?
이중배열을 생성했던 부분을 다시 한번 살펴보자. 실제로 저렇게 동작하도록 만들었기 때문이다.

길이가 n인 빈 배열을 길이가 n인 빈 배열의 원소로 채우는 과정에서 `Array.fill` 메소드를 사용하였고, 각 원소를 순회하며 길이가 n인 빈 배열을 생성하여 채워줄 것으로 예상하였다.

그러나 실제로는 `Array.fill`에 할당된 인자의 참조값을 각 원소마다 채우게 된다. 공식문서의 설명에도 그렇다고 나와있다.

> `value`가 객체인 경우, 배열의 각 슬롯은 해당 객체를 참조합니다.

따라서 위에서 [0, 1]의 원소를 바꾸었을 때 해당 배열의 같은 참조값을 들고 있던 모든 원소의 값이 바뀌는 결과를 얻게 되는 것이다.