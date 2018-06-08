# -*- coding: utf-8 -*-
'''
    Author: LaoBan-ywcm
    Date:   2018-03-02 10:14:32
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-05-28 10:45:17
    获取网站ip
'''
import socket
import requests
import json

URL  = 'https://ip.awk.sh/GetInfo.php?type=default&ip='

def get_ip_address(url):
    try:
        ip = socket.gethostbyname(url)
    except Exception as err:
        ip = None

    return ip

def get_ip_IPIP(url):
    url = URL + url
    try:
        r = requests.get(url).text
        r = json.loads(r)
        ip = r['ip']
        print(ip)
    except Exception as err:
        ip = None
    return ip



def main():
    # ip = get_ip_address('www.baidu.com')
    # print(ip)
    with open('../website.txt', 'r') as f:
        lines = f.readlines()
        for line in lines:
            url = line.split('\n')[0]
            print(url)
            ip_url = URL + url
            get_ip_IPIP(ip_url)


if __name__ == '__main__':
    main()
