function clearPlaceholder(input) {
  input.setAttribute("placeholder", "");
}
(function () {
  let rows = document.querySelectorAll("table tbody tr").length;
  let paginationInfo = document.getElementById("pagination__info");
  paginationInfo.textContent = `Showing data 1 to ${rows} of ${rows} entries`;
})();

let usersPerPage;
let users;
let totalPages;

let loadPage = () => {
  usersPerPage = 8;
  users = document.querySelectorAll("table tbody tr");
  totalPages = Math.ceil(users.length / usersPerPage);

  if (users.length <= usersPerPage) {
    document.getElementById("left_button").disabled = true;
    document.getElementById("right_button").disabled = true;
    users.forEach((user) => (user.style.display = "table-row"));
    return;
  }

  function showPage(pageIndex) {
    const start = pageIndex * usersPerPage;
    const end = Math.min(start + usersPerPage, users.length);
    for (let i = 0; i < users.length; i++) {
      users[i].style.display = i >= start && i < end ? "table-row" : "none";
    }
    updatePaginationButtons(pageIndex);
  }

  function updatePaginationButtons(pageIndex) {
    const leftButton = document.getElementById("left_button");
    const rightButton = document.getElementById("right_button");
    leftButton.disabled = pageIndex === 0;
    rightButton.disabled = pageIndex >= totalPages - 1;
  }

  const paginationInfo = document.getElementById("pagination__info");
  paginationInfo.textContent = `Showing data 1 to ${usersPerPage} of ${users.length} entries`;

  const pageNumbers = document.querySelectorAll(".pagination__number");
  pageNumbers.forEach((pageNumber, index) => {
    pageNumber.addEventListener("click", function () {
      pageNumbers.forEach((page) => page.classList.remove("active"));
      this.classList.add("active");
      showPage(index);
      const currentPageUsers = Math.min(
        usersPerPage * (index + 1),
        users.length
      );
      paginationInfo.textContent = `Showing data ${
        index * usersPerPage + 1
      } to ${currentPageUsers} of ${users.length} entries`;
    });
  });

  const leftButton = document.getElementById("left_button");
  const rightButton = document.getElementById("right_button");

  leftButton.addEventListener("click", function () {
    const currentPage = document.querySelector(".pagination__number.active");
    if (
      currentPage.previousElementSibling &&
      currentPage.previousElementSibling.classList.contains(
        "pagination__number"
      )
    ) {
      currentPage.previousElementSibling.click();
    }
  });

  rightButton.addEventListener("click", function () {
    const currentPage = document.querySelector(".pagination__number.active");
    if (
      currentPage.nextElementSibling &&
      currentPage.nextElementSibling.classList.contains("pagination__number")
    ) {
      currentPage.nextElementSibling.click();
    }
  });

  showPage(0);
};

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    loadPage();
  }
};
