# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-28 14:17:08
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-04-28 16:50:53
'''
import time
import json
import pprint


from flask import jsonify, render_template, request
from index import app
from utils.virusTotal import Service
from utils.ip_adress import get_ip_address
from utils.db import insert_ipAddress, insert_webSite, find_DB_Data, find_Grade_Data
from utils.ipLocation import ipLocation

@app.route('/', methods=['GET'])
def f():
    return render_template('./index.html')

@app.route('/mapData', methods=['GET'])
def mapData():
    data = find_DB_Data()
    print(data)
    return jsonify(data)

@app.route('/gradeData', methods=['GET'])
def gradeData():
    data = find_Grade_Data()
    return jsonify(data)




@app.route('/verification', methods=['GET'])
def verification():
    url = request.args.get("url")
    ip = get_ip_address(url)
    # 从百度地图获取ip的城市和经纬度
    ip_location = ipLocation(ip)
    # 提取出需要的值
    ip_location_data = ip_location.out_data()



    service = Service(url)
    data_scan = service.handle_data_scan()

    if data_scan['code'] == 1:
        scan_id = data_scan['scan_id']
        data_reports = service.handle_data_reports(scan_id)
    elif data_scan['code'] == 2:
        for i in range(3600):
            time.sleep(1)
            _data = service.handle_data_reports(scan_id)
            if _data['code'] == 1:
                data_reports = _data
                break
    elif data_scan['code'] == -1:
        data_reports = {
            'message': 'url不存在',
            'code': -1
        }



#     data_reports = {
#  'code': 1,
#  'danger_software': [],
#  'danger_sum': 0,
#  'scan_date': u'2018-04-23 04:38:51',
#  'security_software': [u'CLEAN MX',
#                        u'DNS8',
#                        u'BitDefender',
#                        ],
#   'security_sum': 67,
#   'software_sum': 67,
#   'state': True,
#   'url': u'http://www.taobao.com/'
# }
    # 如果是危险网站，存入数据库
    if data_reports['code']== 1 and (data_reports['security_sum'] > data_reports['danger_sum']):
        print('这是危险网站')
        print(url)
        # 存入ipAddress表
        if ip_location_data != 'error':
            insertId = insert_ipAddress(ip_location_data)
            print(insertId)

            webSiteData = {
                'url': url,
                'ip': ip,
                'city': ip_location_data['city'],
            }

            # 存入webSite表
            insertId = insert_webSite(webSiteData)
            print(insertId)

    return jsonify({
            'virusTotal_message': data_reports,
            'ip': ip
        })


