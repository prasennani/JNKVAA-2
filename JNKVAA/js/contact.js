$('#contactForm').submit(function (e) {
    e.preventDefault(); // stop form from submitting
    console.log("Submit event triggered");

    const uname = $('#name').val().trim();
    const uphno = $('#uphno').val().trim();
    const sub = $('#subject').val().trim();
    const message = $('#message').val().trim();

    if (!uname || !uphno || !sub || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    $.ajax({
        url: '/WebService.asmx/addMessages', // use absolute path
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            uname: uname,
            uphno: uphno,
            sub: sub,
            message: message
        }),
        success: function (response) {
            console.log("Response:", response);
            const result = JSON.parse(response.d);
            if (result === "1") {
                alert("Message sent successfully!");
                $('#contactForm')[0].reset();
            } else {
                alert("Failed to send message. Please try again.");
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", status, error);
            alert("Something went wrong. Please try again later.");
        }
    });
});
