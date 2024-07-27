#!/usr/bin/env python
# encoding: utf-8
from operator import itemgetter
from pymongo import MongoClient
import json
from flask import Flask,request,jsonify
from app import predict
app = Flask(__name__)
@app.route('/predict',methods=['POST'])
def response():
    pair=request.get_json()
    drugA=pair['drugA']
    drugB=pair['drugB']
    result=predict(drugA,drugB)
    return jsonify(result)

@app.route('/UserLogin',methods=['POST'])
def authenticate_user():
    assert request.method=='POST'
    username,password=itemgetter('username','password')(request.get_json())
    client=MongoClient(host='localhost',port=27017)
    db=client.Project
    Users=db.Users
    query_result=Users.find_one(filter={"username":username,"password":password})
    if query_result==None:
        return {'status-line':{'method':'POST','status-code':401,'status-text':'Invalid Authorization'},'response-headers':{'content-type':'text-plain'},'body':{'message':'User not Authenticated'}}
    return {'status-line':{'method':'POST','status_code':200,'status-text':'Valid Authorization'},'response-headers':{'content-type':'text-plain'},'body':{'message':'User Authorized'}}

@app.route('/CreateUser',methods=['POST'])
def CreateUser():
    assert request.method=='POST'
    username,password,age=itemgetter('username','password','age')(request.get_json())
    client=MongoClient(host='localhost',port=27017)
    db=client.Project
    Users=db.Users
    response=Users.insert_one({'username':username,'password':password,'age':age})
    if response.acknowledged==False:
        return {'status-line':{'method':'POST','status-code':400,'status-text':'Failed Request'},'response-headers':{'content-type':'text-plain'},'body':{'message':'Request failed'}}
    return {'status-line':{'method':'POST','status_code':200,'status-text':'Sucessfull Request'},'response-headers':{'content-type':'text-plain'},'body':{'message':'Successfully inserted document'}}

app.run(port=8000)