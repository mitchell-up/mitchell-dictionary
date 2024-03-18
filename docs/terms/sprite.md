---
title: Image Sprite
description: Blocking, Non-Blocking, 동기, 비동기에 대한 정리
keywords: [블로킹, 논블로킹, 동기, 비동기, blocking, non-blocking, javascript]
---

# Image Sprite
여러개의 이미지를 하나의 이미지로 합쳐 관리하는 이미지를 의미한다.
- 많은 이미지를 하나로 합쳐서 관리할 경우 하나의 파일만 네트워크 요청으로 가져올 수 있기 때문에 이미지 로드시간에 유리하다.
- 스프라이트 이미지는 CSS의 `background-image`와 `background-position`을 사용하여 원하는 위치의 이미지를 렌더하여 사용한다.
- img 태그를 사용하여 이미지를 로드하지 않기 때문에, 문서상의 중요도가 떨어지고 디자인 목적인 경우에 사용하기 적합하다.