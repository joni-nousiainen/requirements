$(document).ready(function() {

    $('#summary').autosize();
    $('#tags').autosize();
   
    $('#new-requirement-form').submit(function ( event ) {
        console.log('Submitting new requirement');
        event.preventDefault();
        
        console.log( $('#summary').val() );
        
        $('#requirements').append('<p>' + markdown.toHTML( $('#summary').val() ) + '</p>');
    });

    $('#summary').bind('keydown', 'ctrl+return', function () {
        $('#new-requirement-form').submit();
    });
    
});