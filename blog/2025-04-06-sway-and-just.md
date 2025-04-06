---
slug: sway-and-just
title: Use just command runner to manage your Sway desktop
authors: tkub
draf: true
tags: [linux]
---

# How to help automate Sway window manager with help of *just* commnd runner

In this post I will show how to automate common Sway commands with the [*just*](https://just.systems/man/en/) command runner.

<!-- truncate -->

## What is Sway ?
As it stands on Sway [home page](https://swaywm.org/) 

> Sway is a tiling Wayland compositor and a drop-in replacement for the i3 window manager

Sway is a special kind of keyboard oriented  window manager using idea of tiles instead of well known resizable windows. Whenever you open an app it takes half a screen, but you can arrange 'windows' in tiles, tabs or even make a floating window (just like in traditional window managers).


## What is *just* ?

Just is a conveniet and lightweight way (written in rustlang) to run project specific commands without creating custom bash scripts. It has [make](https://www.gnu.org/software/make/manual/make.html#Simple-Makefile) like syntax, 
but scripts could be written in any lang. Additionally it read variables from .env files and many more features which of it's best to read int the [just book](https://github.com/casey/just).

## How to automate ?

Ok assuming you knwo some *just* basics you are ready to write your own justfile. I do reccomend to write it directly into your user home dir.

```shell
touch ~/justfile
```

after you fill it with your commands it will be as easy as writing

```shell
just your_command
```

to invoke your command (which is maybe multiline script).



Now let's see my justfile content which may inspire you


## Closing remarks

The thing is you don't need to be linux freak to use just. You may use it to manage your mainstream operating system as well.


