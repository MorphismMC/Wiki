# 须知

在本文中，我们始终以一个名为`Gregic Additions`的模组作为实例，请注意，这个名称仅作为教程演示使用的，
若存在重名的模组（事实上也确实存在，不过是作为GTCE的附属），请勿将教程中的代码与其源代码进行对比或混为一谈。
我们假设这个假想的`Gregic Additions`模组的`modid`为`gregicadditions`，
其的总体结构形如我们在[从零开始](/docs/introduction.md)中演示的那样：

```
src
├ api
└ main
   ├ java
   │   └ com
   │       └ gregicadditions
   │            ├ client
   │            │   └ ClientProxy.java
   │            ├ common
   │            │   └ CommonProxy.java
   │            └ GregicAdditions.java
   └── resources

```

现在，这个`GregicAdditions.java`作为模组主类，而`CommonProxy`与`ClientProxy`作为代理类。

为了避免与GTCEu本体或其他GTCEu附属的冲突，占据所有主要功能的类（除了代理类和一些具有特定命名规则者）应当使用独特的前缀进行区分，
在本文中，我们使用`Gregic`作为前缀，例如`GregicAPI`，`GregicCreativeTabs`，这样的样式有助于我们在调用时避免重复。

## GTCEu `MetaItem`/`MetaBlock`/`MetaTileEntity`

在GTCEu中，引入了一系列元概念，例如元物品（`MetaItem`），元方块（`MetaBlock`）与元多方块（`MetaTileEntity`）。

TODO

### GTCEu `RecipeMap`

遵照GTCEu本体，一个合理的配方类（`RecipeMaps`）位置是`com.gregicadditions.api.recipes`，即：

```
src
├ api
└ main
   ├ java
   │   └ com
   │       └ gregicadditions
   │            ├ api
   │            │   └ recipes
   │            │       └ GregicRecipeMaps.java
   │            ├ client
   │            │   └ ClientProxy.java
   │            ├ common
   │            │   └ CommonProxy.java
   │            └ GregicAdditions.java
   └── resources

```

每一个GTCEu样式的`RecipeMaps`类都应该是一个`@ZenClass`，尽可能不要使用`@ZenExpansion`来将其标记为GTCEu本体类的继承，
除非你一直使用GTCEu自带的`RecipeBuilder`（如果不懂，请继续看下去，在之后回看此处）。我们的`GregicRecipeMaps`类如下：

```java
@ZenClass('mods.gregicadditions.recipe.RecipeMaps')
@ZenRegister
public class GregicRecipeMaps {
    // ...
}
```

在此你便可以注册GTCEu样式的配方，因为这个类是一个`@ZenClass`，所以为每个配方加入`@ZenProperty`可以使其能够使用CrT操作。例如，我们现在注册一个名为“化学脱水机”（Chemical Dehydrator）的机器对应的配方，它具有1个物品输入槽位，2个物品输出槽位，1个流体输入槽位，1个流体输出槽位，那么我们便可以按照需求参照GTCEu中的源类写出代码：

```java
@ZenClass('mods.gregicadditions.recipe.RecipeMaps')
@ZenRegister
public class GregicRecipeMaps {

    @ZenProperty
    public static final RecipeMap<SimpleRecipeBuilder> CHEMICAL_DEHYDRATOR_RECIPES = new RecipeMap<>("chemical_dehydrator", 1, 2, 1, 1, new SimpleRecipeBuilder(), false);
}
```

这样便完成了一个基本的GTCEu样式的`RecipeMap`，在`resources`的语言文件中，它的本地化键将是`recipemap.chemical_dehydrator.name`。
你还可以链式地为其添加更多特征，比如说我们想让它在JEI页面中有一个特殊的箭头，那么可以使用：

