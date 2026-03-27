/**
 * @file examQuestions.ts
 * @description Question bank for the C++ & intangible cultural heritage themed exam.
 */

import type { Question } from '../types/exam'

/**
 * @description Array of exam questions managed entirely on the frontend.
 *              This exam contains 30 questions in total.
 */
export const examQuestions: Question[] = [
  {
    id: 1,
    title: '蓝釉瓷器的标准化记录：以下哪种方式可以正确输出 "青花瓷" 字符串？',
    type: 'single',
    options: [
      { id: 'A', text: 'cout << "青花瓷";' },
      { id: 'B', text: 'printf("青花瓷");' },
      { id: 'C', text: 'System.out.println("青花瓷");' },
      { id: 'D', text: 'echo "青花瓷";' },
    ],
    correctOptionIds: ['A'],
    description:
      '景德镇蓝釉瓷器作为国家级非遗项目，需要用 C++ 编写信息记录系统，正确输出中文字符串是基础。',
  },
  {
    id: 2,
    title: '苗族蜡染图案的字符处理：以下哪个声明能正确存储单个文字符号 "织"？',
    type: 'single',
    options: [
      { id: 'A', text: 'char pattern = "织";' },
      { id: 'B', text: 'string pattern = "织";' },
      { id: 'C', text: "int pattern = '织';" },
      { id: 'D', text: 'float pattern = "织";' },
    ],
    correctOptionIds: ['B'],
    description: '注意区分单引号字符与双引号字符串，在这里用 string 存储中文更安全。',
  },
  {
    id: 3,
    title: '剪纸艺术的循环创作：以下哪个循环能正确输出 5 次 "剪纸艺术"？',
    type: 'single',
    options: [
      { id: 'A', text: 'for (int i = 0; i < 5; i++) { cout << "剪纸艺术" << endl; }' },
      {
        id: 'B',
        text: 'for (int i = 1; i <= 5; i--) { cout << "剪纸艺术" << endl; }',
      },
      { id: 'C', text: 'while (true) { cout << "剪纸艺术" << endl; }' },
      { id: 'D', text: 'for (int i = 5; i > 0; i--) { }' },
    ],
    correctOptionIds: ['A'],
    description: 'for 循环中 i 从 0 到 4 共执行 5 次，能正确输出 5 行内容。',
  },
  {
    id: 4,
    title:
      '古琴制作中的数据类型选择：古琴散音高度变化（0.5 到 2.5 米之间的浮点数值）应使用哪种数据类型？',
    type: 'single',
    options: [
      { id: 'A', text: 'int' },
      { id: 'B', text: 'float 或 double' },
      { id: 'C', text: 'char' },
      { id: 'D', text: 'bool' },
    ],
    correctOptionIds: ['B'],
    description: '记录带小数的长度或高度应使用浮点类型，例如 float 或 double。',
  },
  {
    id: 5,
    title:
      '陶瓷工艺的数值运算：已知 int weight = 500;（克），要获得质量的一半并存入变量，应如何编写？',
    type: 'single',
    options: [
      { id: 'A', text: 'int half = weight / 2;' },
      { id: 'B', text: 'int half = weight;' },
      { id: 'C', text: 'float half = weight / 2.0;' },
      { id: 'D', text: 'string half = weight / 2;' },
    ],
    correctOptionIds: ['A'],
    description: '本题按单选题计分，选择整数一半的写法。',
  },
  {
    id: 6,
    title: '刺绣图案的变量声明：以下哪个代码能正确声明字符串变量 embroideryColor 并初始化？',
    type: 'single',
    options: [
      { id: 'A', text: 'string embroideryColor = "金色丝线";' },
      { id: 'B', text: 'embroideryColor = "金色丝线";' },
      { id: 'C', text: 'String embroideryColor = "金色丝线";' },
      { id: 'D', text: 'var embroideryColor = "金色丝线";' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 7,
    title: '陶艺工坊的局部变量：局部变量 clayDensity 的作用域特点，下列说法正确的是？',
    type: 'single',
    options: [
      { id: 'A', text: '只在声明它的函数内有效。' },
      { id: 'B', text: '可以在任何地方访问。' },
      { id: 'C', text: '需要显式传递才能在其他函数中使用。' },
      { id: 'D', text: 'A 和 C 都对。' },
    ],
    correctOptionIds: ['D'],
  },
  {
    id: 8,
    title: '糖画艺人的全局变量：全局变量和局部变量的主要区别是？',
    type: 'single',
    options: [
      { id: 'A', text: '全局变量声明在函数外，局部变量声明在函数内。' },
      { id: 'B', text: '全局变量只能是整数类型。' },
      { id: 'C', text: '全局变量一定更快。' },
      { id: 'D', text: '局部变量可以被所有函数访问。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 9,
    title: '木雕工艺的常量设定：以下哪个常量定义是正确的？',
    type: 'single',
    options: [
      { id: 'A', text: 'const int STANDARD_HEIGHT = 30;' },
      { id: 'B', text: 'int const STANDARD_HEIGHT = 30;' },
      { id: 'C', text: 'const STANDARD_HEIGHT = 30;' },
      { id: 'D', text: 'constant int STANDARD_HEIGHT = 30;' },
    ],
    correctOptionIds: ['B'],
    description: '本题按单选题计分，选择答案中给出的标准写法之一。',
  },
  {
    id: 10,
    title:
      '漆器工坊的变量初始化：下面代码中，直接输出未初始化的 int 变量 varnishQuality 会出现什么情况？',
    type: 'single',
    options: [
      { id: 'A', text: '会输出随机值（未定义行为）。' },
      { id: 'B', text: '会输出 0。' },
      { id: 'C', text: '编译时报错，禁止这样写。' },
      { id: 'D', text: '一定会导致程序崩溃。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 11,
    title: '多选题：以下哪些是 C++ 中的循环语句？',
    type: 'multiple',
    options: [
      { id: 'A', text: 'for' },
      { id: 'B', text: 'while' },
      { id: 'C', text: 'switch' },
      { id: 'D', text: 'do-while' },
    ],
    correctOptionIds: ['A', 'B', 'D'],
    description: '本题为多选题，需选择所有正确的循环语句类型。',
  },
  {
    id: 12,
    title:
      '刺绣难度的多条件判断：根据针数多少分为三个难度级别（少于1000为初级，1000-5000为中级，5000以上为高级），以下哪个 if-else 结构能正确分类？',
    type: 'single',
    options: [
      {
        id: 'A',
        text: 'if (needles < 1000) cout << "初级"; else if (needles < 5000) cout << "中级"; else cout << "高级";',
      },
      {
        id: 'B',
        text: 'if (needles >= 1000) cout << "初级"; else if (needles >= 5000) cout << "中级"; else cout << "高级";',
      },
      {
        id: 'C',
        text: 'if (needles = 1000) cout << "初级";',
      },
      { id: 'D', text: '以上都不对。' },
    ],
    correctOptionIds: ['A'],
    description: '注意比较运算符与赋值运算符的区别，并合理设置区间边界。',
  },
  {
    id: 13,
    title: '瓷器质检的 switch 语句：关于 switch 的写法，以下说法哪一项是正确的？',
    type: 'single',
    options: [
      { id: 'A', text: '每个 case 后必须写 break，否则无法编译。' },
      { id: 'B', text: 'switch 只能用于整数，不能用于字符。' },
      { id: 'C', text: 'default 分支是必须写的，否则无法运行。' },
      { id: 'D', text: '通常应在每个 case 末尾加 break，default 分支是可选但建议使用。' },
    ],
    correctOptionIds: ['D'],
    description:
      '合理使用 break 可以避免意外贯穿，default 分支可作为兜底处理，提升程序健壮性。',
  },
  {
    id: 14,
    title: '竹编工艺的三目运算符：根据编织行数 rows 判断质量（>100 为“精品”，否则为“普品”），以下哪种写法最简洁？',
    type: 'single',
    options: [
      { id: 'A', text: 'string quality = (rows > 100) ? "精品" : "普品";' },
      {
        id: 'B',
        text: 'if (rows > 100) string quality = "精品"; else string quality = "普品";',
      },
      { id: 'C', text: 'string quality = (rows > 100) ? "精品";' },
      { id: 'D', text: '以上都对。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 15,
    title:
      '宣纸制作的逻辑运算：宣纸生产需要同时检查纸浆浓度 density 在 18-22 之间，且含水率 moisture 在 40-50 之间。哪个条件组合正确？',
    type: 'single',
    options: [
      {
        id: 'A',
        text: 'if (density >= 18 && density <= 22 && moisture >= 40 && moisture <= 50)',
      },
      {
        id: 'B',
        text: 'if (density >= 18 || density <= 22 || moisture >= 40 || moisture <= 50)',
      },
      {
        id: 'C',
        text: 'if (density > 18 && density < 22 && moisture > 40 && moisture < 50)',
      },
      {
        id: 'D',
        text: 'if ((18 <= density <= 22) && (40 <= moisture <= 50))',
      },
    ],
    correctOptionIds: ['A'],
    description: 'C++ 不支持数学式的链式比较，需要使用显式的逻辑与组合各个条件。',
  },
  {
    id: 16,
    title: '锦缎图案的 while 循环：以下代码能否正确输出 10 次“锦缎图案”？',
    type: 'single',
    options: [
      {
        id: 'A',
        text: '能，count 从 0 增加到 9，一共输出 10 次。',
      },
      { id: 'B', text: '只能输出 9 次。' },
      { id: 'C', text: '会形成无限循环。' },
      { id: 'D', text: '一次都不会输出。' },
    ],
    correctOptionIds: ['A'],
    description:
      'while (count < 10) 搭配 count++，可以精确控制循环次数，用于重复绘制锦缎图案。',
  },
  {
    id: 17,
    title: '折纸艺术的 do-while 循环：关于 do-while 的特点，下列哪项是正确的？',
    type: 'single',
    options: [
      { id: 'A', text: '循环体至少执行一次，然后再判断条件。' },
      { id: 'B', text: '先判断条件，再决定是否执行循环体。' },
      { id: 'C', text: '只能用于整数计数的循环。' },
      { id: 'D', text: '不能在循环中使用 break。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 18,
    title:
      '藏族唐卡的嵌套循环：一个 5×5 的网格，每个格子代表一个图案元素。下列嵌套循环能否正确输出 5 行 5 列方框？',
    type: 'single',
    options: [
      { id: 'A', text: '能，外层控制行数，内层控制列数，共输出 25 个方框。' },
      { id: 'B', text: '只能输出 5 个方框。' },
      { id: 'C', text: '会导致死循环。' },
      { id: 'D', text: '会编译错误。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 19,
    title: '京剧服饰的循环控制：在遍历服饰数据时，如何跳过当前迭代直接进入下一次循环？',
    type: 'single',
    options: [
      { id: 'A', text: '使用 continue; 语句。' },
      { id: 'B', text: '使用 break; 语句。' },
      { id: 'C', text: '使用 skip; 语句。' },
      { id: 'D', text: '使用 next; 语句。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 20,
    title:
      '陶艺烧制的循环退出：在检查多个陶坯时，一旦发现有裂纹就立即停止检查，以下做法哪项正确？',
    type: 'single',
    options: [
      {
        id: 'A',
        text: '在检测到裂纹时输出提示，并使用 break; 立即跳出循环。',
      },
      { id: 'B', text: '使用 continue; 跳过当前迭代。' },
      { id: 'C', text: '使用 return; 直接退出整个函数。' },
      { id: 'D', text: '修改循环条件，但不跳出循环。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 21,
    title: '茶艺表演的函数定义：以下哪个函数定义能正确表示“泡茶”的过程？',
    type: 'single',
    options: [
      { id: 'A', text: 'void brewTea(string teaType) { cout << "正在泡" << teaType << endl; }' },
      { id: 'B', text: 'void brewTea(teaType) {}' },
      { id: 'C', text: 'brewTea(string teaType) {}' },
      { id: 'D', text: 'void brewTea string teaType {}' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 22,
    title:
      '书法艺术的函数调用：已定义 int calculateStrokeQuality(string strokeType); 以下哪个调用是正确的？',
    type: 'single',
    options: [
      { id: 'A', text: 'int quality = calculateStrokeQuality("楷书");' },
      { id: 'B', text: 'int quality = calculateStrokeQuality;' },
      { id: 'C', text: 'calculateStrokeQuality("楷书", "行书");' },
      { id: 'D', text: 'calculateStrokeQuality();' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 23,
    title:
      '雕版印刷的函数返回值：质量评分函数应返回一个整数分数，以下哪个函数定义能正确返回分数？',
    type: 'single',
    options: [
      {
        id: 'A',
        text: 'int evaluatePrintQuality(int details) { int score = details * 2; return score; }',
      },
      { id: 'B', text: 'int evaluatePrintQuality(int details) { return; }' },
      { id: 'C', text: 'int evaluatePrintQuality(int details) { } // 没有 return 也行' },
      { id: 'D', text: 'void evaluatePrintQuality(int details) { cout << 100; }' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 24,
    title:
      '瓷器工坊的函数递归：使用递归函数计算 n 的阶乘，以下哪个定义是合理的？',
    type: 'single',
    options: [
      {
        id: 'A',
        text: 'int factorial(int n) { if (n <= 1) return 1; return n * factorial(n - 1); }',
      },
      { id: 'B', text: 'int factorial(int n) { return n * factorial(n - 1); } // 无终止条件' },
      { id: 'C', text: 'int factorial(int n) { if (n == 0) return 0; }' },
      { id: 'D', text: 'void factorial(int n) { cout << n; }' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 25,
    title:
      '民间剧艺的参数传递：某函数需要在内部修改传入的成绩数值，以下哪种参数形式合适？',
    type: 'single',
    options: [
      { id: 'A', text: '使用引用参数：void modifyPerformanceData(int &performance);' },
      { id: 'B', text: '使用值参数：void modifyPerformanceData(int performance);' },
      { id: 'C', text: '使用指针参数一定比引用更简洁。' },
      { id: 'D', text: '只能通过返回值修改，不能修改参数。' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 26,
    title:
      '丝绸之路的数组存储：要创建一个包含 5 种丝绸名称的数组，以下哪个声明是正确的？',
    type: 'single',
    options: [
      {
        id: 'A',
        text: 'string silkTypes[5] = {"苏州丝绸", "杭州绸", "湖州丝绸", "南通绸", "嘉兴绸"};',
      },
      { id: 'B', text: 'string silkTypes[5]; silkTypes = {"苏州丝绸", "杭州绸", ...};' },
      { id: 'C', text: 'string[5] silkTypes;' },
      { id: 'D', text: 'array silkTypes[5];' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 27,
    title:
      '陶瓷艺术的数组访问：已声明 int ceramicScores[10]; 存储 10 个陶瓷评分，以下哪项能正确访问第 3 个评分？',
    type: 'single',
    options: [
      { id: 'A', text: 'ceramicScores[2]' },
      { id: 'B', text: 'ceramicScores[3]' },
      { id: 'C', text: 'ceramicScores.get(2)' },
      { id: 'D', text: 'ceramicScores[1]' },
    ],
    correctOptionIds: ['A'],
    description: 'C++ 数组下标从 0 开始，因此第 3 个元素的下标为 2。',
  },
  {
    id: 28,
    title:
      '琉璃工艺的二维数组：要定义 3 行 4 列的颜色编码表，下列哪种二维数组定义方式是正确的？',
    type: 'single',
    options: [
      { id: 'A', text: 'int glassColors[3][4];' },
      { id: 'B', text: 'int glassColors[4][3];' },
      { id: 'C', text: 'vector&lt;vector&lt;int&gt;&gt; glassColors(3, vector&lt;int&gt;(4));' },
      { id: 'D', text: 'int glassColors[][4];' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 29,
    title:
      '瓷器纹理的指针：以下代码中，哪一项能正确创建指针并指向整数变量 textureValue？',
    type: 'single',
    options: [
      { id: 'A', text: 'int textureValue = 100; int *texturePtr = &textureValue;' },
      { id: 'B', text: 'int textureValue = 100; int *texturePtr = textureValue;' },
      { id: 'C', text: 'int textureValue = 100; int texturePtr = &textureValue;' },
      { id: 'D', text: 'int *texturePtr; *texturePtr = 100;' },
    ],
    correctOptionIds: ['A'],
  },
  {
    id: 30,
    title:
      '传统工艺的指针与数组：关于指针与数组的关系，下列说法哪一项是正确的？',
    type: 'single',
    options: [
      { id: 'A', text: '数组名本质上是一个可以任意修改的指针变量。' },
      { id: 'B', text: 'ptr + 1 表示指针向前移动 1 个字节。' },
      { id: 'C', text: 'craftScores[i] 和 *(craftScores + i) 在语义上是等价的。' },
      { id: 'D', text: '数组名可隐式转换为指向首元素的指针，且 C 也正确。' },
    ],
    correctOptionIds: ['D'],
    description: '数组名在大多数表达式中会退化为指向首元素的指针，下标运算与指针偏移等价。',
  },
]
