---
title: Arch LinuxでSteam版のUndertaleを動かしてみた
author: 蒲生 辰巳
type: post
date: 2019-07-11T07:20:27+00:00
url: /2019/07/11/arch-linux-undertale/
categories:
  - Linux
  - 日記

---
友人に勧められてアンテを買ったのでとりあえず動かす所までやってみた。

## 目次

&nbsp;

## 動機 {#動機}

さっき書いた通り、友人（ガルパンおじさん兼アンテおじさん兼Archおじさん）に「アンテはいいぞぉ……」と勧められたので。サマーセールだからってサントラ付き買わされました。

まあ折角買ったからにはやらにゃ損ですね。<del>ニーアオートマタはEエンドだけ終わらせて飽きましたが。まあそのうちコンプするつもりなのでノーカン。</del>

そしてこのUndertale、素晴らしい事にSteam OSに対応しているんですよ！！！！！

![Undertaleのストアページ](/img/20190711141620.jpg)

……知ってます？　Steam OS。Valve社の泡沫の夢です。系統的にはGoogleでいうDart。まあ詳しい事はググってください。

で、このSteam OS、ベースがLinuxなんですよ。Linuxで動くなら当然Arch Linuxでも動きますよね？　はい、やらない理由がないですね。

## 環境 {#環境}

  * Arch Linux 64bit 
      * Pulseaudio
      * Intel CPU内蔵GPU
  * Undertale購入済み
  * GUI版のSteamはインストールしない

## 準備 {#準備}

もうUndertaleは買ってある想定でやります。買ってなくても簡単に買えるので買ってください。

### 必要なライブラリのインストール {#必要なライブラリのインストール}

大体[ArchWiki][1]を参考にしました。といってもライブラリ部分だけですが。

まず`multilib`を有効化します。Steamのゲームは32bitが前提なので、32bit版のライブラリが必要になります。

`/etc/pacman.conf`を書き換えるだけです。

```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

続いて必要なライブラリを入れていきます。

```bashsudo pacman -S multilib-devel lib32-openssl lib32-glu lib32-libpulse\
lib32-mesa lib32-pango lib32-cairo lib32-sdl2 lib32-libgcrypt15\
lib32-fontconfig lib32-gtk2 lib32-libxi lib32-nss lib32-libpng12
```

もしかしたらいくつか既に入っているかもしれませんが気にしないでください。

あとなんか必要そうな感じのライブラリをとりあえず入れただけなので、もしかしたら余計なのが入ってるかもしれません。もしそうだったらコメントで教えていただけると幸いです。とりあえず`Orphaned Packages`とかは出てません。

### SteamCMDのインストール {#SteamCMDのインストール}

SteamにはCUI版とGUI版が用意されているのですが、Linuxで使う場合はCUI版の方がめんどくささがなくて良さそうなのでCUI版を使います。ちなみにCUI版は`SteamCMD`と呼ばれています。

[SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD)

SteamCMDをインストールしていきます。場所はお好みで。ここでは公式のドキュメントに従ってインストールしていきます。

```bash
mkdir ~/Steam && cd ~/Steam
curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

コマンドを実行したら、`~/Steam/steamcmd.sh`ができていると思うので実行します。するとSteamのプロンプトが出てくると思うので、まずは`login`コマンドでログインします。パスワードとか色々聞かれると思うので表示に従ってログインしてください。初回は二段階認証のコードが求められると思うので入力してください。二回目以降は自動でログインできます。

```bash
$ ./steamcmd.sh
&lt;中略&gt;
Loading Steam API...OK.
Steam&gt;login &lt;username&gt;
```

## Undertaleのインストール {#Undertaleのインストール}

ここまででSteamCMDのインストールまで済みました。後はUndertaleをインストールして起動するだけです。

SteamCMDでゲームをインストールするにはゲームの固有IDを指定する必要があるのですが、これはストアページのURLから確認できます。

UndertaleのストアページのURLは`https://store.steampowered.com/app/391540/Undertale/`なので、Undertaleの固有IDは`391540`です。

SteamCMDからゲームをインストールする際は`app_update`コマンドを使います。

```bash
Steam&gt;app_update 391540
Success! App '391540' fully installed.
```

これでインストール完了です。

## Undertaleの起動 {#Undertaleの起動}

インストールしたゲームは、`~/Steam/steamapps/common/`以下に展開されます。Undertaleの場合は`~/Steam/steamapps/common/Undertale/`ですね。

UndertaleはSteam OSに対応しているので、そのままLinuxで起動するためのシェルスクリプトが付属しています。実行権限は付与されているはずですが、されていないようであれば`chmod u+x`してください。

```bash
cd ~/Steam/steamapps/common/Undertale/
./run.sh
```

![Arch LinuxでUndertaleを起動した図](/img/20190711151933.png)

## まとめ {#まとめ}

拗らせArch使い的にはLinuxでもゲームができるのは嬉しいことこの上ないですね。

一応この記事通りにやれば動くはずですが、もし動かなかったらコメントください。

それでは今日はこの辺で。またなんかネタがあったら記事にしたいと思います。

 [1]: https://wiki.archlinux.jp/index.php/Steam
