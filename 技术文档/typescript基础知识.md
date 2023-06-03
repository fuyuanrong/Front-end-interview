## TypeScript 笔记

### 简介

- 官方定义

  TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

- 中文定义

  TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

### 安装

- `NPM`安装`TypeScript`

  `npm install -g typescript`

- `TypeScript`转换为`JavaScript`

  `tsc test.ts`

### 基础

#### 原始数据类型

- boolean（布尔类型）

  表示逻辑值：true 和 false

  `let flag: boolean = true;`

- number（数字类型）

  双精度 64 位浮点值。它可以用来表示整数和分数

    ```javascript
    let binaryLiteral: number = 0b1010; // 二进制
    let octalLiteral: number = 0o744;    // 八进制
    let decLiteral: number = 6;    // 十进制
    let hexLiteral: number = 0xf00d;    // 十六进制
    ```

- string（字符串类型）

    一个字符系列，使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式

    ```js
    let name: string = "Runoob";
    let years: number = 5;
    let words: string = `您好，今年是 ${ name } 发布 ${ years + 1} 周年`;
    ```

- null（null）

  表示对象值缺失

- undefined（undefined）

  用于初始化变量为一个未定义的值

- never（never）

  never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值

- void（void）

    用于标识方法返回值的类型，表示该方法没有返回值

      ```js
      function hello(): void {
          alert("Hello Runoob");
      }
      ```

#### 任意值

- 任意值

  1. 任意值（Any）用来表示允许赋值为任意类型。

- 任意值类型

  1. 普通类型，在赋值过程中改变类型是不被允许的

     ```js
     let myFavoriteNumber: string = 'seven';
     myFavoriteNumber = 7;
     ```

  2. 如果是 `any` 类型，则允许被赋值为任意类型

     ```js
     let myFavoriteNumber: any = 'seven';
     myFavoriteNumber = 7;
     ```

- 任意值的属性和方法

  1. 在任意值上访问任何属性都是允许的：

     ```js
     let anyThing: any = 'hello';
     console.log(anyThing.myName);
     console.log(anyThing.myName.firstName);
     ```

  2. 也允许调用任何方法：

     ```js
     let anyThing: any = 'Tom';
     anyThing.setName('Jerry');
     anyThing.setName('Jerry').sayHello();
     anyThing.myName.setFirstName('Cat');
     ```

- 未声明类型的变量

  1. 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
  
     ```js
     let something;
     //等价于 let something: any;
     something = 'seven';
     something = 7;
     
     something.setName('Tom');
     ```

#### 类型推论

- 类型推论

  如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

- 实例

  ```js
  // 类型推断
  let myFavoriteNumber = 'seven';
  myFavoriteNumber = 7;
  // 等价于
  let myFavoriteNumber: string = 'seven';
  myFavoriteNumber = 7;
  ```

- 定义时没有赋值

  定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查：
  
  ```js
  let myFavoriteNumber;
  myFavoriteNumber = 'seven';
  myFavoriteNumber = 7;
  ```

#### 联合类型

- 联合类型

  联合类型（Union Types）表示取值可以为多种类型中的一种

- 实例

  ```js
  let myFavoriteNumber: string | number;
  myFavoriteNumber = 'seven';
  myFavoriteNumber = 7;
  ```

- 联合类型的属性或方法

  当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法：

  ```js
  // length 不是 string 和 number 的共有属性，所以会报错
  function getLength(something: string | number): number {
      return something.length;
  }
  // 访问 string 和 number 的共有属性是没问题的
  function getString(something: string | number): string {
      return something.toString();
  }
  ```

- 联合类型推断

  联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

  ```js
  let myFavoriteNumber: string | number;
  myFavoriteNumber = 'seven';
  // myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错
  console.log(myFavoriteNumber.length); // 5
  myFavoriteNumber = 7;
  // myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错
  console.log(myFavoriteNumber.length); // 编译时报错
  
  // index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
  ```

#### 对象的类型--接口

- 接口

  在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

- 实例

  ```js
  // 赋值的时候，变量的形状必须和接口的形状保持一致。
  // 定义的变量比接口少了一些属性是不允许的,多一些属性也是不允许的
  interface Person {
      name: string;
      age: number;
  }
  
  let tom: Person = {
      name: 'Tom',
      age: 25
  };
  ```

