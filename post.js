function addData() {
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
        createdBy: createdBy,
        updatedBy: updatedBy,
        firstName: firstName,
        lastName: lastName,
        employeeId: employeeId,
        mobileNum: mobileNum,
        jobTitle: jobTitle,
        deptName: companyBranchId,
        companyBranchId: companyBranchId,
        isActive: "Y",
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
    console.log(JSON.stringify(data));
    if (firstName != "") {
        this.uploadData(data);
    } else {
        alert("please enter the Name");
    }
}

function uploadData(data) {
    fetch("https://trg.kooversapp.com/rest/employee/add", {
            method: "POST",
            body: JSON.stringify(data),
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

$(document).ready(function() {
    $("#mobilecheck").hide();

    var mobileNum_err = true;

    $("#mobileNum").keyup(function() {
        mobileNum_check();
    });

    function mobileNum_check() {
        var mobileNum_val = $("#mobileNum").val();

        if (mobileNum_val.length == "") {
            $("#mobilecheck").show();
            $("#mobilecheck").html("**Please Fill the number");
            $("#mobilecheck").focus();
            $("#mobilecheck").css("color", "red");
            mobileNum_err = false;
            return false;
        } else {
            $("#mobilecheck").hide();
        }

        if (mobileNum_val.length < 10 || mobileNum_val.length > 10) {
            $("#mobilecheck").show();
            $("#mobilecheck").html("**Number length must be  10");
            $("#mobilecheck").focus();
            $("#mobilecheck").css("color", "red");
            mobileNum_err = false;
            return false;
        } else {
            $("#mobilecheck").hide();
        }
    }

    $("btn").click(function() {
        mobileNum_err = true;
        mobileNum_check();
        if (mobileNum_err == true) {
            return true;
        } else {
            return false;
        }
    });
});