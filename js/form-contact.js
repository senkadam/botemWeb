// JavaScript contact form Document
$(document).ready(function () {
    $('form#contact-form').submit(function () {
        $form = $(this); //wrap this in jQuery

        $('form#contact-form .error').remove();
        var hasError = false;
        $('.requiredField').each(function () {
            if (jQuery.trim($(this).val()) == '') {
                var labelText = $(this).prev('label').text();
                $(this).parent().append('<span class="error">This field is required</span>');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    var labelText = $(this).prev('label').text();
                    $(this).parent().append('<span class="error">You entered an invalid e-mail</span>');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });
        if (!hasError) {
            $('form#contact-form input.submit').fadeOut('normal', function () {
                $(this).parent().append('');
            });

            $("#loader").show();
            var url = 'https://script.google.com/macros/s/MjngczPExI36UOocnhID6fC9nYsBIys53/exec'
            var xhr = new XMLHttpRequest();
            var data = {
                email: $('#email').val(),
                name: $('#name').val(),
                message:($('#message').val()),
                prefix: 'formIsReady'
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&');
            xhr.open('GET', url+'?'+encoded);
            // xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload  = function() {
                console.log( xhr.status, xhr.statusText )
                console.log(xhr.responseText);
                $('form#contact-form').slideUp("fast", function () {
                    $(this).before('<div class="success"><p><b>Thank you. We will confirm your booking via email.</b></p><p>Please be sure to let us know if you (or anyone from your group) has a dietary restriction (e.g. vegetarian, abstinent, celiac, allergy, etc.) before you purchase your tickets. Thanks a lot.</p></div>');
                    $("#loader").hide();
                });
                return;
            };

            console.log(encoded);
            xhr.send(null);


            return false;
        }

        return false;

    });
});