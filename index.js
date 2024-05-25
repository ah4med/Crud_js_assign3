var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkTable = document.getElementById("bookmarkTable");
var addButton = document.getElementById("addButton");

var bookmarkList;

if (localStorage.getItem("bookmarkList")) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmarks(bookmarkList);
} else {
  bookmarkList = [];
}
function clearFields() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}
function addBookmark() {
  var bookmark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayBookmarks(bookmarkList);
    clearFields();
  } else {
    window.alert("Please Enter Valid Name & Address");
  }
}

function displayBookmarks(arr) {
  var box = ``;
  for (var i = 0; i < arr.length; i++) {
    box += `
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${bookmarkList[i].siteName}</td>
    <td> <a href="https://${
      bookmarkList[i].siteUrl
    }" target="_blank"><button type="button" class="btn btn-warning"> <i class="fa-solid fa-eye"></i> Visit</button></a></td>
    <td><button onclick="deleteBookmark(${i})" "type="button" class="btn btn-danger"> <i class="fa-regular fa-trash-can"></i> Delete</button></td>
    </tr>
    `;
  }
  bookmarkTable.innerHTML = box;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmarks(bookmarkList);
}

// regex for bookmark name

var regex = {
  siteName: /[\w\s]{3,64}$/,
  siteUrl:
    /^([^(http(s)?):\/\/)])[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
};

function validateName(el) {
  if (regex[el.id].test(el.value)) {
    el.classList.remove("is-invalid");
    el.classList.add("is-valid");
  } else {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
  }
}
