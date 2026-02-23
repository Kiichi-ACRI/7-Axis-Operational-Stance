const AXES = [
  { id: "individual", jp: "個人重視 / 集団重視" },
  { id: "rule_of_law", jp: "法治 / 暴力支配" },
  { id: "centralization", jp: "中央集権 / 地方分権" },
  { id: "enforcement", jp: "政府の強さ（小さな政府 / 大きな政府）" },
  { id: "irreversibility", jp: "歴史観（循環 / 進歩）" },
  { id: "real_axis", jp: "現実重視 / 物語重視" },
  { id: "legitimacy", jp: "権威観（批判 / 正統）" }
];

function abcToValue(x) {
  if (x === "A") return -1;
  if (x === "B") return 1;
  return 0; // C
}

function renderQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = "";
  AXES.forEach(axis => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>${axis.jp}:
        <select data-axis="${axis.id}">
          <option value="C">C</option>
          <option value="A">A (-1)</option>
          <option value="B">B (+1)</option>
        </select>
      </label>
    `;
    container.appendChild(div);
  });
}

async function loadFigures(lang) {
  const file = lang === "jp"
    ? "data/historical_figures_jp.json"
    : "data/historical_figures.json";  // 英語版が必要なら後で追加
  const res = await fetch(file);
  return await res.json();
}

async function loadComments() {
  const res = await fetch("data/historical_figures_comments_jp.json");
  return await res.json();
}

function distance(v1, v2) {
  return Math.sqrt(v1.reduce((s, x, i) => s + (x - v2[i]) ** 2, 0));
}

/* -------------------------
   レーダーチャート描画
-------------------------- */

let radarChart = null;

function drawRadarChart(userVec, bestVec, bestName) {
  const ctx = document.getElementById("radarChart").getContext("2d");

  if (radarChart) {
    radarChart.destroy();
  }

  radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: AXES.map(a => a.jp),
      datasets: [
        {
          label: "あなたの7軸",
          data: userVec,
          backgroundColor: "rgba(79, 70, 229, 0.2)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 2
        },
        {
          label: bestName,
          data: bestVec,
          backgroundColor: "rgba(229, 62, 62, 0.15)",
          borderColor: "rgba(229, 62, 62, 1)",
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: -1,
          max: 1,
          ticks: { stepSize: false }
        }
      }
    }
  });
}

/* -------------------------
   診断ボタン
-------------------------- */

document.getElementById("run").addEventListener("click", async () => {
  const lang = document.getElementById("lang").value;
  const figures = await loadFigures(lang);
  const comments = await loadComments();

  const selects = document.querySelectorAll("#questions select");
  const userVec = Array.from(selects).map(sel => abcToValue(sel.value));

  const withVec = figures.map(f => ({
    name: f.name,
    vec: AXES.map(a => f[a.id])
  }));

  let best = null;
  let bestDist = Infinity;
  for (const f of withVec) {
    const d = distance(userVec, f.vec);
    if (d < bestDist) {
      bestDist = d;
      best = f;
    }
  }

  const info = comments[best.name];

  const lines = [];
  lines.push(`最も近い思想家: ${best.name}`);
  lines.push(`距離: ${bestDist.toFixed(3)}`);
  lines.push("");
  lines.push("あなたの7軸:");
  AXES.forEach((axis, i) => {
    lines.push(`- ${axis.jp}: ${userVec[i]}`);
  });

  if (info) {
    lines.push("");
    lines.push("■ 一般的な分類");
    lines.push(`- 政治思想: ${info.politics}`);
    lines.push(`- 経済思想: ${info.economics}`);
    lines.push(`- 4象限: ${info.quadrant}`);
    lines.push(`- コメント: ${info.summary}`);
  }

  document.getElementById("result").textContent = lines.join("\n");

  drawRadarChart(userVec, best.vec, best.name);
});

renderQuestions();


