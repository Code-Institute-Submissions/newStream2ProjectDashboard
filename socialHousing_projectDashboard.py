from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os
app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'socialHousing')
COLLECTION_NAME = 'projects'


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/socialHousing/projects')
def social_housing_projects():

    FIELDS = {
       "_id": False, "County_City": True, "number_of_units": True,
       "stage_one": True, "stage_two": True, "stage_three": True,
       "stage_four": True, "site_start": True, "site_finish": True,
        "approved_housing_body": True
    }
    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS)
        return json.dumps(list(projects))


if __name__ == '__main__':

    app.run(debug=True)






