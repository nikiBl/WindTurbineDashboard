const sendData = () => {
    // document.getElementById("radio").value = true then add green or red
    // if the status is not yellow then make the change status button untouchable?
    var fetchurl = '';
    var currentColour = '';
    fetch('https://us-central1-my-iot-273820.cloudfunctions.net/getTurbines')
    .then(response => {
        return response.json();
    })
    .then(responseData => {
        for(var i = 0; i < responseData.length; i++) {
            var obj = responseData[i];
            if(obj.id == 1){
                console.log("obj status " + obj.turbine_status);
                currentColour = obj.turbine_status;
            }
        }
    })
    .then(res => {
        console.log(currentColour + " is current colour");
        console.log(res);
        // console.log(document.getElementById("textboxreport").value);
        // red to green
        if(document.getElementById("ok").checked == true && currentColour == 'red'){
            fetchurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/updateTurbineStatus?id=1&st=green';
            var failureurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/updateFailureEndTime?id=1&';
            failureurl = failureurl + '&etime=' + document.getElementById("etime").value + '&desc=' + document.getElementById('textboxreport').value;
            console.log(failureurl);
            fetch(failureurl);
        }
        // orange to green
        else if(document.getElementById("ok").checked == true && currentColour == 'orange'){
            console.log("orange to green change");
            fetchurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/updateTurbineStatus?id=1&st=green';
        }
        // orange to red
        else if(document.getElementById("notok").checked == true){
            fetchurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/updateTurbineStatus?id=1&st=red';
            var failureurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/insertFailure?';
            failureurl = failureurl + 'itime=' + document.getElementById("itime").value + '&etime=' + document.getElementById("etime").value + '&desc=' + document.getElementById('textboxreport').value + '&id=1';
            console.log(failureurl);
            fetch(failureurl);
        }
        fetch(fetchurl)
            .then(response => {
                return response.json();
            })
    })
};

console.log("testest");
console.log("hihi");
document.getElementById("submitbutton").addEventListener('click', function(){
    console.log("clicked button");
    sendData();
});
document.getElementById('submitbutton').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'none';
    
});
/*
// sendData();
// https://us-central1-my-iot-273820.cloudfunctions.net/insertFailure?itime=1pm&etime=2pm&desc=Something broke oop &id=1
// https://us-central1-my-iot-273820.cloudfunctions.net/insertFailure?itime=01/01/202011:40:00&etime=20/01/202012:40:00&desc=test%20test&id=1
// {"id":4,"id_turbine":1,"initial_time_of_failure":"2020-01-01T11:40:00.000Z","end_time_of_failure":"2020-01-20T12:40:00.000Z","failure_desc":"test test"}
// id, id_turbine, initial time of failure, end time of failure, failure desc

https://us-central1-my-iot-273820.cloudfunctions.net/insertFailure?
itime=01/01/202011:40:00&
etime=20/01/202012:40:00&
desc=test%20test&id=1
*/