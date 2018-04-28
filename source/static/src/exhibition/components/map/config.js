/*
* @Author: LaoBan-ywcm
* @Date:   2018-04-22 14:27:23
* @Last Modified by:   LaoBan-ywcm
* @Last Modified time: 2018-04-27 22:31:06
*/



export default function getOption() {
    return {
        // backgroundColor: '#404a59',
        // tooltip: {
        //         trigger: 'item',
        //         formatter: '{b}'
        //     },
        // geo: {
        //         map: 'china',
        //         label: {
        //             emphasis: {
        //                 show: false
        //             }
        //         },
        //         itemStyle: {
        //             normal: {
        //                 areaColor: '#323c48',
        //                 borderColor: '#111'
        //             },
        //             emphasis: {
        //                 areaColor: '#2a333d'
        //             }
        //         }
        //     },
        // visualMap: {
        //         min: 0,
        //         max: 200,
        //         calculable: true,
        //         inRange: {
        //             color: ['#50a3ba', '#eac736', '#d94e5d']
        //         },
        //         textStyle: {
        //             color: '#fff'
        //         }
        //     },
        // series: [
        //     {
        //         name: 'World Population (2010)',
        //         type: 'scatter',
        //         coordinateSystem: 'geo',
        //         roam: true,
        //         itemStyle: {
        //             normal: {
        //                 areaColor: '#323c48',
        //                 borderColor: '#111'
        //             },
        //             emphasis: {
        //                 areaColor: '#2a333d'
        //             }
        //         },
        //         data: [],
        //     }
        // ]
        backgroundColor: '#404a59',
            title: {
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                // 设置外边框大小
                show: false,
                left: '2%',
                right: '2%',
                bottom: 10,
                top: 10,
            },
            tooltip : {
                trigger: 'item',
                formatter: function(item){
                    const city = item['data']['name'];
                    const data = item['data']['value'][2];
                    return city + '<br />' + '危险网站数量：' + data;
                },
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x:'right',
                data:['危险网站数量'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                layoutSize: 100,
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                },
                // 设置地图大小
                bottom: 15,
                top: 15,
            },
            series : [
                {
                    name: '危险网站数量',
                    type: 'scatter',
                    zoom: 0.8,
                    coordinateSystem: 'geo',
                    data: {},
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: 'Top 3',
                    type: 'effectScatter',
                    zoom: 0.8,
                    coordinateSystem: 'geo',
                    data: {},
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
    }
  };