$( document ).ready(function() {
    var highlightColor = "#3498db";
    var baseColor = "#bdc3c7";

    var currentUser = $("#currentUsername").text();
    console.log("USER: " + currentUser);

    var $tvveetContainer = $("#tvveetContainer");
    var $userContainer = $("#userContainer");
    var $templateTvveet = $("#hidden-template-tvveet");
    var $templateUser = $("#hidden-template-user");


    $("#editContainer").hide();

    $("#tvveetSubmit").click(function(){
        var $tvveetContent = $("#tvveetContent").val();

        // Validation on Tvveet - make sure it's not empty
        if ($tvveetContent === ''){
            alert("Tvveet body is empty. Please enter a tvveet!");
        } else {
            // Create tvveet object
            var tvveet = {
                content: $tvveetContent,
                author: currentUser
            };

            console.log(currentUser);

            // Post tvveet object
            $.post('tvveets/post', tvveet, function(response, status){
                console.log(response);
                
                var $newTvveet = $templateTvveet.clone();
                $newTvveet.removeAttr('id');
                $newTvveet.find('.tvveetContent').html($tvveetContent);
                $newTvveet.find('.tvveetAuthor').html('-' + currentUser);
                $newTvveet.attr('data-author', currentUser);
                $newTvveet.attr('data-id', response.id);

                console.log($newTvveet);

                $tvveetContainer.prepend($newTvveet);

                $("#tvveetContent").val('');
            });
        } 
    });

    $("body").on('click', '.user', function() {
        $(".user").css('background-color',baseColor);
        $(this).css('background-color', highlightColor);
        $(".tvveet").css('background-color', baseColor);
        var $username = $(this).find(".username").attr("id");
        $('div[data-author="' + $username + '"]').css('background-color', highlightColor);
    });

    $("body").on('dblclick', '.tvveet', function() {
        var $author = $(this).attr('data-author');
        var $id = $(this).attr('data-id');

        var deleteQuery = {
            id: $id
        };

        if($author == currentUser){
            $.post('/tvveets/delete', deleteQuery, function(response, status) {
                console.log(response);
            });
            $(this).closest("div").remove();
        } else {
            alert("You must be logged in as " + $author + " to delete this tvveet.");
        }
        console.log($author);
    });
});
	