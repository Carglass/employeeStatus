var config = {
        apiKey: "AIzaSyBUQ_HnDX4vBkcsJv_QDNrUJN4bT4tmX5Y",
        authDomain: "employeestatus-594d3.firebaseapp.com",
        databaseURL: "https://employeestatus-594d3.firebaseio.com",
        projectId: "employeestatus-594d3",
        storageBucket: "employeestatus-594d3.appspot.com",
        messagingSenderId: "1013144993414"
    };

firebase.initializeApp(config);

let database = firebase.database();

console.log(moment().format('DDMMYYYY'));

database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    let newRow = $('<tr></tr>');
    let newName = $('<td>'+ snapshot.val().name + '</td>');
    let newRole = $('<td>' + snapshot.val().role + '</td>');
    let newStart = $('<td>' + snapshot.val().start + '</td>');
    var startDate = moment(snapshot.val().start , 'DDMMYYYY');
    let now = moment();
    var months = Math.floor(moment.duration(now.diff(startDate)).asMonths());
    let newMonths = $('<td>' + months + '</td>');
    let newRate = $('<td>' + snapshot.val().rate + '</td>');
    let bill = snapshot.val().rate * months;
    let newBill = $('<td>' + bill + '</td>');
    newRow.append(newName).append(newRole).append(newStart).append(newMonths).append(newRate).append(newBill);
    $('#table-content').append(newRow);
})

$(document).ready(function(){
    $('#add-employee-btn').click(function(event){
        event.preventDefault();
        let name = $('#employee-name-input').val().trim();
        let role = $('#role-input').val().trim();
        let start = $('#start-input').val().trim();
        let rate = $('#rate-input').val().trim();

        database.ref().push({
            name: name,
            role: role,
            start: start,
            rate: rate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
        });

        $('#employee-name-input').val('');
        $('#role-input').val('');
        $('#start-input').val('');
        $('#rate-input').val('');
    });
});