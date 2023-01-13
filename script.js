function generateTable(array) { 
  var tableBody = document.getElementById("table-body");
 
  tableBody.innerHTML = "";
  console.log(array);

  for (var i = 0; i < array.length; i++) {
    var object = array[i];
    console.log(object);

    var row = document.createElement("tr");

    var idCell = document.createElement("td");
    idCell.innerHTML = object.id;
    row.appendChild(idCell);

    var nameCell = document.createElement("td");
    nameCell.innerHTML = object.firstName;
    row.appendChild(nameCell);

    
    var emailCell = document.createElement("td");
    emailCell.innerHTML = object.lastName;
    row.appendChild(emailCell);

    
    var emailCell = document.createElement("td");
    emailCell.innerHTML = object.mobileNum;
    row.appendChild(emailCell);

    
    var emailCell = document.createElement("td");
    emailCell.innerHTML = '<button class="btn btn-warning"><a href="put.html?id='+`${object.id}`+'"><i class="fa fa-edit"></i></a></button>';
    row.appendChild(emailCell);

    
    var emailCell = document.createElement("td");
    emailCell.innerHTML = '<button class="btn btn-danger" type="button" onclick="onDelete(' + `${object.id}` + ')"><i class="fa fa-trash"></i></button>';
    row.appendChild(emailCell);

    
    tableBody.appendChild(row);
  }
}

window.onload = getData;

function getData() { 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {  
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.response);
    let emp = JSON.parse(this.response);
    console.log("...",JSON.stringify(emp))
    console.log("i",emp.data)
    let employee=_.sortBy(emp.RESPONSE_BODY, function (employee) {return employee.firstName + ' ' + employee.lastName})
    
    generateTable(employee);
  }
};
xhttp.open("GET", "https://trg.kooversapp.com/rest/employee/getEmployeeList/cb0001", true);
xhttp.send();
}



/*async function onDelete(id) {
console.log('deleting ' + id)
fetch("https://trg.kooversapp.com/rest/employee/deleteById", {
  method: 'POST',
  body: JSON.stringify(emp),
    headers: {
      'Content-Type': 'application/json'
    }
})
  .then(res => res.json())
  .then(data => {   
    console.log(emp.data)
    this.getData();
  })
  .catch(error => console.error('Error:',error))
}



var datastrng =JSON.stringify({ "id": <ID>,
"isActive": "N", "updatedBy":<Username> }); */

function deleteData() { 
  var updatedBy = document.getElementById("updatedBy").value;  
  var isActive=document.getElementById("isActive").value;

  var data={
    id: empId, updatedBy: updatedBy
    ,isActive:"N"}

  console.log(JSON.stringify(data));
  this.deleteData(data)
}

async function onDelete(data)
{
  fetch('https://trg.kooversapp.com/rest/employee/deleteById', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },    
  })
  .then(res => res.json())
  .then(data => {   
    console.log(emp.data)
    this.deleteData(data);
  })
  .catch(error => console.error('Error:',error))
}


