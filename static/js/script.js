const letsGo = () => {
    console.log("\nInitiating Widget...\n");
    $("#room-image").hide();
    initializeSeafloor();
    specialLobster();

    $("#submit-button").on("click", () => {
        console.log("\nsubmit button clicked");
        let start_date = $("#start_date").val();
        let end_date = $("#end_date").val();
        let radioValue = $("input[name='btnradio']:checked").attr("id");
        console.log(start_date);
        console.log(end_date);
        console.log(radioValue + "\n");

        $("#room-image").fadeOut(1000, () => {
            // This callback function is executed after fadeOut completes
            buildShell(start_date, end_date, radioValue);
            // fadeIn moved inside the callback of fadeOut in buildShell
        });
    });
};

const buildShell = (start_date, end_date, radioValue) => {
    const resultsDiv = $("#results");
    const roomImage = $("#room-image");

    // Convert the date strings to Date objects
    let startDate = new Date(start_date);
    let endDate = new Date(end_date);

    // Subtract the dates and convert the result from milliseconds to days
    let stayLength = (endDate - startDate) / (1000 * 60 * 60 * 24);


    resultsDiv.html(`
    <p>You have chosen to stay for ${stayLength} days.</p>
    <p> We appreciate your business and hope you accept our Leader the Holy Lobster.</p>
    <p id="room-type-results"></p>
    `);

    if (radioValue === "button-single-room") {
        $("#room-type-results").html("You have chosen a single room. You must be lonely. But don't worry, our Lobster Clawettes will keep you company!");
        console.log("single room");
    } else if (radioValue === "button-double-room") {
        $("#room-type-results").html("A double room? Do you have friends? You saw the sign right? Only Lobsters allowed in this club. We will let it slide this time.");
        console.log("double room");
    } else if (radioValue === "button-mona-lisa") {
        $("#room-type-results").html("The Mona Lisa is the ultimate room for the ultimate Claw. We hope you understand that there is a $1000 surcharge for this room.");
        console.log("suite");
    }

    roomImage.html(`
    <h1 class="mb-5">This is your room!</h1>
    <img src="./static/img/${radioValue}.webp" alt="Room Image" class="img-fluid">
    `);

    $("#room-image").fadeIn(1000);
};

const initializeSeafloor = () => {
    let defaultStartDate = new Date();
    let defaultEndDate = new Date();
    defaultEndDate.setDate(defaultStartDate.getDate() + 1);

    $(() => {
        $('#start_date').datepicker({
            minDate: 0,
            defaultDate: defaultStartDate,
            onSelect: (selectedDate) => {
                let minEndDate = new Date(selectedDate);
                minEndDate.setDate(minEndDate.getDate() + 1);
                // Set the minDate of the end date datepicker to the day after the selected start date
                $('#end_date').datepicker('option', 'minDate', minEndDate);

                announceLobster();
            }
        }).datepicker('setDate', defaultStartDate);

        $('#end_date').datepicker({
            minDate: 1,
            defaultDate: defaultEndDate,
            onSelect: announceLobster
        }).datepicker('setDate', defaultEndDate);
    });
}

const specialLobster = () => {
    $(".btn-group").click((event) => {
        let newColorVarName;

        switch (event.target.id) {
            case "button-single-room":
                newColorVarName = '--card-color-one';
                break;
            case "button-double-room":
                newColorVarName = '--card-color-two';
                break;
            case "button-mona-lisa":
                newColorVarName = '--card-color-three';
                break;
        }

        if (newColorVarName) {
            let newColor = $(':root').css(newColorVarName);
            $(".card-body").animate(
                { backgroundColor: newColor },
                500
            );
        }
    });
};

const announceLobster = () => {
    let dayPlural;

    let startDate = new Date($('#start_date').datepicker('getDate'));
    let endDate = new Date($('#end_date').datepicker('getDate'));
    let stayLength = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (stayLength === 1) {
        dayPlural = "day";
    } else {
        dayPlural = "days";
    }

    const cardFooter = $("#date-select");
    cardFooter.html(`
    You have chosen to stay for ${stayLength} ${dayPlural}.
    `);
}

letsGo();