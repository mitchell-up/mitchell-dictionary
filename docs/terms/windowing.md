# Windowing
페이지에서 엄청나게 많은 양의 콘텐츠를 렌더링해야 하는 경우 성능저하로 인한 문제가 발생할 수 있습니다. 이 때 사용자가 보고 있는 부분에 대해서만 렌더링하여 성능저하를 피할 수 있는데요. 이를 'Windowing' 기법이라고 합니다.

react에서는 react-window와 react-virtualized라는 라이브러리를 통해서 쉽게 'windowing' 기법을 활용한 렌더링을 구현할 수 있습니다.

