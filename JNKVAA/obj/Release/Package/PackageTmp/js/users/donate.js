var base64String = "";
$(document).ready(function () {
    
    showUserProfile();
    initProfilePic();
    getDonationPurpose();
    getuserDonations();

    $("#donate").click(function (event) {
        var donateId = $("#donateId").val();
        var name = $("#name").val();
        var batchNo = $("#batchNo").val();
        var paymentMode = $("#paymentMode").val();
        var donationAmount = $("#donationAmount").val();
        var email = $("#email").val();

        if (donateId === "") {
            alert("Donate ID is mandatory!");
            $("#donateId").focus();
            return false;
        }

        if (name === "") {
            alert("Name is mandatory!");
            $("#name").focus();
            return false;
        }

        if (batchNo === "") {
            alert("Batch No is mandatory!");
            $("#batchNo").focus();
            return false;
        }
        console.log(paymentMode);

        if (paymentMode === "0") {
            alert("Payment Mode is mandatory!");
            $("#paymentMode").focus();
            return false;
        }
        if ($("#donatePurpose").val() === "0") {
            alert("Donation Purpose is mandatory!");
            $("#paymentMode").focus();
            return false;
        }

        if (donationAmount === "") {
            alert("Donation Amount is mandatory!");
            $("#donationAmount").focus();
            return false;
        }

        if (email === "") {
            alert("Email is mandatory!");
            $("#email").focus();
            return false;
        }
        Donation();

        return true;
        

    });
    function Donation() {

        $.ajax({
            url: '../WebService.asmx/Donate',
            type: "POST", // type of the data we send (POST/GET)
            contentType: "application/json",
            data: "{ 'name': '" + $('#name').val() + "', 'mobileNo': '" + $('#mobileno').val() + "', 'email': '" + $('#email').val() + "', 'batchNo': '" + $('#batchNo').val() + "', 'PaymentMode': '" + $('#paymentMode').val() + "', 'DonateAmount': '" + $('#donationAmount').val() + "', 'RefNo': '" + $('#refNo').val() + "', 'DonatePurpose': '" + $('#donatePurpose').val() + "', 'PaymentSS': '" + base64String + "'}",
            datatype: "json",
            success: function (response) { // when successfully sent data and returned
                // alert("Res: " + response.d);
                switch (parseInt(JSON.parse(response.d))) {
                    case 1:
                        alert("Thank You For Donation");
                        location.reload();
                        break;
                    case 0:

                        alert("Unable to Donate Now. Try after sometime.");
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


});


function showUserProfile() {
    
    $.ajax({
        url: "../WebService.asmx/getuserdata",
        type: "POST",
        contentType: "application/json",
        data: "{ 'uid': '0'}",
        dataType: "json",
        success: function (response) {

            user = JSON.parse(JSON.parse(response.d));
            if (user[0].ustatus.localeCompare("521") === 0)
                alert("No records found");
            else if (user[0].ustatus.localeCompare("520") === 0)
                window.location = "../login.html";
            else {

                $("#name").val(user[0].fname+ " " + user[0].sname);
                $("#batchNo").val(user[0].batch);
                $('#mobileno').val(user[0].uphno);
                $('#email').val(user[0].uemail);
                $('#city').val(user[0].ucity);
                $('#batchNo').val(user[0].batchNo);

                

            }

        }

    }).done(function () {
    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });
}

function getDonationPurpose() {
    $.ajax({
        url: "../WebService.asmx/getDonations",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            story = JSON.parse(JSON.parse(response.d));
            if (story[0].title.localeCompare("521") === 0) {
            }
            else if (story[0].title.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {

                for (i = 0; i < story.length; i++) {


                    var txt = '<option value=' + story[i].donationid + '>' + story[i].title + '</option>';
   

                    $('#donatePurpose').append(txt);
                }
                
                //j = i;
            }

        }

    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });


    //Edit user data and getting data using button 




}


function initProfilePic() {

    $('#fileprofile').on('change', function () {
        compressImage();

    });




}

function compressImage() {

    var inputImage = document.getElementById('fileprofile');
    var file = inputImage.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                // Calculate the new width and height to maintain the aspect ratio
                var maxDimension = 800;
                var newWidth, newHeight;

                if (img.width > img.height) {
                    newWidth = maxDimension;
                    newHeight = (img.height / img.width) * maxDimension;
                } else {
                    newHeight = maxDimension;
                    newWidth = (img.width / img.height) * maxDimension;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                // Draw the image on the canvas
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Convert the canvas content to a base64 encoded JPEG image
                var compressedImageData = canvas.toDataURL('image/jpeg', 0.8);

                // Create a blob from the base64 data
                var blob = dataURItoBlob(compressedImageData);

                // Check if the compressed image size is below 900kb
                if (blob.size < 900 * 1024) {
                    // Do something with the compressed image, for example, upload or display it
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        //$("#base64Img").attr("href",reader.result); 
                        base64String = reader.result;
                        

                    }
                    reader.readAsDataURL(blob);
                } else {
                    alert('Please,provide image size below 5mb');
                }
            };
        };

        reader.readAsDataURL(file);
    }
}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/jpeg' });
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