#!/usr/bin/env python
# encoding: utf-8
from operator import itemgetter
from pymongo import MongoClient
import json
from flask import Flask,request,jsonify
from flask_cors import CORS
from app import predict

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/Predict',methods=['POST'])
def response():
    drugA,drugB=itemgetter('drugA','drugB')(request.get_json())
    result=predict(drugA,drugB)
    return jsonify(result),200

@app.route('/UserLogin',methods=['POST'])
def authenticate_user():
    assert request.method=='POST'
    username,password=itemgetter('username','password')(request.get_json())
    client=MongoClient(host='localhost',port=27017)
    db=client.Project
    Users=db.Users
    query_result=Users.find_one(filter={"username":username,"password":password})
    print(query_result)
    if query_result==None:
        return jsonify({'status-line':{'method':'POST','status-code':401,'status-text':'Invalid Authorization'},'response-headers':{'content-type':'text-plain'},'body':{'message':'User not Authenticated'}}),401
    return jsonify({'status-line':{'method':'POST','status-code':200,'status-text':'Valid Authorization'},'response-headers':{'content-type':'text-plain'},'body':{'message':'User Authorized'}}),200

@app.route('/CreateUser',methods=['POST'])
def CreateUser():
    assert request.method=='POST'
    username,password,age,email=itemgetter('username','password','age','email')(request.get_json())
    client=MongoClient(host='localhost',port=27017)
    db=client.Project
    Users=db.Users
    user=Users.find_one(filter={"username":username})
    if user:
        return jsonify({'status-line':{'method':'POST','status-code':409,'status-text':'Conflict Error'},'response-headers':{'content-type':'text-plain'},'body':{'message':'User already exists!'}})
    response=Users.insert_one({'username':username,'password':password,'age':age})
    if response.acknowledged==False:
        return jsonify({'status-line':{'method':'POST','status-code':400,'status-text':'Failed Request'},'response-headers':{'content-type':'text-plain'},'body':{'message':'Request failed'}})
    return jsonify({'status-line':{'method':'POST','status_code':200,'status-text':'Sucessfull Request'},'response-headers':{'content-type':'text-plain'},'body':{'message':'Successfully inserted document'}})

app.run(host='localhost',port=8000)