import{_ as e,M as o,p as c,q as l,R as n,N as t,V as p,t as s,a1 as u}from"./framework-204010b2.js";const i={},k=n("h1",{id:"各种最佳实践",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#各种最佳实践","aria-hidden":"true"},"#"),s(" 各种最佳实践")],-1),r=n("blockquote",null,[n("p",null,"基于个人经验总结，欢迎指正和补充")],-1),d={class:"table-of-contents"},m=u(`<h3 id="_1、在网络编程中-io线程中不能有阻塞操作-通常将阻塞线程转发到业务线程池中异步操作。" tabindex="-1"><a class="header-anchor" href="#_1、在网络编程中-io线程中不能有阻塞操作-通常将阻塞线程转发到业务线程池中异步操作。" aria-hidden="true">#</a> 1、在网络编程中，IO线程中不能有阻塞操作，通常将阻塞线程转发到业务线程池中异步操作。</h3><h3 id="_2、序列化会通过反射调用无参构造器返回一个新对象-破坏单例模式。-解决方法是添加readresolve-方法-自定义返回对象策略。" tabindex="-1"><a class="header-anchor" href="#_2、序列化会通过反射调用无参构造器返回一个新对象-破坏单例模式。-解决方法是添加readresolve-方法-自定义返回对象策略。" aria-hidden="true">#</a> 2、序列化会通过反射调用无参构造器返回一个新对象，破坏单例模式。 解决方法是添加readResolve()方法，自定义返回对象策略。</h3><h3 id="_3、线程池可以调用-prestartallcorethreads-或者-prestartcorethread-方法的话-可以提前创建等于核心线程数的线程数量-这种方式被称为预热-在抢购系统中就经常被用到。" tabindex="-1"><a class="header-anchor" href="#_3、线程池可以调用-prestartallcorethreads-或者-prestartcorethread-方法的话-可以提前创建等于核心线程数的线程数量-这种方式被称为预热-在抢购系统中就经常被用到。" aria-hidden="true">#</a> 3、线程池可以调用 prestartAllCoreThreads() 或者 prestartCoreThread() 方法的话，可以提前创建等于核心线程数的线程数量，这种方式被称为预热，在抢购系统中就经常被用到。</h3><h3 id="_4、日志配置相关" tabindex="-1"><a class="header-anchor" href="#_4、日志配置相关" aria-hidden="true">#</a> 4、日志配置相关</h3><ul><li><strong>建议日志配置文件中对所有Appender的PatternLayout都增加%ex配置</strong>，因为如果没有显式配置%ex，则异常格式化输出的默认配置是%xEx，此时会打印异常的扩展信息（JAR名称和版本），可能导致业务线程Block。</li><li><strong>不建议日志配置文件中使用AsyncAppender，建议自定义Appender实现</strong>，因为AsyncAppender是日志框架默认提供的，目前最新版本中仍然存在日志事件入队前就触发加载异常堆栈类的问题，可能导致业务线程Block。</li><li><strong>不建议生产环境使用ConsoleAppender</strong>，因为输出日志到Console时有synchronized同步操作，高并发场景下非常容易导致业务线程Block。</li><li><strong>不建议在配置文件中使用AsyncLogger标签</strong>，因为日志事件元素在入队前就会触发加载异常堆栈类，可能导致业务线程Block。如果希望使用Log4j2提供的异步日志AsyncLogger，建议配置Log4jContextSelector=org.apache.logging.log4j.core.async.AsyncLoggerContextSelector参数，开启异步日志。</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span> <span class="token attr-name">status</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>warn<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appenders</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Console</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Console<span class="token punctuation">&quot;</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>SYSTEM_OUT<span class="token punctuation">&quot;</span></span> <span class="token attr-name">follow</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PatternLayout</span> <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>%d{yyyy/MM/dd HH:mm:ss.SSS} %t [%p] %c{1} (%F:%L) %msg%n %ex<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Console</span><span class="token punctuation">&gt;</span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>XMDFile</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ShepherdLog<span class="token punctuation">&quot;</span></span> <span class="token attr-name">fileName</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>shepherd.log<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
          	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PatternLayout</span> <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>%d{yyyy/MM/dd HH:mm:ss.SSS} %t [%p] %c{1} (%F:%L) %msg%n %ex<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
	      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>XMDFile</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment">&lt;!--XMDFile异步磁盘日志配置示例--&gt;</span>
        <span class="token comment">&lt;!--默认按天&amp;按512M文件大小切分日志，默认最多保留30个日志文件。--&gt;</span>
        <span class="token comment">&lt;!--注意：fileName前会自动增加文件路径，只配置文件名即可--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>XMDFile</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LocalServiceLog<span class="token punctuation">&quot;</span></span> <span class="token attr-name">fileName</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>request.log<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PatternLayout</span> <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>%d{yyyy/MM/dd HH:mm:ss.SSS} %t [%p] %c{1} (%F:%L) %msg%n %ex<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
	      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>XMDFile</span><span class="token punctuation">&gt;</span></span>
  			
      	<span class="token comment">&lt;!-- 使用自定义的AsyncScribeAppender代替原有的AsycncAppender --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AsyncScribe</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LogCenterAsync<span class="token punctuation">&quot;</span></span> <span class="token attr-name">blocking</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token comment">&lt;!-- 在指定日志名方面，scribeCategory 和 appkey 两者至少存在一种，且 scribeCategory 高于 appkey。--&gt;</span>
            <span class="token comment">&lt;!-- &lt;Property name=&quot;scribeCategory&quot;&gt;data_update_test_lc&lt;/Property&gt; --&gt;</span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LcLayout</span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AsyncScribe</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appenders</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>loggers</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.sankuai.shepherd<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>info<span class="token punctuation">&quot;</span></span> <span class="token attr-name">additivity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AppenderRef</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ShepherdLog<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>warn<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AppenderRef</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LogCenterAsync<span class="token punctuation">&quot;</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>info<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>logger</span><span class="token punctuation">&gt;</span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>info<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token comment">&lt;!--Console日志是同步、阻塞的，推荐只在本地调试时使用，线上将该配置去掉--&gt;</span>
            <span class="token comment">&lt;!--appender-ref ref=&quot;Console&quot; /--&gt;</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LocalServiceLog<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LogCenterAsync<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>loggers</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、对于自定义的类型-如果要实现-comparable-请记得-equals、hashcode、compareto-三者逻辑一致。" tabindex="-1"><a class="header-anchor" href="#_5、对于自定义的类型-如果要实现-comparable-请记得-equals、hashcode、compareto-三者逻辑一致。" aria-hidden="true">#</a> 5、对于自定义的类型，如果要实现 Comparable，请记得 equals、hashCode、compareTo 三者逻辑一致。</h3><h3 id="_6、网络优化的各个参数如下" tabindex="-1"><a class="header-anchor" href="#_6、网络优化的各个参数如下" aria-hidden="true">#</a> 6、网络优化的各个参数如下：</h3><p>backlog：该参数，每个程序可以在listen时自己设置，和另外一个参数（ /proc/sys/net/core/somaxconn）一起，影响 全连接队列的容量。 具体算法是：min （backlog， /proc/sys/net/core/somaxconn ），最终可以建立的连接为 该值 + 1。</p><p>/proc/sys/net/ipv4/tcp_max_syn_backlog ： 半连接队列的容量。（os层面，只能设一个，由所有程序共享）</p><p>/proc/sys/net/ipv4/tcp_synack_retries ：分两种情况：</p><p>a、tcp_abort_on_overflow = 0，服务端 accept 队列满了，客户端发来 ack ， 服务端直接忽略该ack。因此服务端一直处于 SYN RECEIVED，触发了该状态下的定时器，该定时器会重传 SYN/ACK 给客户端，（不超过 /proc/sys/net/ipv4/tcp_synack_retries 指定的次数 ）， 超过后，服务端不再重传，后续也不会再有任何动作；如果客户端此时传输数据的话，服务端会返回 RST；</p><p>b、tcp_abort_on_overflow = 1，<strong>服务端 accept 队列满了，客户端发来 ack ， 服务端直接返回 RST 。</strong></p><h3 id="_7、go语言为啥存在部分传指针的原因" tabindex="-1"><a class="header-anchor" href="#_7、go语言为啥存在部分传指针的原因" aria-hidden="true">#</a> 7、go语言为啥存在部分传指针的原因</h3><p>当我们验证了 Go 语言中大多数常见的数据结构之后，其实能够推测出 Go 语言在传递参数时使用了传值的方式，接收方收到参数时会对这些参数进行复制；了解到这一点之后，在传递数组或者内存占用非常大的结构体时，我们应该尽量使用指针作为参数类型来避免发生数据拷贝进而影响性能。</p><h3 id="_8、在spring体系中-只要子类被spring接管即可-类中初始化顺序为-构造函数、-autowire、-poststruct" tabindex="-1"><a class="header-anchor" href="#_8、在spring体系中-只要子类被spring接管即可-类中初始化顺序为-构造函数、-autowire、-poststruct" aria-hidden="true">#</a> 8、在spring体系中，只要子类被spring接管即可，类中初始化顺序为 构造函数、@Autowire、@PostStruct</h3><h3 id="_9、java9以及以后的反射使用示例" tabindex="-1"><a class="header-anchor" href="#_9、java9以及以后的反射使用示例" aria-hidden="true">#</a> 9、Java9以及以后的反射使用示例</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Field</span> field <span class="token operator">=</span> <span class="token class-name">Unsafe</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;theUnsafe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            field<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Unsafe</span> unsafe <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Unsafe</span><span class="token punctuation">)</span> field<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Method</span> cleaner <span class="token operator">=</span> <span class="token function">method</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">,</span> <span class="token string">&quot;invokeCleaner&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cleaner<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">,</span> <span class="token function">viewed</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10、mysql中-如-select-x-y-where-x-y-当x-y有联合索引时才能命中索引-有" tabindex="-1"><a class="header-anchor" href="#_10、mysql中-如-select-x-y-where-x-y-当x-y有联合索引时才能命中索引-有" aria-hidden="true">#</a> 10、mysql中 如 select x,y where x=y，当x,y有联合索引时才能命中索引，有</h3><h3 id="_11、多线程事务处理最佳实践-不能使用-transaction注解-需要手动提交事务" tabindex="-1"><a class="header-anchor" href="#_11、多线程事务处理最佳实践-不能使用-transaction注解-需要手动提交事务" aria-hidden="true">#</a> 11、多线程事务处理最佳实践，不能使用@Transaction注解，需要手动提交事务</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Resource</span>
<span class="token class-name">SqlContext</span> sqlContext<span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * 测试多线程事务.
 * <span class="token keyword">@param</span> <span class="token parameter">employeeDOList</span>
 */</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveThread</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">EmployeeDO</span><span class="token punctuation">&gt;</span></span> employeeDOList<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取数据库连接,获取会话(内部自有事务)</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlContext<span class="token punctuation">.</span><span class="token function">getSqlSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Connection</span> connection <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 设置手动提交</span>
        connection<span class="token punctuation">.</span><span class="token function">setAutoCommit</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">EmployeeMapper</span> employeeMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">EmployeeMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//先做删除操作</span>
        employeeMapper<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ExecutorService</span> service <span class="token operator">=</span> <span class="token class-name">ExecutorConfig</span><span class="token punctuation">.</span><span class="token function">getThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Callable</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> callableList  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">EmployeeDO</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> lists<span class="token operator">=</span><span class="token function">averageAssign</span><span class="token punctuation">(</span>employeeDOList<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>lists<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">EmployeeDO</span><span class="token punctuation">&gt;</span></span> list  <span class="token operator">=</span> lists<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> callable <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> employeeMapper<span class="token punctuation">.</span><span class="token function">saveBatch</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
            callableList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>callable<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//执行子线程</span>
       <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Future</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> futures <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">invokeAll</span><span class="token punctuation">(</span>callableList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> future<span class="token operator">:</span>futures<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                connection<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        connection<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;添加完毕&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        connection<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ServiceException</span><span class="token punctuation">(</span><span class="token string">&quot;002&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;出现异常&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token comment">// throw new ServiceException(ExceptionCodeEnum.EMPLOYEE_SAVE_OR_UPDATE_ERROR);</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function v(g,b){const a=o("router-link");return c(),l("div",null,[k,r,n("nav",d,[n("ul",null,[n("li",null,[t(a,{to:"#_1、在网络编程中-io线程中不能有阻塞操作-通常将阻塞线程转发到业务线程池中异步操作。"},{default:p(()=>[s("1、在网络编程中，IO线程中不能有阻塞操作，通常将阻塞线程转发到业务线程池中异步操作。")]),_:1})]),n("li",null,[t(a,{to:"#_2、序列化会通过反射调用无参构造器返回一个新对象-破坏单例模式。-解决方法是添加readresolve-方法-自定义返回对象策略。"},{default:p(()=>[s("2、序列化会通过反射调用无参构造器返回一个新对象，破坏单例模式。 解决方法是添加readResolve()方法，自定义返回对象策略。")]),_:1})]),n("li",null,[t(a,{to:"#_3、线程池可以调用-prestartallcorethreads-或者-prestartcorethread-方法的话-可以提前创建等于核心线程数的线程数量-这种方式被称为预热-在抢购系统中就经常被用到。"},{default:p(()=>[s("3、线程池可以调用 prestartAllCoreThreads() 或者 prestartCoreThread() 方法的话，可以提前创建等于核心线程数的线程数量，这种方式被称为预热，在抢购系统中就经常被用到。")]),_:1})]),n("li",null,[t(a,{to:"#_4、日志配置相关"},{default:p(()=>[s("4、日志配置相关")]),_:1})]),n("li",null,[t(a,{to:"#_5、对于自定义的类型-如果要实现-comparable-请记得-equals、hashcode、compareto-三者逻辑一致。"},{default:p(()=>[s("5、对于自定义的类型，如果要实现 Comparable，请记得 equals、hashCode、compareTo 三者逻辑一致。")]),_:1})]),n("li",null,[t(a,{to:"#_6、网络优化的各个参数如下"},{default:p(()=>[s("6、网络优化的各个参数如下：")]),_:1})]),n("li",null,[t(a,{to:"#_7、go语言为啥存在部分传指针的原因"},{default:p(()=>[s("7、go语言为啥存在部分传指针的原因")]),_:1})]),n("li",null,[t(a,{to:"#_8、在spring体系中-只要子类被spring接管即可-类中初始化顺序为-构造函数、-autowire、-poststruct"},{default:p(()=>[s("8、在spring体系中，只要子类被spring接管即可，类中初始化顺序为 构造函数、@Autowire、@PostStruct")]),_:1})]),n("li",null,[t(a,{to:"#_9、java9以及以后的反射使用示例"},{default:p(()=>[s("9、Java9以及以后的反射使用示例")]),_:1})]),n("li",null,[t(a,{to:"#_10、mysql中-如-select-x-y-where-x-y-当x-y有联合索引时才能命中索引-有"},{default:p(()=>[s("10、mysql中 如 select x,y where x=y，当x,y有联合索引时才能命中索引，有")]),_:1})]),n("li",null,[t(a,{to:"#_11、多线程事务处理最佳实践-不能使用-transaction注解-需要手动提交事务"},{default:p(()=>[s("11、多线程事务处理最佳实践，不能使用@Transaction注解，需要手动提交事务")]),_:1})])])]),m])}const y=e(i,[["render",v],["__file","best-practices.html.vue"]]);export{y as default};
