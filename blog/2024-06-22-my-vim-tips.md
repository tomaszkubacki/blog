---
slug: my-vim-tips
title: Vim tips and tricks
authors:
  name: Tomasz Kubacki
  title: Random dev
  url: https://github.com/tomaszkubacki
  image_url: https://avatars.githubusercontent.com/u/348532?s=400&v=4
tags: [linux, vim]
---

# VIM tips list

## How to use this guide

### Learn vim basic 
You need to know what is normal and insert mode in vim.
Whenever I write
```
:something
```
I mean invoking *something* command in normal mode (pressing ctrl+c then type :something)


## Use decent plugin manager

Modern and easy to use plugin manager is [vim-plug](https://github.com/junegunn/vim-plug)

## Use ctrl+c to switch to normal mode
There are two ways to switch to normal mode one is to use escape key, but often more convenienient is to use ctrl+c shortcut

## Use file tree plugin

Use NERDTree file tree display in vim - https://github.com/preservim/nerdtree

after install just open it with 
```
:NERDTree
```
in normal mode

## Run Terminal inside vim

Vim has build in terminal plugin. You can open it with
```
:term
```
in normal mode

or even better 
```
:bel term
```


### Copy between editor and terminal

Use ctrl+

