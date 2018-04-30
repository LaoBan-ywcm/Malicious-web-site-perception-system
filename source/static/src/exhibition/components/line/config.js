/*
* @Author: LaoBan-ywcm
* @Date:   2018-04-29 21:44:36
* @Last Modified by:   LaoBan-ywcm
* @Last Modified time: 2018-04-30 11:52:14
*/
import echarts from 'echarts';

export default function getOption() {
    return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#7588E4',
                },
                extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
            },
            legend: {
                left: 30,
                top:20,
                orient: 'horizontal',
                data: ['一级','二级','三级'],
                textStyle: {
                    color: '#fff',
                }
            },
            xAxis: {
                type: 'category',
                data: ['00:00','2:00','4:00','6:00','8:00',],
                boundaryGap: false,
                splitLine: {
                    show: false,
                    interval: 'auto',
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#609ee9'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                }
            },
            yAxis: {
                type: 'value',
                interval: 1,     //会出现负数刻度
                min: 0,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#609ee9'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                }
            },
            series: [{
                name: '一级',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: ['1500', '1400', '108', '1411', '1026', ],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(74, 167, 242,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(74, 167, 242,0.2)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#58c8da'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            },{
                name: '二级',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: ['120', '1400', '1008', '1411', '1026',],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(212,73,247,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(212,73,247,0.2)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#efe56a'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            },
            {
                name: '三级',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: ['1200', '100', '700', '811', '626',],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(202, 83, 83,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(202, 83, 83,0.5)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f7b851'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }]
    }
}
