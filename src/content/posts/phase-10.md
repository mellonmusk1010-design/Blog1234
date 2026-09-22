---
title: "페이즈 10주차"
published: 2026-07-29
description: "Can you hear me?"
image: ""
tags:
  - Phase
category: "Phase"

protected: true
password: "I_Think_Linux_Is_Awesome"
---

---
## **Simple Patch Me**
프로그램이 365일이 흐르면  플래그를 출력한다고 적혀있다.
실제로 365일을 기다려도 되지만 너무 오래 걸리기에 
아마 문제 제목과 같이 365일 이라는 숫자를 0 으로 패치하면 될것같다
문자열 분석을 해본다..
![](/notion/phase-10-217fb26f-6a83-406f-9a2d-741a469654e2.png)
![](/notion/phase-10-904667c2-20ab-427e-8200-7d80a5250f86.png)
음? 0E10h 라는 수를 찾았다 계산해 보니 3600 정도 되는것 같다 저기를 0으로 덮으면 될것같다
왜 그런지 모르겠지만 일단 안되는것같다.
![](/notion/phase-10-62b23eb7-5607-4c95-956e-5aa62055a0dc.png)
---
![](/notion/phase-10-7438bac7-cbb3-41ba-9b79-6d7409896475.png)
흠.. 여기 while 문을 수정해봐야겠다
![](/notion/phase-10-280c893a-4256-415b-9240-9fad5b9349e9.png)
여기를 바꿔야 겠다
![](/notion/phase-10-b60d560d-0542-433b-b18e-efb06cd2a3a8.png)
세그폴트가 떴다???????
일단 첫번째 방법을 다시 시도해봤다
![](/notion/phase-10-93c74b44-19bf-4b48-86c0-958e475044fc.png)
0E10H 를 0으로 바꿔주고 다시 저장하면..
![](/notion/phase-10-24dfd7d7-aa3d-4803-8896-2d5e5fc66ff7.png)
이렇게 빠르게 스킵되면서 플래그가 나온다! ( 처음에 왜 실패한건지는 잘 모르겠다.)
