var React = require('react')
var {aspects} = require('../assets/surveyConfig.json')
var RatingSlider = require('../visuals/RatingSlider.jsx')

var RateTask = React.createClass({
        getInitialState: function() {
            return {
                iter: 0
            }
        },

        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },


        render: function () {
            return(
                <div>
                <p> {this.capitalize(aspects[this.props.first][this.props.second].text)} </p>
                <RatingSlider min='0' max='100'/>
                </div>
            )
        }

})

module.exports = RateTask