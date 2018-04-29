/*
* @Author: LaoBan-ywcm
* @Date:   2018-04-29 21:44:36
* @Last Modified by:   LaoBan-ywcm
* @Last Modified time: 2018-04-29 22:47:00
*/
import echarts from 'echarts';

export default function getOption() {
    return {
        title: {
                text: '每日统计',
                left: '10%',
                top: '5%',
                textAlign: 'center',
                textStyle: {
                    color: '#fff',
                }
            },
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
                right: 20,
                top:20,
                orient: 'horizontal',
                data: ['一级','二级','三级'],
                textStyle: {
                    color: '#fff',
                }
            },
            xAxis: {
                type: 'category',
                data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"],
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
                data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
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
                data: ['1200', '1400', '1008', '1411', '1026', '1288', '200', '800', '1100', '1000', '1118', '1322'],
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
                data: ['1200', '1400', '700', '811', '626', '488', '400', '1100', '500', '300', '1998', '822'],
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
