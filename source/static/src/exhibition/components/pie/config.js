/*
* @Author: LaoBan-ywcm
* @Date:   2018-04-27 19:06:32
* @Last Modified by:   LaoBan-ywcm
* @Last Modified time: 2018-04-28 12:41:00
*/

import echarts from 'echarts';

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
        series: [
            // 一级网站
            {
                name: '一级网站',
                type: 'pie',
                radius: ['55%', '65%'],
                center: ['20%', '50%'],
                startAngle: 225,
                color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00a2ff'
                }, {
                    offset: 1,
                    color: '#70ffac'
                }]), "transparent"],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                        normal: {
                            position: 'center'
                        }
                    },
                data: [{
                    value: 75,
                     name: '一级网站',
                        label: {
                            normal: {
                                formatter: '一级网站',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 20

                                }
                            }
                        }
                }, {
                    value: 25,
                    name: '%',
                        label: {
                            normal: {
                                formatter: '\n35',
                                textStyle: {
                                    color: '#007ac6',
                                    fontSize: 30

                                }
                            }
                        }
                },
                ]
            },
            // 二级网站
            {
                name: ' 二级网站',
                type: 'pie',
                radius: ['55%', '65%'],
                center: ['50%', '50%'],
                startAngle: 225,
                color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#f125ff'
                }, {
                    offset: 1,
                    color: '#2dcbff'
                }]), "transparent"],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                        normal: {
                            position: 'center'
                        }
                    },
                data: [{
                    value: 75,
                     name: '二级网站',
                        label: {
                            normal: {
                                formatter: '二级网站',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 20

                                }
                            }
                        }
                }, {
                    value: 25,
                    name: '%',
                        label: {
                            normal: {
                                formatter: '\n35',
                                textStyle: {
                                    color: '#f125ff',
                                    fontSize: 30

                                }
                            }
                        }
                },]
            },
            // 三级网站
            {
                name: ' 三级网站',
                type: 'pie',
                radius: ['55%', '65%'],
                center: ['80%', '50%'],
                startAngle: 225,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                        normal: {
                            position: 'center'
                        }
                    },
                data: [{
                    value: 75,
                    "itemStyle": {
                        "normal": {
                            "color": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                "offset": 0,
                                "color": '#da4a43'
                            }, {
                                "offset": 1,
                                "color": '#f125ff'
                            }]),
                        }
                    },
                     name: '三级网站',
                        label: {
                            normal: {
                                formatter: '三级网站',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 20

                                }
                            }
                        }
                }, {
                    value: 25,
                    name: '%',
                        label: {
                            normal: {
                                formatter: '\n34',
                                textStyle: {
                                    color: '#da4a43',
                                    fontSize: 30

                                }
                            }
                        }
                },
                ]
            },
        ]
    }
}
