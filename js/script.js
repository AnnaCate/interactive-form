/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// set focus to the first text field on page load
$("#name").focus();

// JOB SECTION

// hide 'other' job role text field unless "Other" is selected
$("#other-title").hide();
$('#title').change(function(){
    $(this).val() === 'other' ? $("#other-title").show() : $("#other-title").hide();
});

// T-SHIRT SECTION
// hide the "Select Theme" `option` element in the "Design" menu
$("#design option:first").hide();

// DEPRECATED:
// update the “Color” field to read “Please select a T-shirt theme”.
// const $colorDefault = $('<option>Please select a T-shirt theme.</option>');
// $($colorDefault).attr('selected', 'selected');
// $('#color').prepend($colorDefault);
// $('#color option').each(function(){
//     // if ($(this).text() !== "Please select a T-shirt theme.") {
//     //     $(this).hide();
//     // }
// });

// hide Color menu until design is selected
$('#colors-js-puns').hide();

$("#design").change(function(){
    // Hide the "Please select a design" option from the color dropdown
    $("#color option:first").hide();

    // unhide color menu
    $('#colors-js-puns').show();

    // show "js puns" colors when "js puns" design is selected
    if ($(this).val() === "js puns") {
        $('#color option').each(function(){
            $(this).text().includes("JS Puns") ? $(this).show() : $(this).hide().attr('selected', false);
        });
        $("#color option:first").attr('selected', true);

    // show "heart js" colors when "heart js" design is selected
    } else if ($(this).val() === "heart js") {
        $('#color option').each(function(){
            $(this).text().includes("JS shirt") ? $(this).show() : $(this).hide().attr('selected', false);
        });
        $("#color option:eq(3)").attr('selected', true);
    }
});

// ACTIVITIES SECTION
// create variables
let $costEl = $('<label>Total: $</label>').hide();
let totalCost = 0;
let $el;
let $text;
let $dollarIndex;
let cost;
let emDashIndex;
let commaIndex;
let activityDayAndTime;
const $activityInputs = $('.activities input');

// append $costEl to the DOM
$('.activities').append($costEl);

// create change fn for activities section
$('.activities').change(function(e){
    // input element that was clicked
    $el = $(e.target);
    // text content of input element's parent element
    $text = $($el).parent().text();
    // clear error message, if applicable
    $('#errActivities').hide();

    // COST
        // the dollar value of the event clicked
        cost = parseFloat($text.slice(-3));
        // calculate total cost
        $($el).is(':checked') ? totalCost += cost : totalCost -= cost;
        // update text with new total
        $($costEl).text('Total: $' + totalCost);
        // display cost if any input elements are checked
        $('.activities input:checked').length > 0 ? $($costEl).show() : $($costEl).hide();

    // CONFLICTING ACTIVITIES
        // Get the index of the em dash ‘—’ in the label text
        emDashIndex = $text.indexOf('—');
        // Get the index of the comma ‘,’ in the label text
        commaIndex = $text.indexOf(',');
        // Get the day and time text of the activity the was just clicked
        activityDayAndTime = $text.slice(emDashIndex + 1, commaIndex);

        // Loop over activities to change 'disabled' property of each element depending on what was clicked
        $($activityInputs).each(function(){
            if ($(this).parent().text().includes(activityDayAndTime)
                && $(this).parent().text() !== $text) {
                    $($el).is(':checked') ? $(this).attr('disabled', true) : $(this).attr('disabled', false);
                }
        });
});

// PAYMENT SECTION
// hide the "Select Payment Method" `option` element in the "#payment" menu
$("#payment option:first").hide();
// by default, select Credit Card as payment method
$("#payment option:eq(1)").attr('selected', true);
// hide the PayPal section
$('#credit-card').next().hide();
// hide the Bitcoin section
$('#credit-card').next().next().hide();

// if PayPal or Bitcoin is selected, hide/unhide accordingly
$('#payment').change(function(){
    if ($(this).val() === 'paypal') {
        // unhide 'paypal' section
        $('#credit-card').next().show();
        // hide the credit card section & errors indicators
        $('#credit-card').hide();
        resetCC();
        // hide the bitcoin section
        $('#credit-card').next().next().hide();
    } else if (($(this).val() === 'bitcoin')) {
        // unhide 'bitcoin' section
        $('#credit-card').next().next().show();
        // hide the credit card section & errors indicators
        $('#credit-card').hide();
        resetCC();
        // hide 'paypal' section
        $('#credit-card').next().hide();
    } else if (($(this).val() === 'credit card')) {
        // unhide 'credit card' section
        $('#credit-card').show();
        // hide the paypal section
        $('#credit-card').next().hide();        
        // hide 'bitcoin' section
        $('#credit-card').next().next().hide();
    }
});

// fn to reset the error indicator and styling from credit card section
const resetCC = () => {
    $('#errCC').hide();
    $('#cc-num').css('border', '').val('');
    $('#errZip').hide();
    $('#zip').css('border', '').val('');;
    $('#errCVV').hide();
    $('#cvv').css('border', '').val('');;
}