```java
@ZenClass('mods.gregicadditions.recipe.RecipeMaps')
@ZenRegister
public class GregicRecipeMaps {

    @ZenProperty
    public static final RecipeMap<SimpleRecipeBuilder> CHEMICAL_DEHYDRATOR_RECIPES = new RecipeMap<>("chemical_dehydrator", 1, 2, 1, 1, new SimpleRecipeBuilder(), false)
        .setProgressBar(GuiTextures.PROGRESS_BAR_COMPRESS, ProgressWidget.MoveType.HORIZONTAL);
}
```

来进行，其中`GuiTextures`是存储几乎所有的GTCEu的关于GUI的材质的类，而后面的`ProgressWidget.MoveType`规定了这个箭头的运动模式（上面出现的是水平移动`HORIZONTAL`）；除此以外，`setSlotOverlay`可以设置槽位的背景，也是比较常用的：

```java
@ZenClass('mods.gregicadditions.recipe.RecipeMaps')
@ZenRegister
public class GregicRecipeMaps {

    @ZenProperty
    public static final RecipeMap<SimpleRecipeBuilder> CHEMICAL_DEHYDRATOR_RECIPES = new RecipeMap<>("chemical_dehydrator", 1, 2, 1, 1, new SimpleRecipeBuilder(), false)
        .setProgressBar(GuiTextures.PROGRESS_BAR_COMPRESS, ProgressWidget.MoveType.HORIZONTAL)
        .setSlotOverlay(false, false, true, GuiTextures.FURNACE_OVERLAY_1);
}
```

按照源代码分析，我们将所有满足“不是输出槽位的，不是流体槽位的，是同类槽位中最后一个的”三个条件的槽位的背景设置成`FURNACE_OVERLAY_1`。
多次设置也是允许的：

```java
@ZenClass('mods.gregicadditions.recipe.RecipeMaps')
@ZenRegister
public class GregicRecipeMaps {

    @ZenProperty
    public static final RecipeMap<SimpleRecipeBuilder> CHEMICAL_DEHYDRATOR_RECIPES = new RecipeMap<>("chemical_dehydrator", 1, 2, 1, 1, new SimpleRecipeBuilder(), false)
        .setProgressBar(GuiTextures.PROGRESS_BAR_COMPRESS, ProgressWidget.MoveType.HORIZONTAL)
        .setSlotOverlay(false, false, true, GuiTextures.FURNACE_OVERLAY_1)
        .setSlotOverlay(false, true, true, GuiTextures.FURNACE_OVERLAY_2)
        .setSlotOverlay(true, false, false, GuiTextures.DUST_OVERLAY)
        .setSlotOverlay(true, false, true, GuiTextures.DUST_OVERLAY);
}
```

如何查看这些槽位的背景长什么样子呢？你可以在GTCEu的`assets`文件夹中找到它们，
这些`overlay`包括上面的`progressbar`都位于`textures`文件夹中的`gui`文件夹。
你还可以尝试规定这个`RecipeMap`工作时发出的声音，使用`setSound()`方法可以为其指定一个特定的原版`SoundEvent`或`GTSoundEvent`：

```java
@ZenClass('mods.gregicadditions.recipe.RecipeMaps')
@ZenRegister
public class GregicRecipeMaps {

    @ZenProperty
    public static final RecipeMap<SimpleRecipeBuilder> CHEMICAL_DEHYDRATOR_RECIPES = new RecipeMap<>("chemical_dehydrator", 1, 2, 1, 1, new SimpleRecipeBuilder(), false)
        .setProgressBar(GuiTextures.PROGRESS_BAR_COMPRESS, ProgressWidget.MoveType.HORIZONTAL)
        .setSlotOverlay(false, false, true, GuiTextures.FURNACE_OVERLAY_1)
        .setSlotOverlay(false, true, true, GuiTextures.FURNACE_OVERLAY_2)
        .setSlotOverlay(true, false, false, GuiTextures.DUST_OVERLAY)
        .setSlotOverlay(true, false, true, GuiTextures.DUST_OVERLAY)
        .setSound(GTSoundEvents.FURNACE);
}
```

你同样可以通过查阅相关类的源代码来找到它们，`GTSoundEvent`加载的独特的声音文件也位于`assets`文件夹中。