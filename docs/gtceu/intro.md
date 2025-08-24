# 引言

::: tip

我们默认您已经对 Minecraft 模组开发的相关知识有所掌握，因此在本文档中我们将只对这部分内容做回顾性介绍。若您想要了解相关内容，请查阅相关的文档部分。

:::

## 简介

**格雷科技社区版：非官方版**（GregTech CE Unofficial，简称**GTCEu**）是一个支持 Minecraft 1.12.2 版本的格雷科技模组，是原有的旧模组**格雷科技社区版**的分支，在本文档中的相关叙述中，我们均以其简称来代指本模组。本模组提供了相当多的面向附属模组的通用API，使得开发者基于此模组开发成为了可能。

在本文档中，我们将会提供 Java 与 Kotlin 两种语言的代码示例，你可以通过在代码块中的图标与标题进行切换。需要注意的是，如果您期望在生产环境中使用 Kotlin 语言，则需要 [**Forgelin Continuous**](https://github.com/ChAoSUnItY/Forgelin-Continuous) 模组的支持。

在介绍具体内容的文档中，我们以一个名为 `Gregica` 的模组作为示例（需要注意的是，这个模组仅作为演示时使用，并不是真实存在的已发布模组，如存在同名模组则无相应关系），这个模组的类通常以 `GA` 作为名称的前缀。

## 本文档的主旨

如你所见，格雷科技这一模组的特色就是大量的材料，方块与机器，这不可避免的需要足够良好的API。恰巧，GTCEu为这些功能各自设计了API，使得附属模组可以更好的进行开发。

一个典型的例子是注册金属材料的构建器：

::: code-group

```java [MaterialBuilderExample.java]
import gregtech.api.unification.material.Material;
import gregtech.api.unification.material.properties.BlastProperty.GasTier;
import gregtech.api.unification.material.properties.MaterialToolProperty;

import static gregtech.api.GTValues.*;
import static gregtech.api.unification.material.info.MaterialFlags.*;
import static gregtech.api.unification.material.info.MaterialIconSet.*;
import static gregtech.api.util.GTUtility.gregtechId;

public static Material Aluminium = new Material.Builder(2, gregtechId("aluminium"))
    .ingot()
    .liquid(new FluidBuilder().temperature(933))
    .ore()
    .color(0x80C8F0)
    .flags(EXT2_METAL, GENERATE_GEAR, GENERATE_SMALL_GEAR, GENERATE_RING, GENERATE_FRAME, GENERATE_SPRING,
        GENERATE_SPRING_SMALL, GENERATE_FINE_WIRE, GENERATE_DOUBLE_PLATE)
    .element(Elements.Al)
    .toolStats(MaterialToolProperty.Builder.of(6.0F, 7.5F, 768, 2)
        .enchantability(14)
        .build())
    .rotorStats(10.0f, 2.0f, 128)
    .cableProperties(V[EV], 1, 1)
    .fluidPipeProperties(1166, 100, true)
    .blast(1700, GasTier.LOW)
    .build();
```

```kotlin [MaterialBuilderExample.kt]
import gregtech.api.unification.material.Material
import gregtech.api.unification.material.properties.BlastProperty.GasTier
import gregtech.api.unification.material.properties.MaterialToolProperty

import static gregtech.api.GTValues.*
import static gregtech.api.unification.material.info.MaterialFlags.*
import static gregtech.api.unification.material.info.MaterialIconSet.*
import static gregtech.api.util.GTUtility.gregtechId

var Aluminium: Material = Material.Builder(2, gregtechId("aluminium"))
    .ingot()
    .liquid(FluidBuilder().temperature(933))
    .ore()
    .color(0x80C8F0)
    .flags(EXT2_METAL, GENERATE_GEAR, GENERATE_SMALL_GEAR, GENERATE_RING, GENERATE_FRAME, GENERATE_SPRING,
        GENERATE_SPRING_SMALL, GENERATE_FINE_WIRE, GENERATE_DOUBLE_PLATE)
    .element(Elements.Al)
    .toolStats(MaterialToolProperty.Builder.of(6.0F, 7.5F, 768, 2)
        .enchantability(14)
        .build())
    .rotorStats(10.0f, 2.0f, 128)
    .cableProperties(V[EV], 1, 1)
    .fluidPipeProperties(1166, 100, true)
    .blast(1700, GasTier.LOW)
    .build()

```

:::
GTCEu提供了关于材料的各项数值与生成设置，只需要通过一系列配置就可以控制材料是否生成对应物品与方块，甚至还在配方阶段有对应的处理来生成配方！

本文档的主要内容就是介绍这些或复杂或简单的API，以便你更好的阅读与理解GTCEu的代码，相信这些文档对你的GTCEu附属开发工作有所帮助！