var $ = require('jquery');
var markdown = require('markdown').markdown;
var md5 = require('md5');

var React = require('react');

var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Panel = require('react-bootstrap').Panel;
var Tooltip = require('react-bootstrap').Tooltip;

var RequirementsCollection = [
    { summary: "First Header\n===\n\n* One\n* Two\n* Three" },
    { summary: "Second Header\n===\n\n* Four\n* Five\n* Six" }
];

var App = React.createClass({
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
    getInitialState() {
        return { showModal: false };
    },

    open() {
        this.setState({ showModal: true });
    },

    close() {
        this.setState({ showModal: false });
    },

    handleAdd: function(requirement) {
        var requirement = { summary: this.refs.summary.getValue() };
        this.props.handleAdd(requirement);
        this.close()
    },

    render: function() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.open}>Add Requirement</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Requirement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input type="textarea" ref="summary" />
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button onClick={this.close}>Cancel</Button>
                            <Button bsStyle="primary" onClick={this.handleAdd}>Add Requirement</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </div>
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
                <Panel key={md5(requirement.summary)} footer={<RequirementFooter/>}>
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
    <App requirements={RequirementsCollection} />,
    document.getElementById("app")
);