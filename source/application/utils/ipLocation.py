# -*- coding: utf-8 -*-
'''
    Author: LaoBan-ywcm
    Date:   2018-04-25 16:40:28
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-05-28 10:28:22
'''
import requests
import json


AK = 'm4EKbxVEoG05wFjqPngUxNKmhsCkMcWI'
COOR = 'bd09ll'
URL = 'http://api.map.baidu.com/location/ip'

class ipLocation(object):

    def __init__(self, ip):
        self.ip = ip
        self.ak = AK
        self.coor = COOR
        self.api_url = URL

    def fmt_url_params(self):
        '''构造接口需要的数据
        '''
        params = {
            'ak': self.ak,
            'ip': self.ip,
            'coor': self.coor,
        }
        return params

    def get_data(self):
        params = self.fmt_url_params()
        try:
            resp = requests.post(self.api_url, data=params)
            data = resp.json()
            if data['status'] != 0:
                return 'error'
        except Exception as err:
            data = 'error'

        return data

    def fmt_data(self, data):
        return (json.dumps(data)).decode("unicode-escape")

    def out_data(self):
        data = self.get_data()
        if data != 'error':
            city = data['content']['address_detail']['city']
            x = data['content']['point']['x']
            y = data['content']['point']['y']
            return {
                'city': city,
                'x': float(x),
                'y': float(y),
                'value': 0,
            }
        else:
            return 'error'


# def main():

#     service = ipLocation('112.124.52.241')
#     # data = service.get_data()
#     # print(service.fmt_data())
#     # print(service.fmt_data())
#     # print(service.fmt_data(data['content']['point']['y']))
#     # data = json.dumps(data)
#     # print(data.decode("unicode-escape"))
#     print(service.out_data())


# if __name__ == '__main__':
#     main()
