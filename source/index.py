# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-27 16:02:45
    Last Modified by:   qiuqi
    Last Modified time: 2018-02-28 15:09:47
'''

from flask import Flask
app = Flask(__name__,static_folder="./static/build",template_folder="./static")

