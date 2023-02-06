# 开发框架和中间件

> todo

[[TOC]]

## 1 Spring
## 2 Spring Boot
## 3 Spring cloud
## 4 ElasticSearch
## 5 Zookeeper
## 6 Kafka
## 7 Talos
## 8 RocketMQ
## 9 Tomcat
## 10 Thrift
### 10.1 thrift的软件栈结构是如何的？

软件栈从下到上分为：传输层（Transport Layer）、 协议层（Protocol Layer）、处理层（Processor Layer）和服务层（Service Layer）。

- 传输层：负责从网络中读取和写入数据，定义了具体的网络传输协议，如TCP/IP等。
- 协议层：定义数据传输的格式，负责网络传输数据的序列化和反序列化，如二进制格式、JSON格式等。
- 处理层：处理层是由具体的IDL（接口描述语言）生成的，封装了底层网络传和序列化方式，并委托用户实现的handler进行处理。
- 服务层：整合上述的各个层，提供具体的网络线程和IO模型，形成最终的服务。

## 11 Mybatis
## 12 Shardingsphere