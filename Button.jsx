var React = require('react')

var Button = React.createClass({
    render: function () {
        return (<div>
                <a className="button" onClick={this.props.handleClick}>{this.props.name}</a>

        </div>)
    }
})

module.exports = Button