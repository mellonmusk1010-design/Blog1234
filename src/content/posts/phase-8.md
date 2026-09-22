---
title: "페이즈 8주차"
published: 2026-07-23
description: "Can you hear me?"
image: ""
tags:
  - Phase
category: "Phase"

protected: true
password: "I_Think_Linux_Is_Awesome"
---

# PE 파일 구조
- Portable Executable는 윈도우에서 실행되는 EXE, DLL 같은 실행 파일의 표준 형식이다
## PE Header (헤더 영역)
프로그램을 메모리에 올리고 실행하기 위해 필요한 정보들이 들어있는 부분이다 
	\* 운영체제가 프로그램을 어떻게 실행해야 하는지 알려주는 설명서 같은 역할을 한다
- DOS Header
	- PE 파일의 가장 앞부분이다
	- MZ 시그니처 4D 5A가 들어있으며 실행 파일이라는 것을 알려준다
		- MZ는 개발자 이니셜
- DOS Stu
	- 예전 DOS 환경과의 호환성을 위해 남아있는 코드이다
	- DOS에서 실행하면 THIS 어쩌고 문구를 출력하고 종료한다
	- 지금은 거의 의미가 없고 호환성을 위해 남아있는 정도이다
- NT Header
	- 리버싱할 때 가장 많이 보게 되는 중요한 부분이다
	- 여기서 실행에 필요한 핵심 정보들을 확인할 수 있다
	- PE Signature
		- PE\\0\\0
		- 여기부터가 본격적인 PE 구조의 시작이다
	- File Header
		- CPU 아키텍처
		- 섹션 개수
		- EXE인지 DLL인지 같은 파일 정보가 들어있다
	- Optional Header
		- 이름은 Optional이지만 실제로는 거의 필수인 정보들이다
		- EntryPoint, ImageBase처럼 프로그램이 메모리에 올라갈 때 필요한 정보들이 들어있다
- Section Header
	- 각 섹션의 이름, 크기, 메모리 위치, 접근 권한 등을 저장하는 부분이다
---
## PE Body (바디 영역)
실제로 프로그램이 실행될 때 사용하는 코드와 데이터가 들어있는 부분이다
- .text
	- CPU가 실제로 실행하는 기계어 코드가 들어있는 영역이다
	- 권한은 Read / Execute이다
- .rdata
	- 문자열이나 상수처럼 변경되지 않는 데이터가 들어있는 영역이다
	- 권한은 Read Only이다
- .data
	- 전역 변수나 static 변수처럼 실행 중 값이 바뀔 수 있는 데이터가 들어있는 영역이다
	- 권한은 Read / Write이다
- .idata
	- 프로그램이 사용하는 DLL과 API 함수 목록(Import 정보)이 저장되어 있다
	- 권한은 Read Only이다
- .rsrc
	- 아이콘, 버전 정보, 메뉴, UI 리소스 같은 데이터가 들어있는 영역이다
	- 권한은 Read Only이다
---
## NULL Padding
- 섹션 사이에 남는 공간을 00으로 채워 놓은 영역이다
- 파일과 메모리의 정렬(Alignment)을 맞추기 위해 존재한다
- 메모리에 올라갔을 때는 디스크에 저장된 파일보다 패딩이 더 커지는 경우가 많다
---
# x64dbg 단축키 & 명령어
## 단축키
- F2
	- 브레이크포인트(BP)를 설정하거나 해제한다
	- 지정한 위치에서 프로그램 실행을 멈춘다
- F7
	- Step Into
	- 함수 안으로 들어가면서 한 줄씩 실행한다
- F8
	- Step Over
	- 함수 안으로 들어가지 않고 실행만 하고 넘어간다
- F9
	- Run
	- 다음 브레이크포인트를 만날 때까지 계속 실행한다
- Ctrl + F9
	- Execute until Return
	- 현재 함수가 끝날 때까지 실행한다
- Alt + M
	- Memory Map 창을 연다
- G
	- 원하는 주소로 바로 이동하거나 그래프 뷰를 볼 때 자주 사용한다
- Space
	- 어셈블리 명령어를 직접 수정(Patch)한다
- Ctrl + P
	- 지금까지 수정한 패치 목록을 확인하거나 수정된 파일을 저장할 수 있다
---
## 명령어
- BP (BreakPoint)
	- 프로그램을 특정 위치에서 멈추게 하는 중단점이다
- cmp
	- 두 값을 비교하는 명령어이다
- je / jz
	- 비교 결과가 같으면(Zero Flag가 1이면) 해당 주소로 이동한다
- jne / jnz
	- 비교 결과가 다르면(Zero Flag가 0이면) 해당 주소로 이동한다
- jmp
	- 조건 없이 무조건 해당 주소로 이동한다

