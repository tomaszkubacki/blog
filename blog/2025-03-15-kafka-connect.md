---
slug: kafka-connect
title: stream data from kafka to relational database
authors: tkub
tags: [java, kafka]
---

# How to stream data from Kafka to relational database

In this post I would like to show how to stream data from any text based Kafka topic into sql table using Kafka Connect.

<!-- truncate -->

## What is Kafka Connect ?

In short Kafka Connect is a framework facilitating streaming integrations beetwen Kafka and other systems.
You can learn more about it [here](https://developer.confluent.io/courses/kafka-connect/intro/).

There are two types of Kafka Connect workflows. One is *Source* to Kafka.

```mermaid
    flowchart LR;
    Source --> kc["Kafka Connect"] --> Kafka
```
and the other on Kafka to *Sink*
```mermaid
    flowchart LR;
    Kafka --> kc["Kafka Connect"] --> Sink
```
where *Source* and *Sink* are  abstractions representing any external system like MongoDb, FTP, File, relational database e.g. PostgreSql, Oracle or Sql Server or even another kafka cluster.

Additionally Kafka Connect allows making data manipulations in beetwen source and sink using so called Single Message Transformers (SMT). Transformers are functions registered for any given processing task invoked on each message. You can use built in transformers, but you can also provide your own shipped as a JVM jar bundle.

Kafka Connect main unit of processing is so called *connector*. Connector definition contains main type class (e.g. JdbcSinkConnector),
key and value (de)serilizer class and number of other connector specific properties.

User can register and manage any number of connectors via REST api.

There is a very good and detailed article on how Kafka Connect works [here](https://docs.confluent.io/platform/current/connect/index.html). 

## Kafka Connect message formats and schema

Kafka itself has no knownlege regarding message payload. For the broker message is just a byte array, however Kafka Connect needs to know message format and schema (in most cases) to perform data manipulations using transformers or pour message into sink in a structurized way.

## The Problem

Confluent Kafka JdbcSinkConnector which I will be using requires that the incoming message schema is known, to be able to map between message fields and sql columns.

The problem we often face, is lack of schema or even worse, message schema is so complicated it's impossible to map it into a flat column based sql table. E.g. for json with nested arrays it's impossible to map it to column, especially if the array size is unknown.

## The Solution

Fortunately modern RDBM's allow query json put in a single column, so the idea here is to simply wrap the message content in a field envelope, so it can be stored by JdbcSinkConnector in the sql column.

To make it work we need to declare custom value converter, class implementing interfece allowing convert data from byte array into connect internal data structure witch schema. Let's call it *SimpleWrappingConverter* for which code you can find [here](https://github.com/tomaszkubacki/schema_wrapping/blob/main/src/main/java/net/tk/kafka/connect/converter/SimpleSchemaWrappingConverter.java)

Full definition of connector could look like this:

```json
{
  "name": "kafka_to_postgres",
  "config": {
    "topics": "kafka_sink",
    "input.data.format": "JSON",
    "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
    "dialect.name": "PostgreSqlDatabaseDialect",
    "connection.url": "jdbc:postgresql://pg:5432/my_db",
    "connection.user": "docker",
    "connection.password": "docker",
    "connection.backoff.ms": "5000",
    "db.timezone": "UTC",
    "auto.create": "true",
    "auto.evolve": "false",
    "tasks.max": "1",
    "batch.size": "1000",
    "key.converter.schemas.enable": "false",
    "value.converter":"net.tk.kafka.connect.converter.SimpleSchemaWrappingConverter",
    "value.converter.schemas.enable": "false",
    "insert.mode": "INSERT",
    "errors.tolerance": "all",
    "errors.log.enable": "true",
    "pk.mode": "none"
  }
} 
```

## Closing remarks

I've created a [complete step-by-step demo project](https://github.com/tomaszkubacki/kafka_connect_demo/blob/master/kafka_to_postgresql/kafka_to_postgres.md) presenting example kafka-to-postgresl flow with use of *SimpleWrappingConverter* and Kafka Connect in docker container. In the same repo there are other Kafka Connect scenerios worth exploring if you want to know more how connect works.



