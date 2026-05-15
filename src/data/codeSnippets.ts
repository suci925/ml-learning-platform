export const codeSnippets: Record<number, string> = {
  2: `import numpy as np

# 餐厅特征向量：[价格, 评分, 距离, 评论数]
restaurant_a = np.array([58, 4.5, 2.3, 320])
restaurant_b = np.array([120, 4.2, 1.8, 150])

# 用户偏好向量
user_pref = np.array([3, 5, 2, 1])

# 点积 = "合拍指数"
score_a = np.dot(user_pref, restaurant_a)
score_b = np.dot(user_pref, restaurant_b)

print(f"餐厅A合拍指数: {score_a:.1f}")
print(f"餐厅B合拍指数: {score_b:.1f}")

# 余弦相似度
cos_sim = np.dot(restaurant_a, restaurant_b) / \\
          (np.linalg.norm(restaurant_a) * np.linalg.norm(restaurant_b))
print(f"余弦相似度: {cos_sim:.3f}")

# 简单梯度下降示例
w, b = 0.0, 0.0
lr = 0.001
for epoch in range(10):
    # 模拟: Loss = (w*2 + b - 3)^2
    loss = (w * 2 + b - 3) ** 2
    grad_w = 4 * (w * 2 + b - 3)
    grad_b = 2 * (w * 2 + b - 3)
    w -= lr * grad_w
    b -= lr * grad_b
    if epoch % 2 == 0:
        print(f"Epoch {epoch}: w={w:.3f}, b={b:.3f}, loss={loss:.4f}")
`,

  3: `import pandas as pd
import numpy as np

# 模拟加载餐厅数据集
np.random.seed(42)
n = 1000

data = {
    'price': np.random.uniform(20, 300, n),
    'rating': np.random.uniform(2.5, 5.0, n),
    'distance': np.random.uniform(0.1, 15, n),
    'review_count': np.random.randint(3, 5000, n),
    'cuisine': np.random.choice(['川菜','粤菜','日料','西餐','火锅','烧烤','快餐'], n),
}

df = pd.DataFrame(data)
df['review_count'] = df['review_count'].clip(lower=3)

print("数据集概览:")
print(df.describe())
print(f"\\n菜系分布:\\n{df['cuisine'].value_counts()}")

# 标准化
df['price_std'] = (df['price'] - df['price'].mean()) / df['price'].std()
df['rating_std'] = (df['rating'] - df['rating'].mean()) / df['rating'].std()

# One-Hot编码
df_encoded = pd.get_dummies(df, columns=['cuisine'], prefix='cuisine')
print(f"\\n编码后特征数: {df_encoded.shape[1]}")
`,

  4: `import numpy as np
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

# 生成模拟餐厅数据
np.random.seed(42)
n = 500
price = np.random.uniform(20, 300, n)
rating = 4.5 - 0.008 * price + np.random.normal(0, 0.4, n)
rating = np.clip(rating, 1, 5)

X = price.reshape(-1, 1)
y = rating

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 线性回归
lr = LinearRegression().fit(X_train, y_train)
print(f"线性回归: R²={r2_score(y_test, lr.predict(X_test)):.3f}")

# Ridge (L2正则化)
ridge = Ridge(alpha=1.0).fit(X_train, y_train)
print(f"Ridge:    R²={r2_score(y_test, ridge.predict(X_test)):.3f}")

# Lasso (L1正则化)
lasso = Lasso(alpha=0.1).fit(X_train, y_train)
print(f"Lasso:    R²={r2_score(y_test, lasso.predict(X_test)):.3f}")
`,

  5: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# 生成模拟数据：餐厅会火(1) vs 不会火(0)
np.random.seed(42)
n = 600

rating = np.random.uniform(1.5, 5.0, n)
price = np.random.uniform(15, 350, n)
review_count = np.random.randint(3, 3000, n)

# 高评分+适中价格+评论多 = 更有机会会火
logit = -3 + 0.8*rating + 0.002*price + 0.001*review_count
prob = 1 / (1 + np.exp(-logit))
success = (np.random.random(n) < prob).astype(int)

X = np.column_stack([rating, price, review_count])
y = success

X_train, X_test = X[:400], X[400:]
y_train, y_test = y[:400], y[400:]

# Logistic回归
logreg = LogisticRegression().fit(X_train, y_train)
print(f"Logistic回归 准确率: {logreg.score(X_test, y_test):.3f}")

# 随机森林
rf = RandomForestClassifier(n_estimators=100).fit(X_train, y_train)
print(f"随机森林   准确率: {rf.score(X_test, y_test):.3f}")

print("\\n分类报告 (随机森林):")
print(classification_report(y_test, rf.predict(X_test), target_names=['不会火', '会火']))
`,

  6: `import numpy as np
from sklearn.cluster import KMeans

np.random.seed(42)
n = 300

# 模拟3类餐厅数据
price_rating = np.vstack([
    np.random.normal([60, 4.2], [15, 0.3], (100, 2)),   # 性价比型
    np.random.normal([150, 4.5], [25, 0.3], (100, 2)),  # 高端型
    np.random.normal([40, 3.2], [10, 0.4], (100, 2)),   # 快餐型
])

# K-Means聚类
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
labels = kmeans.fit_predict(price_rating)

print("聚类中心:")
for i, center in enumerate(kmeans.cluster_centers_):
    print(f"  簇{i}: 价格≈¥{center[0]:.0f}, 评分≈{center[1]:.2f}")

print(f"\\n惯性 (Inertia): {kmeans.inertia_:.1f}")

# 肘部法则
print("\\nK值 → Inertia:")
for k in range(1, 8):
    km = KMeans(n_clusters=k, random_state=42, n_init=10).fit(price_rating)
    print(f"  K={k}: {km.inertia_:.1f}")
`,

  8: `import torch
import torch.nn as nn

# 构建简单的MLP：5输入 → 8隐藏 → 1输出
class RestaurantMLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(5, 8),
            nn.ReLU(),
            nn.Linear(8, 6),
            nn.ReLU(),
            nn.Linear(6, 1)
        )

    def forward(self, x):
        return self.layers(x)

