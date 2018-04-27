# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-27 16:02:45
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-04-25 15:30:01
'''

from flask import Flask

app = Flask(__name__,static_folder="./static/build",template_folder="./static")
app.config['MONGO_DBNAME'] = 'website'
