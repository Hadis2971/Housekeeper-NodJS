let helpObj = {};

function checkIfEmptyAll(inputs){
    let counter = 0;
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ""){
            counter++;
        }
    }
    if(counter === inputs.length){
        return true;
    }else{
        return false;
    }
}

$(document).ready(function(){

    $("#address-form").on("submit", function(evt){
        if(checkIfEmptyAll($("input"))){
            alert("At Least One Field Must Be Entered!!!");
            return false;
        }else{
            evt.preventDefault();
            let contact = {name: $("#firstName").val(), last: $("#lastName").val(),
            home: $("#phoneNumber").val(), mobile: $("#moblieNumber").val(),
            address: $("#contactAddress").val(), email: $("#contactEmail").val()}

            $.ajax({
                type: "POST",
                url: "/address/addContact",
                data: contact,
                success: function(data){
                    location.reload();
                }
            });


        }
    });
    
    $("#close-modal").on("click", function(){
        $(".modal").css("display", "none");
    });

    $("tbody tr").on("click", function(){
        $(".modal").css("display", "block");

        let inputs = $(".modal-content input");

        let tds = ($(this).children());

        for(let i = 0; i < inputs.length; i++){
            inputs[i].value = tds[i].textContent;
        }

        helpObj = {name: tds[0].textContent, last : tds[1].textContent,
                  home: tds[2].textContent, mobile: tds[3].textContent,
                  address: tds[4].textContent, email: tds[5].textContent}

    });

    $("#change-btn").on("click", function(evt){
        
        let updatedContact = {name: $("#contactName").val(), last: $("#contactLast").val(),
        home: $("#homeNumber").val(), mobile: $("#mobileNumber").val(), address: $("#homeAddress").val(),
        email: $("#emailAddress").val()}

        let dataObj = {contact: updatedContact, help: helpObj}    
        dataObj = JSON.stringify(dataObj);
        console.log(dataObj);
        $.ajax({
            type: "PUT",
            url: "/address/addContact",
            data: dataObj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                $(".modal").css("display", "none");
                location.reload();
            }
        });

    });


    $("#delete-btn").on("click", function(){

        $.ajax({
            type: "DELETE",
            url: "/address/addContact",
            data: helpObj,
            success: function(data){
                $(".modal").css("display", "none");
                location.reload();
            }
        });
    });

});

const app = angular.module("myApp", []);
app.controller("appCtrl", function(){});
app.directive('filterList', function($timeout) {
return {
    link: function(scope, element, attrs) {

        var li = Array.prototype.slice.call(element[0].children);

        function filterBy(value) {
            li.forEach(function(el) {
                el.className = el.textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? '' : 'ng-hide';
            });
        }

        scope.$watch(attrs.filterList, function(newVal, oldVal) {
            if (newVal !== oldVal) {
                filterBy(newVal);
            }
        });
    }
};
});