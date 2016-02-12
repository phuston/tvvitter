$( document ).ready(function() {
    var currentUser = null;

    $("#logoutContainer").hide()

    var $tvveetContainer = $("#tvveetContainer")
    var $templateTvveet = $("#hidden-template-tvveet")
    var $templateUser = $("#hidden-template-user")


    $("#editContainer").hide()

    $("#tvveetSubmit").click(function(){
        var $tvveetContent = $("#tvveetContent").val();

        // Validation on Tvveet - make sure it's not empty
        if ($tvveetContent == ''){
            alert("Tvveet body is empty. Please enter a tvveet!")
            return
        }
        
        // Validation on Tvveet author login - make sure user is logged in
        if (currentUser){
            alert("Please log in before you post!");
            $("#tvveetContent").val('')
        } else {
            // Create tvveet object
            var tvveet = {
                content: $tvveetContent,
                author: "Patrick"
            }

            // Post tvveet object
            $.post('tvveets/post', tvveet, function(response, status){
                console.log(response)
                
                var $newTvveet = $templateTvveet.clone();
                $newTvveet.removeAttr('id');
                $newTvveet.find('.tvveetContent').html($tvveetContent);
                $newTvveet.find('.tvveetAuthor').html('-' + 'Patrick');

                console.log($newTvveet);

                $tvveetContainer.prepend($newTvveet);

                $("#tvveetContent").val('');
            })
        }
        
    })

    $("#loginSubmit").click(function() {
        $(".user").css('background-color', '#B3E5FC')

        var $username = $("#loginInput").val()

        if ($username == ''){
            alert("You must enter a username.")
        } else {
            var $user = $("#" + $username).html();
            console.log($user); 

            if($user){
                currentUser = $user;
                $("#currentUsername").html($user);
                $("#" + $username + "Container").css('background-color', 'red');
                console.log("User exists. 'logging in'.");
            } else {
                console.log("Creating a new user now");
            }


            $("#loginContainer").hide()
            $("#logoutContainer").show()
        }
    })
});
	