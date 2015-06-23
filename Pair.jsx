var React = require('react')
var {aspects, language, tasks} = require('../assets/surveyConfig.json')
var PairwiseSlider = require('../visuals/PairwiseSlider.jsx')
var Button = require('./Button.jsx')

//Tradeoff tree listed from left to right in level-order fashion
var tree = new Array([4, 4], [1, 4], [4, 1], [1, 8], [2, 4], [4, 2], [8, 1])

var Pair = React.createClass({
    getInitialState: function () {
        return {
            treeIter: 0,
            iter: 0,
            pairOne: tasks[0].aspects[0],
            pairTwo: tasks[0].aspects[1]
        }
    },

    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    //If Prefer 1 is selected, traverse down left subtree
    firstOption: function () {
        if ((this.state.treeIter * 2 +1) < tree.length) {
            this.setState({
                treeIter: ((this.state.treeIter * 2) + 1)
            })
        }
        else {
            this.nextQuestion()
        }
    },

    //If Prefer 2 is selected, traverse down right subtree
    secondOption: function () {
        if ((this.state.treeIter * 2 + 2) < tree.length) {
            this.setState({
                treeIter: ((this.state.treeIter * 2) + 2)
            })
        }
        else {
            this.nextQuestion()
        }
    },

    //Finished tree traversal for previous pair
    nextQuestion: function () {
        console.log("nextQuestion iter: " + this.state.iter)

        //Check if done with all questions
        if(this.state.iter >= tasks.length-1) {
            console.log('Finished')
        }
        else {
            this.setState({
                treeIter: 0
            }),
            this.nextPair()
        }
    },

    //Select next pair to traverse
    nextPair: function () {
        this.setState({
            iter: this.state.iter + 1,
            pairOne: tasks[this.state.iter + 1].aspects[0],
            pairTwo: tasks[this.state.iter + 1].aspects[1]
        })
    },

    render: function () {
        ////console.log("length: " + tasks.length)
        console.log("treeIter: " + this.state.treeIter)
        console.log("tree: " + tree[this.state.treeIter])

        var sliderOne = <PairwiseSlider min='0' max='100' set='50' diff={tree[this.state.treeIter][0]}/>

        return(
            <div>
            <p><b> {language.instructions.pairwise} </b></p>
            <p><b> Question {this.state.iter + 1} </b></p>
            <p><b> {language.option.one} </b></p>
            <p> {this.capitalize(aspects[this.state.pairOne[0]][this.state.pairOne[1]].text)} </p>
            <div> {sliderOne} </div>
            <Button name={language.prefer.one} handleClick={this.firstOption}/>

            <p><b> {language.option.two} </b></p>
            <p> {this.capitalize(aspects[this.state.pairTwo[0]][this.state.pairTwo[1]].text)} </p>
            <PairwiseSlider min='0' max='100' set='20' diff={tree[this.state.treeIter][1]}/>
            <Button name={language.prefer.two} handleClick={this.secondOption}/>
            </div>
        )
    }
})

module.exports = Pair