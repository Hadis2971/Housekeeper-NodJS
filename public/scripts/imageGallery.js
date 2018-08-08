$(document).ready(function(){

    $("img").on("click", function(){
        $(".modal").css("display", "block");
        $(".modal-img").attr("src", $(this).attr("src"));
        console.log("Hello World");
    });

    $("#close-modal").on("click", function(){
        $(".modal").css("display", "none");
    });

});