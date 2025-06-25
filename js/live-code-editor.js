// khởi tạo code mirror
const editor = CodeMirror(document.getElementById("editor"), {
  mode: "htmlmixed",
  theme: "dracula",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  tabSize: 2,
  lineWrapping: true,
});
editor.setSize("100%", "100%");
// tạo nội dung ban đầu
const defaultCode = `
<style>
  body { font-family: sans-serif; padding: 20px; color: #333; line-height: 1.8;}
  h1 { color:rgb(11, 184, 236); }
  pre { color:rgb(105, 4, 12); font-size: 16px; font-weight: bold;}
</style>
<h1>Goodbye World. I'm dying!</h1>
<pre>I don't wanna leave, I don't wanna go
If I have to leave, we might never know
Can anybody see that I'm dying?
Cause I'm dying on the inside</pre>
  `.trim();
// set nội dung ban đầu
editor.setValue(defaultCode);

///////////////////////////////////////////////////////
// code chính
///////////////////////////////////////////////////////
const previewFrame = document.querySelector("#preview");
const customMenu = document.querySelector("#customMenu");
const clearCodeBtn = document.querySelector("#clearCode");
const divider = document.querySelector("#divider");
const editorPane = document.querySelector(".editor-pane");
const previewPane = document.querySelector(".preview-pane");
const iframe = document.querySelector("#preview");
let isDragging = false;

// hàm cập nhật kết quả preview code
const updatePreview = () => {
  previewFrame.srcdoc = editor.getValue();
};

// gọi hàm cập nhật code khi khởi tạo
updatePreview();

// cập nhật kết quả khi có thay đổi code
editor.on("change", updatePreview);

// hàm hiển thị thông báo khi người dùng nhấn F5 hoặc reload
window.addEventListener("beforeunload", (e) => {
  if (editor.getValue().trim() !== "") {
    e.preventDefault();
    e.returnValue = ""; // Thông báo confirm hiện lên
  }
});

// bắt sự kiện chuột phải
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();

  // Vị trí chuột
  let mouseX = e.clientX;
  let mouseY = e.clientY;

  const editorPane = document.querySelector(".editor-pane");

  // Nếu vượt cạnh phải, hiển thị lệch qua trái con trỏ
  if (mouseX + customMenu.offsetWidth > editorPane.offsetWidth) {
    mouseX = mouseX - customMenu.offsetWidth;
  }

  // Nếu vượt cạnh dưới, hiển thị lệch lên trên con trỏ
  if (mouseY + customMenu.offsetHeigh > editorPane.offsetHeigh) {
    mouseY = mouseY - customMenu.offsetHeigh;
  }

  // Hiện menu tại đúng vị trí
  customMenu.style.left = mouseX + "px";
  customMenu.style.top = mouseY + "px";
  customMenu.style.display = "block";
});

// Ẩn menu khi click nơi khác
document.addEventListener("click", () => {
  customMenu.style.display = "none";
});

// khi nhấn xóa code, xóa code
clearCodeBtn.onclick = function () {
  editor.setValue("");
};

// khi nhấn chuột vào thanh ngăn ở giữa, cờ drag true,
// tạm thời vô hiệu pointer của iframe
divider.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.body.style.cursor = "col-resize";

  // Tạm thời vô hiệu pointer của iframe
  iframe.classList.add("drag-disabled");
});

// khi cờ drag true, nghĩa là vừa nhấn vào thanh chia vừa thực hiện kéo
// tiến hành tính lại flex basis để chia lại flex
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const containerWidth = document.querySelector(".container").clientWidth;
  const offsetX = e.clientX;

  // Tính phần trăm chiều rộng của editor (tối thiểu 20%, tối đa 80%)
  let editorWidthPercent = (offsetX / containerWidth) * 100;
  editorWidthPercent = Math.max(20, Math.min(editorWidthPercent, 80)); // giới hạn

  const previewWidthPercent = 100 - editorWidthPercent;

  // Cập nhật lại flex-basis của 2 bên
  editorPane.style.flexBasis = `${editorWidthPercent}%`;
  previewPane.style.flexBasis = `${previewWidthPercent}%`;
});

// khi nhả chuột ra, cờ drag false
// khôi phục lại pointer cho iframe
document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "default";
  // Bật lại pointer cho iframe
  iframe.classList.remove("drag-disabled");
});
