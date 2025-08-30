# 元物品

元物品（Meta Item）是基于 Minecraft 原版的物品系统的一套允许通过元数据（Metadata）来识别子物品的物品系统。
简单来说，它相当于充分利用了物品的每个 `damage` 来注册子物品，从而实现使用同一个物品注册多个子物品的需求，
这个需求则是因为格雷科技需要生成大量的材料部件物品与其他配件物品。

## 元物品的使用

作为注册元物品的基底，类 `StandardMetaItem` 给出了一个简单的实现，只需要继承这个类即可创建一个简单的元物品类：

::: code-group

```java
import gregtech.api.items.metaitem.StandardMetaItem;

public class GAMetaItem1 extends StandardMetaItem {
    
    public GAMetaItem1() {
        super();
    }
    
    @Override
    public void registerSubItems() {
        // ...
    }
    
}
```

```kotlin
import gregtech.api.items.metaitem.StandardMetaItem

object GAMetaItem() {
    
    private lateinit var META_ITEMS: MetaItem<*>
    
    fun init() {
        META_ITEMS = StandardMetaItem()
    }
    
    fun register() {
        // ...
    }
    
}

```

:::