

const addButton = document.querySelector(".add");
const content = document.querySelector("#content")
const tbody = document.querySelector("#tbody")
const addBtn = document.querySelector("#addBtn");


let modalNewEmployees = document.querySelector("#NewEmployee");
let modalAdd = new bootstrap.Modal(modalNewEmployees);

let modalEditEmployees = document.querySelector("#editEmployee");
let modalEdit = new bootstrap.Modal(modalEditEmployees);


let count = 0;

let data = [] ;

const addEmployeeObject = () =>{

    let addFirstName = document.querySelector("#addFirstName");
    let addLastName = document.querySelector("#addLastName");
    let addEmail = document.querySelector("#addEmail");
    let addPhone = document.querySelector("#addPhone");
    let addLocation = document.querySelector("#addLocation");

    if (data.length==0){
        count=0;
    }

    let getStorage = JSON.parse(localStorage.getItem("employeeInfo"));
    
    if(getStorage){

        if(getStorage.length>0){
            count = getStorage[getStorage.length-1].id+1

        }
        else{
            count = 0
        }
    }
 
    let employeeInfo = {

        id:count,
        firstName : addFirstName.value,
        lastName : addLastName.value,
        email : addEmail.value,
        phone : addPhone.value,
        location : addLocation.value,
    }

    if(getStorage){
        data = [...getStorage]
        data.push(employeeInfo);
    }

    else{
        data.push(employeeInfo)
    }


    localStorage.setItem("employeeInfo", JSON.stringify(data));
    
    addEmployee();


    count++;

    addFirstName.value = "";
    addLastName.value = "";
    addEmail.value = "" ; 
    addPhone.value = "" ;
    addLocation.value = "" ;
}


const addEmployee = () => {

    let tempHTML = "" ;

    let localStorageEmployee = JSON.parse(localStorage.getItem("employeeInfo"));


    for (let index = 0; index < localStorageEmployee.length; index++) {

        tempHTML +=   `
        <tr class="tableContent">
        <td>${localStorageEmployee[index].id}</td>
        <td>${localStorageEmployee[index].firstName}</td>
        <td>${localStorageEmployee[index].lastName}</td>
        <td>${localStorageEmployee[index].email}</td>
        <td>${localStorageEmployee[index].phone}</td>
        <td>${localStorageEmployee[index].location}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="edit me-2" onclick=editEmployeeInfo(${localStorageEmployee[index].id})>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="edit">
                    <i class="fa-solid fa-trash-can" onclick=delEmployee(${localStorageEmployee[index].id})></i>
                </button>
            </div>
        </td>
    </tr>
    
        `
    }

    tbody.innerHTML = tempHTML;

}


const addNewEmployeeFunc = () => {
    
    modalAdd.show()

}


addBtn.addEventListener("click" , function() {

    addEmployeeObject();

    modalAdd.hide()

});


function editEmployeeInfo(id) {

    modalEdit.show()


    let localStorageEmployee = JSON.parse(localStorage.getItem("employeeInfo"));


    let editEmployee = localStorageEmployee.find(item => item.id === id)

    document.querySelector("#editFirstName").value = editEmployee.firstName;
    document.querySelector("#editLastName").value = editEmployee.lastName;
    document.querySelector("#editEmail").value = editEmployee.email;
    document.querySelector("#editPhone").value = editEmployee.phone;
    document.querySelector("#editLocation").value = editEmployee.location;


    // document.querySelector("#editFirstName").value = localStorageEmployee[id].firstName;
    // document.querySelector("#editLastName").value = localStorageEmployee[id].lastName;
    // document.querySelector("#editEmail").value = localStorageEmployee[id].email;
    // document.querySelector("#editPhone").value = localStorageEmployee[id].phone;
    // document.querySelector("#editLocation").value = localStorageEmployee[id].location;

    const saveBtn = document.querySelector("#saveBtn");

    saveBtn.onclick = function() {

        let index = localStorageEmployee.findIndex(x=>x.id==id);

        localStorageEmployee[index].firstName = document.querySelector("#editFirstName").value;
        localStorageEmployee[index].lastName = document.querySelector("#editLastName").value;
        localStorageEmployee[index].email = document.querySelector("#editEmail").value;
        localStorageEmployee[index].phone = document.querySelector("#editPhone").value;
        localStorageEmployee[index].location = document.querySelector("#editLocation").value;

        localStorage.setItem("employeeInfo", JSON.stringify(localStorageEmployee));
        
        modalEdit.hide()

        addEmployee();


    }
}

function delEmployee(id){

    let localStorageEmployee = JSON.parse(localStorage.getItem("employeeInfo"));

    // let index = localStorageEmployee.findIndex(x=>x.id==id);
    
    let deleteEmployee = localStorageEmployee.find(item => item.id === id)
    let deleteEmployeeID = deleteEmployee.id


    localStorageEmployee = localStorageEmployee.filter(item => item.id !== deleteEmployeeID)

    data.splice(deleteEmployeeID,1)


    localStorage.setItem("employeeInfo", JSON.stringify(localStorageEmployee));

    addEmployee();

}


addButton.addEventListener("click" , addNewEmployeeFunc);

addEmployee();
