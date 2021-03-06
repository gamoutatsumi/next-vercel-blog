---
title: メインマシンのストレージを増設した話
author: 蒲生 辰巳
type: post
date: 2019-09-09T03:41:34+00:00
url: /2019/09/09/mainpc-storage-upgrade/
categories:
  - 日記

---
ずっと書こうと思ってたやつ。Windowsへのヘイトばかり募らせる作業だった……。

## 目次

## 元の構成

ドスパラで買ったBTOだからあんま把握してないけどこんな感じ。

* M/B ASUS H170 Pro
  * Intel SSD (SATA-500GB)
    * Windows10 HomeとArch Linuxの起動ディスクだった。
  * TOSHIBA HDD(SATA-2TB)
    * データ用。

## 増設するストレージ

ツクモで安くて容量大きめのを買った。条件としてM.2 NVMeは必須だった。

* Intel SSD 660p(M.2 NVMe-1TB)
  * メインストリームのTLC NANDではなくQLC NANDを採用したSSD。容量の割に安かった(1万円)。データ用。
* ADATA XPG SX8200 Pro(M.2 NVMe-256GB)
  * チョイスとしては安牌だと思う。当初はこれにWindows入れる予定だった。こちらは6000円から7000円ぐらいで買った記憶(レシートどこにやったか忘れた)

## 増設作業

H170 ProはM.2スロットが1つしかないので片方はアイネックスの[AIF-08][1]を使ってPCIeに変換する。といってもPCIe x4もないのでやむなく唯一余ってたx16に挿す。~~もったいない~~

今回はヒートシンクが付属していなかった660pと組み合わせる。

### 開封

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">SSD開封<br>そもそもM.2自体初めて触るから軽く興奮してる <a href="https://t.co/VdwUxv2ZV0">pic.twitter.com/VdwUxv2ZV0</a></p>&mdash; 蒲生辰巳.localdomain (@gamoutatsumi) <a href="https://twitter.com/gamoutatsumi/status/1162986485542293504?ref_src=twsrc%5Etfw">August 18, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そもそも増設作業自体初めてだったので興奮どころかめっちゃ緊張してた。

### 増設後

増設後の写真を撮ってる余裕すらなかった。ご容赦願いたい。

## OSインストール

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">写真付け忘れた <a href="https://t.co/T1g8eoULLv">pic.twitter.com/T1g8eoULLv</a></p>&mdash; 蒲生辰巳.localdomain (@gamoutatsumi) <a href="https://twitter.com/gamoutatsumi/status/1163044820874485761?ref_src=twsrc%5Etfw">August 18, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">よっし <a href="https://t.co/WhknO8T4tU">pic.twitter.com/WhknO8T4tU</a></p>&mdash; 蒲生辰巳.localdomain (@gamoutatsumi) <a href="https://twitter.com/gamoutatsumi/status/1163046016485978112?ref_src=twsrc%5Etfw">August 18, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

無事に認識できるようになったので新しいSSDにWindowsをインストールする。

しかし、何度繰り返しても同じエラーを吐いて止まる。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">知らんがなお前が勝手にフォーマットしたんやろ <a href="https://t.co/6L3fPHVfyL">pic.twitter.com/6L3fPHVfyL</a></p>&mdash; 蒲生辰巳.localdomain (@gamoutatsumi) <a href="https://twitter.com/gamoutatsumi/status/1163058651600261120?ref_src=twsrc%5Etfw">August 18, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

(この後も4,5回は繰り返したけど挫折)

結局Archの環境を新しいSSDに移行する事にした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">いや〜Archはいい子だなぁ〜<br>新しいssdに環境移すのにcpコマンド一つで終わっちゃうんだもんなぁ〜<br>それに引き換えWindowsはなんであんな無能やねんあーほんま腹立つわ（豹変）</p>&mdash; 蒲生辰巳.localdomain (@gamoutatsumi) <a href="https://twitter.com/gamoutatsumi/status/1163220969361530880?ref_src=twsrc%5Etfw">August 18, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Archは本当に使いやすいのでみんなもArch、使おう！

## 最終的な構成

なんだかんだでこんな感じになった。

![lsblkの結果にちょっと手を加えたやつ](/img/lsblk.png)

* Intel SSD(SATA-500GB)
  * Windows 10 Home
* ADATA XPG SX8200 Pro(M.2 NVMe-256GB)
  * Arch Linux
* TOSHIBA HDD(SATA-2TB)
  * データ用
* Intel SSD 660p(M.2 NVMe-1TB)
  * データ用

## ベンチマーク

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ちなみにこれ先週買ったIntel 660pのベンチマークです<br>ずっと取り忘れてた…… <a href="https://t.co/D51rHct9Z7">pic.twitter.com/D51rHct9Z7</a></p>&mdash; 蒲生辰巳.localdomain (@gamoutatsumi) <a href="https://twitter.com/gamoutatsumi/status/1166482255969013760?ref_src=twsrc%5Etfw">August 27, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

（SX8200はベンチ取る前にArch入れちゃったのでベンチは取ってないです）

さすがはNVMeというべきか、やはり速い。

660pはQLC NANDというのもあってか、やはり起動ディスクとしてはあまり向いてない性能のように思える。今回はゲームとかのデータを入れたかっただけなので大満足。

あまりまともなレビューをする気もないし、今回はマザボの方もちょっと古かったので、速度に関しては参考程度に捉えてもらえると嬉しい。というかただの日記。

## 総評

Windowsはクソであると身をもって再確認できたのは思わぬ収穫だった。

真面目な話をすると、NVMeのSSDがここまで安く買えるとは思ってもみなかった。低価格化を目指す中での実験機的な立ち位置である660pを別にしても、全体的にSSDの低価格化が進んでいるのが肌で感じ取れた。

速度面に関しても、自分が今使ってるマザボは対応してないので関係ないが、PCIe 4.0に対応したNVMe SSDが出始めているので、高速化もどんどん進んでいくような気がする。

ちょっとそれっぽい事書くと締め方が分からなくなるので今回はここまで。今度はX230が着弾したら改造記事書く。多分。

 [1]: https://www.ainex.jp/products/aif-08/
