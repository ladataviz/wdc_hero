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
        },  {
            id: "publisher",
            alias: "Publisher",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "intelligence",
            alias: "Intelligence",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "strength",
            alias: "Strength",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "speed",
            alias: "Speed",
            dataType: tableau.dataTypeEnum.int
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
            
            console.log(resp)
            
            var tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                
                console.log(resp[i])

                tableData.push({
                    "id": resp[i].id,
                    "name": resp[i].name,
                    "publisher": resp[i].biography.publisher,
                    'intelligence': resp[i].powerstats.intelligence,
                    'strength': resp[i].powerstats.strength,
                    'speed': resp[i].powerstats.speed,
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
