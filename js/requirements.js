$(document).ready(function() {

    var RequirementsCollection = [
        { summary: "First Header\n===\n\n* One\n* Two\n* Three" },
        { summary: "Second Header\n===\n\n* Four\n* Five\n* Six" }
    ];

    var RequirementsApp = React.createClass({
        handleAdd: function(requirement) {
            RequirementsCollection.push(requirement);
            this.setProps(RequirementsCollection);
        },
        render: function() {
            return (
                <div className="main-container">
                    <div className="container">
                        <ReactBootstrap.Panel>
                            <AddRequirementButton handleAdd={this.handleAdd} requirements={this.props.requirements} />
                        </ReactBootstrap.Panel>
                    </div>
                    <RequirementsList requirements={this.props.requirements} />
                </div>
            );
        }
    });

    var AddRequirementButton = React.createClass({
        handleAdd: function(requirement) {
            this.props.handleAdd(requirement);
        },
        render: function() {
            return (
                <ReactBootstrap.ModalTrigger modal={<RequirementEditorModal handleSave={this.handleAdd} requirements={this.props.requirements} />}>
                    <ReactBootstrap.Button bsStyle="primary" bsSize="large">Add Requirement</ReactBootstrap.Button>
                </ReactBootstrap.ModalTrigger>
            );
        }
    });

    var RequirementEditorModal = React.createClass({
        handleSave: function() {
            return this.props.handleSave();
        },
        handleSave: function() {
            var requirement = { summary: this.refs.summary.getValue() };
            this.props.handleSave(requirement);
            this.props.onRequestHide();
        },
        render: function() {
            return (
                <ReactBootstrap.Modal {...this.props} title="Add Requirement" animation={false}>
                    <div className="modal-body">
                        <ReactBootstrap.Input type="textarea" ref="summary" />
                    </div>
                    <div className="modal-footer">
                        <ReactBootstrap.ButtonToolbar>
                            <ReactBootstrap.Button onClick={this.props.onRequestHide}>Cancel</ReactBootstrap.Button>
                            <ReactBootstrap.Button bsStyle="primary" onClick={this.handleSave}>Add Requirement</ReactBootstrap.Button>
                        </ReactBootstrap.ButtonToolbar>
                    </div>
                </ReactBootstrap.Modal>
            );
        }
    });

    var RequirementsList = React.createClass({
        render: function() {
            var requirements = this.props.requirements.map(function (requirement) {
                var RequirementFooter = React.createClass({
                    render: function() {
                        return (
                            <ReactBootstrap.ButtonToolbar>
                                <ReactBootstrap.ButtonGroup>
                                    <ReactBootstrap.OverlayTrigger placement="bottom" overlay={<ReactBootstrap.Tooltip>Edit</ReactBootstrap.Tooltip>}>
                                        <ReactBootstrap.Button bsSize="small" disabled>
                                            <ReactBootstrap.Glyphicon glyph="edit" />
                                        </ReactBootstrap.Button>
                                    </ReactBootstrap.OverlayTrigger>
                                    <ReactBootstrap.OverlayTrigger placement="bottom" overlay={<ReactBootstrap.Tooltip>Delete</ReactBootstrap.Tooltip>}>
                                        <ReactBootstrap.Button bsSize="small" disabled>
                                            <ReactBootstrap.Glyphicon glyph="remove" />
                                        </ReactBootstrap.Button>
                                    </ReactBootstrap.OverlayTrigger>
                                </ReactBootstrap.ButtonGroup>
                            </ReactBootstrap.ButtonToolbar>
                        );
                    }
                });

                return (
                    <ReactBootstrap.Panel footer={<RequirementFooter/>}>
                        <div dangerouslySetInnerHTML={{ __html: markdown.toHTML( requirement.summary ) }}></div>
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

    React.render(
        <RequirementsApp requirements={RequirementsCollection} />,
        document.getElementById("requirements-app")
    );

});