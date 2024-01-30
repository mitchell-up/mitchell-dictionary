---
title: Polymorphic React Component
description: 다형적 리액트 컴포넌트 만들기 번역
keywords: [polymorphic, react, javascript, typescript, generic]
---

# Polymorphic React Component

>**다형성(Polymorphism)은** 어떤 객체의 속성이나 기능이 상황에 따라 여러가지 형태를 가질 수 있는 성질을 의미합니다.
>
>즉, Polymorphic React Component는 어떤 HTMLElement도 될 수 있는 컴포넌트라는 것을 의마합니다. 컴포넌트를 사용하다보면 때로는 스타일은 유지한채로 컴포넌트의 태그만 변경하고 싶은 경우가 있습니다. 예를 들어 텍스트가 `a` 태그의 역할을 하여 링크를 연결하도록 쓰고 싶은 경우가 있겠습니다.
>
>Polymorphic React Component를 타입스크립트와 함께 type-safe 하도록 구현하기 위해 아래 글을 번역합니다.
<br/>
:::info
'Type-safe polymorphic React components'를 번역하였습니다.
[원본 바로가기](https://phelipetls.github.io/posts/polymorphic-components-react-typescript/)
:::
<br/>
`Polymorphic Component`은 `props`를 통해 리액트 컴포넌트를 사용하여 HTML 태그를 커스텀 할 수 있도록 하는 디자인 패턴입니다.
```JavaScript
<Typography as='label'>foo</Typography>
```
<br/>

`Typography` 는 다형성이 있습니다. 왜냐하면 생성될 HTML은 실제 `label` 태그가 되기 때문입니다.
```html
<label>foo</label>
```
<br/>

JavaScript를 이용하면 타입안정성은 신경쓰지 않아도 아주 쉽게 작동합니다.
```JavaScript
const Typography = ({ as: Component = 'span' }) => {
  return <Component />
}
```
<br/>

하지만 컴포넌트의 타입을 엄격하게 관리하려면 훨씬 어려워집니다.

예를 들어, 특정 HTML element에 맞지 않는 `props`를 사용자가 전달하는 걸 허용하지 않는 경우가 있습니다. - `span` 요소는 `for` 속성을 받지 않아야 합니다.
```JavaScript
// This should be fine
<Typography as="label" htmlFor='' />

// @ts-expect-error This shouldn't: htmlFor is not allowed in span elements
<Typography as="span" htmlFor="" />
```
<br/>

그럼 지금부터 이 컴포넌트의 타입을 작성하겠습니다.

:::warning
이 블로그는 타입스크립트 4.9.5 버전을 사용하여 작성하였습니다. 이 후 버전의 타입스크립트를 사용하면 에러가 발생 할 수 있습니다.
:::

## 타입 안정적인 'as' prop
`as` prop은 `span`, `div` 등과 같은 HTML 태그만 하용합니다. 'foo' 같은 아무 문자열은 빌드가 안 됩니다.
```JavaScript
<Typography as='foo' />
```
<br/>

HTML 태그만 전달 받으려면 어떤 타입을 작성해야 할까요? 다행히 `@types/react`가 `React.ElementType`와 같은 타입을 제공해줍니다.
```JavaScript
type TypographyProps = {
  as?: React.ElementType
}

const Typography = ({ as: Component = 'span', ...rest }: TypographyProps) => {
  return <Component {...rest} />
}

export default function App() {
  return <>
    {/* Type '"foo"' is not assignable to type 'ElementType<any> | undefined'. */}
    <Typography as='foo' />
    <Typography as='div' />
  </>
}
```
<br/>

## 제네릭을 이용한 Polymorphic props
지금부터 `as` prop을 바탕으로 허용가능한 props에 대해 적절한 타입이 필요합니다. 예를 들어 `as`가 `label`인 경우, `htmlFor`를 받을 수 있어야 합니다. 기본적으로 아래 컴포넌트는 `span` 요소이고, `htmlFor`를 허용하지 않습니다.

이게 가능하려면 제네릭 타입을 사용할 필요가 있습니다.

```JavaScript
// TODO: implement PropsOf
type PropsOf<T> = {}

type TypographyProps<T extends React.ElementType> = {
  as?: T
} & PropsOf<T>

const Typography = <T extends React.ElementType = 'span'>({
  as,
  ...rest
}: TypographyProps<T>) => {
  const Component = as ?? 'span'
  return <Component {...rest} />
}
```
<br/>
:::note
**제레릭 타입이 무엇인가요?**<br/>
제네릭 타입은 인자를 받아서 타입을 반환하는 함수입니다.

이 글에서 인자는 `T`이고 `React.ElementType`을 확장한다는 타입 제약조건을 가지고 있습니다. 그래서 무작위 문자열을 전달할 수 없고 유효한 리액트 엘리턴트를 전달해야 합니다.
:::
<br/>

지금부터 `PropsOf`를 작성하겠습니다. `button` 또는 `label`과 같은 유효한 리액트 요소를 받아 그 요소의 유효한 `props`를 가진 `object`를 반환하는 타입이 필요합니다.

다행히 이걸 위한 타입이 이미 존재합니다: `React.ComponentPropsWithoutRef`

```JavaScript
type PropsOf<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>

type TypographyProps<T extends React.ElementType = React.ElementType> = {
  as?: T
} & PropsOf<T>

const Typography = <T extends React.ElementType = 'span'>({
  as,
  ...rest
}: TypographyProps<T>) => {
  const Component = as ?? 'span'
  return <Component {...rest} />
}

export default function App() {
  return (
    <>
      {/* These should be ok */}
      <Typography data-foo='bar' />
      <Typography as="label" htmlFor="my-input" />

      {/* This should not, span elements don't accept htmlFor */}
      <Typography htmlFor="my-input" />
      {/* Neither this, div elements don't accept htmlFor */}
      <Typography as="div" htmlFor="my-input" />
    </>
  )
}
```
<br/>

운좋게도 현재 구현은 이미 커스텀 컴포넌트도 잘 처리합니다. - `as`에 넘기면 정상적으로 작동합니다.

예를 들어 `react-router-dom` 이나 `next/link`의 `Link` 컴포넌트로 링크를 만든다고 가정하겠습니다.
```JavaScript
// A mock Link component
function Link(props: { to: string }) {
  return <a href={props.to} />
}

export default function App() {
  return (
    <>
      <Typography as={Link} to='#' />
      {/* It has a error */}
      <Typography to='#' />
    </>
  )
}
```
<br/>

## 컴포넌트 자체 props 타입을 추가하기
자 이젠 `Typography` 컴포넌트가 `variant` 같은 자체 `props`를 가지길 원할겁니다. 다형성을 유지하면서 어떻게 자체 `props`를 가지게 할 수 있을까요?

새로운 제네릭 타입으로 `PolymorphicProps`라는 것을 만들면 가능합니다. `PolymorphicProps`은 요소 타입과 컴포넌트 자체 `props`를 인자로 받습니다.
그 인자들과, 요소 타입을 바탕으로 요소의 타입이 허용하는 모든 `props`와 컴포넌트 자체 `props`를 가져오면서도, 그 둘간의 잠재적인 충돌 또한 해결합니다:


```JavaScript
type PropsOf<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>

type PolymorphicProps<
  T extends React.ElementType = React.ElementType,
  TProps = {}
> = {
  as?: T
} & TProps &
  Omit<PropsOf<T>, keyof TProps | 'as'>

type BaseTypographyProps = {
  variant: 'heading' | 'paragraph'
}

type TypographyProps<T extends React.ElementType = 'span'> = PolymorphicProps<
  T,
  BaseTypographyProps
>

const Typography = <T extends React.ElementType = 'span'>({
  as,
  ...rest
}: TypographyProps<T>) => {
  const Component = as ?? 'span'
  // @ts-expect-error: FIXME this used to work in TypeScript 4.x but not anymore
  return <Component {...rest} />
}

export default function App() {
  return (
    <>
      <Typography variant="heading" data-foo="bar" />
      <Typography variant="paragraph" as="label" htmlFor="my-input" />
    </>
  )
}
```
<br/>
두 타입 간의 잠재적인 충돌 해결하기 위한 방법으로 `Omit` 타입을 사용하였습니다. 이 타입은 `TProps`에도 존재하는 `PropsOf`의 모든 `props`를 제거합니디. `TProps`는 우선순위 가집니다.

:::note
잘 모르는 경우에 대비해서, `Omit`은 내장 유틸 타입입니다. 자세한 내용은 타입스크립트 문서에서 확인하실 수 있습니다.
:::

<br/>

## 타입 안정적인 다형적 refs
`as` prop에 따라 엄격하게 타입이 정해진 컴포넌트의 `ref` props를 만들어보겠습니다. 정확히 의미하는바가 여기에 있습니다:
```JavaScript
import { useRef } from 'react'
import { Typography } from './Typography'

export default function App() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      {/* This should be fine */}
      <Typography as="button" ref={buttonRef} variant='paragraph' />
      {/* This should be a type error... */}
      <Typography as="label" ref={buttonRef} variant='paragraph' />
    </>
  )
}
```
<br/>

현재까지 만든 컴포넌는 `ref` prop를 받지 않습니다. `ref`를 받기 위해서, `PropsOf` 타입을 `React.ComponentPropsWithoutRef` 대신 `React.ComponentPropsWithRef`를 사용하도록 변경해야 합니다.
```JavaScript
type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>
```
<br/>
이 작업은 쉬운 부분이지만, 어떤 `refs` 전달하지 않았고, 우린 사실 `forwardRef` 함수를 사용할 필요가 있습니다.

안타깝게도 여기가 바로 어려워지는 부분입니다. - `forwardRef`는 다형성 컴포넌트를 다루는데 충분히 사용자 친화적이지 않아 보입니다.

이를 보여주기 위해서, 우리가 어떻게 일반적인 컴포넌트의 타입을 타입스크립트로 `forwardRef를` 사용하는지 보겠습니다.

```JavaScript
import { forwardRef, useRef } from 'react'

type TypographyProps = {
  variant: 'heading' | 'paragraph'
}

const Typography = forwardRef<HTMLSpanElement, TypographyProps>(
  (props, ref) => {
    return <span ref={ref} {...props} />
  }
)
```
<br/>

보시다시피, `forwardRef` 함수는 그 자체로 `ref` 요소의 타입과 해당 컴포넌트의 props를 인자로 받는 제네릭 함수입니다.

그러나 이것은 우리가 원하는 것을 달성하는 데 도움이 되지 않습니다… 우리가 원하는 것을 달성하기 위해서는 `as` 속성 값에 따라 조건적인 타입을 첫 번째 인자로 전달해야 합니다!

[문제는 Ben Ilegbodu의 아티클에서처럼 타입 주석/타입 캐스팅에 의존하지 않는 한 해결할 수 없어 보입니다.](https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/) 그래서 우리는 본질적으로 `React.forwardRef` 타입을 우회하고 컴포넌트 타입을 처음부터 다시 정의해야 합니다.

```JavaScript
type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>

type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref']

type PolymorphicProps<
  T extends React.ElementType = React.ElementType,
  TProps = {}
> = {
  as?: T
} & TProps &
  Omit<PropsOf<T>, keyof TProps | 'as' | 'ref'> & { ref?: PolymorphicRef<T> }

type BaseTypographyProps = {
  variant: 'heading' | 'paragraph'
}

type TypographyProps<T extends React.ElementType = 'span'> = PolymorphicProps<
  T,
  BaseTypographyProps
>

type TypographyComponent = <T extends React.ElementType = 'span'>(
  props: PolymorphicProps<T, TypographyProps<T>>
) => JSX.Element | null

const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = 'span'>(
    props: TypographyProps<T>,
    ref: PolymorphicRef<T>
  ) => {
    const { as, ...rest } = props

    const Component = as ?? 'span'
    return <Component ref={ref} {...rest} />
  }
)

import { useRef } from 'react'

export default function App() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Typography as="button" ref={buttonRef} variant="paragraph" />
      <Typography as="label" ref={buttonRef} variant="paragraph" />

      {/**
        * Apparently this is fine... because HTMLSpanElement implements the
        * HTMLElement interface, which the HTMLButtonElement inherits from.
        * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSpanElement
        */}
      <Typography ref={buttonRef} variant="paragraph" />
    </>
  )
}
```