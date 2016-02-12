$( document ).ready(function() {
    var highlightColor = "#3498db";
    var baseColor = "#bdc3c7";

    var currentUser = null;

    $("#logoutContainer").hide()
    $("#composeContainer").hide()

    var $tvveetContainer = $("#tvveetContainer")
    var $userContainer = $("#userContainer")
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
        if (!currentUser){
            alert("Please log in before you post!");
            $("#tvveetContent").val('')
        } else {
            // Create tvveet object
            var tvveet = {
                content: $tvveetContent,
                author: currentUser
            }

            // Post tvveet object
            $.post('tvveets/post', tvveet, function(response, status){
                console.log(response)
                
                var $newTvveet = $templateTvveet.clone();
                $newTvveet.removeAttr('id');
                $newTvveet.find('.tvveetContent').html($tvveetContent);
                $newTvveet.find('.tvveetAuthor').html('-' + currentUser);
                $newTvveet.attr('data-author', currentUser)
                $newTvveet.attr('data-id', response.id)

                console.log($newTvveet);

                $tvveetContainer.prepend($newTvveet);

                $("#tvveetContent").val('');
            })
        }
        
    })

    $("#loginSubmit").click(function() {
        var $username = $("#loginInput").val()

        $("#loginInput").val("")

        $(".user").css('background-color', baseColor)


        if ($username == ''){
            alert("You must enter a username.")
        } else {
            var $user = $("#" + $username).html();

            if($user){
                currentUser = $user;
                $("#currentUsername").html($user);
                // $("#" + $username + "Container").css('background-color', 'red');
                console.log("User exists. 'logging in'.");
                $("#loginContainer").hide()
                $("#logoutContainer").show()
                $("#composeContainer").show()
            } else {

                var user = {
                    username: $username
                }

                console.log('Creating new user!')

                $.post('users/new', user, function(response, status){
                    console.log(response.success)

                    if (response.success) {
                        currentUser = $username

                        var $newUser = $templateUser.clone();
                        $newUser.attr("id", $username+"Container");
                        $newUser.find(".username").html($username);
                        $newUser.find(".username").attr("id", $username);

                        // $("#" + $username + "Container").css('background-color', 'red');
                        $("#currentUsername").html($username);

                        $userContainer.prepend($newUser)

                        $("#loginContainer").hide()
                        $("#logoutContainer").show()
                        $("#composeContainer").show()
                    }
                })
            }
        }
    })

    $("#logoutSubmit").click(function(){
        $(".user").css('background-color', '#B3E5FC')
        $("#loginContainer").show();
        $("#logoutContainer").hide();
        $("#composeContainer").hide()

        var currentUser = null;
    })

    $("body").on('click', '.user', function() {
        $(".user").css('background-color',baseColor)
        $(this).css('background-color', highlightColor)
        $(".tvveet").css('background-color', baseColor)
        var $username = $(this).find(".username").attr("id");
        $('div[data-author="' + $username + '"]').css('background-color', highlightColor);
    })

    $("body").on('dblclick', '.tvveet', function() {
        var $author = $(this).attr('data-author')
        var $id = $(this).attr('data-id')

        var deleteQuery = {
            id: $id
        }

        if($author == currentUser){
            $.post('/tvveets/delete', deleteQuery, function(response, status) {
                console.log(response)
            })
            $(this).closest("div").remove()
        } else {
            alert("You must be logged in as " + $author + " to delete this tvveet.")
        }
        console.log($author)
    })
});
	