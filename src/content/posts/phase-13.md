---
title: "페이즈 13주차"
published: 2026-08-20
description: "Can you hear me?"
image: ""
tags:
  - Phase
category: "Phase"

protected: true
password: "I_Think_Linux_Is_Awesome"
---

# 네트워크 보안의 기본 요소
네트워크 보안을 볼 때 기본적으로 기밀성, 무결성, 가용성을 많이 이야기한다
여기에 통신 상대를 확인하기 위한 서버 인증과 클라이언트 인증도 같이 볼 수 있다
## 기밀성 
허가된 사용자만 데이터에 접근할 수 있게 하는 것이다
대표적으로 암호화, 접근 제어, VPN, TLS/HTTPS 같은 방법을 사용할 수 있다
예를 들어 HTTPS를 사용하면 로그인 정보나 개인정보가 네트워크를 통해 전달될 때 암호화된다
## 무결성 
데이터가 저장되거나 전송되는 과정에서 임의로 변경되지 않았는지를 확인하는 것이다
주로 해시, MAC, 디지털 서명, Checksum 등을 사용한다
파일을 다운로드한 뒤 SHA-256 값을 원본과 비교하는 것도 무결성을 확인하는 방법 중 하나다
## 가용성 Availability
허가된 사용자가 필요할 때 시스템이나 서비스를 정상적으로 사용할 수 있어야 한다는 의미다
DDoS나 서버 장애, 네트워크 장애, 장비 고장 등이 가용성을 떨어뜨릴 수 있다
이를 대비하기 위해 이중화, 로드밸런싱, 백업, 장애 복구 체계 등을 사용한다
## 서버 인증과 클라이언트 인증
내가 접속한 서버가 실제로 믿을 수 있는 서버인지 확인하는 과정이다
HTTPS에서는 TLS 인증서를 통해 서버의 신원을 확인한다
반대로 클라이언트 인증은 서버가 접속한 사용자가 누구인지 확인하는 것이다
비밀번호, 인증서, OTP, MFA, SSH 공개키 인증 등이 여기에 들어간다
# 프로토콜
 네트워크에서 장치끼리 통신하기 위해 정해 놓은 규칙이다
