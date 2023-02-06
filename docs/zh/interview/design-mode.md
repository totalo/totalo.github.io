# 设计模式

> todo

[[TOC]]

### 单例模式

1、懒汉模式、线程不安全

```java
public class Singleton {
		public static Singleton singleton;
		private Singleton () {
		}
		public static Singleton getInstance() {
     		if (null == singleton) {
          singleton = new Singleton();
        }
      return singleton;
		}
}
```

2、懒汉模式，线程安全

```java
public class Singleton {
		public static Singleton singleton;
		private Singleton () {
		}
		public static synchronized Singleton getInstance() {
     		if (null == singleton) {
          singleton = new Singleton();
        }
      return singleton;
		}
}
```

3、饿汉模式，线程安全

```java
public class Singleton {
  public static final Singleton singleton = new Singleton();
  private Singleton() {}
  public static Singleton getInstantce() {
    return singleton;
  }
}
```

4、DCL双重检查锁

```java
public class Singleton {
  private volatile static Singleton singleton;
  private Singleton (){}  
    public static Singleton getSingleton() {  
    if (singleton == null) {  
        synchronized (Singleton.class) {  
        if (singleton == null) {  
            singleton = new Singleton();  
        }  
        }  
    }  
    return singleton;  
    } 
}
```

5、登记式\静态内部类，线程安全，延迟加载

```java
    public class Singleton {
        public static class SingletonHodler {
            public static final Singleton INSTANCE = new Singleton();
        }
        private Singleton() {}
        public static final Singleton getInstance() {
            return SingletonHodler.INSTANCE;
        }
    }
```

6、枚举

```java
public enum Singleton {
    B {
        @Override
        public void whatever() {
            super.whatever();
        }
    },
    
    INSTANCE;
    public void whatever() {
        
    }
}
```

