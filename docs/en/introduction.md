# 从零开始

::: tip 注意
在开始之前，安装工作区与必要的导入工作是必须的，敬请参考[这篇文章](https://www.mcmod.cn/post/3414.html)。
:::

在Minecraft 1.12.2 Forge的开发环境中，一个完整的模组至少包括了：

- 一个模组主类，其需要使用特殊的`@Mod`注解标记；
- 一套代理，包括一般的`CommonProxy`与客户端版本的`ClientProxy`，在模组主类中使用`@SidedProxy`注解导入；
- 资源存储区域`resources`，它用于存放你的模组的语言、材质、模型与其他内容。

除此之外，一般还会包括：

- `pack.mcmeta`文件，用于存储你的模组包信息。
- `mcmod.info`文件，用于存储你的模组信息，一些Gradle会自行处理。

后两者一般来说是无关紧要的（相对前三者而言）。

## 模组主类的构建

以一个叫做`ModName`的模组为例，这个模组的主类是一个标准的Java类：

```java
public class ModName {
    // ...
}
```

为了让Forge的模组加载器读取到我们的模组，需要使用`@Mod`注解。顾名思义，`@Mod`注解具有一些与模组基本信息挂钩的参数，
你需要使用这些参数来告诉加载器：你的模组的识别码（`modid`），名字（`name`），版本（`version`）等信息。
以下的代码展示了一个叫做`Mod Name`的模组的主类：

```java
import net.minecraftforge.fml.common;

@Mod(modid = "modname",
     name = "Mod Name",
     version = "1.0.0",
     acceptedMinecraftVersions = "[1.12.2]",
     dependencies = "required:forge@[14.23.5.2847,);")
public class ModName {
    // ...
}
```

这段代码告诉了加载器这个叫做`Mod Name`的模组是一个仅限于`1.12.2`版本运行的，需要的Forge版本最低为`14.23.5.2847`的，
版本为`1.0.0`的，模组ID为`modname`的模组。除此以外的可选参数还有许多，不过我们暂时使用的只有这几个。

:::tip 注意
怎么查看`@Mod`注解支持的其他参数呢？只需要使用鼠标中键（默认）右击代码段落中的`@Mod`，即`net.minecraftforge.fml.common.Mod`，
就可以切换到对应类的源代码中了。
:::

模组主类相当于你的模组的中心枢纽，一切的行为都会在这里交汇。

## 代理，客户端与服务端

由于Minecraft是一个具有客户端与服务端的双端游戏，
那么一个自然的问题就是：为了同时支持双端的行为，我是否需要将一段不同的代码拆成两种版本，在不同的区域加载？答案是否定的，
为了解决这个问题，**代理**（Proxy），也就是我们上面提到的，出现了。代理不仅能帮助我们减少代码的重复，
还可以将特定的代码限定到指定的端运行，例如：一些资源的加载（比如材质）只需要在客户端运行，不需要在服务端再运行一次，
那么我们就可以将其在`ClientProxy`中加载。

仍旧用以上的`ModName.java`的模组主类为例，在类中使用`@SidedProxy`可以为模组指定代理，这个注解一般标记在`CommonProxy`上：

```java
@Mod(modid = "modname",
     name = "Mod Name",
     version = "1.0.0",
     acceptedMinecraftVersions = "[1.12.2]",
     dependencies = "required:forge@[14.23.5.2847,);")
public class ModName {

    @SidedProxy(modId = "modname",
                clientSide = "com.modname.client.ClientProxy",
                serverSide = "com.modname.common.CommonProxy")
    public static CommonProxy proxy;
}
```

这里的两个`Proxy`都是单独的类，在`@SidedProxy`中的`clientSide`与`serverSide`中填入对应的包位置以索引，
此时你的模组的代码结构应当形如以下：

```
src
├ api
└ main
   ├ java
   │   └ com
   │       └ modname
   │            ├ client
   │            │   └ ClientProxy.java
   │            ├ common
   │            │   └ CommonProxy.java
   │            └ ModName.java
   └── resources

```

在模组`ModName`中，类`CommonProxy`作为一般的`Proxy`类，形如以下：

```java
package com.modname.common;

@Mod.EventBusSubscriber(modId = "modname")
public class CommonProxy {
    // ...
}
```

这里的`@Mod.EventBusSubscriber`是一个特殊的注解，它将会告诉加载器这个类，而具体的解释则留待下一节讨论。
另一个`Proxy`类`ClientProxy`是限定在客户端运行的，它是`CommonProxy`的继承（`extends`）：

```java
package com.modname.client;

@Mod.EventBusSubscriber(Side.CLIENT)
public class ClientProxy extends CommonProxy {
    // ...
}
```

枚举类`Side`提供了`CLIENT`与`SERVER`两个参数，借助此，你可以在`@Mod.EventBusSubscriber`中限定其的加载端。

当然，如果你在`CommonProxy`里注册了什么方法，记得在`ClientProxy`中重写一次，比如：

```java
@Mod.EventBusSubscriber(modId = "modname")
public class CommonProxy {

    public static void preLoad() {
        // ...
    }
}
```

那么在`ClientProxy`中，你需要重写这个方法：

```java
@Mod.EventBusSubscriber(Side.CLIENT)
public class ClientProxy extends CommonProxy {

    @Override
    public static void preLoad() {
        // ...
    }
}
```

这是Java的基础语法内容，在此不多赘述。

## Forge的生命周期：事件系统

作为模组加载器，Forge加载模组中的各种信息的方式运作在一个叫做**事件**（Event）的系统上。
事实上，你可以在`net.minecraftforge.fml.common.event`这个包内找到一堆关于模组加载的事件，
它们共同构成了Forge的**生命周期**（Life Cycle）。就像生物在漫长的时间中繁衍生息，基因也同时会发生潜移默化的变化那样，
生命周期可以粗浅地理解为代码在不同的时间点被加载造成的次序，在不同的时间被加载会导致不同的结果（结合上面这个小例子，
请读者想象一下当一个蝌蚪在尚未成熟时就被拉出水面时造成的后果，这种情况下的蝌蚪还会变成我们常规认识的青蛙吗？）。一些常见的事件如下：

|             事件名            |                          作用                         |
| ---------------------------- | ----------------------------------------------------- |
| `FMLConstructionEvent`       | 最开始的`FML`事件，在模组被加载时就开始运行。               |
| `FMLPreInitializationEvent`  | 一般用于注册配置文件，物品与其他关于注册的事情。             |
| `FMLInitializationEvent`     | 对模组进行设置的阶段，关于注册表与其他数据结构应当在此被注册。 |
| `FMLPostInitializationEvent` | 完成模组的设置，和其他模组的交互也在这个阶段被注册。          |
| `FMLLoadCompleteEvent`       | 在模组加载完毕时开始运行的事件。                           |

除此以外，还有一些适用于服务端的事件，它们都可以在以上的包中找到。

为方法标记`@Mod.EventHandler`注解可以使其在指定的生命周期被注册，比如说：

```java
@Mod.EventHandler
public void onPreInit(FMLPreInitializationEvent event) {
    // ...
}
```

就是一个注册于`FMLPreInitializationEvent`的方法，其中的内容将在这个阶段被注册。遵照惯例，
我们会将`Proxy`中的`preLoad()`方法在`FMLPreInitializationEvent`中注册，即：

```java
@Mod(modid = "modname",
     name = "Mod Name",
     version = "1.0.0",
     acceptedMinecraftVersions = "[1.12.2]",
     dependencies = "required:forge@[14.23.5.2847,);")
public class ModName {

    @SidedProxy(modId = "modname",
                clientSide = "com.modname.client.ClientProxy",
                serverSide = "com.modname.common.CommonProxy")
    public static CommonProxy proxy;

    @Mod.EventHandler
    public void onPreInit(FMLPreInitializationEvent event) {
        proxy.preLoad();
    }
}
```

其中`CommonProxy`中的`preLoad()`方法为一个可以注册事件的容器（这意味着它目前是空的）：

```java
@Mod.EventBusSubscriber(modid = "modname")
public class CommonProxy {

    public void preLoad() {
        // ...
    }
}
```

而在`ClientProxy`中重写的`preLoad()`方法目前也是一样的：

```java
@Mod.EventBusSubscriber(Side.CLIENT)
public class ClientProxy extends CommonProxy {

    @Override
    public void preLoad() {
        super.preLoad();
        // ...
    }
}
```