HTTP, TCP, IP, DNS, FTP 등이 전부 프로토콜에 해당한다
생각해보면 컴퓨터나 네트워크 장비를 만든 회사가 서로 달라도 통신할 수 있는 이유도 같은 표준 프로토콜을 사용하기 때문이다
## 프로토콜의 3요소
프로토콜에는 크게 구문,  의미, 순서가 있다
### 구문 
데이터를 어떤 형식으로 구성할 것인지 정한다
예를 들면 헤더의 길이나 필드의 위치, 데이터 크기, 비트 배열 같은 것이다
### 의미 
각 갑ㅅ이 어떤 의미를 가지는지 정한다
예를 들어 TCP의 SYN 값이 설정되어 있으면 연결을 요청한다는 의미로 해석할 수 있다
# 프로토콜
## 주소 설정
네트워크에서는 목적지에 따라 여러 종류의 주소를 사용한다
- IP 주소 → 네트워크상의 장치를 구분
- MAC 주소 → 같은 LAN 내부에서 장치를 구분
- Port 번호 → 한 장치 안에서 실행되는 프로그램을 구분
## 순서 제어
데이터가 여러 개로 나뉘어 전송되더라도 올바른 순서로 처리할 수 있게 한다
TCP에서는 Sequence 넘버를 사용한다
## 단편화 재조합
큰 데이터를 한 번에 보낼 수 없는 경우 전달 가능한 크기로 나누고 수신 측에서 다시 합친다
## 캡슐화
데이터가 네트워크 계층을 내려가면서 각 계층에 필요한 헤더가 붙는 과정이다
```plain text
데이타
↓
TCP 해더 + 데이터
↓
IP 헤더   + TCP 세그먼트
↓
이너넷 해더 + 패킷
```
반대로 수신하는 쪽에서는 헤더를 하나씩 확인하고 제거하는데 이를 역캡슐화라고 한다
## 연결 제어
통신을 시작하기 전에 연결을 만들고 통신이 끝나면 연결을 종료하는 기능이다
TCP가 대표적인 연결 지향 프로토콜이다
## 흐름 제어
송신자가 데이터를 너무 빠르게 보내서 수신자가 처리하지 못하는 상황을 막는다
TCP의 Window 기능이 여기에 관련돼 있다
## 오류 제어
데이터가 손실되거나 손상됐는지 확인하고 필요한 경우 다시 전송한다
Checksum, ACK, 재전송 등이 사용된다
## 다중화
한 컴퓨터에서 여러 프로그램이 동시에 네트워크를 사용할 수 있게 구분하는 것이다
TCP와 UDP에서는 Port 번호를 이용한다
# 네트워크 계층화
네트워크 통신에는 주소 지정, 오류 처리, 데이터 전송, 실제 신호 전달처럼 해야 할 일이 굉장히 많다
이걸 하나의 구조에서 전부 처리하는 것이 아니라 역할에 따라 여러 계층으로 나눠놓은 것이 네트워크 계층 구조다
계층을 나누면 기능별 역할이 명확해지고 문제가 생겼을 때 어느 부분에서 문제가 발생했는지 찾기도 쉬워진다
또 특정 계층의 기술이 바뀌더라도 전체 네트워크 구조를 다시 만들 필요가 없다는 장점도 있다
# OSI 7계층
OSI 모델은 네트워크 통신을 7개의 계층으로 나눈 모델이다
위에서부터 보면 다음과 같다
- 7계층 응용 계층
- 6계층 표현 계층
- 5계층 세션 계층
- 4계층 전송 계층
- 3계층 네트워크 계층
- 2계층 데이터링크 계층
- 1계층 물리 계층
( 1계층이 물리 계층인걸 외워 둬야 한다…… 거꾸로 알고있었어서 중간고사에서 틀렸다….)
## 1 물리 계층
0과 1의 비트를 실제 전기 신호, 광 신호, 전파 등으로 변환해서 전달한다
케이블, 커넥터, 전압, 주파수, 전송 속도 등이 여기에 관련된다
PDU는 Bit이고 대표적인 장비로  허브, 리피터, 모뎀등이 있다
## 2 데이터링크 계층
같은 네트워크 안에서 MAC 주소를 이용해 프레임을 전달한다
PDU는 Frame이다
스위치가  대표적인 장비다
## 3 네트워크 계층
IP 주소를 사용해서 서로 다른 네트워크 사이에 패킷을 전달한다
라우터가 대표적인 장비다
PDU는 Packet이다
## 4전송 계층
TCP나 UDP를 이용해 장치 안의 특정 프로그램까지 데이터를 전달한다
포트 번호를 사용한다
## 5세션 계층
통신 세션을 생성하고 유지하고 종료하는 역할을 한다
## 6 표현 계층
데이터의 형식을 변환하거나 압축, 암호화 등을 처리한다
## 7 응용 계층
사용자와 가장 가까운 계층이다
HTTP, DNS, FTP 같은 실제 네트워크 서비스를 제공한다
# TCP/IP 4계층
실제 인터넷에서는 TCP/IP 4계층 구조도 많이 사용한다
OSI 7계층을 조금 더 크게 묶었다고 생각하면 이해하기 쉽다
## 응용 계층
OSI의 응용, 표현, 세션 계층에 해당한다
HTTP, DNS, FTP, SSH 등이 있다
## 전송 계층
OSI의 전송 계층에 해당한다
TCP와 UDP를 사용한다
## 인터넷 계층
OSI의 네트워크 계층에 해당한다
IP, ICMP와 라우팅 등이 여기에 들어간다
## 네트워크 접근 계층
OSI의 데이터링크 계층과 물리 계층에 해당한다
Ethernet이나 Wi-Fi 등이 있다
# 물리 계층
물리 계층에서는 데이터를 실제 신호로 전달해야 하기 때문에 케이블 규격도 중요하다
 CAT는 Category의 약자다 
