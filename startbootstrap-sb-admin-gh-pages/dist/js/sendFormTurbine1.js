const sendData = () => {
    // document.getElementById("radio").value = true then add green or red
    // if the status is not yellow then make the change status button untouchable?
    var fetchurl = '';
    console.log(document.getElementById("textboxreport").value);
    if(document.getElementById("ok").checked == true){
        fetchurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/updateTurbineStatus?id=1&st=green';
        
    }
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
};

console.log("testest");
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