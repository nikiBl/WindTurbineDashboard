document.getElementsById('statusbutton').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('statusbutton').innerHTML = "new text";
});
