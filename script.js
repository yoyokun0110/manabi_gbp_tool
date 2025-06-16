
function renderOutput() {
  const id = document.getElementById("templateSelect").value;
  const school = document.getElementById("schoolName").value || "{{教室名}}";
  const date = document.getElementById("postDate").value || "{{日付}}";
  const template = templates.find(t => t.id == id);
  if (!template) return;
  const body = template.body.replace(/{{教室名}}/g, school).replace(/{{日付}}/g, date);
  document.getElementById("outputBody").value = body;
}

window.addEventListener('DOMContentLoaded', () => {
  if (!Array.isArray(templates)) {
    alert('テンプレートデータの読み込みに失敗しました。');
    return;
  }

  const categorySelect = document.getElementById("categorySelect");
  const templateSelect = document.getElementById("templateSelect");

  const categories = [...new Set(templates.map(t => t.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  categorySelect.addEventListener("change", () => {
    const category = categorySelect.value;
    templateSelect.innerHTML = "";
    const filtered = templates.filter(t => t.category === category);
    filtered.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = t.title;
      templateSelect.appendChild(opt);
    });

    // ✅ 1件しかない場合、自動で出力
    if (filtered.length === 1) {
      renderOutput();
    }
  });

  templateSelect.addEventListener("change", renderOutput);
});

function copyText() {
  const text = document.getElementById("outputBody").value;
  navigator.clipboard.writeText(text);
  alert("コピーしました！");
}
