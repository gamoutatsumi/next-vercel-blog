---
title: CentOS7 + FreeRADIUS + daloRADIUSでWPA-EAP認証する その1
author: 蒲生 辰巳
type: post
date: 2019-11-11T05:04:22+00:00
url: /2019/11/11/centos7-freeradius-wpa-eap-part1/
categories:
  - Linux
tags:
  - CentOS7
  - FreeRADIUS

---
CiscoのAPを使う為に構築して欲しいとの指示を受けたので、そのメモ。

まずはdaloRADIUSを起動する所まで。

## 目次

## 環境

### サーバー

* CentOS7
* PHP7.2
* MariaDB 10.4.8
* FreeRADIUS 3.0.13
* daloRADIUS 1.1-2
* httpd 2.4.6

## 必要なパッケージのインストール

### RADIUS

サクッと標準リポジトリからインストールする。

```bash
# yum install -y freeradius freeradius-utils freeradius-mysql
```

### Apache(httpd)

```bash
# yum install -y httpd
```

### PHP7.2

同じく。まずはリポジトリの追加。実環境ではやってなかった気がするけど大事を取ってアップデートする。

```bash
# yum install -y epel-release
# yum update
# yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
# yum update
```

PHP7.2とモジュール類をインストールする。

```bash
# yum --enablerepo=remi-php72 install -y mod_php php php-cli php-devel php-mcrypt php-gd php-mbstring php-mysqlnd php-pear php-pear-DB php-xml
```

### MariaDB

リポジトリを追加してインストール。

```bash
# curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash
# yum install -y MariaDB-server MariaDB-client
```

初期設定を済ませたら起動する。

```bash
# mysql_secure_installation
# systemctl start mariadb
# ststemctl enable mariadb
```

### データベースの作成・スキーマ設定

パスワードは任意のものに変更。

```bash
# mysql -uroot -p

> create database radius;
> grant all privileges on radius.* to radius@localhost identified by 'password';
> flush privileges;
> exit
```

FreeRADIUSで使うスキーマの設定もしておく。

```bash
# mysql -uroot -p radius &lt; /etc/raddb/mods-config/sql/main/mysql/schema.sql
```

## FreeRADIUSのセットアップ

一通りパッケージは入れ終わったので設定していく。

### 設定ファイルの編集

#### MySQLの有効化

ここでは最初からMySQLを使うようにする。

まずはMySQLモジュールの有効化。

```bash
# ln -s /etc/raddb/mods-available/sql /etc/raddb/mods-enabled/sql
```

モジュールの設定を変更する。`/etc/raddb/mods-enabled/sql`を編集する。

```diff
driver = "rlm_sql_mysql"
dialect = "mysql"
server = "localhost"
port = 3306
login = "radius"
password = "password"
read_clients = yes
```

sqlモジュールをradiusdから読めるようにしておく。

```bash
# chown radiusd.radiusd /etc/raddb/mods-enabled/sql
```

#### ログ出力の有効化

FreeRADIUSがデフォルトでログを**出力しない**ので出力するようにしておく。設定ファイルは`/etc/raddb/radiusd.conf`。

```diff
auth = yes
auth_badpass = yes
auth_goodpass = yes
```

#### Systemdユニットの書き換え

そのままではMariaDBとFreeRADIUSの起動順が前後してしまい、正常に起動しなくなる恐れがある。なので`/etc/systemd/system/multi-user.target.wants/radiusd.service`を編集してMariaDBの起動を待つようにする。

```diff
[Unit]
Description=FreeRADIUS high performance RADIUS server.
After=syslog.target network.target ipa.service dirsrv.target krb5kdc.service
+ After=mariadb.service

[Service]
Type=forking
PIDFile=/var/run/radiusd/radiusd.pid
ExecStartPre=-/bin/chown -R radiusd.radiusd /var/run/radiusd
ExecStartPre=/usr/sbin/radiusd -C
ExecStart=/usr/sbin/radiusd -d /etc/raddb
ExecReload=/usr/sbin/radiusd -C
ExecReload=/bin/kill -HUP $MAINPID

[Install]
WantedBy=multi-user.target
```

### 自動起動の有効化

ファイルを直接書き換えたので再読込をかける。

```bash
# systemctl daemon-reload
# systemctl start radiusd
# systemctl enable radiusd
```

## daloRADIUSのインストール

インストール手順はWordpressとかとそう変わらない。場所はお好みで。

基本的にはApache標準のドキュメントルートが楽だと思う。

```bash
# wget https://github.com/lirantal/daloradius/archive/master.zip
# unzip master.zip
# mv daloradius-master/* /var/www/html/
# chown -R apache.apache /var/www/html/
# chmod 664 /var/www/html/library/daloradius.conf.php
```

### データベースの設定

さっきやったのと同じようにデータベースを設定する。

```bash
# mysql -u root -p radius &lt; /var/www/html/contrib/db/fr2-mysql-daloradius-and-freeradius.sql
# mysql -u root -p radius &lt; /var/www/html/contrib/db/mysql-daloradius.sql
```

### dalloRADIUSの設定

`/var/www/html/library/daloradius.conf.php`を編集する。さっき作ったFreeRADIUSのデータベースに繋がるようにすれば良い。

```diff
$configValues['CONFIG_DB_HOST'] = 'localhost';
$configValues['CONFIG_DB_PORT'] = '3306';
$configValues['CONFIG_DB_USER'] = 'radius';
$configValues['CONFIG_DB_PASS'] = 'password';
$configValues['CONFIG_DB_NAME'] = 'radius';
```

### httpdの起動

アクセス制限とかしたい場合はお好みで。ここではそのまま起動する。

```bash
# systemctl start httpd
# systemctl enable httpd
```

## daloRADIUSにアクセス

ブラウザから`http://radiusサーバのIPアドレス/`にアクセスし、daloRADIUSのログイン画面が表示される事を確認する。

![daloRADIUSログイン画面](/img/wp/daloradius-login.jpg)

画像では日本語化されているが、デフォルトは英語になっている。

デフォルトのパスワードは`radius`。

* * *

その2に続く。
