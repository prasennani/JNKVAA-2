var DonationBatchData = [];
var DonationPurposeData = [];

DonationBatchData.push(["Batchs", "Donation Amount"]);
DonationPurposeData.push(["Donation Purpose", "Donation Amount"]);

$(document).ready(function () {
    // Load Google Charts library
    google.charts.load('current', { 'packages': ['bar'] });
    // Call getAllDonations after Google Charts library is loaded
   google.charts.setOnLoadCallback(getAllDonations);
});

function getAllDonations() {
    // Call both AJAX functions to fetch data
    showBatchDonations();
    showPurposeDonations();
}

function showBatchDonations() {
    $.ajax({
        url: "../WebService.asmx/getDonationBatchData",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var DoneData = JSON.parse(JSON.parse(response.d));
            if (DoneData[0].BatchId === "521") {
                alert("No records found");
            } else if (DoneData[0].BatchId === "520") {
                window.location = "../login.html";
            } else {
                for (var i = 0; i < DoneData.length; i++) {
                    DonationBatchData.push(["Batch " + (DoneData[i].BatchId || 'Others'), DoneData[i].TotalDonationAmount]);
                }
                // After data is fetched, draw the chart
                drawStuff();
            }
        },
        error: function (xhr, status, error) {
            console.log("Status " + status + " Error: " + error);
        }
    });
}

function drawStuff() {
    var data = new google.visualization.arrayToDataTable(DonationBatchData);
    var options = {
        width: 600,
        legend: { position: 'none' },
        bars: 'horizontal',
        axes: { x: { 0: { side: 'top', label: 'Donations' } } },
        bar: { groupWidth: "80%" }
    };
    var chart = new google.charts.Bar(document.getElementById('top_x_div'));
    chart.draw(data, options);
}

function showPurposeDonations() {
    $.ajax({
        url: "../WebService.asmx/getDonationPurposeData",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var DoneData = JSON.parse(JSON.parse(response.d));
            if (DoneData[0].BatchId === "521") {
                alert("No records found");
            } else if (DoneData[0].BatchId === "520") {
                window.location = "../login.html";
            } else {
                for (var i = 0; i < DoneData.length; i++) {
                    DonationPurposeData.push([DoneData[i].BatchId || 'Others', DoneData[i].TotalDonationAmount]);
                }
                // After data is fetched, draw the chart
                alert("f got");
                drawDiagramtuff();
            }
        },
        error: function (xhr, status, error) {
            console.log("Status " + status + " Error: " + error);
        }
    });
}

function drawDiagramtuff() {
    var data = new google.visualization.arrayToDataTable(DonationPurposeData);
    var options = {
        title: 'Chess opening moves',
        width: 600,
        legend: { position: 'none' },
        bars: 'horizontal',
        axes: { x: { 0: { side: 'top', label: 'Donations' } } },
        bar: { groupWidth: "90%" }
    };
    var chart = new google.charts.Bar(document.getElementById('top_y_div'));
    chart.draw(data, options);
}



function getAllDonations() {
    
    $('#donationPersonList').find("tr:gt(0)").remove();
    $.ajax({
        url: "../WebService.asmx/getDonationPersonList",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            getDonations = JSON.parse(JSON.parse(response.d));
            if (getDonations[0].name.localeCompare("521") === 0) {
                alert("No records found");
                $('.loader').css('display', 'none');
            }
            else if (getDonations[0].name.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {

                for (i = 0; i < getDonations.length; i++) {
                    var txt = '<tr><th scope="row">' + (parseInt(i) + 1) + '</th>';
                    txt += '<td>' + getDonations[i].datee + '</td>';
                    txt += '<td>' + getDonations[i].batchNo + '</td>';
                    txt += '<td>*****</td>';
                    if (getDonations[i].PaymentMode === "1") {
                        txt += '<td>Account Transfer</td>';
                    }
                    else if (getDonations[i].PaymentMode === "2") {
                        txt += '<td>Phonepay QRCode</td>';

                    }
                    else if (getDonations[i].PaymentMode === "3") {
                        txt += '<td>SBI CollectLink</td>';
                    }
                    else if (getDonations[i].PaymentMode === "4") {
                        txt += '<td>Razor Pay</td>';

                    }
                    else if (getDonations[i].PaymentMode === "5") {
                        txt += '<td>PhonePay App</td>';

                    }

                    
                    txt += '<td>' + getDonations[i].DonationAmount + '</td>';

                    $('#donationPersonList tr:last').after(txt);
                }
                $('.loader').css('display', 'none');
                //j = i;
            }

        }

    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });


    //Edit user data and getting data using button 

}