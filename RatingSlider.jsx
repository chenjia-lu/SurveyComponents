var React = require('react')
var d3 = require('d3')


var RatingSlider = React.createClass({
    getInitialState: function () {
        return {
            j: 0,
            clicked: false
        }
    },

    //Points of the pointer (triangle)
    setLineData: function (p) {
        return (new Array({"x": p, "y": 8}, {"x": p + 2, "y": 8}, {"x": p + 1, "y": 10}))
    },

    componentDidMount: function () {
        this.svg = d3.select(React.findDOMNode(this))
            .append('svg')
            .attr('width', '100%')
            .attr('viewBox', '0 0 100 20')

        //Drawing the scale (bar)
        this.rect = this.svg.append('rect')
            .attr('y', 5)
            .attr('width', 100)
            .attr('height', 3)
            .style('fill', 'black')

        //Drawing the pointer (rect)
        this.chooser = this.svg.append('rect')
            .attr('x', 0)
            .attr('y', 5)
            .attr('width', 2)
            .attr('height', 3)
            .style('fill', 'gray')

        //Drawing the pointer (triangle)
        this.lineFunction = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("linear");

        this.pointer = this.svg.append('path')
            .attr('d', this.lineFunction(this.setLineData(0)))
            .attr('stroke', "gray")
            .attr('stroke-width',.01)
            .attr("fill", "gray");

        //Showing numbers on scale
        this.lowScale = this.svg.append('text')
            .attr('x',0)
            .attr('y', 12)
            .attr('font-size', 2)
            .text(this.props.min)

        this.highScale = this.svg.append('text')
            .attr('x', 97)
            .attr('y', 12)
            .attr('font-size', 2)
            .text(this.props.max)

        this.pointerScale = this.svg.append('text')
            .attr('x', 0)
            .attr('y', 12)
            .attr('font-size', 2)
            .text(this.props.min)

        //Drawing the bar (amt)
        this.amt = this.svg.append('rect')
            .attr('y', 13)
            .attr('width', 0)
            .attr('height', 3)
            .style('fill', 'gray')

        //Events
        window.addEventListener('mousedown', this.setClicked)
        window.addEventListener('mousemove', this.drag)
        window.addEventListener('click', this.clicked)
        window.addEventListener('mouseup', this.setClicked)
    },

    componentWillMount: function () {
        window.removeEventListener('mousedown', this.setClicked)
        window.removeEventListener('mousemove', this.drag)
        window.removeEventListener('click', this.clicked)
        window.removeEventListener('mouseup', this.setClicked)
    },

    setAmt: function (num) {
        this.amt.attr('width', num+1)
    },

    setClicked: function () {
        this.setState({
            clicked: !this.state.clicked
        })
    },

    drag: function () {
        if(this.state.clicked) {
            this.clicked()
        }
    },

    clicked: function () {
        var sliderBound = this.getDOMNode().getBoundingClientRect()
        if (event.clientY <= sliderBound.bottom && event.clientY >= sliderBound.top) {
            //fraction of slider bar clicked
            var sliderClicked = event.clientX / sliderBound.right
            //set to new value
            this.setState({
                j: sliderClicked * 100
            })
            this.setAmt(this.state.j)
        }
    },

    render: function() {

        if (this.chooser) this.chooser.attr('x', this.state.j)
        if (this.pointer) this.pointer.attr('d',this.lineFunction(this.setLineData(this.state.j)))
        if (this.pointerScale) {
            var pScale = (this.state.j*(this.props.max - this.props.min)+100*this.props.min)/100
            this.pointerScale.attr('x', this.state.j).text(Math.round(pScale))
        }

        if ((this.state.j + 2) >= 100) {
            this.chooser.attr('x', 98)
            this.pointer.attr('d', this.lineFunction(this.setLineData(98 - .001)))
            this.pointerScale.attr('x', 97).text(Math.round(this.props.max))
        }

        if (this.state.j < 0) {
           this.chooser.attr('x', 0)
            this.pointer.attr('d', this.lineFunction(this.setLineData(.001)))
            this.pointerScale.attr('x', 0).text(Math.round(this.props.min))
        }

        return (
                <div className="slider">
                </div>
        )
    }
})

module.exports  = RatingSlider