var React = require('react')
var {aspects, language} = require('../assets/surveyConfig.json')
var Button = require('./Button.jsx')
var RateTask = require('./RateTask.jsx')


var Rate = React.createClass({
    getInitialState: function() {
        return {
            firstIter: 0,
            secondIter: 0
        }
    },

    next: function() {
        console.log(aspects[this.state.firstIter].length)
        if (this.state.secondIter < aspects[this.state.firstIter].length) {
            console.log('if')
            this.setState({
                secondIter: this.state.secondIter + 1
            })
        }
        else {
            console.log('else')
            this.setState({
                firstIter: this.state.firstIter + 1,
                secondIter: 0
            })
        }
    },

    submit: function() {
        console.log("Finished.")
    },

    render: function () {
        console.log('aspects length: ' + aspects.length)
        console.log('first iter: ' + this.state.firstIter)

        if(this.state.firstIter === (aspects.length-1) && this.state.secondIter === (aspects[this.state.firstIter].length-1)){
            console.log('submit')
            var button = <Button name='Submit' handleClick={this.submit}/>
        }
        else{
            console.log('next')
            var button = <Button name='Next' handleClick={this.next}/>
        }


        return(
            <div>
            <p><b> {language.instructions.rating[0]} </b></p>
            <RateTask first={this.state.firstIter} second={this.state.secondIter}/>
            <div> {button} </div>
            </div>
        )
    }

})

module.exports = Rate