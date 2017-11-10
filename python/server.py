from flask import Flask, request, jsonify
from flask_cors import CORS
from numpy.random import choice
import numpy as np
import json, operator, random, xlrd


# from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


# Read Product file
print("[Server] read 'product.json'.")
ts = pd.read_excel('base_product.xlsx')

# Server Start
print("[Server] router start.")

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print("[Server] user requests detected.")

        # Get Request
        userReqJson = request.get_json(silent=True)
        userReqTags = userReqJson

        # Find top 10
        tagsTop = sorted(userReqTags.items(), key=operator.itemgetter(1), reverse=True)[:10]

        # Create article by top10 tags
        pick = {}
        for i in ts.values:
            top = 100
            for tag in tagsTop:
                if tag[0] in i[1]:
                    pick[i[0]] = top
                top -= 8

        # Create article All
        pickAll = {}
        for i in ts.values:
            top = 100
            for tag in tagsTop:
                pickAll[i[0]] = top

        def weighted_pick(dic):
            total = sum(dic.values())
            tmp = 0
            pick = random.randint(0, total-1)
            for key, weight in dic.items():
                tmp += weight
                if pick < tmp:
                    return key

        # recommend 50%
        lastPick = []
        while True:
            lastPick.append(weighted_pick(pick))
            lastPick = list(set(lastPick))
            if (len(lastPick) >= 18):
                break


        # random 50%
        while True:
            lastPick.append(weighted_pick(pickAll))
            lastPick = list(set(lastPick))
            if (len(lastPick) >= 36):
                break

        lastPick = json.dumps(lastPick)

        print('[Server] return respone to user.')
        return lastPick
    else:
        return 'You can send method "POST" only.'

if __name__ == '__main__':
   app.run()