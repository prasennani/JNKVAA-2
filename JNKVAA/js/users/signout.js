﻿$(document).ready(function () {
    $('#signout').click(function () {
        signOut();
    });
    $('#signout2').click(function () {
        signOut();
    });
});
function signOut() {
    $.ajax({
        url: "../WebService.asmx/signOut",
        type: "POST",
        contentType: "application/json",
        // data: "{ 'uid': '" + userid + "'}",
        dataType: "json",
        success: function (response) {

            // user = JSON.parse(JSON.parse(response.d));
            var result = JSON.parse(response.d);
            if ( parseInt(result)=== 1) {
                
                window.location = "../login.html";
            }
            else if(result==="-1")
            {
                alert("Please contact to Admin");
        }



        }


    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });

}

