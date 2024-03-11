# box-sizing

body 내부 요소의 `box-sizing`을 변경하기 위해서 아래와 같이 설정하였으나, 해당 속성이 body 태그에서 작동하지 않았습니다.

```css
body {
  box-sizing: border-box;
}
```

일반적으로 body와 html은 다른 요소들의 컨테이너 역할을 하므로 box-sizing 변경은 적용되지 않습니다.

따라서 다른 요소들에 `box-sizing`을 적용하려면 *(와일드카드)를 사용해서 적용할 수 있습니다.

```css
* {
  box-sizing: border-box;
}
```