- 可选属性

  可选属性的含义是该属性可以不存在

  ```js
  interface Person {
      name: string;
      age?: number;
  }
  
  let tom: Person = {
      name: 'Tom'
  };
  ```

- 任意属性

  一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

  ```js
  // 任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了
  interface Person {
      name: string;
      age?: number;
      [propName: string]: string;
  }
  
  let tom: Person = {
      name: 'Tom',
      age: 25,
      gender: 'male'
  };
  ```

- 只读属性

  一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

  只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

  ```js
  interface Person {
      readonly id: number;
      name: string;
      age?: number;
      [propName: string]: any;
  }
  
  let tom: Person = {
      id: 89757,
      name: 'Tom',
      gender: 'male'
  };
  ```

#### 数组的类型

- [ 类型+方括号 ]表示法

  ```js
  // 最简单的方法是使用「类型 + 方括号」来表示数组：
  let fibonacci: number[] = [1, 1, 2, 3, 5];
  // 数组的项中不允许出现其他的类型：
  let fibonacci: number[] = [1, '1', 2, 3, 5];
  // 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
  let fibonacci: number[] = [1, 1, 2, 3, 5];
  fibonacci.push('8');
  ```

- 数组泛型

  `Array<elemType>` 来表示数组：

  `let fibonacci: Array<number> = [1, 1, 2, 3, 5];`

- 用接口表示数组

  ```js
  interface NumberArray {
      [index: number]: number;
  }
  let fibonacci: NumberArray = [1, 1, 2, 3, 5];
  ```

- 类数组

  类数组（Array-like Object）不是数组类型

  ```js
  let args: number[] = arguments;
  // 类数组，不能用普通的数组的方式来描述，而应该用接口：
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
  // 类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
  function sum() {
      let args: IArguments = arguments;
  }
  // IArguments 是 TypeScript 中定义好了的类型
  interface IArguments {
      [index: number]: any;
      length: number;
      callee: Function;
  }
  ```

- any在数组中的应用

  `let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];`

#### 函数的类型

- 函数声明

  ```js
  // 函数声明（Function Declaration）
  function sum(x, y) {
      return x + y;
  }
  
  // 函数表达式（Function Expression）
  let mySum = function (x, y) {
      return x + y;
  };
  
  // 输入多余的（或者少于要求的）参数，是不被允许的
  function sum(x: number, y: number): number {
      return x + y;
  }
  sum(1, 2, 3);
  ```

- 函数表达式

  ```js
  let mySum = function (x: number, y: number): number {
      return x + y;
  };
  let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
      return x + y;
  };
  ```

- 用接口定义函数的形状

  ```js
  interface SearchFunc {
      (source: string, subString: string): boolean;
  }
  
  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
      return source.search(subString) !== -1;
  }
  ```

- 可选参数

  与接口中的可选属性类似，我们用 `?` 表示可选的参数

  可选参数后面不允许再出现必需参数了：

  ```js
  function buildName(firstName: string, lastName?: string) {
      if (lastName) {
          return firstName + ' ' + lastName;
      } else {
          return firstName;
      }
  }
  let tomcat = buildName('Tom', 'Cat');
  let tom = buildName('Tom');
  ```

- 参数默认值

  ```js
  function buildName(firstName: string, lastName: string = 'Cat') {
      return firstName + ' ' + lastName;
  }
  let tomcat = buildName('Tom', 'Cat');
  ```

- 剩余参数

  使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

  ```js
  function push(array, ...items) {
      items.forEach(function(item) {
          array.push(item);
      });
  }
  
  let a: any[] = [];
  push(a, 1, 2, 3);
  ```

- 重载

  重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

  ```js
  function reverse(x: number): number;
  function reverse(x: string): string;
  function reverse(x: number | string): number | string {
      if (typeof x === 'number') {
          return Number(x.toString().split('').reverse().join(''));
      } else if (typeof x === 'string') {
          return x.split('').reverse().join('');
      }
  }
  ```

#### 类型断言

- 类型断言

  类型断言（Type Assertion）可以用来手动指定一个值的类型。

- 语法

  `值 as 类型`

  `<类型>值`

- 类型断言的用途

  1. 将一个联合类型断言为其中一个类型

  2. 将一个父类断言为更加具体的子类

  3. 将任何一个类型断言为 `any`

  4. 将 `any` 断言为一个具体的类型