// FORM VALIDATION
// name
    const $errName = $('<p><strong>Name is required.</strong></p>')
        .attr('id', 'errName')
        .addClass('error')
        .hide()
        .insertBefore('#name');

    function validateName() {
        if ($('#name').val() === '') {
            $('#name').css('border', '1px solid red');
            $('#errName').show();
            return false;
        } else {
            $('#name').css('border', '');
            $('#errName').hide();
            return true;
        }
    }

// email
    const $errEmail = $('<p><strong>Please enter a valid email address.</strong></p>')
        .attr('id', 'errEmail')
        .addClass('error')
        .hide()
        .insertBefore('#mail');

    function validateEmail() {
        // pattern sourced from: https://stackoverflow.com/questions/2855865/validating-email-addresses-using-jquery-and-regex
        const pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (pattern.test($('#mail').val())) {
            $('#mail').css('border', '');
            $('#errEmail').hide();
            return true;
        } else {
            $('#mail').css('border', '1px solid red');
            $('#errEmail').show();
            return false;
        };
    }   

    // real-time validation
    $('#mail').focusout(function(){
        if ($('#mail').val() !== "") {
            validateEmail()
        } else {
            $('#mail').css('border', '');
            $('#errEmail').hide();
        };
    })

// activity section
    const $errActivities = $('<p><strong>Please select at least one activity.</strong></p>')
        .attr('id', 'errActivities')
        .addClass('error')
        .hide()
        .insertAfter('.activities legend');

    function validateActivities() {
        if ($('.activities input:checked').length > 0) {
            $('#errActivities').hide();
            return true;
        } else {
            $('#errActivities').show();
            return false;
        };
    }

// credit card number
    const $errCC = $('<p><strong>Please enter a valid credit card number.</strong></p>')
        .attr('id', 'errCC')
        .addClass('error')
        .hide()
        .insertAfter('#payment');

    function validateCreditCardNum() {
        if ($('#payment').val() === 'credit card') {  
            if (/^\d{13,16}$/.test($('#cc-num').val())) {  
                $('#errCC').hide();
                $('#cc-num').css('border', '');
                return true;
            } else {
                if (($('#cc-num').val().length <= 12 || $('#cc-num').val().length >= 17) && $.isNumeric($("#cc-num").val())) {
                    $('#errCC').text('Please enter a number that is between 13 and 16 digits long.')
                } else {
                    $('#errCC').text('Please enter a valid credit card number.')
                }
                $('#errCC').show();
                $('#cc-num').css('border', '1px solid red');
                return false;
            };
        } else {
            return true;
        }
    }

    // real-time validation
    $('#cc-num').focusout(function(){
        if ($('#cc-num').val() !== '') {
            validateCreditCardNum();
        } else {
            $('#errCC').hide();
            $('#cc-num').css('border', '');
        }
    })

// zip code
    const $errZip = $('<p><strong>Please enter a valid Zip Code.</strong></p>')
        .attr('id', 'errZip')
        .addClass('error')
        .hide()
        .insertAfter('#errCC');

    function validateZipCode() {
        if ($('#payment').val() === 'credit card') {    
            if (/^\d{5}$/.test($('#zip').val())) {
                $('#errZip').hide();
                $('#zip').css('border', '');
                return true;
            } else {
                $('#errZip').show();
                $('#zip').css('border', '1px solid red');
                return false;
            };
        } else {
            return true;
        }
    }

    // real-time validation
    $('#zip').focusout(function(){
        if ($('#zip').val() !== '') {
            validateZipCode();
        } else {
            $('#errZip').hide();
            $('#zip').css('border', '');
        }
    })

// cvv
    const $errCVV = $('<p><strong>Please enter a valid CVV.</strong></p>')
        .attr('id', 'errCVV')
        .addClass('error')
        .hide()
        .insertAfter('#errZip');

    function validateCVV() {
        if ($('#payment').val() === 'credit card') { 
            if (/^\d{3}$/.test($('#cvv').val())) {
                $('#errCVV').hide();
                $('#cvv').css('border', '');
                return true;
            } else {
                $('#errCVV').show();
                $('#cvv').css('border', '1px solid red');
                return false;
            };
        } else {
            return true;
        }
    }

    // real-time validation
    $('#cvv').focusout(function(){
        if ($('#cvv').val() !== '') {
        validateCVV();
        } else {
            $('#errCVV').hide();
            $('#cvv').css('border', '');
    }
    })


// master validation fn
const validateAll = () => {
    if (validateName() && validateEmail() && validateActivities() && validateCreditCardNum() &&
        validateZipCode() && validateCVV()) {
            return true;
    } else {
        validateName();
        validateEmail();
        validateActivities();
        validateCreditCardNum();
        validateZipCode();
        validateCVV();
        return false;
    }
}

// add event listener to submit button
$('button').on('click', function(e){
    e.preventDefault();
    const validation = validateAll();
    if (!validation) {
        validateAll();
        return false;
    } else {
        $('form').submit();
    }
});
