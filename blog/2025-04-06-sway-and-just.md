---
slug: sway-and-just
title: automate Sway window manager with just command runner
authors: tkub
tags: [linux]
---

# How to help automate Sway window manager with help of *just* commnd runner

In this post I will show how to automate common Sway (or any desktop) commands with the [*just*](https://just.systems/man/en/) command runner.

<!-- truncate -->

## The problem and the solution

I like cli tools. Well that's an understatement. I love them. The problem is you need to remember a lot of commands - with sometime bizarre and hard to remember syntax - to increase your productivity while working on daily tasks. What is even worse, some of useful commands are not used often enough to remember them easily (also: it's not helping that human brain is harder to train as it's getting older).

Sway window manager main settings command is no exception here, but we can tackle this with the *just* command runner. It helps shorten common commands and adds command description.


## What is Sway ?

As it stands on Sway [home page](https://swaywm.org/) 

> Sway is a tiling Wayland compositor and a drop-in replacement for the i3 window manager

Sway is a special kind of keyboard oriented window manager using idea of tiles instead of well known resizable windows. Whenever you open an app it takes half a screen, but you can arrange 'windows' in tiles, tabs or even make a floating window (just like in traditional window managers).


## What is *just* ?

Just is a convenient and lightweight way (written in rustlang) of running project specific commands without creating custom bash scripts. It has [make](https://www.gnu.org/software/make/manual/make.html#Simple-Makefile) like syntax, 
but scripts could be written in any lang. Additionally it can read variables from .env files and has many more features. You can read about them in the [just book](https://github.com/casey/just).

## How to use just

Let's start with somethng basic. I do assume you already installed *just*.

First create the *justfile* in your home directory and put following content in there:

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

after filling *justfile*  with your commands, it will be as easy as writing

```shell
just your_command
```

to invoke any command (which is maybe a multiline script).


Now let's see my *just* commands

```shell
just
```

will result in the following output

```shell
just --list
Available recipes:
    day                  # light display for day
    disable display      # disable display output
    displays             # list available displays
    enable display="all" # enable *display* output
    evening              # dim display for evening view
    get_off              # shutdowns computer
    help                 # disply this help
    laptop               # disable all display outputs except main laptop display
    night                # dim display for night view
    not_laptop           # disable laptop display outputs and enable external displays
    showkeys             # show typed keys on the screen
```

As you can see my main use of *just* commands is display output and dim management.

Very common and atomic commands are deserving their own key binding (can be defined in ~/.config/sway/config), wherease *just* usage is fitting more for less frequent or compound commands. 

I keep my [*justfile*](https://github.com/tomaszkubacki/configs/blob/main/justfile) source code in my github config repo,
Currenlty it looks like this:

```Makefile
# disply this help
help:
    just --list

# shutdowns computer
get_off:
   shutdown -h now

# list available displays
displays:
   swaymsg -t get_outputs | jq '.[] | .name'

# enable *display* output
enable display="all":
    #!/usr/bin/env bash
    case {{display}} in
        "all")
            for i in `swaymsg -t get_outputs | jq '.[] | .name'`;
            do
             swaymsg output $i enable
            done
            swaymsg output DP-5 pos 0 0
            swaymsg output DP-7 pos 0 1200
            ;;
        "laptop")
            for i in `swaymsg -t get_outputs | jq '.[] | .name'`;
            do
            if [[ $i == '"eDP-1"' ]]; then
              swaymsg output $i enable
            else
              swaymsg output $i disable
            fi
            done
            ;;
        *)
            swaymsg output {{display}} enable
            ;;
    esac

# disable display output
disable display:
   swaymsg output {{display}} disable


# disable all display outputs except main laptop display
laptop:
   #!/usr/bin/env bash
   for i in `swaymsg -t get_outputs | jq '.[] | .name'`;
   do
      if [[ $i == '"eDP-1"' ]]; then
         swaymsg output $i enable
      else
         swaymsg output $i disable
      fi
   done

# disable laptop display outputs and enable external displays
not_laptop:
   #!/usr/bin/env bash
   for i in `swaymsg -t get_outputs | jq '.[] | .name'`;
   do
      if [[ $i != '"eDP-1"' ]]; then
         swaymsg output $i enable
      else
         swaymsg output $i disable
      fi
   done

# dim display for night view
night:
   light -S 1

# dim display for evening view
evening:
   light -S 4

#light display for day
day:
   light -S 25

#show typed keys on the screen
showkeys:
   wshowkeys -a bottom

```

## Closing remarks

The thing is you don't need to be linux freak to use *just*. You may use it to manage your mainstream operating system as well (including the evil/spying one). You can automate common operations like backups, remote server commands (as long as they're easy enough to not use proper management tool like *Ansible* or *Chef*) and also for changing your enviroment for certain work modes, e.g. I am using project specific *just dev* command to start all required docker containers, while working on certain group of projects.

