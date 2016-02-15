$( document ).ready(function() {
    $("#loginSubmit").click(function(){
        var $username = $("#usernameInput").val();
        console.log($username)

        loginUser = {
            username: $username
        }

        $.post('/login', loginUser, function(data, status){
            console.log(data);
            if(data.success) {
                console.log("Success");
                window.location.replace('/');
            }
        })
    })
});
	