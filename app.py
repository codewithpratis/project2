from flask import Flask, render_template, redirect, Blueprint, jsonify, request
from flask_pymongo import PyMongo
import os
import pandas as pd
import json



app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
mongo = PyMongo(app, uri='mongodb://localhost:27017/yelpBusiness')

@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response 

# Route to render index.html template using data from mongo
@app.route("/")
def home():

    collection = mongo.db.openVegas.find_one()
    return render_template('yelp.html', vacation=collection)


@app.route("/yelp.html")
def back():
    return render_template('yelp.html')


@app.route("/about.html")
def about():
    return render_template('about.html')

    
# Route to get data
@app.route("/api")
def api():
    
    collections = mongo.db.openVegas.find({}, {'_id': False})
    businesses = [collection for collection in collections]
    data = {
        "businesses": businesses
    }
    return jsonify(data)

@app.route("/maps.html")
def restaurantData():
    collection = mongo.db.openVegas.find_one()
    return render_template('maps.html', vacation=collection)

@app.route("/heatmap.html")
def ratingmap():
    return render_template('heatmap.html');

@app.route("/heatmaps.html")
def heatmap():

    return render_template('heatmaps.html'); 

@app.route("/charts.html")
def charts():
    return render_template('charts.html');

if __name__ == '__main__':
    app.run(debug=True)