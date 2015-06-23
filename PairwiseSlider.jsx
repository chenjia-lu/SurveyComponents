var React = require('react')
var d3 = require('d3')
var Bar = require('./Bar.jsx')


var PairwiseSlider = React.createClass({
    getInitialState: function () {
        return {
            j: 0
        }
    },

    //Points of the pointer (triangle)
    setLineData: function (p) {
        return (new Array({"x": p, "y": 8}, {"x": p + 2, "y": 8}, {"x": p + 1, "y": 10}))
    },

    setBars: function (set, diff) {
        //Drawing the bar (difference)
        this.scaleDiff = this.svg.append('rect')
            .attr('x', set)
            .attr('y', 5)
            .attr('width', diff)
            .attr('height', 3)
            .style('fill', 'red')

        //Drawing the bar (scale)
        this.rect = this.svg.append('rect')
            .attr('x', set)
            .attr('y', 13)
            .attr('width', diff)
            .attr('height', 3)
            .style('fill', 'red')
    },

    setPointer: function (set, diff) {
        //Drawing the pointer (rect)
        this.chooser = this.svg.append('rect')
            .attr('x', set - 1)
            .attr('y', 5)
            .attr('width', 2)
            .attr('height', 3)
            .style('fill', 'gray')

        //Drawing the pointer (triangle)
        this.lineFunction = d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .interpolate("linear");

        this.pointer = this.svg.append('path')
            .attr('d', this.lineFunction(this.setLineData(set - 1)))
            .attr('stroke', "gray")
            .attr('stroke-width', .01)
            .attr("fill", "gray");

        this.pointerScale = this.svg.append('text')
            .attr('x', set - 1)
            .attr('y', 12)
            .attr('font-size', 2)
            .text(set)
    },

    componentDidMount: function () {
        this.svg = d3.select(React.findDOMNode(this))
            .append('svg')
            .attr('width', '100%')
            .attr('viewBox', '0 0 100 20')

        //Drawing the bar (scale)
        this.rect = this.svg.append('rect')
            .attr('y', 5)
            .attr('width', 100)
            .attr('height', 3)
            .style('fill', 'black')

        //Drawing the bar (difference)
        this.amt = this.svg.append('rect')
            .attr('y', 13)
            .attr('width', this.props.set)
            .attr('height', 3)
            .style('fill', 'gray')

        //Showing numbers on scale
        this.lowScale = this.svg.append('text')
            .attr('x', 0)
            .attr('y', 12)
            .attr('font-size', 2)
            .text(this.props.min)

        this.highScale = this.svg.append('text')
            .attr('x', 97)
            .attr('y', 12)
            .attr('font-size', 2)
            .text(this.props.max)

        //Creating difference
        if (this.props.diff > 0) {
            this.setBars(this.props.set, this.props.diff)
            this.setPointer(this.props.set - (-this.props.diff), this.props.diff)
        }
        else {
            this.setBars(this.props.set - (-this.props.diff), -this.props.diff)
            this.setPointer(this.props.set - (-this.props.diff), this.props.diff)
        }

    },

    render: function() {
        return (
            <div className="slider">
            </div>
        )
    }
})

module.exports  = PairwiseSlider