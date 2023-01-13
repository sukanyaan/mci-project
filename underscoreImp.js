var dataTemplate;
var editDataTemplate;
var employee = [];
var employeeData;
$(function() {
    dataTemplate = $("#listTmpl").html();
    editDataTemplate = $("#editDataTmpl").html();

    getData();
});

function getData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            let emp = JSON.parse(this.response);
            console.log("...", JSON.stringify(emp));
            console.log("i", emp.data);
            employee = _.sortBy(emp.RESPONSE_BODY, function(employee) {
                return employee.firstName + " " + employee.lastName;
            });

            $("#listContainer").html(_.template(dataTemplate, employee));
            $("#listContainer").trigger("create");

            //   generateTable(employee);
        }
    };
    xhttp.open(
        "GET",
        "https://trg.kooversapp.com/rest/employee/getEmployeeList/cb0001",
        true
    );
    xhttp.send();
}

function editEmployee(employeeId) {
    window.location.href = `put.html?id=${employeeId}`;
}

async function onDelete(employeeId, employeeUpdatedBy) {
    var data = {
        id: employeeId,
        updatedBy: employeeUpdatedBy,
        isActive: "N",
    };
    fetch("https://trg.kooversapp.com/rest/employee/deleteById", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            window.location.reload();
        })
        .catch((error) => console.error("Error:", error));
}

function deleteEmployee(employeeId, employeeUpdatedBy) {
    console.log({ employeeId, employeeUpdatedBy });
    onDelete(employeeId, employeeUpdatedBy);
}