- 类型断言的限制

- 双重断言

- 类型断言vs类型转换

- 类型断言vs类型声明

- 类型断言vs泛型

#### 声明文件

- 什么是声明文件

  当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

- 声明语句

  在 ts 中，编译器并不知道 `$` 或 `jQuery` 是什么东西

  ```js
  jQuery('#foo');
  // ERROR: Cannot find name 'jQuery'.
  ```

  需要使用 `declare var` 来定义它的类型

  ```js
  declare var jQuery: (selector: string) => any;
  jQuery('#foo');
  ```

- 书写声明文件

  通常我们会把声明语句放到一个单独的文件（`jQuery.d.ts`）中，这就是声明文件

  全局变量

  npm包

  UMD库

  直接扩展全局变量

  在npm包或UMD库中扩展全局变量

  模块插件

  声明文件中的依赖

  自动生成声明文件

- 发布声明文件

  1. 将声明文件和源码放在一起

     声明文件是通过 `tsc` 自动生成的

     手动写的声明文件

  2. 将声明文件发布到@types下

#### 内置对象

- ECMAScript的内置对象

  内置对象有：`Boolean`、`Error`、`Date`、`RegExp` 等

  ```js
  let b: Boolean = new Boolean(1);
  let e: Error = new Error('Error occurred');
  let d: Date = new Date();
  let r: RegExp = /[a-z]/;
  ```

- DOM和BOM的内置对象

  DOM 和 BOM 提供的内置对象：`Document`、`HTMLElement`、`Event`、`NodeList` 等

  ```js
  let body: HTMLElement = document.body;
  let allDiv: NodeList = document.querySelectorAll('div');
  document.addEventListener('click', function(e: MouseEvent) {
    // Do something
  });
  ```

- TypeScript核心库的定义文件

  ```js
  Math.pow(10, '2');
  // addEventListener 方法是在 TypeScript 核心库中定义的：
  document.addEventListener('click', function(e) {
      console.log(e.targetCurrent);
  });
  ```

- TypeScript写Node.js

  `npm install @types/node --save-dev`

### 其他

#### 变量声明

- `TypeScript` 变量的命名规则：
  - 变量名称可以包含数字和字母。
  - 除了下划线 **_** 和美元 **$** 符号外，不能包含其他特殊字符，包括空格。
  - 变量名不能以数字开头。

#### 条件语句

- **if 语句** - 只有当指定条件为 true 时，使用该语句来执行代码

  ```js
  if(boolean_expression){
      # 在布尔表达式 boolean_expression 为 true 执行
  }
  ```

- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码

  ```js
  if(boolean_expression){
     # 在布尔表达式 boolean_expression 为 true 执行
  }else{
     # 在布尔表达式 boolean_expression 为 false 执行
  }
  ```

- **if...else if....else 语句**- 使用该语句来选择多个代码块之一来执行

  ```js
  if(boolean_expression 1){
      # 在布尔表达式 boolean_expression 1 为 true 执行
  }
  else if( boolean_expression 2){
      # 在布尔表达式 boolean_expression 2 为 true 执行
  }
  else if(( boolean_expression 3){
      # 在布尔表达式 boolean_expression 3 为 true 执行
  }
  else{
      # 布尔表达式的条件都为 false 时执行
  }
  ```

- **switch 语句** - 使用该语句来选择多个代码块之一来执行

  ```js
  switch(expression){
      case constant-expression  :
         statement(s);
         break; /* 可选的 */
      case constant-expression  :
         statement(s);
         break; /* 可选的 */
    
      /* 您可以有任意数量的 case 语句 */
      default : /* 可选的 */
         statement(s);
  }
  ```

#### 循环

- for 循环

  ```js
  for ( init; condition; increment ){
      statement(s);
  }
  ```

- for...in 循环

  for...in 语句用于一组值的集合或列表进行迭代输出

  ```js
  for (var val in list) { 
      //语句 
  }
  ```

- for...of 循环

  for...of 语句创建一个循环来迭代可迭代的对象

  for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等

  ```js
  let someArray = [1, "string", false];
   
  for (let entry of someArray) {
      console.log(entry); // 1, "string", false
  }
  ```

