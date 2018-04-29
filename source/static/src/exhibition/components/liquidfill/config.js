/*
* @Author: LaoBan-ywcm
* @Date:   2018-04-28 11:56:41
* @Last Modified by:   LaoBan-ywcm
* @Last Modified time: 2018-04-28 20:25:33
*/
import 'echarts';
import './liquidfill.js';


export default function getOption() {
    return {
        grid: {
            // 设置外边框大小
            show: false,
            left: '2%',
            right: '2%',
            bottom: 10,
            top: 10,
        },
        series: [{
                type: 'liquidFill',
                data: [{
                    value: 0.5,
                    itemStyle: {
                        normal: {
                            color: "#ca5354",
                            opacity: 0.3,
                        }
                    }
                }, ],
                label: {
                            normal: {
                                textStyle: {
                                    fontSize: 28,
                                },
                                color: '#db8230'
                            }
                        },
                center: ['50%', '30%'],
                radius: '105',
                outline: {
                    show: true,
                    borderDistance: 0,
                    itemStyle: {
                        color: 'none',
                        borderColor: '#26A7F9',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                backgroundStyle: {
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderWidth: 1,
                    color: "#fff",
                    shadowColor: '26A7F9',
                    opacity: 0.1,
                    shadowBlur: 80
                },
                itemStyle: {
                    normal: {
                        opacity: 0.4,
                        shadowBlur: 80,
                        shadowColor: 'blue',
                        formatter: '危险网站占比{c}',
                    }
                },

            }]

    }
}