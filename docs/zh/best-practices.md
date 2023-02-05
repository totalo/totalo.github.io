# 各种最佳实践

> 基于个人经验总结，欢迎指正和补充

[[TOC]]

### 1、在网络编程中，IO线程中不能有阻塞操作，通常将阻塞线程转发到业务线程池中异步操作。

### 2、序列化会通过反射调用无参构造器返回一个新对象，破坏单例模式。 解决方法是添加readResolve()方法，自定义返回对象策略。

### 3、线程池可以调用 prestartAllCoreThreads() 或者 prestartCoreThread() 方法的话，可以提前创建等于核心线程数的线程数量，这种方式被称为预热，在抢购系统中就经常被用到。

### 4、日志配置相关

- **建议日志配置文件中对所有Appender的PatternLayout都增加%ex配置**，因为如果没有显式配置%ex，则异常格式化输出的默认配置是%xEx，此时会打印异常的扩展信息（JAR名称和版本），可能导致业务线程Block。
- **不建议日志配置文件中使用AsyncAppender，建议自定义Appender实现**，因为AsyncAppender是日志框架默认提供的，目前最新版本中仍然存在日志事件入队前就触发加载异常堆栈类的问题，可能导致业务线程Block。
- **不建议生产环境使用ConsoleAppender**，因为输出日志到Console时有synchronized同步操作，高并发场景下非常容易导致业务线程Block。
- **不建议在配置文件中使用AsyncLogger标签**，因为日志事件元素在入队前就会触发加载异常堆栈类，可能导致业务线程Block。如果希望使用Log4j2提供的异步日志AsyncLogger，建议配置Log4jContextSelector=org.apache.logging.log4j.core.async.AsyncLoggerContextSelector参数，开启异步日志。

```xml
<configuration status="warn">
    <appenders>
        <Console name="Console" target="SYSTEM_OUT" follow="true">
            <PatternLayout pattern="%d{yyyy/MM/dd HH:mm:ss.SSS} %t [%p] %c{1} (%F:%L) %msg%n %ex" />
        </Console>

        <XMDFile name="ShepherdLog" fileName="shepherd.log">
          	<PatternLayout pattern="%d{yyyy/MM/dd HH:mm:ss.SSS} %t [%p] %c{1} (%F:%L) %msg%n %ex" />
	      </XMDFile>

        <!--XMDFile异步磁盘日志配置示例-->
        <!--默认按天&按512M文件大小切分日志，默认最多保留30个日志文件。-->
        <!--注意：fileName前会自动增加文件路径，只配置文件名即可-->
        <XMDFile name="LocalServiceLog" fileName="request.log">
	          <PatternLayout pattern="%d{yyyy/MM/dd HH:mm:ss.SSS} %t [%p] %c{1} (%F:%L) %msg%n %ex" />
	      </XMDFile>
  			
      	<!-- 使用自定义的AsyncScribeAppender代替原有的AsycncAppender -->
        <AsyncScribe name="LogCenterAsync" blocking="false">
            <!-- 在指定日志名方面，scribeCategory 和 appkey 两者至少存在一种，且 scribeCategory 高于 appkey。-->
            <!-- <Property name="scribeCategory">data_update_test_lc</Property> -->
           <LcLayout/>
        </AsyncScribe>
    </appenders>

    <loggers>
        <logger name="com.sankuai.shepherd" level="info" additivity="false">
            <AppenderRef ref="ShepherdLog" level="warn"/>
            <AppenderRef ref="LogCenterAsync" level="info"/>
        </logger>

        <root level="info">
            <!--Console日志是同步、阻塞的，推荐只在本地调试时使用，线上将该配置去掉-->
            <!--appender-ref ref="Console" /-->
            <appender-ref ref="LocalServiceLog"/>
            <appender-ref ref="LogCenterAsync"/>
        </root>
    </loggers>
</configuration>
```

### 5、对于自定义的类型，如果要实现 Comparable，请记得 equals、hashCode、compareTo 三者逻辑一致。