- `forEach` 循环

  `forEach` 在 iteration 中是无法返回的，所以可以使用 every 和 some 来取代 `forEach`

  ```js
  let list = [4, 5, 6];
  list.forEach((val, idx, array) => {
      // val: 当前值
      // idx：当前index
      // array: Array
  });
  ```

- every和some 循环

  ```js
  let list = [4, 5, 6];
  list.every((val, idx, array) => {
      // val: 当前值
      // idx：当前index
      // array: Array
      return true; // Continues
      // Return false will quit the iteration
  });
  ```

- while 循环

  ```js
  while(condition){
     statement(s);
  }
  ```

- do...while 循环

  ```js
  do{
     statement(s);
  }while( condition );
  ```

- break 语句

  1. 当 **break** 语句出现在一个循环内时，循环会立即终止，且程序流将继续执行紧接着循环的下一条语句。
  2. 它可用于终止 **switch** 语句中的一个 case。

- continue 语句

  **continue** 语句有点像 **break** 语句。但它不是强制终止，continue 会跳过当前循环中的代码，强迫开始下一次循环。

- 无限循环

  无限循环就是一直在运行不会停止的循环。 for 和 while 循环都可以创建无限循环

  ```js
  for(;;) { // 语句 }
  while(true) { // 语句 } 
  ```

### 进阶

#### 类型别名

- 别名

  类型别名用来给一个类型起个新名字

- 实例

  ```js
  // 使用 type 创建类型别名
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name {
      if (typeof n === 'string') {
          return n;
      } else {
          return n();
      }
  }
  ```

#### 字符串字面量类型

- 字符串

  字符串字面量类型用来约束取值只能是某几个字符串中的一个

- 实例

  ```js
  // 类型别名与字符串字面量类型都是使用 type 进行定义
  type EventNames = 'click' | 'scroll' | 'mousemove';
  function handleEvent(ele: Element, event: EventNames) {
      // do something
  }
  
  handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
  handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
  ```

#### 元组

- 元组

  数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

- 实例

  ```js
  let tom: [string, number] = ['Tom', 25];
  // 可以只赋值其中一项
  let tom: [string, number];
  tom[0] = 'Tom';
  // 直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
  let tom: [string, number];
  tom = ['Tom', 25];
  ```

- 越界的元素

  当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

  ```js
  let tom: [string, number];
  tom = ['Tom', 25];
  tom.push('male');
  tom.push(true);
  // Argument of type 'true' is not assignable to parameter of type 'string | number'.
  ```

#### 枚举

- 枚举

  枚举（Enum）类型用于取值被限定在一定范围内的场景，比如颜色限定为红绿蓝等

- 实例

  ```js
  // 枚举使用 enum 关键字来定义：
  enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
  console.log(Days["Sun"] === 0); // true
  console.log(Days[0] === "Sun"); // true
  ```

- 手动赋值

  ```js
  // 未手动赋值的枚举项会接着上一个枚举项递增
  enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
  console.log(Days["Sun"] === 7); // true
  console.log(Days["Mon"] === 1); // true
  console.log(Days["Tue"] === 2); // true
  console.log(Days["Sat"] === 6); // true
  ```

- 常数项和计算所得项

  ```js
  // 计算所得项
  enum Color {Red, Green, Blue = "blue".length};
  // 如果紧接在计算所得项后面的是未手动赋值的项，它就会因为无法获得初始值而报错：
  enum Color {Red = "red".length, Green, Blue};
  ```

- 常数枚举

  ```js
  const enum Directions { Up, Down, Left, Right }
  // 常数枚举是使用 const enum 定义的枚举类型：
  let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
  // 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
  ```

- 外部枚举

  ```js
  // 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：
  declare enum Directions {
      Up, Down, Left, Right
  }
  let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
  ```

#### 类

##### 类的概念

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

##### ES6中类的用法

- 属性和方法

  使用 `class` 定义类，使用 `constructor` 定义构造函数。通过 `new` 生成新实例的时候，会自动调用构造函数。

  ```js
  class Animal {
      public name;
      constructor(name) {
          this.name = name;
      }
      sayHi() {
          return `My name is ${this.name}`;
      }
  }
  
  let a = new Animal('Jack');
  console.log(a.sayHi()); // My name is Jack
  ```

