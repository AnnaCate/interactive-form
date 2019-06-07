/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// set focus to the first text field on page load
$("#name").focus();

// JOB SECTION

// hide 'other' job role text field unless "Other" is selected
$("#other-title").hide();
// adapted from: https://stackoverflow.com/questions/1535520/jquery-event-when-select-option
$('#title').change(function() {
    if ($(this).val() === 'other') {
        $("#other-title").show();
    } else {
        $("#other-title").hide();
    }
});

// T-SHIRT SECTION
// hide the "Select Theme" `option` element in the "Design" menu
$("#design option:first").hide();

// update the “Color” field to read “Please select a T-shirt theme”.
const $colorDefault = $('<option>Please select a T-shirt theme.</option>');
$($colorDefault).attr('selected', 'selected');
$('#color').prepend($colorDefault);
$('#color option').each(function(){
    if ($(this).text() !== "Please select a T-shirt theme.") {
        $(this).hide();
    }
});

$("#design").change(function() {
    // Hide the "Please select a design" option from the color dropdown
    $("#color option:first").hide();

    // show "js puns" colors when "js puns" design is selected
    if ($(this).val() === "js puns") {
        $('#color option').each(function(){
            if ($(this).val() === "cornflowerblue" || 
                    $(this).val() === "darkslategrey" || 
                    $(this).val() === "gold") {
                $(this).show();
            } else {
                $(this).hide().attr('selected', false);
            }
        });
        $("#color option:eq(1)").attr('selected', true);

    // show "heart js" colors when "heart js" design is selected
    } else if ($(this).val() === "heart js") {
        $('#color option').each(function(){
            if ($(this).val() === "tomato" || 
                    $(this).val() === "steelblue" || 
                    $(this).val() === "dimgrey") {
                        $(this).show();
            } else {
                $(this).hide().attr('selected', false);
            }
        });
        $("#color option:eq(4)").attr('selected', true);
    }
});

// ACTIVITIES SECTION
/*
Some events are at the same day and time as others. If the user selects a workshop, 
don't allow selection of a workshop at the same day and time -- you should disable the 
checkbox and visually indicate that the workshop in the competing time slot isn't 
available. When a user unchecks an activity, make sure that competing activities (if 
there are any) are no longer disabled. As a user selects activities, a running total 
should display below the list of checkboxes. For example, if the user selects 
"Main Conference", then Total: $200 should appear. If they add 1 workshop, the total 
should change to Total: $300.

Reference each checkbox input, as well as the cost, and day and time from each input’s 
parent `label` element, and store those values in variables, or in an object as key 
value pairs.  Then, in an event handler that listens for ‘changes’ to the activity 
section, you could use a set of conditionals to disable conflicting activities, and 
add or subtract from the totalcost element you create, depending on whether the 
checkbox was checked or unchecked. But a preferred approach would be to come up with a 
dynamic solution that will work even if the cost, day or time of the activities were 
changed in the HTML. To do that, we'll:
● create an element to display the total activity cost,
● listen for changes in the Activity section,
● update and display the total activity cost,
● and disable conflicting activities.
*/
let $costEl = $('<label>Total: $</label>');
$('.activities').append($costEl);
$($costEl).hide();
let totalCost = 0;

let $activityCost;

$('.activities').change(function(event){
    // input element that was clicked
    let $el = $(event.target);
    // text content of input element's parent element
    let $text = $($el).parent().text();
    // The index of the dollar sign ‘$’ in the label text from the variable that you declared above.
    let $dollarIndex = $($costEl).text().indexOf('$')
    // the dollar value of the event clicked
    let $cost = parseFloat($($el).parent().text().slice(-3));

    // calculate total cost
    if ($($el).is(':checked')) {
        totalCost += $cost;
    } else {
        totalCost -= $cost;
    }

    // calculate total
    $($costEl).text('Total: $' + totalCost);

    // get day
    $activityDay = $('.activities input:checked').parent().text().split('— ', 2).pop().split(' ', 1).pop();
    // get time of day
    $activityTime = $('.activities input:checked').parent().text().split(',', 1).pop().split(' ').pop().slice(1,3);

    // display totalCost
    $costEl = $('<p id="total-cost-label">Total: $<span id="cost">' + totalCost + '</span></p>')
    $($costEl).show();
});