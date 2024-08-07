# 에러바운더리로 처리된 에러는 왜 여전히 에러 오버레이를 보여주는가?

에러가 발생될 것으로 예상되는 부분에 대해서 에러바운더리를 통해 적절하게 대체 컴포넌트를 보여줄 수 있습니다. 이러한 관점에서 우리는 해당 에러에 대해서 적절하게 "처리"했다라고 말할 수 있는데요. 그럼에도 Next나 CRA와 같은 프레임워크 단에서 여전히 에러에 관한 overlay를 보여줍니다. 이러한 현상에 대해 토론이 있었고 gaearon님의 견해에 대해서 공유하고자 합니다.

>네, 오류 경계는 오류를 잡아내는 방법입니다. 하지만 오류 경계는 UI의 일부입니다. 이는 다른 UI 요소와 마찬가지로 오류 경계가 보이지 않을 수 있음을 의미합니다. 예를 들어, display: none 속성이 적용된 트리 안에 있을 수 있습니다. z-index로 인해 다른 요소 뒤에 있을 수도 있습니다. 오류가 발생한 부분이 뷰포트의 위나 아래에 있을 수도 있습니다. 포탈(예: 툴팁) 안에 있을 수도 있습니다. 오류 경계가 매우 작아서 쉽게 놓칠 수도 있습니다. 이러한 모든 가능한 시나리오로 인해 오류를 전혀 인식하지 못할 위험이 있습니다.
>
>다음으로, 대부분의 오류는 사실 의도적인 것이 아니라 프로그래밍 오류라고 주장하고 싶습니다. 사람들은 항상 실수를 하고, 자바스크립트는 동적 언어입니다. 오타, null 참조, 크래시 등이 발생할 수 있습니다. 개발 과정에서 의도적인 오류보다 이런 오류가 훨씬 많이 발생합니다. 따라서 다른 경우에 약간의 불편을 주더라도 나쁜 오류를 조기에 잡아내는 경험을 최적화해야 합니다.
>
>또한, 이 경우 "잡힌" 오류와 "잡히지 않은" 오류의 구분은 실질적인 의미가 없습니다. 전체 앱을 하나의 경계로 감싸면 모든 오류가 "잡힌" 것으로 간주됩니다. 모든 앱은 경계를 가져야 하며, CRA와 Next 템플릿에 기본적으로 경계를 추가하여 사람들에게 이를 설계하도록 권장할 것입니다. 따라서 원칙적으로 "잡히지 않은" 오류는 없을 것입니다. 렌더링 오류에 대해 이 구분은 매우 의미가 없습니다.
>
>이 세 가지 이유로 인해 "잡힌 오류에 대해서는 대화 상자를 표시하지 않는다"는 식의 일괄적인 해결책을 권장하지 않습니다. 실제로 대부분의 오류는 "잡힌" 것으로 처리될 것이므로, 이는 사실상 오류 대화 상자를 제거하고 최선을 바라며 기다리는 것과 같습니다.
>
>원래 게시물처럼 일부 오류는 의도적이라는 점은 인정합니다. React에서 이를 구분할 수 있는 좋은 메커니즘은 아직 없습니다. 결국 도입할 수 있을 것입니다. 하지만 이러한 오류는 이미 콘솔에 표시되므로, 대화 상자가 특별한 방식으로 작동하는 것도 아닙니다. 대화 상자는 콘솔이 하는 일을 반영하려고 시도합니다.
>
>이런 경우 대화 상자가 방해된다는 점은 이해합니다. 타협안으로 다음과 같은 해결책을 제안합니다:
>
>ReferenceError 또는 TypeError의 경우 항상 대화 상자를 표시합니다. 예외는 없습니다.
>가능하다면 브라우저에서 생성된 네트워크 오류를 필터링하고 대화 상자에 표시하지 않습니다.
>다른 유형의 오류의 경우 오류가 경계에 의해 잡혔는지 확인합니다. 경계에 의해 잡힌 오류라면 대화 상자를 표시하지 않고 구석에 오류 표시기를 표시합니다 (Make it clearer in error overlay when error boundary has caught an error #6530 (comment)에서처럼). 오류 표시기를 클릭하면 대화 상자가 나타납니다. 오류 표시기에는 작은 삭제 버튼이 있어 대화 상자를 표시하지 않고도 오류 표시기를 제거할 수 있습니다. 오류가 예상된 경우 이를 사용할 수 있습니다.
>이렇게 하면 중요한 오류를 놓치지 않으면서도 대화 상자가 사용자 정의 경계를 방해하지 않도록 할 수 있습니다.
[원문](https://github.com/facebook/create-react-app/issues/6530#issuecomment-662914362)

결국 에러 또는 버그에 대해서 정상적으로 동작할 수 있도록 수정할 수 있음에도, 에러바운더리로 인해 그러한 에러가 눈에 띄지 않게 지나갈 수 있는 것을 염려하여 여전히 overlay로 에러가 발생했음을 알려준다고 볼 수 있습니다.