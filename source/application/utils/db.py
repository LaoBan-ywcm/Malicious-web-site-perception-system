# -*- coding: utf-8 -*-
'''
    Author: LaoBan-ywcm
    Date:   2018-04-25 15:22:18
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-04-26 18:07:00
'''
import json
from application.app import app
from flask_pymongo import PyMongo

app.config['MONGO_DBNAME'] = 'bishe'
mongo = PyMongo(app, config_prefix='MONGO')

def find_DB_Data():
    try:
        ipResult = mongo.db.ipAddress.find({},{'_id':0, 'by':0})
        ipData = list(ipResult)
        out_data = []
        for ip in ipData:
            data = {
                'name': ip['city'],
                'value': [
                    ip['x'],
                    ip['y'],
                    ip['value'],
                ],
            }
            out_data.append(data)
    except Exception as err:
        print(err)


    return out_data

def insert_ipAddress(data):
    try:
        result = mongo.db.ipAddress.find_one({"city": data['city']})
        if result == None:
            insertedId = mongo.db.ipAddress.insert_one(data).inserted_id
            print(insertedId)
        else:
            mongo.db.ipAddress.update_one({"city": data['city']}, {'$inc': {"value": 1}})
            print(result['value'])

    except Exception as err:
        print(err)

def insert_webSite(data):
    try:
        result = mongo.db.webSite.find_one({"url": data['url']})
        if result == None:
            insertedId = mongo.db.webSite.insert_one(data).inserted_id
            print(insertedId)
    except Exception as err:
        print(err)


