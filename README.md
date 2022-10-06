# moonbucks

[미션 저장소](https://github.com/blackcoffee-study/moonbucks-menu)

> 무조건 개발을 먼저 하지 말고 앞으로 나아가야 할 지도를 먼저 하자.  
> 하나의 요구사항은 구체적인 한 문장으로 작성하되 많은 것들을 담지 않도록 하자.

## Step1 - 돔 조작과 이벤트 핸들링으로 메뉴관리하기

### TODO 메뉴 추가

- [x] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
- [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
- [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.
- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
- [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.

### TODO 메뉴 수정

- [x] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
- [x] 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

### TODO 메뉴 삭제

- [x] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
- [x] 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.

---

## Step2 - 상태 관리로 메뉴 관리하기

### TODO localStorage Read & Write

- [x] localStorage에 데이터를 저장한다.(save)
  - [x] 메뉴를 추가할 때
  - [x] 메뉴를 수정할 때
  - [x] 메뉴를 삭제할 때
- [x] localStorage에 있는 데이터를 읽어온다.(read)

### TODO 카테고리별 메뉴판 관리

- [x] 에스프레소 메뉴판 관리
- [x] 프라푸치노 메뉴판 관리
- [x] 블렌디드 메뉴판 관리
- [ x 티바나 메뉴판 관리
- [ ]x디저트 메뉴판 관리

### TODO 페이지 접근시 최초 데이터 Read & Rendering

- [x] 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어온다.
- [x] 에스프레소 메뉴를 페이지에 그려준다.

### TODO 품절 상태 관리

- [ ] 품절 버튼을 추가한다.
- [ ] 품절 버튼을 클릭하면 localStrage에 상태값이 바뀐다.
- [ ] 품절 상태에 따라 페이지를 그려진다.
- [ ] 클릭이벤트에서 가장 가까운 li의 class 속성 값에 sold-out를 추가 또는 제거한다.
