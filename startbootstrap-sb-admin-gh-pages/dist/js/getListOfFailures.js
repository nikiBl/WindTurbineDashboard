function getListOfFailures(){
    console.log("getting failures");
    fetch('https://us-central1-my-iot-273820.cloudfunctions.net/getFailures')
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
            // loop through each json object then insert row
            for(i = 0; i < responseData.length; i++){
                let tableRef = document.getElementById("failuretable");
                let newRow = tableRef.insertRow();
                let newCell = newRow.insertCell();
                let newText = document.createTextNode(responseData[i].initial_time_of_failure);
                newCell.appendChild(newText);

                let newCell1 = newRow.insertCell();
                let newText1 = document.createTextNode(responseData[i].end_time_of_failure);
                newCell1.appendChild(newText1);

                let newCell2 = newRow.insertCell();
                let newText2 = document.createTextNode(responseData[i].failure_desc);
                newCell2.appendChild(newText2);

            }

            
        })
}


getListOfFailures();