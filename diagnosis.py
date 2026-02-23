import csv
import math

# A/B/C を数値に変換
def abc_to_value(x):
    if x.upper() == "A":
        return -1
    if x.upper() == "B":
        return 1
    return 0  # C or anything else

# ユーザー入力（例：C A C A C C C）
answers = input("Enter your 7 answers (e.g., C A C A C C C): ").split()
user_vec = [abc_to_value(a) for a in answers]

# CSV 読み込み
figures = []
with open("historical_figures.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        vec = [
            float(row["individual"]),
            float(row["rule_of_law"]),
            float(row["centralization"]),
            float(row["enforcement"]),
            float(row["irreversibility"]),
            float(row["real_axis"]),
            float(row["legitimacy"])
        ]
        figures.append((row["name"], vec))

# ユークリッド距離
def distance(v1, v2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(v1, v2)))

# 最も近い人物を探す
closest = min(figures, key=lambda x: distance(user_vec, x[1]))

print("\nYour closest historical figure:")
print(closest[0])
