$(document).ready(function() {
    var data = [];

    var RequirementsList = React.createClass({
        render: function() {
            var requirements = this.props.data.map(function (requirement) {
                return (
                    <ReactBootstrap.Panel>
                        <div dangerouslySetInnerHTML={{ __html: requirement.summary }}></div>
                    </ReactBootstrap.Panel>
                );
            });

            return (
                <div className="container">
                    {requirements}
                </div>
            );
        }
    });

    $('#summary').autosize();
    $('#tags').autosize();
   
    $('#new-requirement-form').submit(function ( event ) {
        console.log('Submitting new requirement');
        event.preventDefault();
        
        console.log( $('#summary').val() );

        data.push( { summary: markdown.toHTML( $('#summary').val() ) } );

        React.render( <RequirementsList data={data} />, document.getElementById('requirements-list') );
    });

    $('#summary').bind('keydown', 'ctrl+return', function () {
        $('#new-requirement-form').submit();
    });
    
});