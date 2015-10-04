var $ = require('jquery');
var markdown = require('markdown').markdown;

var React = require('react');

var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Glyphicon = require('react-bootstrap').Glyphicon;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Panel = require('react-bootstrap').Panel;
var Tooltip = require('react-bootstrap').Tooltip;

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
                    <Panel>
                        <AddRequirementButton handleAdd={this.handleAdd} requirements={this.props.requirements} />
                    </Panel>
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
            <ModalTrigger modal={<RequirementEditorModal handleSave={this.handleAdd} requirements={this.props.requirements} />}>
                <Button bsStyle="primary" bsSize="large">Add Requirement</Button>
            </ModalTrigger>
        );
    }
});

var RequirementEditorModal = React.createClass({
    //handleSave: function() {
    //    return this.props.handleSave();
    //},
    handleSave: function() {
        var requirement = { summary: this.refs.summary.getValue() };
        this.props.handleSave(requirement);
        this.props.onRequestHide();
    },
    render: function() {
        return (
            <Modal {...this.props} title="Add Requirement" animation={false}>
                <div className="modal-body">
                    <Input type="textarea" ref="summary" />
                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <Button onClick={this.props.onRequestHide}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.handleSave}>Add Requirement</Button>
                    </ButtonToolbar>
                </div>
            </Modal>
        );
    }
});

var RequirementsList = React.createClass({
    render: function() {
        var requirements = this.props.requirements.map(function (requirement) {
            var RequirementFooter = React.createClass({
                render: function() {
                    return (
                        <ButtonToolbar>
                            <ButtonGroup>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                    <Button bsSize="small" disabled>
                                        <Glyphicon glyph="edit" />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                                    <Button bsSize="small" disabled>
                                        <Glyphicon glyph="remove" />
                                    </Button>
                                </OverlayTrigger>
                            </ButtonGroup>
                        </ButtonToolbar>
                    );
                }
            });

            return (
                <Panel footer={<RequirementFooter/>}>
                    <div dangerouslySetInnerHTML={{ __html: markdown.toHTML( requirement.summary ) }}></div>
                </Panel>
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
    document.getElementById("app")
);

/*
var App = React.createClass({
    render: function () {
        return (
            <div>Hello App!</div>
        );
    }
});

React.render(
    <App />,
    document.getElementById("app")
);
*/