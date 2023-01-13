var editDataTemplate;
var employeeData;
var empId;
var employeeUpdateData;
$(function() {
    editDataTemplate = $("#editDataTmpl").html();
    getID();
});

function getID() {
    var currentUrl = window.location.href;
    console.log(currentUrl);
    var queryString = currentUrl.substring(currentUrl.indexOf("?") + 1);

    var queryParams = queryString.split("&");

    var id;
    queryParams.forEach(function(param) {
        var parts = param.split("=");
        if (parts[0] === "id") {
            id = parts[1];
            empId = id;
            console.log(id);
            this.getData(id);
        }
    });
}

function getData(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            let emp = JSON.parse(this.response);
            employeeData = emp.RESPONSE_BODY;
            console.log(employeeData);

            $("#editData").html(_.template(editDataTemplate, employeeData));
            $("#editData").trigger("create");
            // onLoadFiled(object);
        }
    };
    xhttp.open(
        "GET",
        "https://trg.kooversapp.com/rest/employee/getById/" + id,
        true
    );
    xhttp.send();
}

function onUpdate() {
    this.upDateData();
    console.log(employeeUpdateData);
    fetch("https://trg.kooversapp.com/rest/employee/update", {
            method: "POST",
            body: JSON.stringify(employeeUpdateData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((response) => {
            console.log("Success:", JSON.stringify(response));
            window.location.assign("index.html");
        })
        .catch((error) => console.error("Error:", error));
}

function upDateData(id) {
    var createdBy = document.getElementById("createdBy").value;
    var updatedBy = document.getElementById("updatedBy").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var employeeId = document.getElementById("employeeId").value;
    var mobileNum = document.getElementById("mobileNum").value;
    var jobTitle = document.getElementById("jobTitle").value;
    var deptName = document.getElementById("deptName").value;
    var companyBranchId = document.getElementById("companyBranchId").value;

    var addressDescription1 = document.getElementById(
        "addressDescription1"
    ).value;
    var location = document.getElementById("location").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var country = document.getElementById("country").value;
    var pinCode = document.getElementById("pinCode").value;
    var createdBy = document.getElementById("createdBy").value;
    var updatedBy = document.getElementById("updatedBy").value;
    var isActive = document.getElementById("isActive").value;
    var data = {
        id: empId,
        createdBy: createdBy,
        updatedBy: updatedBy,
        firstName: firstName,
        lastName: lastName,
        employeeId: employeeId,
        mobileNum: mobileNum,
        jobTitle: jobTitle,
        deptName: deptName,
        companyBranchId: companyBranchId,
        isActive: isActive,
        // resiAddress: {
        //   addressDescription1: addressDescription1,
        //   location: location,
        //   city: city,
        //   state: state,
        //   country: country,
        //   pinCode: pinCode,
        //   createdBy: createdBy,
        //   updatedBy: updatedBy,
        //   isActive: isActive,
        // },
    };
    console.log("###", data);
    employeeUpdateData = data;
}