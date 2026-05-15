export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizData: Record<number, QuizQuestion[]> = {
  1: [
    {
      question: '本书使用的统一案例是什么？',
      options: ['智能推荐购物系统', '智能餐厅推荐与评价系统', '智能交通预测系统', '智能医疗诊断系统'],
      correct: 1,
      explanation: '全书以"智能餐厅推荐与评价系统"为统一案例，贯穿所有16章内容。',
    },
    {
      question: '下列哪个问题属于"回归"问题？',
      options: ['判断餐厅会不会火', '预测餐厅的评分', '识别食物照片的菜系', '对用户评论做情感分析'],
      correct: 1,
      explanation: '回归问题是预测连续值（如评分1-5分），分类问题是判断离散类别（如会不会火）。',
    },
    {
      question: '本书推荐使用哪个深度学习框架？',
      options: ['TensorFlow', 'PyTorch', 'Keras', 'JAX'],
      correct: 1,
      explanation: 'PyTorch 2.x是本书推荐的深度学习主力框架，同时也是研究界的标准。',
    },
    {
      question: 'NLP在餐厅场景中的典型应用是什么？',
      options: ['食物照片分类', '用户评论情感分析', '餐厅位置推荐', '价格预测'],
      correct: 1,
      explanation: '用Transformer/BERT分析用户评论中的情感，如区分"太辣了"是抱怨还是赞美。',
    },
    {
      question: '本书的数据集不包含以下哪种数据？',
      options: ['食物照片', '用户评论', '视频监控数据', '用户消费行为记录'],
      correct: 2,
      explanation: '数据集包含结构化数据（表格）、文本、图片和行为序列，但不包含视频数据。',
    },
  ],
  2: [
    {
      question: '在推荐系统中，用户偏好向量与餐厅特征向量的点积表示什么？',
      options: ['两个向量的夹角', '"合拍指数"', '向量的长度', '向量的方向'],
      correct: 1,
      explanation: '点积计算偏好向量与餐厅特征向量的"合拍指数"，是推荐系统最底层的数学运算。',
    },
    {
      question: '梯度在机器学习中的直观理解是什么？',
      options: ['参数的大小', '"最陡的下山方向"', '数据的平均值', '模型的输出值'],
      correct: 1,
      explanation: '梯度指向损失函数增长最快的方向，沿负梯度方向走就是"下山"（降低损失）。',
    },
    {
      question: '余弦相似度接近1意味着什么？',
      options: ['两个向量完全不相关', '两个向量非常相似', '两个向量正交', '两个向量大小相同'],
      correct: 1,
      explanation: '余弦相似度越接近1，说明两个向量的夹角越小，两个餐厅越相似。',
    },
    {
      question: '交叉熵主要用于什么类型的任务？',
      options: ['回归任务', '聚类任务', '分类任务', '降维任务'],
      correct: 2,
      explanation: '交叉熵(Cross-Entropy)是分类任务中最常用的损失函数，衡量预测分布与真实分布之间的差异。',
    },
    {
      question: '公式 θ_new = θ_old - lr × ∇L(θ) 描述的是什么算法？',
      options: ['矩阵乘法', '梯度下降', '余弦相似度', '贝叶斯推断'],
      correct: 1,
      explanation: '这是梯度下降的更新公式：沿着梯度反方向，以学习率为步长更新参数。',
    },
  ],
  3: [
    {
      question: '特征工程的目的是什么？',
      options: ['把模型变得更大', '将原始数据转化为模型能理解的数字表示', '减少数据集的大小', '增加模型的训练速度'],
      correct: 1,
      explanation: '特征工程是将原始数据（如"人均消费58元"）转化为模型能理解的数字表示的过程。',
    },
    {
      question: 'One-Hot编码和Label Encoding的区别是什么？',
      options: ['没有区别', 'One-Hot产生稀疏向量，Label Encoding产生单个整数', 'Label Encoding比One-Hot维度更高', 'One-Hot只能用于数值特征'],
      correct: 1,
      explanation: 'One-Hot编码为每个类别创建一个独立的0/1维度，Label Encoding只给一个整数。Label Encoding可能让模型误以为类别有大小关系。',
    },
    {
      question: '为什么要将数据分为训练集、验证集和测试集？',
      options: ['为了让数据更多', '防止在训练数据上评估导致的"分数虚高"', '为了减少计算量', '这是可选的'],
      correct: 1,
      explanation: '在同一份数据上既训练又评估，就像考前看了答案再去考试——得分虚高，无法反映真实泛化能力。',
    },
    {
      question: '标准化 (Standardization) 的公式是什么？',
      options: ['x / max(x)', '(x - mean) / std', '(x - min) / (max - min)', 'log(x)'],
      correct: 1,
      explanation: '(x - μ)/σ 使每个特征的均值为0、标准差为1，对SVM和神经网络至关重要。',
    },
    {
      question: '"评分 ÷ 价格"属于什么特征工程方法？',
      options: ['标准化', '缺失值填充', '特征交叉', 'One-Hot编码'],
      correct: 2,
      explanation: '这是特征交叉(Feature Crossing)，两个特征的组合（性价比指数）提供了比单独特征更强的信号。',
    },
  ],
  4: [
    {
      question: '线性回归中使用MSE作为损失函数，MSE的全称是什么？',
      options: ['Maximum Square Error', 'Mean Squared Error', 'Minimum Standard Error', 'Mean Standardized Error'],
      correct: 1,
      explanation: 'MSE = Mean Squared Error = 均方误差，计算预测值与真实值之差的平方的平均。',
    },
    {
      question: 'Lasso回归（L1正则化）的一个重要特性是什么？',
      options: ['它让所有权重变为1', '它产生稀疏解——很多权重精确变为0', '它不需要任何数据', '它只适用于分类问题'],
      correct: 1,
      explanation: 'L1正则化产生稀疏解，很多权重精确变为0——这意味着Lasso自带特征选择功能。',
    },
    {
      question: 'XGBoost在Kaggle竞赛中极其流行的原因不包括？',
      options: ['二阶梯度信息', '正则化防止过拟合', '不需要任何参数调节', '支持分布式训练'],
      correct: 2,
      explanation: 'XGBoost仍然需要超参数调优（如树的深度、学习率等）。它的优势在于二阶梯度+正则化的创新设计。',
    },
    {
      question: '过拟合 (Overfitting) 的表现是什么？',
      options: ['训练集和测试集误差都很大', '训练集误差很小，但测试集误差很大', '训练集误差很大，测试集误差很小', '训练集和测试集都没有误差'],
      correct: 1,
      explanation: '过拟合意味着模型"记住"了训练数据而没有"学会"规律——在新的测试数据上表现差。',
    },
    {
      question: '表格数据任务的"标准流程"的第一步应该做什么？',
      options: ['直接上深度学习', '用XGBoost/LightGBM建立baseline', '调参调到最优', '收集更多数据'],
      correct: 1,
      explanation: '先用XGBoost/LightGBM建立baseline——如果效果已很好，就不需要上深度学习。',
    },
  ],
  5: [
    {
      question: 'Logistic回归通常用于什么任务？',
      options: ['预测连续值', '二分类问题', '聚类分析', '降维'],
      correct: 1,
      explanation: '尽管名字里带"回归"，Logistic回归实际上是一个分类模型。',
    },
    {
      question: 'Sigmoid函数的作用是什么？',
      options: ['将输入映射到(0, 1)之间', '计算矩阵的逆', '做特征选择', '归一化数据'],
      correct: 0,
      explanation: 'Sigmoid函数σ(x)=1/(1+e^(-x))将任意实数"挤压"到(0,1)区间，输出可解释为概率。',
    },
    {
      question: '在95%的餐厅都不火的场景下，永远猜"不会火"能获得95%准确率。这说明什么？',
      options: ['准确率是最重要的指标', '模型已经完美了', '在不平衡数据上准确率有欺骗性，需要Precision/Recall等指标', '数据不足'],
      correct: 2,
      explanation: '不平衡分类中准确率不可靠。需要用精确率(Precision)、召回率(Recall)、F1等指标综合评估。',
    },
    {
      question: '"你推荐投资的餐厅中猜对了几个"描述的是哪个指标？',
      options: ['召回率 (Recall)', '精确率 (Precision)', 'F1-Score', 'ROC-AUC'],
      correct: 1,
      explanation: 'Precision = TP/(TP+FP)，衡量"预测为会火的餐厅中真正火了的比例"。',
    },
    {
      question: '决策树相比深度学习的主要优势是什么？',
      options: ['更高的准确率', '完全可解释——可以打印规则给老板看', '更少的参数', '更快的推理速度'],
      correct: 1,
      explanation: '决策树产生人类可读的if-else规则，是可解释性最强的模型之一。实践中使用随机森林来提高准确率。',
    },
  ],
  6: [
    {
      question: 'K-Means聚类算法的"K"代表什么？',
      options: ['迭代次数', '簇的数量', '特征的数量', '数据点的数量'],
      correct: 1,
      explanation: 'K是需要预先指定的簇的数量。用"肘部法则"可以帮助选择合适的K值。',
    },
    {
      question: '什么是"肘部法则"？',
      options: ['一种数据预处理方法', '观察inertia随K增加的变化拐点来选择最佳K', '一种梯度下降的变体', '神经网络训练技巧'],
      correct: 1,
      explanation: '随着K增加，惯性(inertia)会下降。下降速率显著变慢的"拐点"就是最佳K值。',
    },
    {
      question: 'DBSCAN相对于K-Means的优势是什么？',
      options: ['速度更快', '能发现任意形状的簇并自动识别噪声点', '不需要任何参数', '总是产生球形簇'],
      correct: 1,
      explanation: 'DBSCAN基于密度聚类，不假设簇是球形的，且能自动识别"噪声点"（不属于任何簇的异常数据点）。',
    },
    {
      question: '聚类在餐厅场景中的应用不包括？',
      options: ['市场细分', '冷启动推荐', '异常检测', '实时股价预测'],
      correct: 3,
      explanation: '聚类可用于市场细分、冷启动推荐、异常检测等，但与股价预测无关。',
    },
    {
      question: 'K-Means的一个关键局限性是什么？',
      options: ['总是完美的', '需要GPU才能运行', '假设簇是球形的', '不能处理超过100个数据点'],
      correct: 2,
      explanation: 'K-Means假设簇是球形的（使用欧氏距离），对于长条形或不规则形状的簇效果不好。',
    },
  ],
  7: [
    {
      question: '偏差-方差权衡中，增加模型复杂度会导致什么？',
      options: ['偏差增大，方差减小', '偏差减小，方差增大', '偏差和方差都减小', '偏差和方差都增大'],
      correct: 1,
      explanation: '更复杂的模型能更好地拟合训练数据（低偏差），但对数据变化更敏感（高方差）。',
    },
    {
      question: 'K折交叉验证中，K通常取多少？',
      options: ['1', '5或10', '100', '1000'],
      correct: 1,
      explanation: 'K=5或10是最常用的选择。K太小评估不准，K太大计算成本高。',
    },
    {
      question: '哪个超参数调优方法被描述为"工业界主流"？',
      options: ['手动调参', '网格搜索', '贝叶斯优化 (Optuna)', '随机猜'],
      correct: 2,
      explanation: 'Optuna使用贝叶斯优化智能选择下一组超参数，在探索和利用之间取得平衡。',
    },
    {
      question: '数据量小于10000行时，最推荐的模型是什么？',
      options: ['深度学习', '随机森林或XGBoost', '必须用神经网络', '只能用线性模型'],
      correct: 1,
      explanation: '小数据集上深度学习容易过拟合。随机森林/XGBoost等树模型通常表现更好。',
    },
    {
      question: '如果可解释性是最重要的需求，应选择什么模型？',
      options: ['深度学习', '梯度提升', '线性回归或决策树', 'CNN'],
      correct: 2,
      explanation: '线性模型的权重可以直接解释各特征的影响，决策树产生可读的if-else规则。',
    },
  ],
  8: [
    {
      question: '为什么需要激活函数？',
      options: ['为了让代码更简洁', '不用激活函数，再深的网络也等价于线性模型', '为了减少参数', '这是历史遗留问题'],
      correct: 1,
      explanation: '多个线性变换的组合仍是线性变换——激活函数打破线性性，让网络能学习非线性关系。',
    },
    {
      question: 'Transformer使用的标准激活函数是什么？',
      options: ['Sigmoid', 'Tanh', 'GELU', 'ELU'],
      correct: 2,
      explanation: 'GELU (Gaussian Error Linear Unit) 是Transformer架构的标准激活函数，在x<0时也有微小梯度。',
    },
    {
      question: 'AdamW优化器的特点是什么？',
      options: ['只适用于CNN', '修正了Adam的权重衰减实现，是现代默认优化器', '不需要梯度', '比SGD更慢'],
      correct: 1,
      explanation: 'AdamW (2019) 修正了Adam的权重衰减实现，是现代Transformer训练的标准选择。',
    },
    {
      question: '反向传播 (Backpropagation) 的作用是什么？',
      options: ['增加模型参数', '从输出层开始利用链式法则逐层计算梯度', '减少训练数据', '可视化网络结构'],
      correct: 1,
      explanation: '反向传播利用链式法则从输出层往回计算每个权重的梯度，让优化器知道如何更新参数。',
    },
    {
      question: '混合精度训练的主要优势是什么？',
      options: ['增加模型准确率', '省约50%显存，加速约2-3倍', '简化代码', '不需要GPU'],
      correct: 1,
      explanation: 'FP16/BF16/FP8混合精度训练在保持32位精度关键计算的同时，显著节省显存和加速训练。',
    },
  ],
  9: [
    {
      question: 'CNN的"平移不变性"意味着什么？',
      options: ['图片不能移动', '辣椒在图片任何位置都能被检测到', '模型不能处理移动的物体', '图像必须居中对齐'],
      correct: 1,
      explanation: '同一个卷积核在整个图片上滑动，无论目标出现在左上角还是右下角都能检测到。',
    },
    {
      question: '迁移学习中"冻结"卷积层是什么意思？',
      options: ['删除这些层', '这些层的权重在训练时不更新', '降低这些层的温度', '将这些层的输出设为0'],
      correct: 1,
      explanation: '冻结=不更新权重。预训练的CNN已经学会了通用视觉特征，只需训练新的分类头。',
    },
    {
      question: 'Global Average Pooling (GAP) 的作用是什么？',
      options: ['增加参数数量', '取代传统的Flatten+FC层，极大减少参数', '增加模型深度', '提高分辨率'],
      correct: 1,
      explanation: 'GAP将每个特征图平均为一个值，替代了参数密集的全连接层，是ResNet等的标配。',
    },
    {
      question: '哪些网络架构属于CNN？',
      options: ['BERT和GPT', 'ResNet和EfficientNet', 'XGBoost和LightGBM', 'K-Means和DBSCAN'],
      correct: 1,
      explanation: 'ResNet（残差网络）和EfficientNet都是经典的CNN架构。BERT/GPT是Transformer架构。',
    },
    {
      question: '"参数共享"如何减少CNN的参数量？',
      options: ['每次使用不同的卷积核', '同一个卷积核在整张图片上滑动，用同一组参数', '随机删除参数', '使用小批量训练'],
      correct: 1,
      explanation: '同一个3×3卷积核在所有位置复用——相比全连接层将N×N→N^2个参数降到9个。',
    },
  ],
  10: [
    {
      question: 'Self-Attention的核心优势是什么？',
      options: ['比CNN更快', '允许每个词直接看到句子中的所有其他词，无论距离多远', '不需要训练', '只能处理短文本'],
      correct: 1,
      explanation: 'Self-Attention打破了RNN的序列依赖，每个词可以直接关注到整个序列的任意位置。',
    },
    {
      question: 'BERT和GPT的关键区别是什么？',
      options: ['没有区别', 'BERT双向理解，GPT单向生成', 'BERT更大', 'GPT只能处理中文'],
      correct: 1,
      explanation: 'BERT用双向Transformer编码器（看前后文），适合理解；GPT用单向解码器（只看前文），适合生成。',
    },
    {
      question: '公式 softmax(QK^T/√d_k) × V 中，为什么要除以 √d_k？',
      options: ['增加计算量', '防止QK^T内积过大导致softmax梯度消失', '为了归一化输出', '这是随机的设计'],
      correct: 1,
      explanation: '内积值随维度增大而增大，除以√d_k使softmax保持在合理的梯度区域（缩放点积注意力）。',
    },
    {
      question: 'BERT的预训练任务MLM是什么？',
      options: ['预测下一个句子', '随机遮住一些词让模型猜（完形填空）', '图像分类', '语音识别'],
      correct: 1,
      explanation: 'MLM (Masked Language Model)：随机遮住部分词，模型从上下文推断被遮住的词。',
    },
    {
      question: 'Tokenization的作用是什么？',
      options: ['把图片转为文本', '把文本切分为最小处理单元（Token）', '压缩模型大小', '评估模型性能'],
      correct: 1,
      explanation: 'Tokenization将原始文本"火锅太辣了"切分为["火锅","太","辣","了"]，再映射为Token IDs。',
    },
  ],
  11: [
    {
      question: 'Temperature参数控制LLM生成的什么特性？',
      options: ['生成速度', '输出的"随机性"/创造性', '模型大小', '训练轮数'],
      correct: 1,
      explanation: 'T→0产生确定性输出（贪婪解码），T→1增加随机性和创造性，T>1可能胡言乱语。',
    },
    {
      question: '扩散模型的核心思想是什么？',
      options: ['直接生成图片', '学习从噪声逐步还原（去噪）的过程', '压缩图片', '分类图片'],
      correct: 1,
      explanation: '前向过程加噪，逆向过程学习去噪。生成时从纯噪声逐步去噪得到清晰图片。',
    },
    {
      question: 'DiT (Diffusion Transformer) 的"T"代表什么？',
      options: ['Training', 'Testing', 'Transformer', 'Time'],
      correct: 2,
      explanation: 'DiT用Transformer替代U-Net作为去噪骨干，被Sora和Stable Diffusion 3采用。',
    },
    {
      question: 'Top-P (Nucleus) Sampling 的工作原理是什么？',
      options: ['选概率最高的K个token', '从累积概率超过P的最小token集合中采样', '随机选择任意token', '选择概率最低的token'],
      correct: 1,
      explanation: 'Top-P从概率最高的token开始累加，只保留累加到超过阈值P的那些token，然后从中采样。',
    },
    {
      question: 'VAR (NeurIPS 2024最佳论文) 的创新是什么？',
      options: ['更大的Transformer', '用GPT式"下一尺度预测"替代扩散，视觉自回归首次超越扩散', '更快的卷积', '更好的激活函数'],
      correct: 1,
      explanation: 'VAR首次让视觉自回归模型在图像生成上超越扩散模型，同时推理速度快20倍。',
    },
  ],
  12: [
    {
      question: '协同过滤的"冷启动"问题指的是什么？',
      options: ['服务器刚开机', '新用户和新物品因为缺少数据而无法推荐', '模型需要冷却', '数据太多'],
      correct: 1,
      explanation: '冷启动问题：新用户没有历史行为数据，新餐厅没有人评过分，协同过滤无法计算相似度。',
    },
    {
      question: '矩阵分解中，`rating ≈ user_embedding · item_embedding` 体现的是什么思想？',
      options: ['直接复制评分', '用低维隐向量表示用户和物品，点积=预测评分', '使用决策树', '随机猜测'],
      correct: 1,
      explanation: '矩阵分解/隐语义模型：将用户和物品映射到同一隐空间，隐向量的点积预测评分。',
    },
    {
      question: '工业级推荐系统的四个阶段顺序是什么？',
      options: ['精排→召回→重排→粗排', '召回→粗排→精排→重排', '粗排→精排→召回→重排', '重排→精排→粗排→召回'],
      correct: 1,
      explanation: '召回(100万→200)→粗排(200→50)→精排(50→10)→重排(10→最终)，逐步缩小候选集。',
    },
    {
      question: 'Wide & Deep 模型中Wide和Deep部分各自的作用？',
      options: ['Wide和Deep做同样的事情', 'Wide记忆历史规律，Deep发现新泛化——两者互补', 'Wide比Deep重要', 'Deep只是装饰'],
      correct: 1,
      explanation: 'Wide部分通过线性模型记忆共现模式，Deep部分通过DNN发现新的泛化模式，互补结合。',
    },
    {
      question: '搭建推荐系统的第一步应该做什么？',
      options: ['直接上最复杂的深度模型', '做纯规则的baseline（如"同菜系评分最高"）', '部署到生产环境', '收集100万用户数据'],
      correct: 1,
      explanation: '先用简单规则建立baseline，然后逐步用ML模型替换，每一步用A/B测试验证改进效果。',
    },
  ],
};