### 6、网络优化的各个参数如下：

backlog：该参数，每个程序可以在listen时自己设置，和另外一个参数（ /proc/sys/net/core/somaxconn）一起，影响 全连接队列的容量。 具体算法是：min （backlog， /proc/sys/net/core/somaxconn ），最终可以建立的连接为 该值 + 1。

/proc/sys/net/ipv4/tcp_max_syn_backlog ： 半连接队列的容量。（os层面，只能设一个，由所有程序共享）

/proc/sys/net/ipv4/tcp_synack_retries ：分两种情况：

a、tcp_abort_on_overflow = 0，服务端 accept 队列满了，客户端发来 ack ， 服务端直接忽略该ack。因此服务端一直处于 SYN RECEIVED，触发了该状态下的定时器，该定时器会重传 SYN/ACK 给客户端，（不超过 /proc/sys/net/ipv4/tcp_synack_retries 指定的次数 ）， 超过后，服务端不再重传，后续也不会再有任何动作；如果客户端此时传输数据的话，服务端会返回 RST；

b、tcp_abort_on_overflow = 1，**服务端 accept 队列满了，客户端发来 ack ， 服务端直接返回 RST 。**

### 7、go语言为啥存在部分传指针的原因

当我们验证了 Go 语言中大多数常见的数据结构之后，其实能够推测出 Go 语言在传递参数时使用了传值的方式，接收方收到参数时会对这些参数进行复制；了解到这一点之后，在传递数组或者内存占用非常大的结构体时，我们应该尽量使用指针作为参数类型来避免发生数据拷贝进而影响性能。

### 8、在spring体系中，只要子类被spring接管即可，类中初始化顺序为 构造函数、@Autowire、@PostStruct

### 9、Java9以及以后的反射使用示例

```java
try {
            Field field = Unsafe.class.getDeclaredField("theUnsafe");
            field.setAccessible(true);
            Unsafe unsafe = (Unsafe) field.get(null);
            Method cleaner = method(unsafe, "invokeCleaner", new Class[] {ByteBuffer.class});
            cleaner.invoke(unsafe, viewed(buffer));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
```

### 10、mysql中  如 select x,y where x=y，当x,y有联合索引时才能命中索引，有

### 11、多线程事务处理最佳实践，不能使用@Transaction注解，需要手动提交事务

```java
@Resource
SqlContext sqlContext;
/**
 * 测试多线程事务.
 * @param employeeDOList
 */
@Override
public void saveThread(List<EmployeeDO> employeeDOList) throws SQLException {
    // 获取数据库连接,获取会话(内部自有事务)
    SqlSession sqlSession = sqlContext.getSqlSession();
    Connection connection = sqlSession.getConnection();
    try {
        // 设置手动提交
        connection.setAutoCommit(false);
        EmployeeMapper employeeMapper = sqlSession.getMapper(EmployeeMapper.class);
        //先做删除操作
        employeeMapper.delete(null);
        ExecutorService service = ExecutorConfig.getThreadPool();
        List<Callable<Integer>> callableList  = new ArrayList<>();
        List<List<EmployeeDO>> lists=averageAssign(employeeDOList, 5);
        for (int i =0;i<lists.size();i++){
            List<EmployeeDO> list  = lists.get(i);
            Callable<Integer> callable = () -> employeeMapper.saveBatch(list);
            callableList.add(callable);
        }
        //执行子线程
       List<Future<Integer>> futures = service.invokeAll(callableList);
        for (Future<Integer> future:futures) {
            if (future.get()<=0){
                connection.rollback();
                 return;
            }
        }
        connection.commit();
        System.out.println("添加完毕");
    }catch (Exception e){
        connection.rollback();
        log.info("error",e);
        throw new ServiceException("002","出现异常");
       // throw new ServiceException(ExceptionCodeEnum.EMPLOYEE_SAVE_OR_UPDATE_ERROR);
    }
}
```