- 类的继承

  使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

  ```js
  class Cat extends Animal {
    constructor(name) {
      super(name); // 调用父类的 constructor(name)
      console.log(this.name);
    }
    sayHi() {
      return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
  }
  
  let c = new Cat('Tom'); // Tom
  console.log(c.sayHi()); // Meow, My name is Tom
  ```

- 存取器

  使用 getter 和 setter 可以改变属性的赋值和读取行为：

  ```js
  class Animal {
    constructor(name) {
      this.name = name;
    }
    get name() {
      return 'Jack';
    }
    set name(value) {
      console.log('setter: ' + value);
    }
  }
  
  let a = new Animal('Kitty'); // setter: Kitty
  a.name = 'Tom'; // setter: Tom
  console.log(a.name); // Jack
  ```

- 静态方法

  使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

  ```js
  class Animal {
    static isAnimal(a) {
      return a instanceof Animal;
    }
  }
  
  let a = new Animal('Jack');
  Animal.isAnimal(a); // true
  a.isAnimal(a); // TypeError: a.isAnimal is not a function
  ```
##### ES7中类的用法

- 实例属性

  ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

  ```js
  class Animal {
    name = 'Jack';
    constructor() {
      // ...
    }
  }
  let a = new Animal();
  console.log(a.name); // Jack
  ```

- 静态属性

  ES7 提案中，可以使用 `static` 定义一个静态属性：

  ```js
  class Animal {
    static num = 42;
  
    constructor() {
      // ...
    }
  }
  console.log(Animal.num); // 42
  ```
##### TypeScript中类的用法

