function loadHeader() {
    let body = $('body');
    let header = $('<header>' +
        '    <img id="header-image" src="images/header.jpg" alt="A car in 1980s\' style picture."/>' +
        '    <button class="menu-item" onclick="carTab()">Cars</button>' +
        '    <button class="menu-item" onclick="manufacturerTab()">Manufacturers</button>' +
        '    <button class="menu-item" onclick="addCarTab()">Add car</button>' +
        '    <button class="menu-item" onclick="addManufacturerTab()">Add manufacturers</button>' +
        '</header>');
    body.append(header);
}

function loadFooter() {
    let body = $('body');
    let footer = $('<footer>' +
        '    2018 - <a href="https://bencelaszlo.github.io">Bence Lászó</a>' +
        '</footer>');
    body.append(footer);
}

function resetBody() {
    $("body").empty();
}

function carTab() {
    resetBody();
    loadHeader();
    let body = $('body');
    let content = "<h1>Cars</h1><div id='content'></div>";
    body.append(content);
    loadCars();
    loadFooter();
}

function manufacturerTab() {
    resetBody();
    loadHeader();
    let body = $('body');
    let content = $("<h1>Manufacturers</h1><div id='content'></div>");
    body.append(content);
    loadManufacturers();
    loadFooter();
}

function addCarTab() {
    resetBody();
    loadHeader();
    let body = $('body');
    let content = $('    <h1>Add Car</h1>' +
        '    <form id="carForm" action="addCar" method="post">' +
        '        <table>' +
        '            <tr>' +
        '                <td>Name (type)</td>' +
        '                <td><input type="text" name="name"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Consumption (l / 100km)</td>' +
        '                <td><input type="text" name="consumption"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Color</td>' +
        '                <td><input type="text" name="color"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Manufacturer</td>' +
        '                <td><input type="text" name="manufacturer"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Year</td>' +
        '                <td><input type="number" name="year"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Available</td>' +
        '                <td><input type="number" name="available"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Horsepower</td>' +
        '                <td><input type="number" name="horsepower"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td><input type="submit" value="Add Car"/></td>' +
        '            </tr>' +
        '        </table>' +
        '    </form><div id=\'content\'></div>');
    body.append(content);
    loadFooter();
}

function addManufacturerTab() {
    resetBody();
    loadHeader();
    let body = $('body');
    let content = $('    <h1>Add Manufacturer</h1>' +
        '    <form id="manufacturersForm" action="addManufacturers" method="post">' +
        '        <table>' +
        '            <tr>' +
        '                <td>Name</td>' +
        '                <td><input type="text" name="name"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Country</td>' +
        '                <td><input type="text" name="country"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td>Founded</td>' +
        '                <td><input type="text" name="founded"/></td>' +
        '            </tr>' +
        '            <tr>' +
        '                <td><input type="submit" value="Add Manufacturer"/></td>' +
        '            </tr>' +
        '        </table>' +
        '    </form><div id=\'content\'></div>');
    body.append(content);
    loadFooter();
}

function loadManufacturers() {
    $.getJSON('manufacturers', function(data) {
        let table = $('<table id="manufacturerTable"></table>');
        table.append('<tr><th>Name</th><th>Country</th><th>Founded</th></tr>');
        $("content").append(table);

        let trParity = false;
        let tdParity = false;
        $.each(data, function (key, value) {

            //Create a new row.
            let row = $('<tr></tr>');

            //Parsing JSON objects' fields.
            let nameField = $('<td>' + value.name + '</td>');
            let foundedField = $('<td>' + value.founded + '</td>');
            let countryField = $('<td>' + value.country + '</td>');

            if (trParity) {
                row.addClass('tr-light');
                trParity = false;

                if (tdParity) {
                    nameField.addClass('td-mid-light');
                    foundedField.addClass('td-mid-light');
                    countryField.addClass('td-light');
                    tdParity = false;
                } else {
                    nameField.addClass('td-light');
                    foundedField.addClass('td-light');
                    countryField.addClass('td-mid-light');
                    tdParity = true;
                }
            } else {
                row.addClass('tr-dark');
                trParity = true;

                if (tdParity) {
                    nameField.addClass('td-mid-dark');
                    foundedField.addClass('td-mid-dark');
                    countryField.addClass('td-dark');
                    tdParity = false;
                } else {
                    nameField.addClass('td-dark');
                    foundedField.addClass('td-dark');
                    countryField.addClass('td-mid-dark');
                    tdParity = true;
                }
            }

            //Append fields to the row.
            row.append(nameField);
            row.append(countryField);
            row.append(foundedField);

            table.append(row); //Append row to the table.
        });

        $("#content").append(table);
    });
}

