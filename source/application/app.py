# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-28 14:17:08
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-06-09 01:07:57
'''
import time
import json
import pprint


from flask import jsonify, render_template, request
from index import app
from utils.virusTotal import Service
from utils.ip_adress import get_ip_address
from utils.db import find_DangerWebsite_virustotal, find_totalNumber, insert_ipAddress_security, find_Danger_Date, insert_ipAddress, insert_DangerWebSite, insert_SecurityWebSite, find_DB_Data, find_Grade_Data, find_WebSite_Data
from utils.ipLocation import ipLocation

@app.route('/', methods=['GET'])
def f():
    return render_template('./index.html')

@app.route('/lineData', methods=['GET'])
def lineData():
    data = find_Danger_Date()
    return jsonify(data)

@app.route('/mapData', methods=['GET'])
def mapData():
    data = find_DB_Data()
    return jsonify(data)

@app.route('/gradeData', methods=['GET'])
def gradeData():
    data = find_Grade_Data()
    return jsonify(data)

@app.route('/cityData', methods=['GET'])
def cityData():
    data = find_WebSite_Data()
    return jsonify(data)

@app.route('/totalNumber', methods=['GET'])
def totalNumber():
    data = find_totalNumber()
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
    else:
        data_reports = {
            'message': '提交检测失败',
            'code': -1
        }





#     data_reports = {
#  'code': -1,
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
    # 如果是危险网站，存入dangerWebSite数据库
    if data_reports['code']== 1 and ( 3 <= data_reports['danger_sum']):
        print('这是危险网站')
        print(url)
        grade = 0
        if data_reports['danger_sum'] < 10:
            grade = 1
        elif data_reports['danger_sum'] <20:
            grade = 2
        else:
            grade = 3

        curren_time = time.strftime('%Y-%m-%d', time.localtime())
        # 存入ipAddress表
        if ip_location_data != 'error':
            insertId = insert_ipAddress(ip_location_data)
            print(insertId)

            webSiteData = {
                'url': url,
                'ip': ip,
                'city': ip_location_data['city'],
                'state': 'danger',
                'grade': 3,
                'date': curren_time,
            }

            # 存入webSite表
            insertId = insert_DangerWebSite(webSiteData)
            print(insertId)

    # 如果是安全网站，存入securityWebSite数据库
    if data_reports['code']== 1 and ( 2 > data_reports['danger_sum']):
        print('这是安全网站')
        print(url)

        curren_time = time.strftime('%Y-%m-%d', time.localtime())
        # 存入ipAddress表
        if ip_location_data != 'error':
            insertId = insert_ipAddress_security(ip_location_data)
            print(insertId)

            webSiteData = {
                'url': url,
                'ip': ip,
                'city': ip_location_data['city'],
                'state': 'security',
                'date': curren_time,
            }
            # 存入webSite表
            insertId = insert_SecurityWebSite(webSiteData)
            print(insertId)

    print('data_reports')
    print(data_reports)
    # 如果dangerWebsite数据库中存在该url
    result = find_DangerWebsite_virustotal(url)
    print('search danger')
    print(result)
    if result['is_exis'] == 1:
        data_reports = {
            'code': 1,
            'scan_date': result['data']['date'],
            'state': '危险',
            'url': result['data']['url']
        }

    return jsonify({
            'virusTotal_message': data_reports,
            'ip': ip
        })


