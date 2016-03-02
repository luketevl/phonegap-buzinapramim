/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var myApp = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      //  this.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(param) {
    }
};

myApp.initialize();

    /** Checa banco de dados
      * @author lukete
    **/
    checkBD = function(){
      var db = window.openDatabase("Database", "1.0", "buzinapramim", 200000);
      db.transaction(populateDB, errorDB, successDB);
    };

    populateDB = function(tx){
//    tx.executeSql('DROP TABLE IF EXISTS toots');
     tx.executeSql('CREATE TABLE IF NOT EXISTS toots(tootId INTEGER PRIMARY KEY ASC, vehicleModelId , vehicleColorsIds , minVehicleYear, maxVehicleYear, vehiclePrice, vehicleKm, geoRadius, enable)');
      // tx.executeSql('CREATE TABLE IF NOT EXISTS toots(tootId INTEGER PRIMARY KEY ASC, enabled CHAR(1), radius INTEGER, locations INTEGER)');
     //tx.executeSql('CREATE TABLE IF NOT EXISTS locations(locationId INTEGER PRIMARY KEY ASC, storeId, latitude, longitude)');
    };

    errorDB = function(err){
      alert('erro' + err.code);
    };
    successDB = function(){
      alert('banco criado');
    };
    checkBD();
