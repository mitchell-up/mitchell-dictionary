# assert

## assert의 사전적 의미.
to behave in a way that expresses your confidence
: 너의 확신을 표현하는 행위라고 해석할 수 있습니다.


<br/>

## 코드에서의 assert
프로그래밍에서 어떤 일이 일어나야만 한다는 것을 가정하에 진행할 수 있도록 하는 행위입니다. 코드의 복잡도가 높을 때 "경우의 수를 줄이는 것에 집중한다"라는 측면에서 유용하게 사용될 수 있습니다.

보통은 개발단계에서 디버깅 용도를 위해서 사용하고, 프로덕션 빌드시 해당 코드는 지워지도록 설계되어 있습니다.

<br/>

## 자바스크립트에서의 assert
동적언어인 자바스크립트의 경우는 대부분의 것이 런타임에 동적으로 결정됩니다. 따라서 assert 코드로 런타임에 검사하도록 유지하는 것은 여전히 유용합니다.

```js
assert(a !== null, 'a is null')
// 아래에 로직이 있더라도, a가 만약 null이라면,
// assert에 의해서 에러를 표시하고
// 프로세스가 종료될 것입니다.
```

<br/>

## 타입스크립트에서의 assert
`asserts` 키워드와 함께 타입스크립트로 assert 함수를 구현하는 것은 타입을 좁힐 수 있는 좋은 힌트가 됩니다.

```ts
function assert(assertion: unknown, error: string | Error): asserts assertion {
  if (!assertion) {
    if (error instanceof Error) {
      throw error
    } else {
      throw Error(error)
    }
  }
}
```