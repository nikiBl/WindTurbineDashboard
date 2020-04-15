function getListOfFailures(){
    fetch('https://us-central1-my-iot-273820.cloudfunctions.net/getFailures')
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);    
        })
}


getListOfFailures();