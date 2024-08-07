# 호스트객체와 네이티브 객체
자바스크립트의 객체는 크게 호스트와 네이티브로 구분할 수 있는데요. 자바스크립트 엔진 내에서의 역할과 생성 방법에 따라 구분됩니다.

## 네이티브 객체
ECMAScript 사양데 정의된 객체로, 언어 자체에 내장되어 있는 객체들을 의미합니다. 자바스크립트 언어를 사용하는 어느 곳(브라우저이든 Node.js이든)에서든 사용할 수 있는 객체입니다.

**주요 객체들**
- Object: 모든 객체의 기본 프로토타입
- Array: 배열 객체
- Function: 함수 객체
- String: 문자열 객체
- Number: 숫자 객체
- Boolean: 불리언 객체
- Date: 날짜 객체
- RegExp: 정규 표현식 객체
- Error: 오류 객체
- Map, Set, WeakMap, WeakSet: 컬렉션 객체
- Promise: 비동기 작업을 처리하기 위한 객체

<br/>

## 호스트 객체
자바스크립트 엔진이 포함된 실행 환경에서 제공하는 객체들을 의미합니다. 이 객체는 실행 환경이 브라우저인지 Node.js인지에 따라 어떤 객체를 사용할 수 있는지 달라집니다.

예를 들어, window 전역 객체는 브라우저에서만 존재하며, global 전영 객체는 Node.js에서만 존재합니다.