![](/notion/phase-13-65814981-3690-46fa-a4b8-4c42288916f7.png)
## UTP
차폐 처리가 없는 꼬임선 케이블이다
비교적 저렴하고 설치가 쉬워서 일반적인 LAN 환경에서 많이 사용된다
## STP
케이블에 차폐 처리를 해서 외부 전자기 간섭을 줄인 방식이다
# 허브 & 스위치
## Hub
허브는 한 포트에서 데이터를 받으면 다른 모든 포트로 데이터를 보낸다
MAC 주소를 보고 목적지를 판단하지 않는다
그래서 같은 충돌 영역을 공유하고 불필요한 트래픽도 많이 발생한다
물리 계층 장비에 해당한다
## Switch
스위치는 프레임의 MAC 주소를 확인한 뒤 필요한 포트로만 데이터를 보낸다
MAC Address Table을 사용해서 어느 MAC 주소가 어느 포트에 있는지 기억한다
쉽게 생각하면 허브는 받은 데이터를 거의 전체에 뿌리고 스위치는 목적지를 확인한 다음 필요한 곳으로만 보내는 방식이다
# 데이터링크 계층
데이터링크 계층은 같은 네트워크 내부에서 데이터를 전달하는 역할을 한다
MAC 주소를 사용하며 PDU는 Frame이다
주요 장비로 Switch, Bridge, Wireless AP, NIC 등이 있다
## MAC 주소
MAC 주소는 NIC에 사용되는 하드웨어 주소다
일반적으로 48bit, 즉 6Byte로 구성된다
예를 들면 다음과 같은 형태다
```plain text
00:1A:2B:3C:4D:5E
```
일반적인 MAC 주소는 앞부분이 제조사 식별에 사용되고 뒷부분이 장치를 식별하는 데 사용된다
## Ethernet 프레임
Ethernet은 유선 LAN에서 가장 많이 사용하는 데이터링크 방식이다
Ethernet 프레임에는 대략 이런 정보들이 들어간다
- Preamble → 송수신 동기화
- SFD → 프레임 시작 표시
- Destination MAC → 목적지 MAC 주소
- Source MAC → 출발지 MAC 주소
- EtherType → 상위 계층 프로토콜 표시
- Payload → 실제 데이터
- FCS → CRC를 이용한 오류 검출
## 데이터링크 계층의 주요 프로토콜
**Ethernet**은 유선 LAN에서 가장 많이 사용하는 표준이다
**IEEE 802.11**은 Wi-Fi 무선 LAN에서 사용된다
**PPP**는 두 지점 사이의 Point-to-Point 연결에서 사용한다
**HDLC**는 직렬 회선에서 사용할 수 있는 데이터링크 프로토콜이다
**IEEE 802.1Q**는 Ethernet 프레임에 VLAN 정보를 추가하는 표준이다
하나의 물리적인 스위치 네트워크를 여러 논리적인 네트워크로 나눌 때 사용한다
# 스위칭 원리
스위치는 MAC Address Table을 이용한다
프레임이 들어오면 출발지 MAC 주소를 보고 어떤 포트에 어떤 장치가 연결돼 있는지 학습한다
## Learning
프레임의 Source MAC 주소와 들어온 포트를 저장한다
```plain text
AA:AA:AA:AA:AA:AA → Port 1
```
## Forwarding
목적지 MAC 주소가 테이블에 있다면 해당 포트로만 프레임을 보낸다
## Flooding
목적지 MAC 주소를 모르는 경우에는 프레임을 받은 포트를 제외한 다른 포트로 전송한다
## Filtering
출발지와 목적지가 같은 포트 방향에 있다면 다른 포트로 굳이 프레임을 보내지 않는다
## Aging
오랫동안 사용되지 않은 MAC 주소 정보는 일정 시간이 지나면 MAC Address Table에서 제거된다
# 네트워크 계층
네트워크 계층은 서로 다른 네트워크 사이에서 데이터를 전달하는 계층이다
IP 주소를 사용하고 PDU는 Packet이다
핵심 기능은 IP 주소 지정과 라우팅이다
# IPv4
IPv4 주소는 32bit로 이루어져 있다
```plain text
192.168.1.10
```
IP는 기본적으로 Best Effort 방식이다
쉽게 말하면 IP 자체는 패킷이 무조건 도착한다거나 순서대로 도착한다거나 손실되면 다시 보내준다는 것을 보장하지 않는다
이런 신뢰성 기능이 필요한 경우 상위 계층의 TCP 등이 처리한다
## IPv4 헤더
IPv4 헤더에는 여러 정보가 포함된다
- Version → IP 버전
- IHL → IP 헤더 길이
- DSCP / ECN → 트래픽 우선순위와 혼잡 관련 정보
- Total Length → 전체 패킷 길이
- Identification → 단편화된 패킷 식별
- Flags → 단편화 제어
- Fragment Offset → 단편의 위치
- TTL → 패킷의 생존 범위
- Protocol → TCP, UDP, ICMP 등의 상위 프로토콜
- Header Checksum → IPv4 헤더 오류 검사
- Source IP → 출발지 IP
- Destination IP → 목적지 IP
## TTL
TTL은 라우터를 하나 지나갈 때마다 1씩 감소한다
값이 0이 되면 패킷은 폐기된다
만약 라우팅 설정 문제로 패킷이 계속 같은 경로를 돌게 되더라도 네트워크 안에서 영원히 돌아다니는 것을 막아주는 역할을 한다
# IP 주소 클래스와 사설 IP
과거에는 IPv4 주소를 A부터 E까지의 Classful 방식으로 나눴다
- A Class → 1\~126, 기본 /8
- B Class → 128\~191, 기본 /16
- C Class → 192\~223, 기본 /24
- D Class → 224\~239, 멀티캐스트
- E Class → 240\~255, 예약 또는 실험 용도
현재는 클래스 방식보다 CIDR 표기를 주로 사용한다
## 사설 IP
사설 IP는 인터넷에서 직접 공인 IP로 라우팅되지 않고 내부 네트워크에서 사용하는 주소다
대표적인 범위는 다음과 같다
```plain text
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```
사설 IP를 사용하는 장치가 인터넷에 접속할 때는 일반적으로 NAT를 이용해 공인 IP와 변환한다
# ARP
ARP는 Address Resolution Protocol의 약자다
같은 IPv4 LAN에서 상대방의 IP 주소는 알고 있지만 MAC 주소를 모를 때 사용한다
예를 들어 192.168.1.1의 MAC 주소를 알아내야 한다면 먼저 ARP Request를 보낸다
이 Request는 같은 브로드캐스트 도메인에 전달되고 해당 IP를 가진 장치가 자신의 MAC 주소를 ARP Reply로 알려준다
받은 정보는 ARP Cache에 저장된다
# RARP
RARP는 Reverse Address Resolution Protocol의 약자다
ARP와 반대로 MAC 주소를 이용해서 자신의 IP 주소를 알아내는 방식이다
과거에는 디스크가 없는 장비 등에서 사용됐지만 현재는 BOOTP나 DHCP 같은 방식으로 대체되어 거의 사용되지 않는다
# ICMP
ICMP는 Internet Control Message Protocol이다
IP 통신 중 발생하는 오류를 알려주거나 네트워크 상태를 확인할 때 사용된다
대표적으로 ping에서 Echo Request와 Echo Reply를 사용한다
Destination Unreachable은 목적지에 도달할 수 없을 때 사용되고 Time Exceeded는 TTL이 0이 되었을 때 발생한다
traceroute 계열 도구도 이 특성을 이용한다
# IGMP
IGMP는 Internet Group Management Protocol이다
IPv4 네트워크에서 호스트가 어떤 멀티캐스트 그룹에 가입했는지 관리하는 데 사용된다
그룹 가입, 탈퇴, 구성원 확인 등을 처리하며 IPTV 같은 멀티캐스트 기반 서비스에서 볼 수 있다
# 라우터와 라우팅
라우터는 목적지 IP 주소를 보고 서로 다른 네트워크 사이에서 패킷을 전달한다
Layer 3 Switch도 일반적인 스위칭 기능뿐만 아니라 IP 라우팅을 수행할 수 있다
라우터는 패킷을 어디로 보낼지 결정하기 위해 Routing Table을 사용한다
라우팅 테이블에는 보통 다음과 같은 정보가 들어간다
- Destination Network
- Subnet Mask 또는 Prefix
- Next Hop
- Outgoing Interface
- Metric
## Longest Prefix Match
라우팅 테이블에서 목적지에 해당하는 경로가 여러 개 존재하면 가장 구체적인 경로를 선택한다
예를 들어 아래 세 경로가 있다고 해보자
```plain text
10.0.0.0/8
10.10.0.0/16
10.10.10.0/24
```
목적지가 10.10.10.100이라면 세 범위에 전부 포함되지만 가장 구체적인 /24 경로가 선택된다
# 정적 라우팅과 동적 라우팅
## 정적 라우팅
관리자가 직접 목적지 네트워크와 다음 경로를 설정하는 방식이다
구조가 단순하고 관리자가 경로를 정확하게 통제할 수 있다는 장점이 있다
반면 네트워크 규모가 커지면 관리하기 어려워지고 장애가 발생해도 별도 설정이 없다면 자동으로 우회하기 어렵다
## 동적 라우팅
라우터끼리 라우팅 정보를 주고받으면서 경로를 자동으로 학습하는 방식이다
### RIP
Hop Count를 기준으로 경로를 선택한다
최대 15 Hop까지 정상 경로로 취급한다
### OSPF
Link State 방식의 IGP다
Cost를 기준으로 경로를 계산한다
### EIGRP
Cisco에서 개발한 라우팅 프로토콜이다
관련 사양은 공개되어 있지만 실제 환경에서는 Cisco 장비와 관련해서 많이 볼 수 있다
### BGP
인터넷에서 서로 다른 AS 사이의 경로 정보를 교환하는 핵심 라우팅 프로토콜이다
# 전송 계층
전송 계층은 네트워크를 통해 전달된 데이터를 컴퓨터 안에서 실행 중인 특정 프로그램까지 넘겨주는 역할을 한다
대표 프로토콜은 TCP와 UDP다
여기에서 Port Number를 사용한다
# 포트 번호
Port Number는 16bit라서 0부터 65535까지 사용할 수 있다
범위는 크게 세 종류로 나뉜다
- Well-Known Ports → 0 \~ 1023
- Registered Ports → 1024 \~ 49151
- Dynamic / Private Ports → 49152 \~ 65535
자주 보게 되는 포트는 어느 정도 기억해두면 좋을 것 같다
- FTP → TCP 20 / 21
- SSH → TCP 22
- Telnet → TCP 23
- SMTP → TCP 25
- DNS → UDP / TCP 53
- TFTP → UDP 69
- HTTP → TCP 80
- POP3 → TCP 110
- IMAP → TCP 143
- SNMP → UDP 161
- HTTPS → 443
# TCP
TCP는 Transmission Control Protocol의 약자다
연결 지향형 프로토콜이며 데이터를 안정적으로 전달하기 위한 여러 기능이 있다
- 연결 설정
- 순서 보장
- 손실 시 재전송
- 흐름 제어
- 오류 제어
- 혼잡 제어
## TCP 3-Way Handshake
TCP 연결을 처음 생성할 때 사용하는 과정이다
```plain text
Client → Server
SYN

Server → Client
SYN + ACK

Client → Server
ACK
```
이 과정이 끝나면 TCP 연결이 성립한다
## TCP 연결 종료
일반적인 정상 종료에서는 양쪽이 각각 자신의 전송 방향을 종료해야 한다
그래서 보통 다음과 같이 설명한다
```plain text
FIN
↓
ACK
↓
FIN
↓
ACK
```
## TCP 헤더
TCP 헤더에는 다음과 같은 정보들이 들어간다
- Source Port
- Destination Port
- Sequence Number
- Acknowledgment Number
- Data Offset
- Flags
- Window Size
- Checksum
- Urgent Pointer
Sequence Number는 데이터의 순서를 확인할 때 사용하고 Acknowledgment Number는 다음에 받아야 할 데이터의 번호와 관련된다
Window Size는 수신 측에서 현재 받을 수 있는 데이터의 양과 관련된다
## TCP Flags
**SYN**
연결 설정을 요청할 때 사용한다
**ACK**
확인 응답이 유효하다는 것을 나타낸다
**FIN**
정상적으로 연결을 종료할 때 사용한다
**RST**
연결을 즉시 초기화하거나 종료한다
**PSH**
수신한 데이터를 응용 프로그램에 빠르게 전달하도록 요청한다
**URG**
Urgent Pointer가 유효하다는 것을 표시한다
## 흐름 제어
수신자가 처리할 수 있는 양보다 너무 많은 데이터가 한꺼번에 전달되지 않도록 조절한다
TCP의 Sliding Window와 Window Size가 관련돼 있다
## 오류 제어
Sequence Number, ACK, Checksum, Timeout, 재전송 등을 이용해 데이터 손실이나 순서 문제를 처리한다
## 혼잡 제어
흐름 제어가 수신자의 처리 능력을 보는 것이라면 혼잡 제어는 네트워크 자체가 너무 혼잡해지는 것을 막는 기능이다
대표적으로 다음과 같은 개념이 있다
- Slow Start
- Congestion Avoidance
- Fast Retransmit
- Fast Recovery
# UDP
UDP는 User Datagram Protocol의 약자다
TCP와 달리 연결을 먼저 생성하지 않는 비연결형 프로토콜이다
TCP보다 구조가 단순하고 기본적인 ACK, 순서 보장, 재전송 기능 등이 없다
대신 연결을 만드는 과정이 없고 헤더도 작아서 낮은 지연이 필요한 통신에 사용할 수 있다
DNS, VoIP, 실시간 게임, 스트리밍, DHCP 같은 곳에서 사용된다
다만 UDP를 사용한다고 해서 항상 신뢰성 기능이 없는 것은 아니고 필요하다면 UDP 위에서 동작하는 응용 프로토콜이 직접 관련 기능을 구현할 수도 있다
## UDP 헤더
UDP 헤더는 8Byte로 구조가 상당히 단순하다
- Source Port
- Destination Port
- Length
- Checksum
## TCP와 UDP
쉽게 생각하면 TCP는 데이터가 제대로 도착하는 것이 중요한 통신에 적합하고 UDP는 빠른 전송과 낮은 지연이 중요한 통신에 적합하다
TCP는 연결과 순서, 재전송 등의 기능을 제공하는 대신 구조가 더 복잡하고 UDP는 이런 기본 기능이 없는 대신 단순하다
# 응용 계층 프로토콜
응용 계층에는 실제로 사용자가 사용하는 여러 네트워크 서비스가 있다
대표적으로 HTTP, FTP, SSH, Telnet, SMTP, DNS, TFTP, POP3, IMAP, RPC, NetBIOS, SNMP 등이 있다
# FTP
FTP는 File Transfer Protocol의 약자다
파일 전송을 위해 사용하는 프로토콜이다
TCP 21은 제어 연결에 사용하며 전통적인 Active Mode에서는 TCP 20을 데이터 연결에 사용한다
기본 FTP는 데이터가 평문으로 전달되기 때문에 보안이 필요한 경우 FTPS나 SFTP 같은 방식을 사용한다
# SSH
SSH는 Secure Shell의 약자다
암호화된 원격 접속을 제공하며 기본적으로 TCP 22를 사용한다
원격 명령 실행, 파일 전송, 터널링, 포트 포워딩 등에 사용할 수 있다
인증에는 비밀번호나 공개키 인증 등을 사용할 수 있다
# Telnet
Telnet은 원격 터미널 접속을 제공하며 대표 포트는 TCP 23이다
통신 내용을 기본적으로 암호화하지 않기 때문에 네트워크 중간에서 내용을 볼 수 있다는 문제가 있다
그래서 현재 원격 관리에서는 대부분 SSH를 사용하는 것 같다
# SMTP
SMTP는 Simple Mail Transfer Protocol의 약자다
메일을 보내거나 메일 서버끼리 메일을 전달할 때 사용한다
TCP 25, 587, 465 등이 사용되며 실제 용도와 TLS 적용 방식에 따라 포트가 달라진다
# DNS
DNS는 Domain Name System의 약자다
사람이 기억하기 쉬운 도메인 이름을 IP 주소 등의 정보와 연결해주는 시스템이다
예를 들면 이런 식이다
```plain text
www.example.com
↓
IPv4 또는 IPv6 주소
```
기본적으로 UDP 53을 많이 사용하지만 큰 응답이나 Zone Transfer 같은 특정 상황에서는 TCP 53도 사용할 수 있다
## 주요 DNS Record
**A**
도메인 이름을 IPv4 주소와 연결한다
**AAAA**
도메인 이름을 IPv6 주소와 연결한다
**CNAME**
다른 이름의 별칭을 지정한다
**MX**
메일 서버 정보를 지정한다
**NS**
권한 있는 네임 서버 정보를 지정한다
**TXT**
문자열 형태의 정보를 저장한다
**PTR**
역방향 DNS 조회에 사용한다
# TFTP
TFTP는 Trivial File Transfer Protocol의 약자다
UDP 69를 사용하며 FTP보다 구조가 훨씬 단순하다
사용자 인증이나 암호화 기능도 기본적으로 제공하지 않는다
네트워크 장비의 설정 파일 전송이나 PXE 부팅 같은 환경에서 사용할 수 있다
# HTTP와 HTTPS
## HTTP
HTTP는 HyperText Transfer Protocol의 약자다
웹 브라우저와 웹 서버가 데이터를 주고받을 때 사용하는 대표적인 프로토콜이다
HTTP/1.1과 HTTP/2는 일반적으로 TCP 위에서 동작하며 기본 HTTP 포트는 TCP 80이다
## HTTPS
HTTPS는 HTTP에 TLS를 적용해서 보안을 추가한 방식이다
대표 포트는 443이다
HTTPS를 사용하면 기밀성, 무결성, 서버 인증 등을 확보할 수 있다
HTTP/3의 경우 QUIC을 사용하며 UDP 위에서 동작한다
## HTTP Method
**GET**
데이터를 조회할 때 사용한다
**POST**
데이터를 전송하거나 생성 요청을 할 때 사용한다
**PUT**
자원 전체를 교체하는 성격의 요청이다
**PATCH**
자원의 일부를 수정한다
**DELETE**
자원을 삭제한다
**HEAD**
본문 없이 헤더 중심의 응답을 요청한다
## HTTP 상태 코드
**1xx**
정보 응답
**2xx**
요청 성공
대표적으로 200 OK가 있다
**3xx**
리다이렉션
대표적으로 301 Moved Permanently가 있다
**4xx**
클라이언트 측 요청 오류
대표적으로 404 Not Found가 있다
**5xx**
서버 측 오류
대표적으로 500 Internal Server Error가 있다
# POP3와 IMAP
둘 다 이메일을 받을 때 관련된 프로토콜이지만 동작 방식에 차이가 있다
## POP3
POP3는 Post Office Protocol Version 3의 약자다
메일 서버에 있는 메일을 클라이언트로 가져오는 방식에 적합하다
기본적으로 TCP 110을 사용하고 TLS를 사용하는 경우 TCP 995를 사용할 수 있다
## IMAP
IMAP은 Internet Message Access Protocol의 약자다
메일을 서버에 둔 상태로 여러 장치에서 같은 메일함 상태를 동기화하기에 적합하다
기본적으로 TCP 143을 사용하고 TLS를 사용하는 경우 TCP 993을 사용한다
여러 장치에서 메일의 읽음 상태나 폴더를 같이 관리하려면 IMAP이 편한 방식이다
# RPC
RPC는 Remote Procedure Call의 약자다
다른 컴퓨터에 있는 함수나 서비스를 마치 내 컴퓨터에 있는 함수처럼 호출할 수 있게 하는 방식이다
분산 시스템이나 운영체제 서비스, NFS 같은 여러 환경에서 사용된다
하나의 특정 프로토콜이라기보다는 원격 호출을 구현하기 위한 기술이나 프로토콜 계열을 말한다고 보는 편이 이해하기 쉬운 것 같다
# NetBIOS
NetBIOS는 Network Basic Input/Output System의 약자다
과거 Windows LAN 환경에서 이름 조회, 데이터그램, 세션 통신 등에 많이 사용됐다
- UDP 137 → NetBIOS Name Service
- UDP 138 → NetBIOS Datagram Service
- TCP 139 → NetBIOS Session Service
현재 Windows 파일 공유에서는 NetBIOS를 거치지 않고 SMB가 TCP 445를 직접 사용하는 경우가 일반적이다
# SNMP
SNMP는 Simple Network Management Protocol의 약자다
라우터, 스위치, 서버, 프린터, 방화벽 같은 장비의 상태를 원격으로 확인하거나 관리할 때 사용한다
UDP 161은 일반적인 요청과 응답에 사용하고 UDP 162는 Trap이나 알림 수신에 사용한다
## Manager
네트워크 장비의 정보를 요청하고 관리하는 시스템이다
## Agent
관리 대상 장비에서 실행되며 장비 정보를 Manager에게 제공한다
## MIB
Management Information Base의 약자다
관리할 수 있는 정보가 계층적인 구조로 정의되어 있다
## OID
Object Identifier의 약자다
MIB 안에서 각각의 관리 항목을 구분하는 식별자다
# 전체 데이터 전달 흐름
마지막으로 웹 사이트에 접속하는 상황을 기준으로 전체 흐름을 생각해보면 이해하기 쉽다
먼저 응용 계층에서 HTTP나 HTTPS 데이터가 만들어진다
그 다음 전송 계층에서 TCP나 UDP 헤더와 Port 정보가 붙는다
네트워크 계층에서는 출발지와 목적지 IP 주소가 들어간 IP 헤더가 추가된다
데이터링크 계층에서는 Ethernet 헤더와 MAC 주소 정보가 추가된다
마지막으로 물리 계층에서 이 데이터를 실제 비트 신호로 만들어 네트워크를 통해 전달한다
```plain text
응용 계층
HTTP / HTTPS 데이터
↓
전송 계층
TCP / UDP + Port
↓
네트워크 계층
IP + IP Address
↓
데이터링크 계층
Ethernet + MAC Address
↓
물리 계층
Bit / 실제 신호
```
송신 측에서 이렇게 계층별로 정보를 추가하는 과정이 **캡슐화 Encapsulation**이고
수신 측에서 반대로 헤더를 하나씩 확인하면서 원래 데이터를 꺼내는 과정이 **역캡슐화 Decapsulation**이다
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
![](/notion/phase-13-104d2f64-4efc-494e-bf9c-59bbce04a7bc.png)
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
![](/notion/phase-13-9037d9f0-9f53-4562-8c87-e35c33128d63.png)
![](/notion/phase-13-b54177d3-8a94-4268-9199-4387caec34c5.png)
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
![](/notion/phase-13-cde580af-7d36-4666-bacb-5fcaf5050906.png)
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
![](/notion/phase-13-1339aa91-1c3c-4462-9389-f8314e7f4f37.png)
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
![](/notion/phase-13-01ad200d-599d-4687-9334-88c1b861bb7c.png)
Ubuntu2에서도 같은 방식으로 확인할 수 있다
```bash
ip neigh show 192.168.81.135
```
원래 Ubuntu1의 MAC 주소인
```plain text
00:0c:29:80:98:fb
```
가 들어가 있어야 하지만 공격이 적용되면 Kali의 MAC 주소로 변경된다
![](/notion/phase-13-a3b89758-7e0a-4598-8771-f56345fbce55.png)
결국 IP 주소 자체는 Ubuntu1과 Ubuntu2 그대로인데 해당 IP와 연결된 MAC 주소만 공격자의 MAC 주소로 속게 되는 것이다
---
## 분석
이번에 arpspoof를 실행했을 때 한 번만 ARP Reply를 보내고 끝나는 것이 아니라 같은 내용이 계속 반복해서 전송됐다
처음에는 왜 계속 보내는지 궁금했는데 생각해보면 실제 호스트도 계속 ARP 통신을 하기 때문에 한 번만 거짓 정보를 보내면 나중에 정상 정보로 다시 바뀔 수 있다
그래서 공격자는 거짓 ARP Reply를 반복해서 보내 피해자의 ARP 캐시를 계속 오염시키는 방식으로 동작하는 것 같다
Wireshark에서 ARP 패킷을 확인할 때도 이런 반복적인 ARP Reply를 확인할 수 있다
**arp.opcode == 2 **필터를 사용하면 ARP 패킷만 볼 수 있다
![](/notion/phase-13-d02d106b-97fb-4130-9e87-8ec2dc4be3b5.png)
# ARP 스푸핑 방어
ARP 스푸핑이 가능한 가장 큰 이유는 ARP 자체에 인증 기능이 없기 때문이다
받은 ARP Reply가 진짜 해당 IP를 가진 장치에서 온 것인지 확인하지 않고 캐시에 저장한다
찾아보니 중요한 시스템에서는 IP와 MAC 주소의 관계를 정적으로 지정하는 Static ARP를 사용할 수 있다
또 스위치에서는 DHCP Snooping 정보를 이용해 잘못된 ARP 패킷을 차단하는 DAI 같은 방법도 사용할 수 있다
arpwatch처럼 ARP 테이블의 변화를 감시해서 IP와 MAC 주소 관계가 갑자기 변경되는 것을 탐지하는 방법도 있다
