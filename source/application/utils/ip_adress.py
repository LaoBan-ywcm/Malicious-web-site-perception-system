# -*- coding: utf-8 -*-
'''
    Author: LaoBan-ywcm
    Date:   2018-03-02 10:14:32
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-03-02 10:17:01
    获取网站ip
'''
import socket

def get_ip_address(url):
    try:
        ip = socket.gethostbyname(url)
    except:
        ip = None

    return ip


# def main():
#     ip = get_ip_address('www.baidu.com')
#     print(ip)


# if __name__ == '__main__':
#     main()
