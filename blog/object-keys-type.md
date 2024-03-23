---
authors: mitchell
title: Object.keys의 타입추론
date: 2024-03-23
tags: [TypeScript]
description: 프론트엔드 성능 측정 및 최적화 방법에 대한 정리
keywords: [TypeScript, Object, Object.keys, ]
---

## 문제의 상황

```ts
const fruits = {
  apple: 'apple',
  banana: 'banana',
  orange: 'orange'
}

const keys = Object.keys(fruits)
```

`keys`의 타입은 어떻게 추론될까요? 아마 `('apple' | 'banana' | 'orange')[]`가 될거라고 예상할 수 있습니다.

그리고 이 `keys`를 이용해서 같은 키를 가지면서 값에 ' gift'라는 문자열을 추가하는 `fruitGift`를 만들어보려고 합니다.

```ts
const fruits = {
  apple: 'apple',
  banana: 'banana',
  orange: 'orange'
}

const keys = Object.keys(fruits)

const fruitGift = keys.reduce((result, key) => {
  result[key] = fruits[key] + 'gift'
  return result
}, {} as typeof fruits)
```

그러나 keys의 배열의 reduce 함수 내부에서 제공되는 단일 key 값으로는 아래의 에러와 함께 fruits에 접근할 수 없습니다.

>Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '\{ apple: string; banana: string; orange: string; \}'.
>  No index signature with a parameter of type 'string' was found on type '\{ apple: string; banana: string; orange: string; \}'.

왜냐하면 `Object.keys`로 얻은 값의 타입추론이 `('apple' | 'banana' | 'orange')[]`로 특정된 것이 아니라 `string[]`로 되기 때문입니다.
<!--truncate-->
<br/>

## Object.keys(object)의 타입추론
Object.keys의 타입정의를 따라가보면 그 이유를 알 수 있습니다.

```ts
{
  //...
  keys(o: object): string[];
  //...
}
```

아마 일반적으로 기대할 수 있는 타입은 `keyof typeof o` 일텐데요. 아쉽게도 `string[]`을 반환하는 타입입니다. 따라서 위의 문제처럼 `Object.keys`의 값들로는 원래의 객체의 값에 액세스 할 수 없었던 것입니다.

<br/>

## 왜 string[]을 반환하도록 설계하였을까?
JavaScript에서는 정확한 타입은 런타임을 통해서 결정되기 때문입니다. TypeScript도 결국 JavaScript이기 때문에 그러한 특성을 유지하여 반환값을 string[]로 결정한 것으로 보입니다.

:::info
**property는 `string | number | symbol`이 모두 들어올 수 있는데 왜 반환은 `string`으로만 되나요?**  
내부적으로 객체는 위 타입으로 들어오는 property 타입을 `string`으로 처리하기 때문입니다.
:::

예를 들어 설명해보겠습니다. JavaScript의 타입은 런타임에 결정된다는 것을 기억하세요.

```js
// JavaScript

const fruits = {
  apple: 'apple',
  banana: 'banana',
  orange: 'orange'
}

const keys = Object.keys(fruits)

function makeFruitGift() {
  return keys.reduce((result, key) => {
    // 만약 여기에서 임의로 객체의 속성을 삭제
    delete fruits['banana']

    result[key] = fruits[key] + 'gift'
    return result
  }, {})
}
```

JavaScript에서는 `fruits` 객체의 속성이 추가 삭제가 매우 자유롭기 때문에 런타임에서 객체가 어떤 모양을 하고 있을지 예측할 수가 없습니다.
예제에서처럼 임의의 타이밍에 객체의 속성하나를 삭제한다고 했을때, `fruits[key]`의 값이 존재하지 않습니다. 예제에서는 단순히 `string`이기 때문에 별일이 일어나지 않겠지만, 정상적으로 있어야하는 값이 사라진 상황에서는 어떤 에러가 발생할지 예측할 수 없습니다.

따라서 `Object.keys`는 그 값으로 어떤 값이 생길지 예측할 수 없기 때문에 `string[]`을 반환하도록 설계할 수 밖에 없게 됩니다.

<br/>

## 의도한대로 타입추론 하기
그러한 작동원리를 이해하더라도 잘 통제된 환경안에서는 적절하게 객체의 키들을 추론하고 싶을 수 있습니다. 아래와 같이 `Object.keys`를 적절히 타입추론이 가능하도록 wrapping 함수를 만들어 처리하여 사용할 수 있습니다.

```ts
type UnknownDictionary = Record<PropertyKey, unknown>

type ObjectKeyOnlyString<Obj extends UnknownDictionary> = Exclude<keyof Obj, symbol | number>

export function objectKeys<Obj extends UnknownDictionary>(obj: Obj) {
  return Object.keys(obj) as Array<ObjectKeyOnlyString<Obj>>
}
```

:::info
**`ObjectKeyOnlyString` 부분에서 왜 `symbol`과 `number` 타입을 제외하도록 처리하나요?**  
왜냐하면 `Object.keys`는 `string[]`을 반환하게 되어있으며 `number`는 내부적으로 문자열로 변환되어 저장되고, `symbol`은 열거되지 않기 때문입니다. 여기에서 함수의 목적은 해당 배열의 값을 인자로 들어오는 `obj`의 키의 문자열이 어떤 것인지 정확히 추론하는 것입니다. 따라서 문자열이 아닌 프로퍼티 타입에 대해서는 제외하도록 처리하였습니다.
:::