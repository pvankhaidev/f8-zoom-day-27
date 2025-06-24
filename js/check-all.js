// Lấy checkbox chính
const allCheckMains = document.querySelectorAll(".checkbox-main");
const allCheckboxes = document.querySelectorAll(".checkbox-item");

// Sự kiện khi click vào checkbox chính
allCheckMains.forEach((checkMain) => {
  checkMain.addEventListener("change", function () {
    // Tìm class checkbox-list gần nhất bằng cách sử dụng closest và querySelector
    const list = this.closest(".checkbox-row").nextElementSibling; // nextElementSibling là div.checkbox-list

    if (list && list.classList.contains("checkbox-list")) {
      // Lấy tất cả các checkbox-item trong list
      const listCheckboxes = list.querySelectorAll(".checkbox-item");

      // Dùng forEach để set trạng thái check
      listCheckboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
    }

    const counter = list.nextElementSibling.querySelector(".checked-count");
    const checkedCount = getCheckedCount(list);
    counter.textContent = checkedCount;
  });
});

allCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const list = checkbox.closest(".checkbox-list");
    const listCheckboxes = list.querySelectorAll(".checkbox-item");
    const counter = list.nextElementSibling.querySelector(".checked-count");
    const checkedCount = getCheckedCount(list);
    const checkMain =
      list.previousElementSibling.querySelector(".checkbox-main");
    counter.textContent = checkedCount;
    // cập nhật checkbox-all
    if (checkedCount === 0) {
      checkMain.indeterminate = false;
      checkMain.checked = false;
    } else if (checkedCount === listCheckboxes.length) {
      checkMain.indeterminate = false;
      checkMain.checked = true;
    } else {
      checkMain.indeterminate = true;
    }
  });
});

function getCheckedCount(list) {
  let count = 0;

  list.querySelectorAll(".checkbox-item").forEach((checkbox) => {
    if (checkbox.checked) {
      count += 1;
    }
  });

  return count;
}
