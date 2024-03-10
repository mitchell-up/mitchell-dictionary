
# Recursive - flatten 문제해결

## flatten 
배열의 배열을 받아들이고 모든 값이 평활화(flattened)된 새 배열을 반환하는 flatten이라는 재귀(recursive) 함수를 작성합니다.

## 답안

```js
// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]

function flatten(arr) {
    let result = []
    
    for (let el of arr) {
        if (Array.isArray(el)) {
            result = result.concat(flatten(el))
        } else {
            result.push(el)
        }
    }
    
    return result
}
```

1. 주어진 배열의 원소에 대해 검사하며, 배열이 아닌 경우 `result` 배열에 바로 추가한다.
2. `flatten`의 결과로는 평활화된 **배열**이 오도록 되어있다. 따라서 해당 배열과 기존 `result`를 합쳐주어야 한다.
3. 다음 순회에도 결과 값이 누적될 수 있도록 `result = result.concat(flatten(el))`로 결과값을 바꾸어준다.