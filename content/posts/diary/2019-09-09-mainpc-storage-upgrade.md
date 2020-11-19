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

https://twitter.com/gamoutatsumi/status/1162986485542293504

そもそも増設作業自体初めてだったので興奮どころかめっちゃ緊張してた。

### 増設後

増設後の写真を撮ってる余裕すらなかった。ご容赦願いたい。

## OSインストール

https://twitter.com/gamoutatsumi/status/1163044820874485761

https://twitter.com/gamoutatsumi/status/1163046016485978112

無事に認識できるようになったので新しいSSDにWindowsをインストールする。

しかし、何度繰り返しても同じエラーを吐いて止まる。

https://twitter.com/gamoutatsumi/status/1163058651600261120

(この後も4,5回は繰り返したけど挫折)

結局Archの環境を新しいSSDに移行する事にした。

https://twitter.com/gamoutatsumi/status/1163220969361530880

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

https://twitter.com/gamoutatsumi/status/1166482255969013760

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
