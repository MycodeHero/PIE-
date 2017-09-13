import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Pie from './component/Pie.js'
['rgb(254, 67, 101)', "rgb(252, 157, 154)", "rgb(249, 205, 173)", "rgb(200, 200, 69)", "rgb(131, 175, 155)"]

const series = {
    scale: '55%',
    data:[
        {value:235, name:'视频广告', color: "rgb(254, 67, 101)"},
        {value:274, name:'联盟广告', color: "rgb(252, 157, 154)"},
        {value:310, name:'邮件营销', color: "rgb(249, 205, 173)"},
        {value:335, name:'直接访问', color: "rgb(200, 200, 69)"},
        {value:400, name:'搜索引擎', color: "rgb(131, 175, 155)"}
    ]
}
ReactDOM.render(
    <Pie w = "500" h = "500" data={series}/>,
    document.getElementById('demo')
) 