- public private和protected

  1. `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
  2. `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
  3. `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

- 参数属性

  修饰符和`readonly`还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

  ```js
  class Animal {
    // public name: string;
    public constructor(public name) {
      // this.name = name;
    }
  }
  ```

- readonly

  只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

  ```js
  class Animal {
    readonly name;
    public constructor(name) {
      this.name = name;
    }
  }
  
  let a = new Animal('Jack');
  console.log(a.name); // Jack
  a.name = 'Tom';
  
  // index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
  // 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面
  class Animal {
    // public readonly name;
    public constructor(public readonly name) {
      // this.name = name;
    }
  }
  ```

- 抽象类

  `abstract` 用于定义抽象类和其中的抽象方法。

  抽象类是不允许被实例化的：

  ```js
  abstract class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
    public abstract sayHi();
  }
  
  let a = new Animal('Jack');
  
  // index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
  ```

  抽象类中的抽象方法必须被子类实现：

  ```js
  abstract class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
    public abstract sayHi();
  }
  
  class Cat extends Animal {
    public eat() {
      console.log(`${this.name} is eating.`);
    }
  }
  
  let cat = new Cat('Tom');
  
  // index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
  ```

  正确使用抽象类

  ```js
  abstract class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
    public abstract sayHi();
  }
  
  class Cat extends Animal {
    public sayHi() {
      console.log(`Meow, My name is ${this.name}`);
    }
  }
  
  let cat = new Cat('Tom');
  ```
##### 类的类型

- 给类加上 TypeScript 的类型很简单，与接口类似：

  ```js
  class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
  }
  
  let a: Animal = new Animal('Jack');
  console.log(a.sayHi()); // My name is Jack
  ```

#### 类与接口

- 类实现接口

  ```js
  nterface Alarm {
      alert(): void;
  }
  class Door {
  }
  
  class SecurityDoor extends Door implements Alarm {
      alert() {
          console.log('SecurityDoor alert');
      }
  }
  class Car implements Alarm {
      alert() {
          console.log('Car alert');
      }
  }
  // 一个类实现多个接口
  interface Alarm {
      alert(): void;
  }
  
  interface Light {
      lightOn(): void;
      lightOff(): void;
  }
  
  class Car implements Alarm, Light {
      alert() {
          console.log('Car alert');
      }
      lightOn() {
          console.log('Car light on');
      }
      lightOff() {
          console.log('Car light off');
      }
  }
  ```

- 接口继承接口

  ```js
  // 接口与接口之间可以是继承关系
  interface Alarm {
      alert(): void;
  }
  interface LightableAlarm extends Alarm {
      lightOn(): void;
      lightOff(): void;
  }
  ```

- 接口继承类

  ```js
  // 常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的
  // 在接口继承类的时候，也只会继承它的实例属性和实例方法
  class Point {
      x: number;
      y: number;
      constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
      }
  }
  interface Point3d extends Point {
      z: number;
  }
  let point3d: Point3d = {x: 1, y: 2, z: 3};
  ```

#### 泛型

- 泛型

  泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

- 实例

  ```js
  function createArray(length: number, value: any): Array<any> {
      let result = [];
      for (let i = 0; i < length; i++) {
          result[i] = value;
      }
      return result;
  }
  createArray(3, 'x'); // ['x', 'x', 'x']
  // 泛型
  function createArray<T>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for (let i = 0; i < length; i++) {
          result[i] = value;
      }
      return result;
  }
  createArray<string>(3, 'x'); // ['x', 'x', 'x']
  ```

- 多个类型参数

  定义泛型的时候，可以一次定义多个类型参数：

  ```js
  function swap<T, U>(tuple: [T, U]): [U, T] {
      return [tuple[1], tuple[0]];
  }
  swap([7, 'seven']); // ['seven', 7]
  ```

- 泛型约束

  在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

  ```js
  function loggingIdentity<T>(arg: T): T {
      console.log(arg.length);
      return arg;
  }
  // index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
  ```

  我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

  ```js
  interface Lengthwise {
      length: number;
  }
  
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
  }
  ```

  多个类型参数之间也可以互相约束：

  ```js
  function copyFields<T extends U, U>(target: T, source: U): T {
      for (let id in source) {
          target[id] = (<T>source)[id];
      }
      return target;
  }
  let x = { a: 1, b: 2, c: 3, d: 4 };
  copyFields(x, { b: 10, d: 20 });
  ```

- 泛型接口

  使用接口的方式来定义一个函数需要符合的形状：

  ```js
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
      return source.search(subString) !== -1;
  }
  ```

  使用含有泛型的接口来定义函数的形状：

  ```js
  interface CreateArrayFunc {
      <T>(length: number, value: T): Array<T>;
  }
  
  let createArray: CreateArrayFunc;
  createArray = function<T>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for (let i = 0; i < length; i++) {
          result[i] = value;
      }
      return result;
  }
  
  createArray(3, 'x'); // ['x', 'x', 'x']
  ```

  可以把泛型参数提前到接口名上：

  ```js
  interface CreateArrayFunc<T> {
      (length: number, value: T): Array<T>;
  }
  
  let createArray: CreateArrayFunc<any>;
  createArray = function<T>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for (let i = 0; i < length; i++) {
          result[i] = value;
      }
      return result;
  }
  createArray(3, 'x'); // ['x', 'x', 'x']
  ```

  注意，此时在使用泛型接口的时候，需要定义泛型的类型。

- 泛型类

  与泛型接口类似，泛型也可以用于类的类型定义中：

  ```js
  class GenericNumber<T> {
      zeroValue: T;
      add: (x: T, y: T) => T;
  }
  
  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function(x, y) { return x + y; };
  ```

- 泛型参数的默认类型

  我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

  ```js
  function createArray<T = string>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for (let i = 0; i < length; i++) {
          result[i] = value;
      }
      return result;
  }
  ```

#### 声明合并

- 合并

  如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

- 函数的合并

  ```js
  function reverse(x: number): number;
  function reverse(x: string): string;
  function reverse(x: number | string): number | string {
      if (typeof x === 'number') {
          return Number(x.toString().split('').reverse().join(''));
      } else if (typeof x === 'string') {
          return x.split('').reverse().join('');
      }
  }
  ```

- 接口的合并

  ```js
  interface Alarm {
      price: number;
  }
  interface Alarm {
      weight: number;
  }
  // 合并的属性的类型必须是唯一的：
  interface Alarm {
      price: number;
      weight: number;
  }
  // 接口中方法的合并，与函数的合并一样：
  interface Alarm {
      price: number;
      weight: number;
      alert(s: string): string;
      alert(s: string, n: number): string;
  }
  ```

- 类的合并

  类的合并与接口的合并规则一致

### 工程

#### 代码检查

- TypeScript 关注的重心是类型的检查，而不是代码风格，搭配 [typescript-eslint] 之后，可以用来检查 TypeScript 代码

#### 编译选项

- 索引

  allowJs：允许编译js文件

  allowSyntheticDefaultImports：允许对不包含默认导出的模块使用默认导入。这个选项不会影响生成的代码，只会影响类型检查。
