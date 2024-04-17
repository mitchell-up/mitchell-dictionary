---
authors: mitchell
title: renderHook의 상태변화가 발생하지 않는 경우
date: 2024-04-17
tags: [testing-library, rtl, testing, hook, renderHook]
description: renderHook 동작의 이해와 상태변화가 발생하지 않는 사용법에 대한 대처
keywords: [frontend, testing-library, rtl, testing, hook, renderHook, react, unit test]
---

# renderHook의 상태변화가 발생하지 않는 경우
현재 앱의 컬러테마를 다루는 `useThemeMode` 커스텀 훅을 아래와 같이 테스트하려고 합니다. 기본 값은 'light'이며, `changeTheme`을 호출하여 테마를 변경할 수 있습니다.

```tsx
const renderUseThemeMode = () => {
  const { result } = renderHook(() => useThemeMode())

  return result.current
}

describe('Test hook', () => {
  test('render hook correctly', () => {
    const { currentTheme, changeTheme } = renderUseThemeMode()

    expect(currentTheme).toBe('light')

    act(() => {
      changeTheme('dark')
    })

    expect(currentTheme).toBe('dark')
  })
})
```

첫번째 assertion에서는 예상대로 현재 테마가 기본 값인 'light'라고 통과하게 됩니다. 그러나 두번째 assertion에서 테마가 'dark'로 변경되지 않아 테스트가 최종적으로 실패하는 결과를 얻게 됩니다.

상태의 변화를 발생시키는 함수인 `changeTheme`도 `act`의 내부에서 실행하여 분명히 상태 변화가 발생하고, 테스트가 통과해야할텐데요. 왜 상태변화를 추적하지 못하고 있는걸까요?

<br/>

## 문제의 원인
문제의 원인은 `renderUseThemeMode` 함수에 있습니다. 여러 테스트케이스에 걸쳐 편하게 훅을 렌더링하기 위해 만들어둔 함수인데요. 내부 구현을 보면 `renderHook`의 반환 값 중 `result.current`를 반환하는 것을 볼 수 있습니다. 여기가 바로 문제가 되는 부분인데요. 초기 상태에 대한 값이 `result.current`에는 들어있겠지만, 상태가 변경되더라도 이전의 값을 유지하기 때문에 변경된 상태로 assertion을 하면 실패하게 됩니다.

<br/>

## 해결방법
해결방법은 아주 간단하지만 조금은 불편할 수 있는데요. `result.current`를 별도의 변수에 할당하지 않고 사용하면 상태 변화를 정상적으로 추적할 수 있게 됩니다. 이에 따라 `renderUseThemeMode` 렌더함수를 사용하지 않고, `renderHook`을 직접 호출하도록 변경하였습니다.

```tsx
describe('Test hook', () => {
  test('render hook correctly', () => {
    const { result } = renderHook(() => useThemeMode())

    expect(result.current.currentTheme).toBe('light')

    act(() => {
      result.current.changeTheme('dark')
    })

    expect(result.current.currentTheme).toBe('dark')
  })
})
```

이제 정상적으로 상태 변화를 추적하여, 마지막 assertion을 통과할 수 있게 됩니다.

<br/>

## 왜 그럴까?
그렇다면 왜 `result.current`을 다른 변수에 선언하면 상태 변화를 추적하지 못할까요? 우선 `result.current`의 정체가 무엇인지 `renderHook` 함수의 구현을 살펴보겠습니다.

```js
function renderHook(renderCallback, options = {}) {
  const {initialProps, ...renderOptions} = options
  const result = React.createRef()

  // 테스트용 함수 컴포넌트 생성
  // 결과를 ref의 current로 전달
  function TestComponent({renderCallbackProps}) {
    // 전달한 커스텀 훅
    const pendingResult = renderCallback(renderCallbackProps)

    // 의존성 배열을 설정하지 않았으므로 매 렌더링마다 result.current의 값이 변경됩니다.
    React.useEffect(() => {
      result.current = pendingResult
    })

    return null
  }

  // 테스트 컴포넌트를 렌더, 즉 커스텀 훅을 실행합니다.
  const {rerender: baseRerender, unmount} = render(
    <TestComponent renderCallbackProps={initialProps} />,
    renderOptions,
  )

  // 리렌러더 함수 생성
  function rerender(rerenderCallbackProps) {
    return baseRerender(
      <TestComponent renderCallbackProps={rerenderCallbackProps} />,
    )
  }

  return {result, rerender, unmount}
}
```

커스텀 훅의 변경된 상태가 `React.creatRef`로 생성된 `result.current`로 반영되도록 설계 되어있습니다. `result.current`의 참조는 `React.creatRef`로 생성되어 렌더링이나 상태변화에도 참조가 바뀌지 않습니다. 참조는 바뀌지 않는데, 그 안의 값은 바뀌기 때문에 renderHook의 `result.current`로 참조하는 경우 상태 변경에 대한 값을 지속해서 추적할 수 있게 됩니다.