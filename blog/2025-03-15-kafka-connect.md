---
slug: kafka-connect
title: stream data from kafka to relational database
draft: true
authors: tkub
tags: [java, kafka]
---

# How to stream data from Kafka to relational database

In this post I would like to show how to stream data from any Kafka topic to relational database with Kafka Connect.

<!-- truncate -->

## What is Kafka Connect ?

In short Kafka Connect is a framework facilitating streaming integrations beetwen Kafka and other systems.
You can learn more about it [here](https://developer.confluent.io/courses/kafka-connect/intro/).

There are two types of Kafka Connect workflows. One is *Source* to Kafka.

```mermaid
    graph LR;
    Source --> kc["Kafka Connect"] --> Kafka
```
and the other on Kafka to *Sink*
```mermaid
    graph LR;
    Kafka --> kc["Kafka Connect"] --> Sink
```
where *Source* and *Sink* are  abstractions representing any external system like MongoDb, FTP, File or any relational database like PostgreSql, Oracle or Sql Server or even othe kafka cluster.

## Kafka Connect Plugins


## The Problem

Confluent Kafka JdbcSinkConnector which I will be using requires that the incoming message schema is known to be able map between message fields and sql collumns.

## The Solution
```mermaid
    graph LR;
    Kafka --> conv["SimpleWrappingConverter"] --> tr["AddMetadataTransformer"] --> PostgreSQL
```


https://github.com/tomaszkubacki/kafka_connect_demo/blob/master/kafka_to_postgresql/kafka_to_postgres.md


