# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-28 14:17:08
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-03-05 17:39:12
'''
import time
import json


from flask import jsonify, render_template, request
from index import app
from utils.virusTotal import Service
from utils.ip_adress import get_ip_address


@app.route('/verification', methods=['GET'])
def verification():
    url = request.args.get("url")
    ip = get_ip_address(url)
    service = Service(url)
    data_scan = service.handle_data_scan()

    if data_scan['code'] == 1:
        scan_id = data_scan['scan_id']
        print(scan_id)
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

    return jsonify({
            'virusTotal_message': data_reports,
            'ip': ip
        })


@app.route('/', methods=['GET'])
def f():
    return render_template('./index.html')
