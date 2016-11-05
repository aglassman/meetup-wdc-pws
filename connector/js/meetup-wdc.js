var authParams = {};

(function() {

    // Redirect Meetup.com OAuth2 Endpoint to sign in / obtain token.
    var redirect = function() {
        window.location.replace(
        "https://secure.meetup.com/oauth2/authorize"
            + "?client_id=re21rma04r9po83d2n9m9kpr8c"
            + "&response_type=token"
            + "&redirect_uri=https://tableau-meetup-wdc.cfapps.io/");
    }

    //Redirect returns token in the location hash.
    //Extract if it exists, redirect if it does not.
    if(window.location.hash) {

        window.location.hash
            .substr(1)
            .split("&")
            .forEach(function(item) {
                var res = item.split("=");
                authParams[res[0]] = res[1];
            });

        if(!authParams.access_token) {
            redirect();
        } else {
            console.log("Authorization Successful");
        }
    } else {
        redirect();
    }

    // Create the connector object
    var myConnector = tableau.makeConnector();

   // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        // Schema for magnitude and place data
        var venue_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "address_3",
            alias: "address_3",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "address_2",
            alias: "address_2",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "address_1",
            alias: "address_1",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "country",
            alias: "country",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "localized_country_name",
            alias: "localized_country_name",
            dataType: tableau.dataTypeEnum.string
        },  
        {
            id: "phone",
            alias: "phone",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "visibility",
            alias: "visibility",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "zip",
            alias: "zip",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lat",
            alias: "latitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "lon",
            alias: "longitude",
            dataType: tableau.dataTypeEnum.float
        }];

        var category_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "sort_name",
            alias: "sort_name",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "shortname",
            alias: "shortname",
            dataType: tableau.dataTypeEnum.string
        }];

        var venuesTable = {
            id: "venues",
            alias: "Meetup Venues",
            columns: venue_cols
        };

        var categoriesTable = {
            id: "categories",
            alias: "Meetup Categories",
            columns: category_cols
        };

        schemaCallback([venuesTable,categoriesTable]);
    };

    // Retrieve the data
    myConnector.getData = function(table, doneCallback) {

        var parameters = JSON.parse(tableau.connectionData);
        var tableData = [];
        var apiCall = "https://api.meetup.com/2/categories?&sign=true&photo-host=public&page=20";

        if(table.tableInfo.id == 'venues') {

        }

        if(table.tableInfo.id == 'categories') {

            $.ajax({
                  method: "GET",
                  dataType: "text",
                  url: apiCall,
                  headers: {
                    "Authorization":'Bearer: ' + authParams.access_token
                  },
                  success: function(resp){
                    var tableData = [];
                    var respObj = JSON.parse(resp);
                   
                    respObj['results'].forEach(function(item){
                        tableData.push({
                            "name": item,
                            "sort_name": item,
                            "id": item,
                            "shortname": item
                        });
                    });

                    table.appendRows(tableData);
                  }
            });
        }

        doneCallback();
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            var parameters = {
                apiToken: $('#apiToken').val().trim(),
                startDate: $('#start-date-one').val().trim(),
                endDate: $('#end-date-one').val().trim(),
            };

            // Simple date validation: Call the getDate function on the date object created
            function isValidDate(dateStr) {
                var d = new Date(dateStr);
                return !isNaN(d.getDate());
            }

            if (isValidDate(parameters.startDate) && isValidDate(parameters.endDate)) {
                tableau.connectionData = JSON.stringify(parameters); // Use this variable to pass data to your getSchema and getData functions
                tableau.connectionName = "Meetup.com Data"; // This will be the data source name in Tableau
                tableau.submit(); // This sends the connector object to Tableau
            } else {
                $('#errorMsg').html("Enter valid dates. For example, 2016-05-08.");
            }
        });
    });
})();
