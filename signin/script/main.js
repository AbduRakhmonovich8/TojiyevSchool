var tojmod = document.getElementById('tojmod');
tojmod.style.display = "block";
document.addEventListener("DOMContentLoaded", function () {
    // Wait for all resources to be loaded
    window.addEventListener("load", function () {
        setTimeout(() => {
            // Hide the loader
            var loader = document.getElementById('modal');
            loader.style.display = 'none';
            tojmod.style.display = "none";
        }, 1500);
    });
});




function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyBYVFvHdpK-HvtUi1OOao5mP7y2N_h2aEk',
        clientId: '77394640808-6muad2npp4q45va0tt69i30985fkh6af.apps.googleusercontent.com',
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(function () {
        gapi.auth2.getAuthInstance().signIn().then(function () {
            appendData();
        });
    }, function (error) {
        console.error(JSON.stringify(error, null, 2));
    });
}

function appendData() {
    const spreadsheetId = '1NQ4Rsxs228gUdf56aNQeM_ATqnin0Y8tqgOuJc4mJK0';
    const valueInputOption = 'Ship Date';

    const data = [
        {
            range: 'Sheet1!A1:A4',
            majorDimension: 'COLUMNS',
            values: [
                ["Item", "Wheel", "Door", "Engine"]
            ]
        },
        {
            range: 'Sheet1!B1:D2',
            majorDimension: 'ROWS',
            values: [
                ["Cost", "Stocked", "Ship Date"],
                ["$20.50", "4", "3/1/2016"]
            ]
        }
    ];

    const body = {
        valueInputOption: valueInputOption,
        data: data
    };

    gapi.client.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: body
    }).then((response) => {
        console.log(`${response.result.totalUpdatedCells} cells updated.`);
    }).catch((error) => {
        console.error('Error: ', error.result.error.message);
    });
}