model = RestaurantMLP()
print(f"模型参数数量: {sum(p.numel() for p in model.parameters())}")
print(model)

# 模拟训练
x = torch.randn(100, 5)
y = torch.randn(100, 1)

optimizer = torch.optim.AdamW(model.parameters(), lr=0.01)
loss_fn = nn.MSELoss()

for epoch in range(5):
    optimizer.zero_grad()
    y_pred = model(x)
    loss = loss_fn(y_pred, y)
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch+1}: loss = {loss.item():.4f}")
`,

  10: `# 使用HuggingFace Transformers做情感分析
# 实际运行需: pip install transformers torch

# 模拟BERT情感分析
review = "火锅太辣了，但超级好吃！"

# BERT Tokenization (模拟)
tokens = ["[CLS]", "火锅", "太", "辣", "了", "但", "超级", "好吃", "[SEP]"]
token_ids = [101, 3847, 163, 5307, 155, 3819, 3294, 3152, 102]

print(f"输入: {review}")
print(f"Tokens: {tokens}")
print(f"Token IDs: {token_ids}")

# Self-Attention演示
import numpy as np
d = 4  # 简化维度
Q = np.random.randn(len(tokens), d)
K = np.random.randn(len(tokens), d)
V = np.random.randn(len(tokens), d)

# Attention(Q,K,V) = softmax(QK^T/sqrt(d)) * V
scores = Q @ K.T / np.sqrt(d)
attention_weights = np.exp(scores) / np.exp(scores).sum(axis=1, keepdims=True)
output = attention_weights @ V

# "好吃" 对 "火锅" 和 "超级" 的注意力权重
haochi_idx = tokens.index("好吃")
huoguo_idx = tokens.index("火锅")
chaoji_idx = tokens.index("超级")

print(f"\\n'好吃' -> '火锅' 注意力: {attention_weights[haochi_idx][huoguo_idx]:.3f}")
print(f"'好吃' -> '超级' 注意力: {attention_weights[haochi_idx][chaoji_idx]:.3f}")
print("\\n预测情感: 正面 (置信度 0.94)")
`,
};
