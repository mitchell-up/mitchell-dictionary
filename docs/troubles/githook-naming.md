# Githook, Husky를 이용한 file name 규칙 검사하기

팀 내부적으로 file naming을 kebab-case(단어 구분을 하이픈으로 짓는 형식) 고정 하자는 규칙을 세웠던 적이 있습니다.
camelCase나 PascalCase로 하는 경우에 OS와 git의 기본옵션에 의해 파일명에서 대소문자 구분을 하지 않을 수 있기 때문에, 의도대로 파일명을 구분하지 못 할 수도 있기 때문이였습니다.

<br/>

## 문제의 원인
직접 파일명을 작성해야하는 인간에게 문제가 발생합니다. 파일명을 직접 작성해야하기 때문에 파일명을 다른 케이스로 충분히 작성할 위험이 있습니다. 따라서 이런 휴먼 에러를 제거하여 규칙이 잘 적용되도록 해야겠습니다.

<br/>

## 해결방안
해당 파일이 commit되기 전에, 파일명을 검사하고 kebab-case가 아니라면 commit을 강제종료시키도록 하여 파일명 수정을 유도하도록 해야겠습니다. 이를 위해 pre commit Git hook을 작성하여 커밋 전에 파일명을 검사하도록 하겠습니다.

<br/>

### Git Hook
Git Hook이란 git과 관련한 이벤트가 발생하는 경우, 특정 Shell Script를 실행할 수 있도록 해주는 기능입니다. 13가지의 클라이언트 hook이 존재하는데 여기에서는 `pre-commit`을 활용합니다.

`.git/hooks/` 폴더 안에 적용할 hook을 이름으로 Shell Script 파일을 생성합니다. `.git/hooks/pre-commit` 이런식으로 파일이 만들어질 수 있겠네요.

그런데 `.git/hooks/` 디텍로티에 스크립트를 위치시키면 git 변경사항에 반영이 되지 않아 원격 레포지토리 push를 통해 팀원들과 해당 스크립트를 공유할 수 없다는 단점이 있습니다.

<br/>

### Husky 사용하기
그러나 이러한 문제를 Husky를 통해서 해결할 수 있습니다. git hook을 `.husky` 폴더에 작성해두고 팀원과 해당 스크립트를 공유할 수 있도록 해줍니다.

1. Husky를 설치합니다.
```
npm install --save-dev husky
```

2. Husky 셋업을 실행합니다.
```
npx husky init
```

위 두 명령어를 통해 최종적으로 `.husky` 폴더와 그 안의 스크립트 파일들을 얻을 수 있습니다.

<br/>

### kebab-case를 검사하는 스크립트
pre-commit, 즉 commit이 실행되기 전에 스크립트를 실행시키기 위해서 `.husky/pre-commit`에 아래와 같이 코드를 작성합니다.

```bash
# staged인 모든 파일명들을 가져옵니다.
staged_files=$(git diff --cached --name-only --diff-filter=ACMR)

# kebab-case를 검사하는 정규표현식을 작성합니다.
kebab_case_regex='^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+)?$'

# 모든 파일명이 유효한지 검사하는 플래그를 지정합니다.
all_files_valid=true

# staged된 파일명을 순회하며 검사합니다.
# kebab-case가 아닌 파일명은 에러메시지를 보여줍니다.
for file in $staged_files; do
    # file의 basename만 가져옵니다.
    filename=$(basename "$file")

    # filename이 정규표현식에 일치하는지 검사합니다.
    if ! [[ $filename =~ $kebab_case_regex ]]; then
        echo "Error: File '$filename' is not in kebab case."
        all_files_valid=false
    fi
done

# 모든 파일명이 유효하지 않다면 프로세스를 종료합니다. (커밋 중단됨)
if [ "$all_files_valid" = false ]; then
    echo "Please rename the files to kebab case before committing."
    exit 1
fi

exit 0
```

이제 commit을 진행시 위의 스크립트가 먼저 실행되고 통과되어야 commit 프로세스가 정상적으로 종료됩니다.

