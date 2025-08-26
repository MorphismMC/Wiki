# CoreMod

## 什么是CoreMod

CoreMod是指使用了FML提供的字节码修改机制的Mod。

## CoreMod可以做什么

- 可以对Minecraft、其他模组的类进行修改。
- 可以在Minecraft启动前执行代码。

## 如何开发CoreMod

### `IFMLLoadingPlugin`

要实现CoreMod，我们首先需要一个实现了`IFMLLoadingPlugin`接口的入口类。这个类可以使用如下几种注解:

| 注解                    | 用途                                                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TransformerExclusions` | 声明不经过类转换器的类，有时候你可能不希望某个类或者某个包以及它的子包下的所有类不会被类转换器转换,这时你可以使用这个注解.建议Coremod将自己的类转换器都加入到TransformerExclusions里,因为类转换器在被转换时,可能因为某些谜の原因导致错误... |
| `MCVersion`             | 声明此CoreMod依赖的MC版本 ,使用错误的MC版本加载这个CoreMod会让FML向玩家给出个优雅的提示,然后结束掉游戏.                                                                                                                                     |
| `Name`                  | 声明此CoreMod的名称, 用于手动指定你的Coremod的名字,如果没有这个注解,或者内容是一个空字符串的话,FML会用你的载入入口类的类名作为Coremod名.                                                                                                    |
| `DependsOn`             | 声明此CoreMod依赖的Coremod, 如果FML发现你依赖的Coremod不存在的话,会抛出一个提示然后结束游戏.                                                                                                                                                |
| `SortingIndex`          | 声明建议的排序位置, 有时你希望你的Coremod在另一个Coremod后面被初始化,那么此时你就可以使用SortingIndex来向FML建议排序位置,之所以说是建议,是因为它不保证你一定会排在某个位置,它只是保证"比你小的一定在你"                                     |

#### `getASMClassTransformer`

这个方法返回一个字符串数组，需要包含你所有类转换器的类全名。如果没有类转换器，就返回null。类转换器指实现了`IClassTransformer`接口的类，修改字节码的工作就是在这个类中进行的。

```Java
public interface IClassTransformer {  
  
    byte[] transform(String name, String transformedName, byte[] basicClass);  
  
}
```

`IClassTransformer`是LaunchWrapper提供的接口，需要实现以下方法：

- `transform`，接收`name`、`transformedName`与`basicClass`三个参数，分别是原类名、反混淆类名和class文件的二进制`byte`数组，需要返回修改后的class文件的`byte`数组

需要特别注意的是：

- `name`原类名和`basicClass` class文件，在游戏运行时为notch混淆
- `transformedName`只有当`IClassNameTransformer`存在时才会与`name`不同，具体反混淆方式取决于`IClassNameTransformer`的实现，例如FML会将其反混淆成mcp名称 在开发环境(即未混淆的情况下)中name和transformedName没有区别,但在发布环境(即经过混淆器混淆后)中,name是混淆后的类名,transformedName是未混淆的类名.  
- `basicClass`可能已被其他`IClassTransformer`修改过
- (注意:无论如何,一定要让它返回字节码!即使什么也不做也要把参数bytes原方不动地返回过去,千万不要返回null)
- 切记无论如何都要返回一个有效的`byte`数组，否则会导致`ClassNotFoundException`、`NoClassDefFoundError`等导致的崩溃

#### `getModContainerClass`

#### `getSetupClass`

返回实现了`IFMLCallHook`接口的类的类全名。它会在Minecraft启动之前被调用。

`IFMLCallHook`接口包括2个方法:

- injectData方法:获得外界传来的数据
FML在载入Coremod完毕后会向Mod配置类传入一个Hashmap类型的字段.这个集合包含4个元素:"mcLocation","classLoader","coremodLocation"和"deobfuscationFileName".
mcLocation元素是一个File类型的变量,为Minecraft的目录.
classLoader元素是一个RelaunchClassLoader类型的变量,为当前使用的ClassLoader.  
coremodLocation是一个File类型变量,为这个Coremod的文件.
deobfuscationFileName是一个字符串变量,为当前的反混淆文件的名称,1.7.2版下这个变量的值为"/deobfuscationdata-1.7.2.lzma".  

- call方法:进行配置  
在传入数据后,FML会调用这个方法.在这里进行Mod配置吧.

::: warning 注意
由于IFMLCallHook这个接口的调用时间非常早，所以这里不应该出现MC本身的代码
:::

### 打包

## CoreMod注意事项

CoreMod需要特别注意避免调用Minecraft、其他普通Mod，甚至自己的普通Mod部分，这样的行为会导致这些类在CoreMod全部修改完成前被过早的加载进`ClassLoader`，以至于游戏崩溃，这样的崩溃甚至难以在crash-report中轻易的找出原因。
