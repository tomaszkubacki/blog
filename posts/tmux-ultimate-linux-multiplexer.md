# Tmux - ultimate linux console multiplexer

In this post I would like to show you the Tmux cli tool. Tmux is a terminal multiplexer allowing you to run your cli task in the background and use multiple terminals at once (hence the name multiplexer).

I will show you the value of Tmux by showing a couple of usecases. But before we start you need to know how to invoke Tmux commands. 

### how to open tmux
First you need to open Tmux which is as easy (assuming you installed it) as typing 

```shell
tmux
```

### how to invoke Tmux commands

Tmux command is preceded by keyboard shortcut *ctrl+b* (which BTW can by changed) and then action itself.

E.g. to detach from Tmux you need to invoke

```shell
ctrl+b d
```
so you press *ctrl*, then (still holding ctrl) *b*, then release them both and finally  press *d* (in general plus sign in notation means you hold keys together while space means you unhold previous sequence)


## Case 1 - run task in the background

In this case we will open Tmux, run some task, then detach from Tmux and attach again, kill command and finally exit for good.


1) open Tmux  in your console app

```bash 
tmux
```

2) run task

Let's ping some host every 10 seconds
> BTW you can open pajacyk.pl and click clown's belly. Every (human) click is a charity support.


```bash 
ping pajacyk.pl -i 10

```

3) Leave Tmux while ping is still going on

Pressing 
```bash 
ctrl+b d
```
will make ping command still run in the background

4) Re-attach to tmux instance 

Now the nices part you can even log out from the host running tmux (like close connection via ssh). After you log in again, just invoke

```bash 
tmux attach
```

or shorter

```bash 
tmux a
```

Now you are back in Tmux, and you should see ping results going on.

Let's kill ping by *ctrl+c*

Assuming you really finished your job you can leave tmux for good. 
To exit just press type 
```text
exit
```
or press *ctrl + d*


### Case 2 - split tmux window horizontally and verticaly to have two terminal visible at once

*TODO*
