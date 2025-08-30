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

```scala
import gregtech.api.items.metaitem.StandardMetaItem

object GAMetaItem {

    private var metaItems: MetaItem[_] = _
    
    def init(): Unit = {
        metaItems = new StandardMetaItem()
    }
    
    def register(): Unit = {
        // ...
    }
    
}

```

:::

简单来说，一个元物品类包括一个初始化的用于承载所有子物品的 `StandardMetaItem` 对象，以及用于为其注册内容的 `registerSubItems` 方法。
由于 `StandardMetaItem` 继承自 `MetaItem`，因此它也拥有 `MetaItem` 的所有功能，同时还可以使用基于原版的 `Item` 类的一些方法，
例如使用 `setCreativeTabs` 设置其的 `CreativeTabs`。

一个简单的例子是，如果我们想要注册一个名为 `example_item` 的元物品，则可以这样做：

::: code-group

```java
import gregtech.api.items.metaitem.StandardMetaItem;

public final class GAMetaItems {
    
    public static MetaItem<?>.MetaValueItem EXAMPLE_ITEM;
    
}

public class GAMetaItem1 extends StandardMetaItem {
    
    public GAMetaItem1() {
        super();
    }
    
    @Override
    public void registerSubItems() {
        GAMetaItems.EXAMPLE_ITEM = addItem(1, "example_item");
    }
    
}
```

```kotlin
import gregtech.api.items.metaitem.StandardMetaItem

object GAMetaItem() {
    
    private lateinit var META_ITEMS: MetaItem<*>
    
    lateinit var EXAMPLE_ITEM: MetaItem<*>.MetaValueItem
    
    fun init() {
        META_ITEMS = StandardMetaItem()
    }
    
    fun register() {
        EXAMPLE_ITEM = META_ITEMS.addItem(1, "example_item")
    }
    
}

```

```scala
import gregtech.api.items.metaitem.StandardMetaItem

object GAMetaItem {

    private var metaItems: MetaItem[_] = _
    
    var EXAMPLE_ITEM: MetaItem[_]#MetaValueItem = _
    
    def init(): Unit = {
        metaItems = new StandardMetaItem()
    }
    
    def register(): Unit = {
        EXAMPLE_ITEM = metaItems.addItem(1, "example_item")
    }
    
}

```

:::

注意，当你使用 Kotlin 或 Scala 时，需要在适当阶段调用 `init` 与 `register` 方法完成初始化，否则会注册失败。

一个元物品的默认模型路径是 `assets/gregtech/models/item/metaitems/example_item.json`，你可以通过在 `StandardMetaItem` 类中覆写对应方法来改变它，
详见 `MetaItem` 类中的方法 `formatModelPath` 与 `createItemModelPath`。