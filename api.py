#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask,request,jsonify
from app import predict
app = Flask(__name__)
@app.route('/predict',methods=['POST'])
def response():
    pair=request.body
    drugA=pair.drugA
    drugB=pair.drugB
    result=predict(drugA,drugB)
    return jsonify(result)
app.run(port=8000)