$(document).ready(function() {

    $('#summary').autosize();
    $('#tags').autosize();
   
    $('#new-requirement-form').submit(function ( event ) {
        console.log('Submitting new requirement');
        event.preventDefault();
        
        console.log( $('#summary').val() );
        
        $('#requirements').append('<div class="panel panel-default"><div class="panel-body">' + markdown.toHTML( $('#summary').val() ) + '</div></div>');
    });

    $('#summary').bind('keydown', 'ctrl+return', function () {
        $('#new-requirement-form').submit();
    });
    
});