const getData = () => {
    console.log("get data");
    fetch('https://us-central1-my-iot-273820.cloudfunctions.net/getTemps-5')
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            // arr[0] is the latest element
            console.log(responseData[0].temp_value);
            document.getElementById('current-temp1').innerHTML = "Current temperature: "+responseData[0].temp_value;
            thresholdCheck(responseData[0].temp_value, responseData[0].id);
        })
        // enable to constantly fetch
        .then(a => {
            setTimeout(getData, 3000);
        })
};

function thresholdCheck(temp, id){
    console.log("hello world");
    var floatNum = parseFloat(temp);
    fetch('https://us-central1-my-iot-273820.cloudfunctions.net/getTurbines')
    .then(response => {
        return response.json();
    })
    // .then(a => {
    //     document.getElementById('current-temp1').innerHTML = "Current temperature: "+floatNum;
    //     return a;
    // })
    .then(responseData => {
        for(var i = 0; i < responseData.length; i++) {
            var obj = responseData[i];
            console.log("hi "+obj.id);
            console.log(document.getElementById("card-container1").className == "card bg-success text-white mb-4");
            if(obj.id == 1 && document.getElementById("card-container1").className == "card bg-success text-white mb-4"
                && floatNum >= 10){
                    document.getElementById("card-container1").className = "card bg-warning text-white mb-4";
                    alert("Threshold reached for turbine 1");
            }
        }

    })
}


function setColour(){
    // fetch some data
    // check for colour, set colour
    console.log("setting colour");
    fetch('https://us-central1-my-iot-273820.cloudfunctions.net/getTurbines')
    .then(response => {
        return response.json();
    })
    .then(responseData => {
        // arr[0] is the latest element
        console.log(responseData[0].temp_value);
        for(var i = 0; i < responseData.length; i++) {
            var obj = responseData[i];
            console.log(obj);
            if(obj.id == 1){
                console.log(obj.turbine_status);
                if(obj.turbine_status == "green"){
                    document.getElementById("card-container1").className = "card bg-success text-white mb-4";
                }
                if(obj.turbine_status == "orange"){
                    document.getElementById("card-container1").className = "card bg-warning text-white mb-4";
                }
                if(obj.turbine_status == "red"){
                    document.getElementById("card-container1").className = "card bg-danger text-white mb-4";
                }

            }
        }
    })
}


setColour();
getData();