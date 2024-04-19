

$(document).ready(function () {
    $('#preloader').css('display', 'flex');
    
    getuser();
    getuserAccessLevel();
    getProfilePic();

    $('#send').click(function () {
		if ($("#fname").val().length > 0) {
                if ($("#phno").val().length > 0) {
                    if ($("#subject").val().length > 0) {
                        if ($("#message").val().length > 0) {
							
        					sendMessage();
							
						} else
                            alert("Please write your Question or Message or Suggession");
                    } else
                        alert("Tell us Your Mobile Number or Email id to contact you");
                } else
                    alert("Enter Your Batch No");
            } else
                alert("Enter Your Name");

    });

});


function sendMessage() {
    $.ajax({
        url: '../WebService.asmx/addMessage',
        type: "POST", // type of the data we send (POST/GET)
        contentType: "application/json",
        data: "{ 'uname': '" + $('#fname').val() + "', 'uphno': '" + $('#phno').val() + "', 'sub': '" + $('#subject').val() + "', 'message': '" + $('#message').val() + "'}",
        datatype: "json",
        success: function (response) { // when successfully sent data and returned
           // alert("Res: " + response.d);
            switch (parseInt(JSON.parse(response.d))) {
                case 1:
                    alert("Message Sent");
                    $('.form-control').val("");
                    break;
                case 0:
                    alert("Unable to send Message. Try after sometime.");
                    break;

            }

        } // success close
    }).done(function () {
    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus + ", Error: " + errorThrown);
        //alert("Something went wrong. Please contact Admin.");
    }).always(function () {
    }); // ajax call ends

}

function getuserAccessLevel() {
    $.ajax({
        url: "../WebService.asmx/getUserAcessLevel",
        type: "POST",
        contentType: "application/json",
        // data: "{ 'uid': '" + userid + "'}",
        dataType: "json",
        success: function (response) {
            user = response.d;
            switch (parseInt(user)) {
                case 1:
                    alert("Unauthorized Access. Please Login");
                    window.location = "../login.html";
                    break;
                case 0:
                    getuser();
                    getuserAccessLevel();
                    getProfilePic();
                    getuserDonations();
                    break;
                default:
                    alert("User profile not identified. Please Login.");
                    window.location = "../login.html";
                    break;
            }
        }


    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });

}

function getuser() {
    $.ajax({
        url: "../WebService.asmx/getUsername",
        type: "POST",
        contentType: "application/json",
        // data: "{ 'uid': '" + userid + "'}",
        dataType: "json",
        success: function (response) {
            user = response.d;
            $('#puname').text(user);
            $('#puname2').text(user);
           /* var vals = user.split("-");

            if (vals.length == 2) {
                switch (parseInt(vals[1])) {
                    case 1:
                        alert("Unauthorized access. Please Login");
                        window.location = "../login.html";
                        break;
                    case 0:
                        $('#puname').text(vals[0]);
                        $('#puname2').text(vals[0]);
                        break;
                    default:
                        alert("Can't verify user. Please Login.");
                        window.location = "../login.html";
                        break;
                }
            }*/
        }


    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });

}

function getProfilePic() {
    $.ajax({
        url: '../WebService.asmx/getProfilePic',
        type: "POST", // type of the data we send (POST/GET)
        contentType: "application/json",
        data: "{ 'uid': '0'}",
        datatype: "json",
        success: function (response) { // when successfully sent data and returned
            //alert("Res: " + JSON.stringify(response.d));
            if (response.d.length > 10) {
                //$('#imgprofile').attr('src', String(response.d).replaceAll('"', ''));
                $('#profileicon').attr('src', String(response.d).replaceAll('"', ''));
                $('#profileicon2').attr('src', String(response.d).replaceAll('"', ''));
                //$("#tarea").val(String(response.d).replaceAll('"', ''));
                $('#preloader').css('display', 'none');
            } else {
                $('#profileicon2').attr('src', "../assets/imgs/profile pic.png");
                $('#profileicon').attr('src', "../assets/imgs/profile pic.png");
                $('#preloader').css('display', 'none');
            }
        } // success close
    }).done(function () {
    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus + ", Error: " + errorThrown);
        //alert("Something went wrong. Please contact Admin.");
    }).always(function () {
    }); // ajax call ends
}


function showUserData() {
    $.ajax({
        url: "../WebService.asmx/getuserdata",
        type: "POST",
        contentType: "application/json",
        data: "{ 'uid': '" + userid + "'}",
        dataType: "json",
        success: function (response) {
            user = JSON.parse(JSON.parse(response.d));
            if (user[0].ustatus.localeCompare("521") === 0)
                alert("No records found");
            else if (user[0].ustatus.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {
                if (user[0].photo == "") {
                    $('#photo').attr("src", "../assets/imgs/profile pic.png");
                } else {
                    $('#photo').attr("src", user[0].photo);
                }
                $('#fullname').text(user[0].fname+" "+user[0].sname);
                $('#dob').text(user[0].dob);
                $('#email').text(user[0].uemail);
                $('#city').text(user[0].ucity);
                $('#profession').text(user[0].profession);
                $('#workingin').text(user[0].workingin);
                $('#bio').text(user[0].ubio);
                $('#instaurl').attr("href",user[0].instaurl);
                $('#fburl').attr("href",user[0].fbookurl);
                $('#linkdnurl').attr("href",user[0].linkdnurl);

                $('#preloader').css('display', 'none');





            }
        }

    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });
}







function getuserDonations() {

    $.ajax({
        url: "../WebService.asmx/userDonated",
        type: "POST",
        contentType: "application/json",
        // data: "{ 'uid': '" + userid + "'}",
        dataType: "json",
        success: function (response) {

            DataVal = JSON.parse(JSON.parse(response.d));

            if (DataVal[0].DonatedValue.localeCompare("521") === 0) {
                $('#preloader').css('display', 'none');
                alert("Event Not Added");
            }
            else if (DataVal[0].DonatedValue.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {

                for (i = 0; i < DataVal.length; i++) {

                    $('#amount').text(DataVal[0].DonatedValue);
                    $('#amount2').text(DataVal[0].DonatedValue);
                    $('#donate1').text(DataVal[0].ProcessValue);
                    $('#donate2').text(DataVal[0].ProcessValue);

                }
            }
        }
    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });

}
