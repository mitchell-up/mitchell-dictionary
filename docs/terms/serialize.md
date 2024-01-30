---
title: Serialize
description: Serialize의 정의
keywords: [serialize, data, structure]
---

# Serialize
> 직렬화는 컴퓨터 과학의 데이터 스토리지 문맥에서 데이터 구조나 오브젝트 상태를 동일하거나 다른 컴퓨터 환경에 저장하고 나중에 재구성할 수 있는 포맷으로 변환하는 과정이다. - 위키백과

더 쉽게 설명하자면, 직렬화는 메모리에 올라온 데이터구조나 오브젝트를 컴퓨터 **디스크에 저장하거나 네트워크롤 통해 전달 할 수 있는 형식으로 변환하는 과정**입니다.

예를 들어 서버가 유저정보를 아래와 같이 객체형태로 들고 있을 때 이 모양 그대로 네트워크를 통해서 유저정보를 전달할 수 없습니다. 이러한 객체는 단순히 하나의 값으로 들고 있는 것이 아니라 여러 값의 참조를 통해서 데이터를 가지고 있기 때문에 다른 컴퓨터에 도착한 상황에서는 전혀 다른 값으로 구성되어버리기 때문입니다.
```JavaScript
// User class
// 아래와 같이 class로 정의된 User 객체를 객체 그대로 네트워크를 통해 전달할 수 없음.
class User {
    constructor(id, name, phoneNumber) {
        this._id = id;
        this._name = name;
        this._phoneNumber = phoneNumber;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
}
```

따라서 위와 같은 유저정보는 다음과 같이 JSON 형태의 값으로 변환 후 클라이언트와 통신해야 합니다.
```JSON
{
    'id': '1239834',
    'name': 'mitchell',
    'phoneNumber': '010-1222-2221'
}
```