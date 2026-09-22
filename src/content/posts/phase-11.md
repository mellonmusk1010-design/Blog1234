---
title: "페이즈 11주차 (pwnable)"
published: 2026-08-07
description: "Can you hear me?"
image: ""
tags:
  - Phase
category: "Phase"

protected: true
password: "I_Think_Linux_Is_Awesome"
---

# C언어 
## 주요 데이터 타입
C언어에서는 변수를 선언할 때 데이터의 종류랑 크기를 직접 지정해줘야 한다.
- `char`: 1바이트 (문자 1개를 저장한다. 아스키 문자를 저장하는 타입이다.)
- `short`: 2바이트 (정수를 저장한다.)
- `int`: 4바이트 (정수를 저장한다.)
- `포인터 (*)`: 메모리 주소를 저장한다. 가리키는 타입이 뭐든 상관없이 CPU 아키텍처 크기를 따라간다.
	- x86: 4바이트
	- x64: 8바이트
---
## 리틀 엔디언 (Little Endian)
1바이트보다 큰 데이터를 메모리에 저장할 때는 1바이트씩 쪼갠 다음 **낮은 주소부터 역순으로 저장**한다. 이걸 **리틀 엔디언**이라고 한다.
예를 들어 `int` 타입 데이터 `0x43245921`을 저장한다고 해보자.
```plain text
값
0x43245921

1바이트씩 분리
43 24 59 21

메모리 저장
21 59 24 43
```
즉, 값 자체가 바뀌는 게 아니라 **메모리에 저장되는 바이트 순서만 뒤집히는 거다.**
참고로 `char`는 1바이트라서 엔디언 영향을 받지 않는다.
---
## 배열(Array)
배열은 **같은 타입의 데이터를 연속된 메모리 공간에 저장**하는 자료구조다.
배열 전체가 뒤집히는 건 아니고, **각 요소 내부만 리틀 엔디언 규칙을 따른다.**
예를 들어
```c
short arr[2];

arr[0] = 0x4231;
arr[1] = 0xf32a;
```
메모리에는
```plain text
31 42 | 2a f3
```
이렇게 저장된다.
---
## 문자열
문자열은 **char 배열**이다.
컴퓨터는 문자열의 끝을 알아야 하니까 **맨 뒤에 항상 NULL(0x00)** 을 붙인다.
그래서
```c
char str[5] = "abcd";
```
메모리에는
```plain text
61 62 63 64 00
```
이렇게 저장된다.
즉 `"abcd"`는 실제로 **5바이트**를 사용한다.
---
# 사용자 입력 처리
키보드로 입력한 데이터는 바로 프로그램으로 들어가는 게 아니다.
```plain text
키보드 입력
        ↓
문자 생성
        ↓
UTF-8 변환
        ↓
입력 버퍼 저장
        ↓
엔터(0x0a)
        ↓
프로그램 전달
```
여기서 엔터를 누르면 **개행 문자(0x0a)** 가 같이 들어간다.
입력 함수마다 이걸 처리하는 방식이 다르다.
---
## scanf()
`scanf("%s")`
- 공백이나 개행을 만나면 입력을 끝낸다.
- 개행 문자는 문자열에 저장하지 않는다.
- 대신 마지막에 NULL(`0x00`)을 자동으로 붙여준다.
예를 들어
```plain text
입력

abcd↵
```
메모리
```plain text
61 62 63 64 00
```
### 주의
```c
char buf[8];
scanf("%7s", buf);
```
처럼 **버퍼 크기보다 1 작게** 길이를 제한해서 사용해야 한다.
길이를 제한하지 않으면 **버퍼 오버플로우(Buffer Overflow)** 가 발생할 수 있다.
---
## read()
`read()`는 입력된 바이트를 **그대로 메모리에 복사**한다.
- NULL을 자동으로 붙이지 않는다.
- 개행 문자(`0x0a`)도 그대로 저장한다.
예를 들어
```plain text
입력

abcd↵
```
메모리
```plain text
61 62 63 64 0a
```
NULL이 없기 때문에
```c
printf("%s", buf);
```
같은 문자열 함수는 어디까지 출력해야 하는지 몰라 뒤 메모리까지 계속 읽는다.
이 때문에 **메모리 유출(Leak)** 이 발생할 수도 있다.
---
# Pwntools 
## 자주 사용하는 데이터 타입
시스템 해킹에서는 아래 세 가지 타입을 계속 변환하면서 사용한다.
- `str`
- `bytes`
- `int`
### int → bytes
```python
data = str(123).encode()
```
결과
```python
b"123"
```
### bytes → int
```python
val = int(data.decode())
```
결과
```python
123
```
### 16진수 문자열 → 정수
```python
addr = int("0x401000", 16)
```
---
## 패딩
부족한 길이를 채울 때는
```python
ljust()
rjust()
```
를 사용한다.
예를 들어
```python
payload = b"A".ljust(16, b"\x00")
```
---
## pause()
```python
pause()
```
를 호출하면 프로그램이 잠시 멈춘다.
그 사이에 GDB를 Attach해서 디버깅하면 된다.
---
# Pwntools
Pwntools는 프로세스나 원격 서버와 데이터를 주고받는 작업을 자동화해주는 라이브러리다.
```python
from pwn import *

context.log_level = "debug"
```
`debug`로 설정하면 주고받는 모든 바이트를 출력해준다.
---
## 로컬 실행
```python
p = process("./chall")
```
---
## 원격 연결
```python
p = remote("phase.st", 5252)
```
---
## Packing
정수를 리틀 엔디언 바이트열로 변환한다.
```python
p64()
p32()
```
예를 들어
```python
payload = p64(0x40123a)
```
---
## Unpacking
바이트열을 정수로 변환한다.
```python
u64()
u32()
```
예를 들어
```python
leak = p.recvn(6)

addr = u64(leak.ljust(8, b"\x00"))
```
6바이트만 유출되면 뒤에 `\x00`을 붙여 8바이트로 만든 후 변환한다.
---
## 송수신 함수
### send()
```python
p.send(data)
```
개행을 붙이지 않는다.
보통 `read()` 기반 프로그램에서 사용한다.
---
### sendline()
```python
p.sendline(data)
```
자동으로 `\n`을 붙인다.
보통 `scanf()` 기반 프로그램에서 사용한다.
---
### sendafter()
```python
p.sendafter("Name : ", payload)
```
특정 문자열이 출력될 때까지 기다렸다가 전송한다.
---
### sendlineafter()
```python
p.sendlineafter("Name : ", payload)
```
`sendline()`과 `sendafter()`가 합쳐진 함수다.
---
### recvn()
```python
p.recvn(8)
```
정확히 n바이트를 읽는다.
---
### recvuntil()
```python
p.recvuntil("Name")
```
특정 문자열이 나올 때까지 읽는다.
---
### interactive()
```python
p.interactive()
```
쉘을 획득한 뒤 터미널 제어권을 사용자에게 넘겨준다.
---
# Docker
문제 서버와 동일한 libc 환경을 만들기 위해 Docker를 많이 사용한다.
---
## 이미지 빌드
```bash
docker build -t chall_img .
```
---
## 컨테이너 실행
```bash
docker run -d -p 7182:7182 --name=chall_container chall_img
```
---
# GDB Attach
WSL2 환경에서는 호스트에서 바로 GDB를 붙일 수 있다.
프로세스 찾기
```bash
ps -ef | grep chall
```
또는
```bash
pidof chall
```
GDB Attach
```bash
sudo gdb -p $(pidof chall)
```
---
# 메모리 익스플로잇
궁극적인 목표는 프로그램의 실행 흐름을 조작해서
```c
system("/bin/sh")
```
을 실행시키는 것이다.
---
## Stack Buffer Overflow (SBO)
버퍼보다 큰 데이터를 입력해서
- Saved RBP
- Return Address
를 덮어쓰는 취약점이다.
---
## Ret2win
SBO를 이용해서 Return Address를 `win()` 함수 주소로 덮어쓰는 기법이다.
함수가 `ret` 하는 순간 원래 호출한 곳이 아니라 `win()` 함수로 이동한다.
---
## Stack Canary
버퍼 오버플로우를 막기 위해 Return Address 앞에 8바이트 랜덤 값을 저장하는 보호 기법이다.
구조는
```plain text
Buffer
   ↓
Canary
   ↓
Saved RBP
   ↓
Return Address
```
Canary의 첫 바이트는 항상 `0x00`이다.
---
## Canary Leak
`read()`는 NULL을 자동으로 붙이지 않는다.
그래서 버퍼부터 Canary 첫 번째 NULL까지 덮어쓴 뒤
```c
printf("%s");
```
를 호출하면 NULL이 사라져 뒤의 Canary 값이 함께 출력된다.
예를 들어
```plain text
00 xx xx xx xx xx xx xx
```
에서
```plain text
xx xx xx xx xx xx xx
```
7바이트를 유출할 수 있다.
유출한 Canary를 그대로 다시 Payload에 넣으면 Canary 검사를 통과할 수 있다.
---
## NX (No Execute)
스택이나 힙에서 코드 실행을 막는 보호 기법이다.
NX가 꺼져 있으면
- 스택에 쉘코드를 저장하고
- Return Address를 쉘코드 주소로 덮는
**Ret2Shellcode** 공격이 가능하다.
---
## ASLR
프로그램이 실행될 때마다
- Stack
- Heap
- Libc
주소를 랜덤하게 변경하는 보호 기법이다.
그래서 실행할 때마다 주소가 달라진다.
---
## ROP (Return Oriented Programming)
NX 때문에 스택에서 코드를 실행하지 못하면 이미 존재하는 코드 조각(Gadget)을 이어 붙여 공격한다.
대표적인 가젯은
```plain text
pop rdi
ret
```
이다.
공격 순서는 다음과 같다.
### 1. Libc Leak
GOT에 저장된 실제 libc 주소를 유출한다.
↓
### 2. Libc Base 계산
유출한 주소에서 오프셋을 빼서 Libc Base를 구한다.
↓
### 3. system 주소 계산
`system()`과 `"/bin/sh"`의 주소를 계산한다.
↓
### 4. ROP Chain 구성
`pop rdi ; ret` 가젯으로 `"/bin/sh"` 주소를 RDI에 넣고 `system()`을 호출한다.
---
## `__environ`으로 Stack Leak
Libc에는
```plain text
__environ
```
이라는 전역 변수가 있다.
이 변수에는 현재 스택의 환경변수 주소가 저장되어 있다.
Libc Base는 구했는데 스택 주소도 필요하다면
```plain text
Arbitrary Read
        ↓
__environ 읽기
        ↓
Stack 주소 획득
```
과정을 통해 현재 스택 주소를 알아낼 수 있다.
```python
#임시 메모 
from pwn import *

context.log_level = 'debug'

# p64 , p 32 <-  정수를 바이트( 리틀앤디언 까지)

# u64, u32 <- 64비트, 32비트 바이트를 정수로 ( 리틀엔더인 까지)
# u64(b"\xff\xff\x29".ljust(8, b"\x00")) <- 이런식으로 u64를 쓸때는 패딩


# p = process("./ex") <- 로컬 형태로 p 에 저장
# p = remote("host3.dreamhack.games", 16801)  # <- 원격 형태로 p 에 저장

# # 키보드 입력 --> UTF-8 변환 --> 보고 --> 숫자 변환 --> 버퍼 저장 --> 엔터 기다리고 --> 개행 추가 --> 프로세스한테
# 사용자가  키 입력 -> utf-8 로 인코딩 -> p.sendline() 로 전송 
# p.sendline <- 사용자가 입력한 문자열을 utf-8로 인코딩하여 전송

# 인코딩 : 바이트를 정수로 변환
# 디코딩 : 정수를 바이트로 변환


# 입력
# p.send()
# p.sendline()  # 엔터까지 포함해서 전송
# p.sendlineafter()  # 엔터까지 포함해서 전송, 특정 문자열이 나올때까지 기다림
# p.sendafter()  # 특정 문자열이 나올때까지 기다림, 엔터는 포함하지 않음


# 출력
# recvn(n바이트)  n바이트 만큼 읽음 (반환)
# recvuntil(특정문자열)  특정 문자열이 나올때까지 읽음(반환)


#p.interactive()  사용자한테 입력을 넘기고, 출력도 사용자한테 보여줌



```

