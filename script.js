
let templates = [];

fetch('templates.js')
  .then(() => {
    const categories = [...new Set(templates.map(t => t.category))];
    const categorySelect = document.getElementById("categorySelect");

    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });

    categorySelect.addEventListener("change", updateTemplates);
    document.getElementById("templateSelect").addEventListener("change", renderOutput);
  });

function updateTemplates() {
  const category = document.getElementById("categorySelect").value;
  const templateSelect = document.getElementById("templateSelect");
  templateSelect.innerHTML = "";
  templates.filter(t => t.category === category).forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.title;
    templateSelect.appendChild(opt);
  });
}

function renderOutput() {
  const id = document.getElementById("templateSelect").value;
  const school = document.getElementById("schoolName").value || "{{教室名}}";
  const date = document.getElementById("postDate").value || "{{日付}}";
  const template = templates.find(t => t.id === parseInt(id));
  if (!template) return;
  const body = template.body.replace(/{{教室名}}/g, school).replace(/{{日付}}/g, date);
  document.getElementById("outputBody").value = body;
}

function copyText() {
  const text = document.getElementById("outputBody").value;
  navigator.clipboard.writeText(text);
  alert("コピーしました！");
}
