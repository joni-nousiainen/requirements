$(document).ready(function() {
    var data = [
        { summary: "First Header\n===\n\n* One\n* Two\n* Three" },
        { summary: "Second Header\n===\n\n* Four\n* Five\n* Six" }
    ];

    var RequirementsApp = React.createClass({
        render: function() {
            return (
                <div className="container">
                    <h1>Requirements App</h1>
                    <div className="row">
                        <div className="col-md-12">
                            <AddRequirementButton />
                        </div>
                    </div>
                </div>
            );
        }
    });

    var AddRequirementButton = React.createClass({
        render: function() {
            return (
                <ReactBootstrap.ModalTrigger modal={<RequirementEditorModal />}>
                    <ReactBootstrap.Button bsStyle="primary" bsSize="large">Add Requirement</ReactBootstrap.Button>
                </ReactBootstrap.ModalTrigger>
            );
        }
    });

    var RequirementEditorModal = React.createClass({
        addRequirement: function() {
            alert("DERP!")
        },
        render: function() {
            return (
                <ReactBootstrap.Modal {...this.props} title="Add Requirement" animation={false} closeButton={false}>
                    <div className="modal-body">
                        <RequirementEditor />
                    </div>
                    <div className="modal-footer">
                        <ReactBootstrap.ButtonToolbar>
                            <ReactBootstrap.Button onClick={this.props.onRequestHide}>Cancel</ReactBootstrap.Button>
                            <ReactBootstrap.Button bsStyle="primary" onClick={this.addRequirement}>Add Requirement</ReactBootstrap.Button>
                        </ReactBootstrap.ButtonToolbar>
                    </div>
                </ReactBootstrap.Modal>
            );
        }
    });

    var RequirementEditor = React.createClass({
        render: function() {
            return (
                <form>
                    <ReactBootstrap.Input type="textarea" />
                </form>
            );
        }
    });
/*
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
*/

    React.render( <RequirementsApp />, document.getElementById("requirements-app") );
/*
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
*/
});