# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-28 15:31:16
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-04-30 15:41:08
    请求virustotalAPI数据
'''
import requests
from pprint import pprint
import json

APIKEY = 'e04d1c8ee25dad5e3952aee4402a21a6e630222565873527aa28af66ea090aa9'
api_url_scan = 'https://www.virustotal.com/vtapi/v2/url/scan'
api_url_reports = 'http://www.virustotal.com/vtapi/v2/url/report'

class Service(object):
    '''该类用于请求virustotalAPI数据，
    eg: service = Service('www.baidu.com')
    '''

    def __init__(self, url):
        self.apikey = APIKEY
        self.url = url
        self.api_url_reports = api_url_reports
        self.api_url_scan = api_url_scan

    def fmt_url_params_scan(self):
        '''构造scan接口需要的数据
        '''
        params = {
            'apikey': self.apikey,
            'url': self.url,
        }
        return params

    def fmt_url_params_reports(self, scan_id):
        '''构造reports接口需要的数据
        '''
        params = {
            'apikey': self.apikey,
            'resource': scan_id
        }
        headers = {
            "Accept-Encoding": "gzip, deflate",
            "User-Agent" : "gzip, Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
        }
        return params,headers

    def http_post_scan(self):
        '''请求scan接口,返回原接口数据
        '''
        params = self.fmt_url_params_scan()
        try:
            resp = requests.post(self.api_url_scan, data=params)
            data = resp.json()
        except Exception as err:
            print(err)
            data = 'error'

        return data

    def http_post_reports(self, scan_id):
        '''请求reports接口,返回原接口数据
        '''
        params,headers = self.fmt_url_params_reports(scan_id)
        try:
            resp = requests.post(self.api_url_reports, params=params, headers=headers)
            data = resp.json()
        except Exception as err:
            pprint(err)
            data = 'error'

        return data

    def handle_data_scan(self):
        '''处理scan接口返回的数据
        '''
        data = self.http_post_scan()
        # print('scan接口数据：%s' % data.status_code)
        if data != 'error' and data['response_code'] == 1:
            result = {
                'message': data['verbose_msg'],
                'scan_id': data['scan_id'],
                'code': 1
            }
        elif data != 'error' and data['response_code'] == 2 :
            result = {
                'message': '已经提交，正在审查',
                'code': 2
            }
        elif data['response_code'] == -1:
            result = {
                'message': 'url不存在',
                'code': -1
            }
        else:
            result = {
                'message': '提交检测失败',
                'code': 0
            }

        return result

    def handle_data_reports(self, scan_id):
        '''处理reports接口返回的数据
        '''
        security = []
        danger = []
        data = self.http_post_reports(scan_id)
        # print('reports接口数据：%s' % data.status_code)
        if data != 'error' and data['response_code'] == 1:
            software_list = data['scans']
            software_sum = data['total']
            for key,value in software_list.items():
                if value['detected'] == False:
                    security.append(key)
                else:
                    danger.append(key)

            state = '安全' if len(security) > len(danger) else '危险'

            result = {
                'code': 1,
                'scan_date': data['scan_date'],
                'url': data['url'],
                'software_sum': software_sum,
                'security_software': security,
                'danger_software': danger,
                'security_sum': len(security),
                'danger_sum': len(danger),
                'state': state,
            }
        elif data != 'error' and data['response_code'] == 2:
            result = {
                'message': '已经提交，正在审查',
                'code': 2
            }
        else:
            result = {
                'message': '检测不到该网站',
                'code': 0
            }


        return result





# def main():

#     service = Service('www.youtube.com')
#     # data = service.handle_data_scan()
#     data_reports = service.handle_data_reports('4671ca02d929289d11f8855e109d4df50495f875f82cac91fce9d31742dad7ae-1524729978')


# if __name__ == '__main__':
#     main()
