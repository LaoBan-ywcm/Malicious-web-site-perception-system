/*
* @Author: LaoBan-ywcm
* @Date:   2018-04-22 14:27:23
* @Last Modified by:   LaoBan-ywcm
* @Last Modified time: 2018-04-27 17:38:30
*/

export default function getOption() {
    return {
        backgroundColor: '#404a59',
        tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
        geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
        visualMap: {
                min: 0,
                max: 200,
                calculable: true,
                inRange: {
                    color: ['#50a3ba', '#eac736', '#d94e5d']
                },
                textStyle: {
                    color: '#fff'
                }
            },
        series: [
            {
                name: 'World Population (2010)',
                type: 'scatter',
                coordinateSystem: 'geo',
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
                data: [],
            }
        ]
    }
  };