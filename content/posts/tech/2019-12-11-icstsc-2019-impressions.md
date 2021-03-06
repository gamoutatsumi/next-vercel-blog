---
title: ICTSC2019 2次予選の感想
author: 蒲生 辰巳
type: post
date: 2019-12-11T01:00:51+00:00
url: /2019/12/11/icstsc-2019-impressions/
categories:
  - Linux
  - 日記

---
この記事は、[ITRCアドベントカレンダー][1]の11日目の記事です。

どうも、最近血迷ってVue+Djangoの勉強を始めたクソザコイキリエンジニアです。

さすがにアドベントカレンダー書かないのはまずいなーという事で、特に書く事も思いつかなかったのでとりあえずこれでいきます。

## 目次

## やった問題

手を付けたのは

* MySQLの復旧
* 匿名ダイアリー
* Welcome to NGINX

です。

## 問題の感想

### MySQLの復旧

概要としては、

「間違えてテーブル消しちゃったから復旧と、消えたタイミングの特定お願い！　一応消える数分前のダンプデータあるから使ってね！」

という感じです。

とりあえずメタ読みして、これが「ログがないと成り立たない問題」だと気付けるかどうかですかね。

そこまで分かれば、後は気合でログを探して、用意されているダンプデータでロールバック、見つけたログでロールフォワードして終わりです。

~~まあチェックが足りなかったせいで点落としたんですけどね！~~

### 匿名ダイアリー

問題文みて「これはCORSの問題だな」と気付ければ終わり……のはずでしたが、動作確認を雑にしすぎたのであまり点は取れてませんでした。

一応かいつまんで説明すると、

「今までサブディレクトリで分けていたフロントエンド(SPA)とバックエンド(Web API)をサブドメインに分けたらエラーはいて繋がらなくなった！　助けて！」

って感じですね。

ご丁寧にhttpsで通信するようになってたので、一目でピンと来た人も多いと思います。

僕はフロント、バックエンド双方のindexに正しいポリシーを設定して終わったんですが、まだ足りてなかったみたいです。

Apacheとかもいじってあげる必要があったみたいで、まあ手を抜いた僕が悪いですね、はい。

### Welcome to NGINX

「nginxの問題なら楽勝でしょｗｗｗｗｗｗｗ」と余裕こいたのも束の間、Ciscoの問題と分かって戦々恐々としました。

概要は、

「CSR1000vをDNSサーバとして使って、クライアントからnginxまでIPv6で名前解決して繋がるようにして！」

みたいな、そんな感じです。この辺もう記憶曖昧になってますけど。

まずnginxがIPv6で待ち受けてなかったのを直して、その次にciscoルータ側でホスト名宛にping打って返ってくるまではできましたが、最終的にタイムアップとなりました。

とりあえずじっくり解答読みたい所です。

## 総評（反省）

クラフトボスのカフェインブーストがもう少し続いてれば良かったんですけど、まあそんな甘い話なんてありませんでした。

もう少しCiscoと、日本語の勉強もしとけばよかったな〜って感じですね。

というかトラコン直前にWebの勉強始めたのが悪い。反省。

 [1]: https://adventar.org/calendars/4759
