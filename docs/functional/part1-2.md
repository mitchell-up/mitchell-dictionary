# 불변성과 계층형 설계

:::info
이 글은 "쏙쏙 들어오는 항수형 코딩"을 읽고 요약, 정리한 글입니다.
:::

## 함수에서는 불변성을 지켜야한다.
불변성(Immutable)이란 값의 원본이 변하지 않는 성질을 의미하는데, 함수형 프로그래밍에서는 불변성을 지키도록 합니다. 불변성을 지키는 장점으로는 다음과 같습니다.
- 무분별한 상태 변경을 방지한다. (여기에서 상태란 데이터를 의미합니다.)
- 상태 변경의 추적을 예상가능하게 한다.
  
함수의 동작은 크게 읽기, 쓰기로 분류할 수 있다.
- 읽기: 그저 정보를 꺼내서 읽는다. 따라서 읽기 동작은 불변성을 지킨다.
- 쓰기: 데이터를 바꾼다. 따라서 쓰기 동작은 불변성을 어긴다.

따라서 쓰기동작에 대해 불변성을 지키게 하기 위해서 **Copy on Write**을 지키도록 바꾼다면, 그 동작은 읽기로 취급되며 불변성을 지킬 수 있게 됩니다.

### Copy on Write
말그대로 쓰기할때 복사한다는 의미입니다. 원칙은 다음과 같습니다.
1. 복사본 생성
2. 복사본 변경
3. 복사본 반환

```js
// Example
function addItem(arr, item) {
  const arrCopy = arr.slice() // 값의 복사본 생성
  arrCopy.push(item)          // 복사본의 변경
  return arrCopy              // 복사본의 반환
}
```

### 읽으면서 쓰는 함수는에서 Copy on Write를 지키는 법
1. 함수를 분리한다
  - 읽기와 쓰기로 각각 분리한다.
  - 쓰기에 Copy On Write를 적용한다.
2. 별도로 사용하거나 분리된 함수를 활용해 객체, 배열 등으로 두 값을 모두 내보내는 함수를 만든다.


### 불변성을 기준으로 액션과 계산을 구분하기
- 변경가능한 데이터를 읽는 것은 "액션"
- 불변성을 지킨 데이터를 읽는 것은 "계산"
- Copy On Write를 지킨 쓰기 함수는 "읽기", 따라서 "계산"
- 쓰는 행위를 읽는 행위로 바꾸는 것은 곧 액션을 계산을 바꾸는 일

### 방어적 복사
실무적으로는 레거시코드(불변성을 지키지 않았더라도)를 사용하는 것을 피할 수 없습니다. 따라서 기능이 추가될 때 불변성을 지키기 위해서 레거시 코드에 쓸 수 있는 안전한 인터페이스가 필요합니다. 이 때 사용하는 원칙이 방어적 복사입니다.

**규칙1.** 데이터가 안전한 코드에서 나갈 때 복사
  1. 깊은 복사
  2. 신뢰할 수 없는 코드로 전달

**규칙2.** 안전한 코드로 데이터가 들어올 때 복사
  1. 변경될 가능성이 있는 데이터가 들어오면 바로 깊은 복사
  2. 복사본을 사용
   
### 불변성을 지키는 원칙들
- **Copy On Write**: 불변성이 통제된 환경에서 사용, 얕은 복사와 구조적 공유로 비용이 작다.
- **방어적 복사**: 신뢰할 수 없는 코드와 데이터를 주고 받을 때 사용, 깊은 복사를 하기 떄문에 비용이 크다.

---

## 계층형 설계
소프트웨어 설계는 코드를 만들고, 테스트하고, 유지보수하기 쉽도록 프로그래밍 하도록 하는 방법이며, 계층형 설계를 이를 계층적으로 나누어 구성하는 기술을 의미합니다.

### 호출그래프
함수들의 계층을 나누고 함수들이 어떤 함수를 호출하는지 그래프로 나타낸 것입니다.
- 비기능적 사항을 보여준다.
  - 테스트를 어떻게 할 것인가
  - 재사용을 할 수 있는가
  - 유지보수하기 쉬운가
- 그래프의 위에 있을 수록 고치기 쉽고 자주 바뀐다.
- 그래프 아래로 갈 수록 갯수도 적어 유지보수 비용이 크다.
- 아래에 있는 코드는 테스트가 중요하다.
- 아래에 있는 코드는 재사용하기 좋다.
- 하위 계층의 함수를 많이 사용하는 상위 함수를 재사용하기는 어렵다.

### 계층형 설계 패턴

1. 직접구현
   - 구체적인 내용을 풀지 말고 함수로 구현해야 한다.
   - 같은 계층에 있는 함수는 같은 목적을 가져야한다.
   - 한 함수는 하나의 계층의 함수만 사용해야 한다.
   - 만약 다른 계층을 참조한다면, 같은 계층을 참조하도록 새 함수를 생성합니다.
   - 계층형 설계에서는 모든 계층은 아래 계층에 의존해야합니다.
   - 복잡한 코드를 같은 계층으로 옮기지말고 더 낮은 구체화 수준을 가진 일반적인 함수로 만들어 직접구현합니다.
  
2. 추상화 벽
   - 인터페이스를 사용하여 코드를 만들기
   - 팀 간의 책임을 명확하게 나눌 수 있다.
   - 추상화벽이란 세부구현을 감춘 함수로 계층이다.
    ```js
    // item을 삭제에 대한 추상화 벽을 만듭니다.
    // 따라서 item의 구조 및 삭제 방법에 대해서는 몰라도 됩니다.
    function removeItem() {
      // ...
    }
    ```
   - 추상화 벽을 기준으로 높은 계층의 함수가 어떻게 해당 함수를 사용하는지 몰라도 되고, 마찬가지로 아래 계층이 어떻게 함수를 구현하는지 물라도 된다..
   - 구현을 바꾸기 쉽습니다.
   - 코드의 가독성이 좋아집니다.
   - 구체적인 구현보다 문제 자체에 집중할 수 있습니다.
   - 커뮤니케이션 비용을 줄인다
   - 복잡한 코드를 명확하게 한다
  
3. 작은 인터페이스
   - 인터페이스를 작고 강력하게 구성하기
   - 추상화벽 계층보다는 그 위의 계층에 만드는 것이 직접 구현에 더 가깝다.
   - 상위에 있을 수록 구체적인 것을 몰라도 되기 때문에 하위계층보다 상위 계층에 만드는 것이 작은 인터페이스 입니다.
   - 계층에 있는 함수는 완전하고, 적고, 시간이 지나도 바뀌지 않아야 한다.
  
4. 편리한 계층
   - 너무 엄격하게 하기 보다는 편안하게 임하되, 코드가 복잡해진다고 느낄 때 위 3가지 패턴을 사용하도록 합니다.