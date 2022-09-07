(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "Name",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "hero",
            alias: "All heroes",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json", function(resp) {
            var feat = resp,
                tableData = [];
            console.log(feat)
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                console.log(feat[i])

                tableData.push({
                    "id": feat[i].id,
                    "name": feat[i].name,
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
            tableau.connectionName = "Heroes"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
