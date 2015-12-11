#!/usr/bin/env python
#libraries, etc. from project skeleton code
import shelve
from subprocess import check_output
import flask
from flask import request, Flask, render_template, jsonify, abort, redirect
from os import environ

import os
import sys
import json
import hashlib
from urllib.request import urlopen

app = flask.Flask(__name__)
app.debug = True

#Create database/dictionary to store records (or reopen, if already existing)
db = shelve.open("msdescriptions", flag="c")

#load initial records from JSON file if not already populated
#not all records have all fields; populate missing values with 'N/A' to prevent key errors
print(len(db))
values = ['Author', 'Title', 'Place', 'Language', 'Description']
if len(db)==0:
	sourcefile = open('newtext_short.json', 'r')
	initialrecords=json.load(sourcefile)
	#print(initialrecords)
	for record in initialrecords:
		print(record)
		tempholder = {}
		for fieldtitle in values:
			if fieldtitle in initialrecords[record]:
				print(fieldtitle, initialrecords[record][fieldtitle])
				tempholder[fieldtitle] = initialrecords[record][fieldtitle]
				#print(db[record][fieldtitle])
			else:
				print(fieldtitle, 'not here')
				tempholder[fieldtitle] = 'N/A'
				#print(db[record][fieldtitle])
		db[record] = tempholder
		print('\n')
	
	#for record in initialrecords:
		#print('*',record)
		#print(initialrecords[record])
	#	db[record] = {}
		#print(db[record])
	#	for fieldtitle in values:
			#print('**',fieldtitle)
	#		if fieldtitle in initialrecords[record]:
				#print('***',initialrecords[record][fieldtitle])
	#			db[record][fieldtitle] = initialrecords[record][fieldtitle]
				#print(db[record][fieldtitle])
	#		else:
	#			db[record][fieldtitle] = 'N/A'
				#print('*** Ruh-roh')
		#print(db[record])
	sourcefile.close()
	#print('DB')
	for x in db:
		print(x, db[x], len(db[x]))

#load API keys
key_googlemaps = 'AIzaSyD9rloC3_q9b1ZwhocaDBpuXaXyJeZkKjk'
key_geonames = 'jtshed_geo2015'

@app.route('/')
def index():
    """
    Main landing page with links to view, add pages.
    """
    

    return flask.render_template('home.html')


@app.route("/addrecord", methods=['GET'])
def addpage():
	return flask.render_template('newrecord.html')

@app.route("/newrecord", methods=['POST'])
def create():
    """
    Add new record to site, visit successpage
    """
    
    identifier = request.form['identifier']
    title = request.form['mstitle']
    author = request.form['msauthor']
    place = request.form['msplace']
    lang = request.form['mslang']
    description = request.form['msdescription']
    
    db[identifier] = {'Title': title, 'Author': author, 'Place': place, 'Language': lang, 'Description': description}
    
    
    return flask.render_template('success.html', url_id=identifier, success_title=title)
    #raise NotImplementedError     

@app.route("/record/<shelfmark>", methods=['GET'])
def point_to_url(shelfmark):
    """
    Visit the site of a specific record
    """
    recordinfo={}
    fields = ['Title', 'Author', 'Language', 'Place', 'Description']
    if shelfmark in db:
    	for field in fields:
    		if field in db[shelfmark]:
    			recordinfo[field] = db[shelfmark][field]
    		else:
    			recordinfo[field] = 'N/A'
    	recordinfo['lat'], recordinfo['lon'] = get_coords(recordinfo['Place'])
    	
    	#print(recordinfo['lat'], recordinfo['lon'])
    			
    		
    			
    			
    	return flask.render_template('recordpage.html', identifier=shelfmark, title=recordinfo['Title'], place=recordinfo['Place'], language=recordinfo['Language'], desc=recordinfo['Description'], author=recordinfo['Author'], originlat=recordinfo['lat'], originlon=recordinfo['lon'], googleapi=key_googlemaps)
    else:
    	abort(404)
    
    #raise NotImplementedError 
    
@app.route("/msslist", methods=['GET'])
def showtestpage():
	valuesfromdb = {}
	for x in db:
		valuesfromdb[x] = db[x]
	
	return render_template('listpage.html', data=valuesfromdb )
	
@app.route("/json", methods = ['GET'])
def send_db_in_json():
	return flask.jsonify(**db)

@app.errorhandler(404)
def nopath(error):
	return render_template('notfound.html'), 404
	
	
def get_coords(placename):
	#Sends place name from record to Geonames API, retrieves latitude and longitude
	namequery = 'http://api.geonames.org/searchJSON?q=' + placename + '&username=' + key_geonames
	namerecords = urlopen(namequery).read().decode("utf-8")
	resultsdict = json.loads(namerecords)
	return resultsdict['geonames'][0]['lat'], resultsdict['geonames'][0]['lng']
	

if __name__ == "__main__":
    app.run()
