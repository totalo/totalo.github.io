import{_ as l,M as h,p as d,q as o,R as a,N as t,V as i,t as e,a1 as n}from"./framework-d81ad7e5.js";const s={},c=a("h1",{id:"开发框架和中间件",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#开发框架和中间件","aria-hidden":"true"},"#"),e(" 开发框架和中间件")],-1),_=a("blockquote",null,[a("p",null,"todo")],-1),u={class:"table-of-contents"},f=n('<h2 id="_1-spring" tabindex="-1"><a class="header-anchor" href="#_1-spring" aria-hidden="true">#</a> 1 Spring</h2><h2 id="_2-spring-boot" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot" aria-hidden="true">#</a> 2 Spring Boot</h2><h2 id="_3-spring-cloud" tabindex="-1"><a class="header-anchor" href="#_3-spring-cloud" aria-hidden="true">#</a> 3 Spring cloud</h2><h2 id="_4-elasticsearch" tabindex="-1"><a class="header-anchor" href="#_4-elasticsearch" aria-hidden="true">#</a> 4 ElasticSearch</h2><h2 id="_5-zookeeper" tabindex="-1"><a class="header-anchor" href="#_5-zookeeper" aria-hidden="true">#</a> 5 Zookeeper</h2><h2 id="_6-kafka" tabindex="-1"><a class="header-anchor" href="#_6-kafka" aria-hidden="true">#</a> 6 Kafka</h2><h2 id="_7-talos" tabindex="-1"><a class="header-anchor" href="#_7-talos" aria-hidden="true">#</a> 7 Talos</h2><h2 id="_8-rocketmq" tabindex="-1"><a class="header-anchor" href="#_8-rocketmq" aria-hidden="true">#</a> 8 RocketMQ</h2><h2 id="_9-tomcat" tabindex="-1"><a class="header-anchor" href="#_9-tomcat" aria-hidden="true">#</a> 9 Tomcat</h2><h2 id="_10-thrift" tabindex="-1"><a class="header-anchor" href="#_10-thrift" aria-hidden="true">#</a> 10 Thrift</h2><h3 id="_10-1-thrift的软件栈结构是如何的" tabindex="-1"><a class="header-anchor" href="#_10-1-thrift的软件栈结构是如何的" aria-hidden="true">#</a> 10.1 thrift的软件栈结构是如何的？</h3><p>软件栈从下到上分为：传输层（Transport Layer）、 协议层（Protocol Layer）、处理层（Processor Layer）和服务层（Service Layer）。</p><ul><li>传输层：负责从网络中读取和写入数据，定义了具体的网络传输协议，如TCP/IP等。</li><li>协议层：定义数据传输的格式，负责网络传输数据的序列化和反序列化，如二进制格式、JSON格式等。</li><li>处理层：处理层是由具体的IDL（接口描述语言）生成的，封装了底层网络传和序列化方式，并委托用户实现的handler进行处理。</li><li>服务层：整合上述的各个层，提供具体的网络线程和IO模型，形成最终的服务。</li></ul><h2 id="_11-mybatis" tabindex="-1"><a class="header-anchor" href="#_11-mybatis" aria-hidden="true">#</a> 11 Mybatis</h2><h2 id="_12-shardingsphere" tabindex="-1"><a class="header-anchor" href="#_12-shardingsphere" aria-hidden="true">#</a> 12 Shardingsphere</h2>',15);function p(b,k){const r=h("router-link");return d(),o("div",null,[c,_,a("nav",u,[a("ul",null,[a("li",null,[t(r,{to:"#_1-spring"},{default:i(()=>[e("1 Spring")]),_:1})]),a("li",null,[t(r,{to:"#_2-spring-boot"},{default:i(()=>[e("2 Spring Boot")]),_:1})]),a("li",null,[t(r,{to:"#_3-spring-cloud"},{default:i(()=>[e("3 Spring cloud")]),_:1})]),a("li",null,[t(r,{to:"#_4-elasticsearch"},{default:i(()=>[e("4 ElasticSearch")]),_:1})]),a("li",null,[t(r,{to:"#_5-zookeeper"},{default:i(()=>[e("5 Zookeeper")]),_:1})]),a("li",null,[t(r,{to:"#_6-kafka"},{default:i(()=>[e("6 Kafka")]),_:1})]),a("li",null,[t(r,{to:"#_7-talos"},{default:i(()=>[e("7 Talos")]),_:1})]),a("li",null,[t(r,{to:"#_8-rocketmq"},{default:i(()=>[e("8 RocketMQ")]),_:1})]),a("li",null,[t(r,{to:"#_9-tomcat"},{default:i(()=>[e("9 Tomcat")]),_:1})]),a("li",null,[t(r,{to:"#_10-thrift"},{default:i(()=>[e("10 Thrift")]),_:1}),a("ul",null,[a("li",null,[t(r,{to:"#_10-1-thrift的软件栈结构是如何的"},{default:i(()=>[e("10.1 thrift的软件栈结构是如何的？")]),_:1})])])]),a("li",null,[t(r,{to:"#_11-mybatis"},{default:i(()=>[e("11 Mybatis")]),_:1})]),a("li",null,[t(r,{to:"#_12-shardingsphere"},{default:i(()=>[e("12 Shardingsphere")]),_:1})])])]),f])}const g=l(s,[["render",p],["__file","middleware.html.vue"]]);export{g as default};