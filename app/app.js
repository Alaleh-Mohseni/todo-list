const inputTask = document.getElementById("title");
const btnAdd = document.getElementById("add");
const tableBody = document.querySelector("#tableBody");
const description = document.getElementById("description");
const btnClear = document.getElementById("clear");
const itemsBox = document.getElementById("items");
const inputFilter = document.getElementById("filter");


btnAdd.addEventListener("click", addTasks);
btnClear.addEventListener("click", clearTasks);
inputFilter.addEventListener("keyup", filterTasks);
showList();


// Add Tasks
function addTasks(e) {
    e.preventDefault();
    inputValue = inputTask.value;
    descVal = description.value;
    inputTask.value = "";
    inputTask.focus();
    description.value = "";
    if (inputValue == "") {
        alert(`"Title" field is mandatory. Please enter a title.`)
    } else {
        let currentStorage = localStorage.getItem("users");
        if (currentStorage) {
            var users = JSON.parse(currentStorage);
        } else {
            var users = [];
        }
        users.push([inputValue, descVal]);
        localStorage.setItem("users", JSON.stringify(users));
        showList(JSON.parse(localStorage.getItem("users")));
        itemsBox.style.display = 'block';
    }
    showList();
}


function showList() {
    const users = JSON.parse(localStorage.getItem("users"));
    let str = "";
    users.forEach((element, index) => {
        str += `
              <tr class="tableList">
              <th scope="row">${index + 1}</th>
              <td class="ps-4">${element[0]}</td>
              <td class="ps-4">${element[1]} ...</td>
              <td>
              <button class="btn btn-sm text-white" id="delete" style="background-color: #6610f2;">
              Delete
              <i class="fa fa-trash-alt ps-1" style="font-size: 13px;"></i>
              </button>
              </td>
              </tr>`;
    });
    tableBody.innerHTML = str;

    // delete task
    const deleteItem = document.querySelectorAll("#delete");
    deleteItem.forEach((item) => {
        item.addEventListener("click", function () {
            if (confirm('Are you sure you want to delete this task ?')) {
                item.parentElement.parentElement.remove();
            }
        })
    });
}


// clear all tasks
function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks ?')) {
        itemsBox.style.display = 'none';
    }
}


// Filter tasks
function filterTasks() {
    const inputFilterVal = inputFilter.value.toUpperCase();
    const table = document.querySelector(".table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(inputFilterVal) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}