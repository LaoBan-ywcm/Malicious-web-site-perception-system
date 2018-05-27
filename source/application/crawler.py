# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-28 14:17:08
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-05-27 21:48:59
'''
import time
import json
import pprint


from utils.virusTotal import Service
from utils.ip_adress import get_ip_address
from utils.crawler_db import insert_ipAddress_security, find_Danger_Date, insert_ipAddress, insert_DangerWebSite, insert_SecurityWebSite, find_DB_Data, find_Grade_Data, find_WebSite_Data
from utils.ipLocation import ipLocation


def verification(url):
    print(url)
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

    print('data_reports')
    print(data_reports)

    # 如果是危险网站，存入dangerWebSite数据库
    if data_reports['code']== 1 and ( 2 <= data_reports['danger_sum']):
        print('这是危险网站')
        print(url)
        grade = 0
        if data_reports['danger_sum'] < 5:
            grade = 1
        elif data_reports['danger_sum'] <10:
            grade = 2
        else:
            grade = 3

        curren_time = time.strftime('%Y-%m-%d', time.localtime())
        # 存入ipAddress表
        if ip_location_data != 'error':
            insertId = insert_ipAddress(ip_location_data)
            print('存入ipAdress的ID')
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
            print('危险网站的ID')
            print(insertId)

    # 如果是安全网站，存入securityWebSite数据库
    if data_reports['code']== 1 and ( 1 > data_reports['danger_sum']):
        print('这是安全网站')
        print(url)

        curren_time = time.strftime('%Y-%m-%d', time.localtime())
        # 存入ipAddress表
        if ip_location_data != 'error':
            insertId = insert_ipAddress_security(ip_location_data)
            print('存入ipAdress的ID')
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
            print('安全网站的ID')
            print(insertId)

    return {
            'virusTotal_message': data_reports,
            'ip': ip
        }

def main():
    index = 0
    with open('website.txt', 'r') as f:
        lines = f.readlines()
        for line in lines:
            index = index + 1
            print('这是第%s个网址%s' % (index, line))
            url = line.split('\n')[0]
            data = verification(url)
            pprint.pprint(data)
            time.sleep(17)

if __name__ == '__main__':
    main()


