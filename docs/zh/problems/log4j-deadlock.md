# 日志量突增导致线上出现大面积的超时，机器cpu负载过高

[[TOC]]

### 现象描述

一台机器不同端口，两个相同的进程，出现机器负载过高，dump发现log4j callApender阻塞

![image](/images/log4j-deadlock_1.png)

### 问题分析

线上未进行相关的变更，与之前相比，仅仅是日志量增加了，根据这个点，进一步排查
发现log4j的appender是一个队列，队列的大小默认是512，当队列满了之后，会阻塞，直到队列有空闲位置

```java
public void callAppenders(LoggingEvent event) {
  int writes = 0;
  for(Category c = this; c != null; c=c.parent) {
    // Protected against simultaneous call to addAppender, removeAppender,...
    synchronized(c) {
      if(c.aai != null) {
        writes += c.aai.appendLoopOnAppenders(event);
      }
      if(!c.additive) {
        break;
      }
    }
  }

  if(writes == 0) {
    repository.emitNoAppenderWarning(this);
  }
}
```

### 解决方案：升级至log4j2解决了相关的问题

但是发现，还是会存在死锁问题，通过分析发现log4j2-disruptor队列有问题，导致阻塞。

![image](/images/log4j-deadlock_2.png)

解决方案：升级log4j2的版本

### 参考资料

1. https://www.cnblogs.com/flystar32/p/6751895.html
2. https://github.com/apache/logging-log4j2/commit/7a7f5e4ed1ce8a27357a12a06d32ca2b04e5eb56