function loadCars() {
    $.getJSON('cars', function(data) {
        let table = $('<table id="carTable"></table>');
        table.append('<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');
        $("content").append(table);

        let trParity = false;
        let tdParity = false;

        $.each(data, function(key, value) {
            let row = $('<tr></tr>');
            //Parsing JSON objects' fields.
            let nameField = $('<td>' + value.name +  '</td>');
            let consumptionField = $('<td>' + value.consumption +  '</td>');
            let colorField = $('<td>' + value.color +  '</td>');
            let manufacturerField = $('<td>' + value.manufacturer +  '</td>');
            let availableField = $('<td>' + value.available +  '</td>');
            let yearField = $('<td>' + value.year +  '</td>');
            let horsepowerField = $('<td>' + value.horsepower +  '</td>');

            if (trParity) {
                row.addClass('tr-light');
                trParity = false;

                if (tdParity) {
                    nameField.addClass('td-mid-light');
                    consumptionField.addClass('td-light');
                    colorField.addClass('td-mid-light');
                    manufacturerField.addClass('td-light');
                    availableField.addClass('td-mid-light');
                    yearField.addClass('td-light');
                    horsepowerField.addClass('td-mid-light');
                    tdParity = false;
                } else {
                    nameField.addClass('td-light');
                    consumptionField.addClass('td-mid-light');
                    colorField.addClass('td-light');
                    manufacturerField.addClass('td-mid-light');
                    availableField.addClass('td-light');
                    yearField.addClass('td-mid-light');
                    horsepowerField.addClass('td-light');
                    tdParity = true;
                }
            } else {
                row.addClass('tr-dark');
                trParity = true;

                if (tdParity) {
                    nameField.addClass('td-mid-dark');
                    consumptionField.addClass('td-dark');
                    colorField.addClass('td-mid-dark');
                    manufacturerField.addClass('td-dark');
                    availableField.addClass('td-mid-dark');
                    yearField.addClass('td-dark');
                    horsepowerField.addClass('td-mid-dark');
                    tdParity = false;
                } else {
                    nameField.addClass('td-dark');
                    consumptionField.addClass('td-mid-dark');
                    colorField.addClass('td-dark');
                    manufacturerField.addClass('td-mid-dark');
                    availableField.addClass('td-dark');
                    yearField.addClass('td-mid-dark');
                    horsepowerField.addClass('td-dark');
                    tdParity = true;
                }
            }

            //Append fields to the row.
            row.append(nameField);
            row.append(consumptionField);
            row.append(colorField);
            row.append(manufacturerField);
            row.append(availableField);
            row.append(yearField);
            row.append(horsepowerField);

            table.append(row); //Append row to the table.
        });

        let contentDiv = $("#content");

        contentDiv.empty();
        contentDiv.append(table);
    })
}

$(function() {
   $('#carForm').on('submit', function(e) {
       e.preventDefault();

       $.ajax({
           type: "post",
           url: "addCar",
           data: $('#carForm').serialize(),
           success: function(data) {
               loadCars();
           },
           error: function() {
               alert("Something went wrong.");
           }
       })
   })
});

$(function() {
   $('#manufacturersForm').on('submit', function(e) {
       e.preventDefault();

       $.ajax({
           type: "post",
           url: "addManufacturers",
           data: $('#manufacturersForm').serialize(),
           success: function(data) {
               loadManufacturers();
           },
           error: function() {
               alert("Something went wrong.");
           }
       })
   })
});

function manufacturerNames () {}

function manufacturer() {

}

function cars() {

}