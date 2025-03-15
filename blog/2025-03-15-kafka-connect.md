---
slug: kafka-connect
title: stream data from kafka to relational database
draft: true
authors: tkub
tags: [java, kafka]
---

# How to stream data from Kafka to relational database

In this post I would like to show how to stream data from any topic to relational database.

<!-- truncate -->

## What is Kafka Connect

In Short Kafka Connect is a framework facilitating streaming integrations beetwen Kafka and other systems.
You can lear more about it [here](https://developer.confluent.io/courses/kafka-connect/intro/).

There are number of abstractions provided by the framework


Source -> Kafka Connect -> Kafka

Kafka -> Kafka Connect -> Sink


