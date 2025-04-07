---
slug: sway-and-just
title: Automate Sway wm with just command runner
authors: tkub
draf: true
tags: [linux]
---

# How to help automate Sway window manager with help of *just* commnd runner

In this post I will show how to automate common Sway commands with the [*just*](https://just.systems/man/en/) command runner.

<!-- truncate -->

## The problem and the solution

I like cli tools. Well that's an understatement. I love them. The problem is you must remember a lot of them, to speed up your daily tasks. What is even wore, some of them have hard to remember syntax and some of them are not used offen enough to remember them (also: it's not helping that human brain is harder to train as it's getting older).

Sway wm main settings command is no exception here, but we can easy tackle this with the *just* command runner to shorten common commands.


## What is Sway ?

As it stands on Sway [home page](https://swaywm.org/) 

> Sway is a tiling Wayland compositor and a drop-in replacement for the i3 window manager

Sway is a special kind of keyboard oriented window manager using idea of tiles instead of well known resizable windows. Whenever you open an app it takes half a screen, but you can arrange 'windows' in tiles, tabs or even make a floating window (just like in traditional window managers).


## What is *just* ?

Just is a conveniet and lightweight way (written in rustlang) to run project specific commands without creating custom bash scripts. It has [make](https://www.gnu.org/software/make/manual/make.html#Simple-Makefile) like syntax, 
but scripts could be written in any lang. Additionally it read variables from .env files and many more features which of it's best to read int the [just book](https://github.com/casey/just).

## How to use just

Let's start with somethng basic. I do assume you already installed just. 
First create *justfile* in your home directory.

```shell
touch ~/justfile
```
and put following content in there

```code
# print this help
help:
    just -l

# list files with details
ls:
   ls -lah

```
now type in your home dir shell

```shell
just
```

you will see th result

```shell
~$ just

just -l
Available recipes:
    help # print this help
    ls   # list files with details
~$ 
```

## How to automate ?

Ok assuming you know some *just* basics you are ready to write your own justfile. I do reccomend to write it directly into your user home dir.

after you fill it with your commands it will be as easy as writing

```shell
just your_command
```

to invoke your command (which is maybe multiline script).



Now let's see my justfile content which may inspire you


## Closing remarks

The thing is you don't need to be linux freak to use just. You may use it to manage your mainstream operating system as well (including the evil/spying one). You can automate common operations like backups, remote servere operations etc (before  they do grow enough, to use some proper management tool like *Ansible* or *Chef*) and preparing your env for certain work modes, e.g. I am using *just dev* to start all required docker machines before coding. 
