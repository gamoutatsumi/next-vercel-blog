---
title: さくらVPSのCentOS7でIPv6アドレスを取得してVyOSとOpenVPN over IPv6して拠点間通信する
categories:
  - linux
  - 日記
  - VyOS
date: 2020-01-28T10:00:19.751Z
description: とりあえず一段落したのでアウトプットしたいなと。主にVyOSの勉強の為にやったのでCentOSに関しては割愛。
---
## やりたいこと

VPSから自宅にあるVyOSの配下にあるホストへOpenVPN越しの静的ルーティングを設定したい。

## 環境

- さくらVPS（VPNサーバ）
  - 1Gプラン（東京リージョン）
  - IPアドレスはv4、v6ともに固定
  - CAなどは設定済み
- VyOS 1.3-rolling（VPNクライアント）
  - J:COM NET 光 1Gコース on auひかり
  - IPアドレスはv4、v6ともに半固定

## 下準備

既にIPv4でOpenVPNサーバを立ち上げているものとする。

[公式のドキュメント](https://help.sakura.ad.jp/115000065981/)に従ってVPSにIPv6アドレスを取得させる。

## VPNサーバと接続

VyOSは標準でOpenVPNクライアントが使えるのでconfigureモードから設定する。

証明書などは `scp` なりでVyOSの `/config/auth/` 配下に置く。

```bash
configure

edit interface openvpn vtun0

set mode client
set protocol tcp-active
set remote-host <VPNのIPv6アドレス>
set remote-port 1194
set tls ca-cert-file /config/auth/ovpn/ca.crt
set tls cert-file /config/auth/ovpn/vyos-client.crt
set tls key-file /config/auth/ovpn/vyos-client.key
set use-lzo-compression

commit
exit
```

`commit` した段階でVPNサーバと繋がっているはず。

VPNインターフェースのIPアドレスにpingを打って返事があれば成功。

## 静的ルーティングの設定(CentOS)

ここまででゲートウェイ同士の接続はできたので、今度はVPSからVyOSの下に隠れているホストにアクセスしたい。

とりあえずOpenVPNサーバでルーティングの設定をする。

VyOS配下のネットワークアドレスは `192.168.20.0/24` とする。

`/etc/openvpn/server.conf` に以下を追記。

```diff
client-config-dir ccd
route 192.168.20.0 255.255.255.0
```

続けて `/etc/openvpn/ccd/vyos-client` に以下を追記。

```diff
iroute 192.168.20.0 255.255.255.0
```

そしてOpenVPNサーバを再起動。もしかしたらVyOS側が再接続してくれないかもしれないので、そうなったらVyOS側でインターフェースを再起動する。

```bash
sudo systemctl restart openvpn@server.service
```

`ip route` でルーティングが追加されている事を確認する。

```bash
$ ip route
<中略>
192.168.20.0/24 via 10.8.0.2 dev tun0
```

しかし、このまま自宅にあるホスト、例えば `192.168.20.1` なんかにpingを送っても返ってこない。なぜか。

答え：VyOSは `ping` を対象のホストに送っているが、肝心の `pong` にあたるパケットが迷子になっているから……のはず。

## 静的ルーティングの設定(VyOS)

ざっくりNAPTを設定してあげれば良い。

```bash
edit nat source rule 20

set destination address 192.168.20.0/24
set source address 10.8.0.0/24
set translation address masquerade
set outbound-interface eth0

commit
exit
```

逆からもアクセスできるようにする。NAPTの設定をひっくり返すだけ。

```bash
edit nat source rule 30

set destination address 10.8.0.0/24
set source address 192.168.20.0/24
set translation address masquerade
set outbound-interface vtun0

commit
exit
```

これでお互いにpingが通るようになっている。

```bash
$ ping 192.168.20.1
PING 192.168.20.1 (192.168.20.1) 56(84) bytes of data.
64 bytes from 192.168.20.1: icmp_seq=1 ttl=63 time=4.28 ms
64 bytes from 192.168.20.1: icmp_seq=2 ttl=63 time=4.38 ms
64 bytes from 192.168.20.1: icmp_seq=3 ttl=63 time=4.15 ms
64 bytes from 192.168.20.1: icmp_seq=4 ttl=63 time=4.39 ms
^C
--- 192.168.20.1 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 4.153/4.303/4.390/0.116 ms
```

```bash
$ ping 10.8.0.1
PING 10.8.0.1 (10.8.0.1) 56(84) bytes of data.
64 bytes from 10.8.0.1: icmp_seq=1 ttl=64 time=4.50 ms
64 bytes from 10.8.0.1: icmp_seq=2 ttl=64 time=4.28 ms
64 bytes from 10.8.0.1: icmp_seq=3 ttl=64 time=4.20 ms
64 bytes from 10.8.0.1: icmp_seq=4 ttl=64 time=3.78 ms
^C
--- 10.8.0.1 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 3.787/4.197/4.504/0.264 ms
```

できた。

### まとめ

これを応用すれば、IPv4(PPPoE)は遅いけどIPv6(IPoE)は速い、しかしv6プラスのようなサービスがないプロバイダでも、なんちゃってDS-Liteのようなものを構築する事ができる。

auひかりのPPPoE網は割と速いので今回はそこまではしなかった。

あとネットワークに関する知識は割とガバガバなのでもっと効率的なやり方があったり、これだとセキュリティ的にまずい的なのがあればTwitterでご指摘頂けると幸いです。
