/*
* @Author: LaoBan-ywcm
* @Date:   2018-04-22 14:27:23
* @Last Modified by:   LaoBan-ywcm
* @Last Modified time: 2018-04-27 15:59:55
*/

const geoCoordMap = {
    "海门":[121.15,31.89],
    "鄂尔多斯":[109.781327,39.608266],
    "招远":[120.38,37.35],
    "舟山":[122.207216,29.985295],
};

const myData = [
    {name: "海门", value: 1},
    {name: "鄂尔多斯", value: 1},
    {name: "招远", value: 1},
    {name: "舟山", value: 1},
];

const aa = [
    {
        name: '北京市',
        value: [
            "116.40387397",
            "39.91488908",
            21,
        ]
    }
]

const convertData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

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
                data: convertData(myData),
            }
        ]
    }
  };