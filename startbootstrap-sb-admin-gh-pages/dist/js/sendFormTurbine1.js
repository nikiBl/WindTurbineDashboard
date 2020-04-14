const sendData = () => {
    console.log("sending data22");
    // document.getElementById("radio").value = true then add green or red
    // if the status is not yellow then make the change status button untouchable?
    var fetchurl = '';
    console.log(document.getElementById("textboxreport").value);
    if(document.getElementById("ok").checked == true){
        console.log("radio is true");
        fetchurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/updateTurbineStatus?id=1&st=green';

    }
    else if(document.getElementById("notok").checked == true){
        fetchurl = 'https://us-central1-my-iot-273820.cloudfunctions.net/updateTurbineStatus?id=1&st=red';
        
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
// sendData();