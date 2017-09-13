import React, {Component} from 'react' 

export default class Pie extends Component {
    constructor (props) {
        super(props)
    }
    
    handleData () {
        let {scale, data}= this.props.data
        var sum = 0
        data.forEach((ele) => {
            sum += ele.value
        })
        data.forEach((ele) => {
            ele.value = ele.value / sum
        })
        this.data = data
        this.scale = scale
        this.x = this.props.w / 2
        this.y = this.props.h / 2
    }

    shade (ctx, i) {
        ctx.clearRect(0, 0, this.props.w, this.props.h)
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.fillStyle = "#fff"
        ctx.arc(this.x, this.y, 101, 0, 2 * Math.PI * i, 1)
        ctx.fill()
        ctx.closePath()
    }


    //componentWillMount生命钩子执行遮罩层画布的创建
    componentWillMount () {
        this.handleData()
    }

    //画数据饼图
    draw (ctx) {
        let fullAngle = 2 * Math.PI
        let angle = 0
        this.data.forEach((e, i)=>{
            ctx.beginPath()
            ctx.moveTo(this.x, this.x)
            ctx.fillStyle = e.color
            ctx.arc(this.x, this.x, 100, angle,angle + fullAngle * e.value, 0)
            ctx.fill()
            ctx.closePath()
            angle += fullAngle * e.value
        })
    }

    //画数据内容
    drawText (ctx) {
        var fullAngle = 2 * Math.PI
        var angle = 0
        this.data.forEach((e, i)=>{
            var ang = (2 * angle + e.value * fullAngle) / 2
            ctx.fillText('h1', Math.cos(ang) * 120 + 250, Math.sin(ang) * 120 + 250)
            angle += fullAngle * e.value
        })
    }
     
    //实现遮罩层逐渐消失
    setTime (ctx) {
        var i = 0
        this.timer = setInterval(()=>{
            i += 0.01
            if(i > 1) {
                clearInterval(this.timer)
                i = 0
            }
            this.shade(ctx, i)
        }, 10)
    }

    //渲染饼图画布
    render () {
        let shadeStyle = {position: "absolute", left: "0px", top: "0px"}
        return (
            <div style={{position: "relative"}}>
                <canvas ref="canvas" width={this.props.w} height={this.props.h}></canvas>
                <canvas ref="shade" width={this.props.w} height={this.props.h} style={shadeStyle}></canvas>
            </div>
            
        )
    }

    //改变canvas坐标系
    switchXY (ctx) {
        ctx.translate(0, 500)
        ctx.rotate(- Math.PI / 2)
    }

    //获取装载之后的canvas
    componentDidMount () {
        //获取页面画布上下文
        let ctx = this.refs.canvas.getContext('2d')
        let sCtx = this.refs.shade.getContext('2d')
        this.switchXY(sCtx)
        this.switchXY(ctx)
        this.draw(ctx)
        this.drawText(ctx)
        this.setTime(sCtx)
    }

    //卸载要清楚定时器
    componentWillUnmount () {
        clearInterval(this.timer)
    }
}