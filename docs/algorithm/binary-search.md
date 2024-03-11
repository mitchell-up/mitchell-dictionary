# Binary Search
이진탐색 알고리즘은 배열이 순차적으로 정렬되어 있는 상황에서 매우 효율적으로 탐색하는 알고리즘으로 시간복잡도는 `O(logN)`이다.

## 문제
정렬된 배열과 값을 받아들이고 값이 존재하는 경우 그 인덱스를 반환하는 binarySearch라는 함수를 작성합니다. 값이 존재하지 않으면 -1을 반환합니다.

## 해결
```js
function binarySearch(arr, num){
    let start = 0
    let end = arr.length - 1
    let middle = Math.floor((start + end) / 2)
    while (arr[middle] !== num && end >= start) {
        if (num < arr[middle]) {
            end = middle - 1
        } else {
            start = middle + 1
        }
        middle = Math.floor((start + end) / 2)
    }
    
    return arr[middle] === num ? middle : -1
}
```
1. 시작, 끝, 중간점을 체크한다.
2. 중간점의 값이 num과 같으면 루프를 종료한다
3. 중간점의 값이 num보다 작으면 끝점의 범위를 좁힌다.
4. 중간점의 값이 num보다 그면 시작점의 범위를 좁힌다.
5. 새로운 시작, 끝점이 결정되면 새로운 중간점을 계산한다.
6. 범위를 좁혀가다가 중간점이 같아진 루프에서 end가 start보다 작아지게 되면 루프를 종료한다.
7. 종료된 루프의 middle 값을 체크하여 num과 같다면 middle을 반환하고 아니면 -1을 반환한다.