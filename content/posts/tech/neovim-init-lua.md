---
title: Neovimでinit.luaを使う
date: 2020-12-21

---

この記事は、[ITRCアドベントカレンダー2020](https://adventar.org/calendars/5535)の21日目です。

前日はrin1208さんの「[Makefileのすゝめ](https://qiita.com/rin1208/items/e913cac741a73dbbb46b)」です。

明日はkoさんの「」です。

## 目次

## 動機

最近、Neovimで `init.vim` の代わりに `init.lua` が使えるようになったので、試しにやってみたかった。

ちなみに「やってみた」だけで実用性はありません。というかまだ実用の域に達してないというのが実際の所です。

## 話の流れ

従来、Neovimの設定は `init.vim` に書くのが習わしでした。

この `init.vim` というのは、Vim Scriptという言語で書かれており、これがあまり書きやすくない（主観）し、処理速度に優れている訳でもない。

そんな中、NeovimではLuaという軽量スクリプト言語のランタイム(LuaJIT)を内蔵し、Vim Scriptの代わりにLuaでVim Script相当の処理を記述する事が可能になりました。

ここまでは以前の話。

最近マージされた[PR](https://github.com/neovim/neovim/pull/12235)により、 `~/.config/nvim/init.lua` として設定ファイルを配置できるようになりました。

なので、 `init.lua` を書いてみる事にしました。

ちなみに `init.lua` と `init.vim` は同時に存在できません。リネームするなり移動するなりしてください。

## 実際書いたコード

### `~/.config/nvim/init.lua`

```lua
-- Load Modules
require('core.init')
```

Neovimの仕様として、 `runtimepath` 配下の `lua` ディレクトリ内をルートディレクトリとして `*.lua` のパスを解決してくれます。

なので、この `require` では `~/.config/nvim/lua/core/init.lua` を読み込んでいる事になります。

### `~/.config/nvim/lua/core/init.lua`

```lua
local api = vim.api

vim.cmd('augroup MyAutoCmd')
vim.cmd('autocmd!')
vim.cmd('augroup END')

vim.cmd('filetype off')
vim.cmd('syntax off')

local vars = {
  python_host_prog = '/usr/bin/python2',
  python3_host_prog = '/usr/bin/python3',
  loaded_matchparen = 1
}

for var, val in pairs(vars) do
  api.nvim_set_var(var, val)
end

require('core.options')
require('core.keys')
require('core.ime')
require('plugins.dein')

vim.cmd('filetype plugin indent on')
vim.cmd('syntax on')
```

`vim.api` はただのテーブルなので、`local api = vim.api` とする事でエイリアス的に使う事ができます。

`autocmd` `syntax` 周りのapiはまだ整備されていないので、直接Vimのコマンドを叩いています。

現状読みやすさ重視で `vars` に連想配列をブチ込んでforを回す方式を取っています。もっといいやり方があれば教えてください。

## `~/.config/nvim/lua/core/options.lua`

オプション周りの設定です。

実はNeovimのLuaにはVim Scriptで言う所の `:set` に相当するオプションが無く、バッファローカル、ウィンドウローカルのオプションのデフォルト値の設定ができません。

これが何を意味するかと言うと、 `fern.vim` や `NERDTree` を使った時に、バッファローカルのオプションが消えてしまいます。

ここではそれを解決するために、オプションの設定を関数化し、 `AutoCmd` で毎回フックするようにしてあります。

正直ここがあるので `init.lua` を勧められないというのがあります。

```lua
function SetOptions()
  local api = vim.api

  local opts = {
    splitright = true,
    splitbelow = true,
    clipboard = 'unnamedplus',
    hlsearch = true,
    mouse = 'a',
    whichwrap = 'b,s,h,l,<,>,[,]',
    ignorecase = true,
    smartcase = true,
    pumheight = 10,
    lazyredraw = true,
    showcmd = false,
    guicursor = vim.o.guicursor..',a:blinkon0',
    encoding = 'utf-8',
    undodir = vim.env.HOME..'/.local/share/nvim/backup',
    termguicolors = true
  }

  local wopts = {
    cursorline = true,
    signcolumn = 'yes',
    number = true,
    foldmethod = 'marker'
  }

  local bopts = {
    autoindent = true,
    smartindent = true,
    tabstop = 2,
    shiftwidth = 2,
    expandtab = true,
    undofile = true
  }

  for opt, val in pairs(opts) do
    vim.api.nvim_set_option(opt, val)
  end

  for opt, val in pairs(wopts) do
    vim.api.nvim_win_set_option(0, opt, val)
  end

  for opt, val in pairs(bopts) do
    vim.api.nvim_buf_set_option(0, opt, val)
  end
end

SetOptions()

vim.cmd('autocmd FileType * lua SetOptions()')
```

## `~/.config/nvim/lua/core/keys.lua`

```lua
vim.g.mapleader = " "

local api = vim.api

api.nvim_set_keymap('n', 'x', '"_x', { noremap = true })
api.nvim_set_keymap('n', 's', '"_s', { noremap = true })
api.nvim_set_keymap('v', 'x', '"_x', { noremap = true })
api.nvim_set_keymap('v', 's', '"_s', { noremap = true })
api.nvim_set_keymap('n', '<CR>', ':<C-u>call append(".", "")<CR>', { noremap = true, silent = true })
api.nvim_set_keymap('n', '<Tab>', ':bnext<CR>', { noremap = true, silent = true })
api.nvim_set_keymap('n', '<S-Tab>', ':bprevious<CR>', { noremap = true, silent = true })
api.nvim_set_keymap('n', 'j', 'gj', { noremap = true })
api.nvim_set_keymap('n', 'k', 'gk', { noremap = true })
api.nvim_set_keymap('n', 'i', 'len(getline(".")) ? "i" : "cc"', { noremap = true, expr = true })
api.nvim_set_keymap('n', 'A', 'len(getline(".")) ? "A" : "cc"', { noremap = true, expr = true })
api.nvim_set_keymap('n', 'Y', 'y$', { noremap = true })
api.nvim_set_keymap('n', '0', "getline('.')[0 : col('.') - 2] =~# '^\\s\\+$' ? '0' : '^'", { noremap = true, expr = true })
```

`vim.g.mapleader = " "` とする事でスペースキーをleaderに割り当てています。 `"<Space>"` だとうまくいかないので注意。

他はそのままですね。キーマップ周りを書きやすくするプラグインもあるらしいですけどここでは未使用。

## `~/.config/nvim/lua/core/ime.lua`

```lua
local api = vim.api

function ImeOff()
  os.execute('fcitx-remote -c')
end

function ImeOn()
  os.execute('fcitx-remote -o')
end

function ImeStat()
  local imests = io.popen('${HOME}/.config/nvim/imests')
  return imests:read()
end

function ImeAutoOff()
  api.nvim_win_set_var(0, 'ime_status', ImeStat())
  ImeOff()
end

function ImeAutoOn()
  if not (vim.fn.exists('w:ime_status') == 1) then
    api.nvim_win_set_var(0, 'ime_status', '0')
  end
  if api.nvim_win_get_var(0, 'ime_status') == '1' then
    ImeOn()
  end
end

vim.cmd('augroup InsertHook')
vim.cmd('autocmd!')
vim.cmd('autocmd InsertLeave * lua ImeAutoOff()')
vim.cmd('autocmd InsertEnter * lua ImeAutoOn()')
vim.cmd('augroup END')
```

Vimのモードという概念とIMEの相性が良くないのは皆さんご存知でしょう。

どこかの記事で見つけた解決策（IMEの状態を保存して `InsertLeave` `InsertEnter` でフックする）をLuaに書き直してあります。

`fcitx-remote` を使っているのでWindowsやmacには非対応です。

## `~/.config/nvim/lua/plugins/dein.lua`

```lua
local api = vim.api

local dein_dir = vim.fn.expand('~/.local/share/nvim/dein')
local dein_repo_dir = dein_dir..'/repos/github.com/Shougo/dein.vim'

api.nvim_set_var('dein#install_github_api_token', os.getenv('DEIN_GITHUB_TOKEN'))

if not string.find(api.nvim_get_option('runtimepath'), '/dein.vim') then
  if not (vim.fn.isdirectory(dein_repo_dir) == 1) then
    os.execute('git clone https://github.com/Shougo/dein.vim '..dein_repo_dir)
  end
  api.nvim_set_option('runtimepath', dein_repo_dir..','..api.nvim_get_option('runtimepath'))
end

if (vim.fn['dein#load_state'](dein_dir) == 1) then
  vim.fn['dein#begin'](dein_dir)
  local rc_dir = vim.fn.expand('~/.config/nvim')
  local toml = rc_dir..'/dein.toml'
  local lazy_toml = rc_dir..'/dein_lazy.toml'
  vim.fn['dein#load_toml'](toml, { lazy = 0 })
  vim.fn['dein#load_toml'](lazy_toml, { lazy = 1 })
  vim.fn['dein#end']()
  vim.fn['dein#save_state']()
end

if (vim.fn['dein#check_install']() ~= 0) then
  vim.fn['dein#install']()
end

local removed_plugins = vim.fn['dein#check_clean']()
if vim.fn.len(removed_plugins) > 0 then
  vim.fn.map(removed_plugins, "delete(v:val, 'rf')")
  vim.fn['dein#recache_runtimepath']()
end
```

[dein.vim](https://github.com/Shougo/dein.vim)使いなので、deinのイニシャライズ周りをLuaで書きました。

## まとめ

完全に動作を検証できている訳ではないのでバグがある可能性もあります。

LuaとVim Scriptどちらにしても中途半端な知識しかないので、割と苦労しながら書き直しました。

多分これでちゃんと動くはずですが、もう少しLuaの勉強をして書き直したいところ。

僕が使っているNeovimの設定ファイルは[GitHub](https://github.com/gamoutatsumi/nvim)に上がっているので、よければ参考にしてやってください。
