(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {

        // To Complete (list of colums)
        var cols = [
            // {
            //     id: "id",
            //     alias: "alias",
            //     dataType: tableau.dataTypeEnum.string
            // }
        ];

        var tableSchema = {
            // To complete
            id: "",
            alias: "", // This is the name of the table
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        
        // To Complete (API Link)
        $.getJSON("", function(resp) {
            
            //console.log(resp)
            
            var tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                
                //console.log(resp[i])

                tableData.push({

                    // To complete (link between table data and API response)
                    "id": resp[i].id
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {

            // To complete
            tableau.connectionName = ""; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
