
let templates = [];

window.addEventListener('DOMContentLoaded', () => {
  // templates.jsが読み込まれたら templates 変数が使用可能
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
    templates.filter(t => t.category === category).forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = t.title;
      templateSelect.appendChild(opt);
    });
  });

  templateSelect.addEventListener("change", () => {
    const id = templateSelect.value;
    const school = document.getElementById("schoolName").value || "{{教室名}}";
    const date = document.getElementById("postDate").value || "{{日付}}";
    const template = templates.find(t => t.id === parseInt(id));
    if (!template) return;
    const body = template.body.replace(/{{教室名}}/g, school).replace(/{{日付}}/g, date);
    document.getElementById("outputBody").value = body;
  });
});

function copyText() {
  const text = document.getElementById("outputBody").value;
  navigator.clipboard.writeText(text);
  alert("コピーしました！");
}
