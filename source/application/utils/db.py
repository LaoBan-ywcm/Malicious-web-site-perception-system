# -*- coding: utf-8 -*-
'''
    Author: LaoBan-ywcm
    Date:   2018-04-25 15:22:18
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-04-29 21:41:09
'''
import json
from application.app import app
from flask_pymongo import PyMongo

app.config['MONGO_DBNAME'] = 'bishe'
mongo = PyMongo(app, config_prefix='MONGO')

def find_security_Data():
    try:
        sum = mongo.db.securityWebSite.find({}).count()
    except Exception as err:
        print(err)
    return sum


def find_Grade_Data():
    try:
        sum = find_security_Data()
        oneGrade = mongo.db.dangerWebSite.find({'grade': 1}).count()
        twoGrade = mongo.db.dangerWebSite.find({'grade': 2}).count()
        threeGrade = mongo.db.dangerWebSite.find({'grade': 3}).count()
        print(oneGrade, twoGrade, threeGrade)
    except Exception as err:
        print(err)

    return {
        'oneGrade': oneGrade,
        'twoGrade': twoGrade,
        'threeGrade': threeGrade,
        'dangerSum': oneGrade + twoGrade + threeGrade,
        'securitySum': sum,
    }

def find_WebSite_Data():
    try:
        ipResult = find_DB_Data()
        out_data = []
        for ip in ipResult:
            city = ip['name']
            oneGrade = mongo.db.dangerWebSite.find({"city": city, "grade": 1}).count()
            twoGrade = mongo.db.dangerWebSite.find({"city": city, "grade": 2}).count()
            threeGrade = mongo.db.dangerWebSite.find({"city": city, "grade": 3}).count()
            data = {
                'city': city,
                'oneGrade': oneGrade,
                'twoGrade': twoGrade,
                'threeGrade': threeGrade,
                'sum': oneGrade + twoGrade + threeGrade,
            }
            out_data.append(data)
    except Exception as err:
        print(err)


    return out_data

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

def insert_DangerWebSite(data):
    try:
        result = mongo.db.dangerWebSite.find_one({"url": data['url']})
        if result == None:
            insertedId = mongo.db.dangerWebSite.insert_one(data).inserted_id
            print(insertedId)
        return result
    except Exception as err:
        print(err)

def insert_SecurityWebSite(data):
    try:
        result = mongo.db.securityWebSite.find_one({"url": data['url']})
        if result == None:
            insertedId = mongo.db.securityWebSite.insert_one(data).inserted_id
            print(insertedId)
        return result
    except Exception as err:
        print(err)



