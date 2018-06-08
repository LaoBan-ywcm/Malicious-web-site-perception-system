# -*- coding: utf-8 -*-
'''
    Author: LaoBan-ywcm
    Date:   2018-04-25 15:22:18
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-06-09 00:58:56
'''
import json
from application.app import app
from flask_pymongo import PyMongo
import datetime
import calendar

app.config['MONGO_DBNAME'] = 'crawler'
mongo = PyMongo(app, config_prefix='MONGO')

def getLastDayOfLastMonth(monthDate):
    d = monthDate
    c = calendar.Calendar()

    year = d.year
    month = d.month

    if month == 1 :
        month = 12
        year -= 1
    else :
        month -= 1
    days = calendar.monthrange(year, month)[1]
    dad = datetime.datetime(year,month,1).strftime('%Y-%m')
    return datetime.datetime.strptime(dad, '%Y-%m')

def find_Danger_Date():
    try:
        dateList = mongo.db.dangerWebSite.find({},{'date':1, '_id':0})
        month = datetime.timedelta(days=30)
        maxs = datetime.datetime.strptime(datetime.datetime.now().strftime('%Y-%m'), '%Y-%m')
        out_data = []
        for i in range(1,6):
            out_data.append(maxs.strftime('%Y-%m'))
            maxs = getLastDayOfLastMonth(maxs)
        out_data.reverse()
        print(out_data)

        webList = list(mongo.db.dangerWebSite.find({},{'_id':0}))
        _outObject = {}
        for data in out_data:
            _outObject[data] = {
                    'one': 0,
                    'two': 0,
                    'three': 0,
                }
        for web in webList:
            _date = web['date'].encode('utf-8').split('-')
            _odate = _date[0] + '-' + _date[1]
            for data in out_data:
                if data == _odate:
                    if web['grade'] == 1:
                        _outObject[data]['one'] = _outObject[data]['one'] + 1
                    elif web['grade'] == 2:
                        _outObject[data]['two'] = _outObject[data]['two'] + 1
                    elif web['grade'] == 3:
                        _outObject[data]['three'] = _outObject[data]['three'] + 1

        oneLsit = []
        twoLsit = []
        threeLsit = []
        for key in out_data:
            oneLsit.append(_outObject[key]['one'])
        for key in out_data:
            twoLsit.append(_outObject[key]['two'])
        for key in out_data:
            threeLsit.append(_outObject[key]['three'])
        return {
            'x': out_data,
            'one': oneLsit,
            'two': twoLsit,
            'three': threeLsit,
        }
    except Exception as err:
        print(err)
    return

def find_totalNumber():
    try:
        security = mongo.db.securityWebSite.find({}).count()
        danger = mongo.db.dangerWebSite.find({}).count()
        sum = security + danger
    except Exception as err:
        print(err)
    return sum

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
                    ip['value'] * 10,
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
        else:
            mongo.db.ipAddress.update_one({"city": data['city']}, {'$inc': {"value": 1}})

    except Exception as err:
        print(err)

def insert_ipAddress_security(data):
    try:
        result = mongo.db.ipAddress.find_one({"city": data['city']})
        if result == None:
            insertedId = mongo.db.ipAddress.insert_one(data).inserted_id
    except Exception as err:
        print(err)

def insert_DangerWebSite(data):
    try:
        result = mongo.db.dangerWebSite.find_one({"url": data['url']})
        if result == None:
            insertedId = mongo.db.dangerWebSite.insert_one(data).inserted_id
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

# 检测前查看dangerWebsite数据表中是否含有该网站
def find_DangerWebsite_virustotal(url):
    data = {}
    if len(url.split('//')) != 1:
        baseUrl = url.split('//')[1]
    else:
        baseUrl = url
    try:
        url = 'http://' + baseUrl
        print(url)
        result = mongo.db.dangerWebSite.find_one({"url": url})
        if result == None:
            url = 'https://' + baseUrl
            result = mongo.db.dangerWebSite.find_one({"url": url})
            if result == None:
                data = {
                    "is_exis": 0,
                }
            else:
                data = {
                    "is_exis": 1,
                    "data": result,
                }
        else :
            data = {
                "is_exis": 1,
                "data": result,
            }
    except Exception as err:
        print(err)

    return data





