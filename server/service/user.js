module.exports = (app, db) => {

    const express = require('express');
    var ObjectID = require("mongodb").ObjectID;
    const router = express.Router();
    /* const csv = require('fast-csv');
    const fs = require('fs');*/
    const config = require('../config/config');
    const common = require('../globel/common');
    const USERMODELS = require('../models/user-model');
    const USERREPORT  = require('../models/user-report');
    const arryEmpty =[];

    /*
    TODO:This api use Save user details in Data Base
    @Function: Save user details Data
    */
    app.post('/api/auth/signup', (req,res) =>  { 
        try{
             var obj = req.body;
             var strActionType ="SAVE";
             
             if(common.isEmptyObject(obj)) {    
                 res.status(200).json({success: false, message: 'Params missing', data:arryEmpty});    
             } else { 
                 USERMODELS.funRegisterUserDetails(obj,db).then(( result )=>{
                     if(result && result.success === true) {
                         res.status(200).json(result)
                     } else {
                         res.status(200).json(result)
                     }
                 });
             }
         } catch (e) {
             console.log("Error",e);
             res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
         }
 
    });

    /*
    TODO:This api use user Login details in Data Base
    @Function: Login user details Data
    */
    app.post('/api/auth/login', (req,res) =>  { 
        try{
            var obj = req.body;
            if(common.isEmptyObject(obj))  
            {        
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {

                USERMODELS.funCheckUserNameAndPassword(obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        res.status(200).json(result)
                    }
                    else {
                        res.status(200).json(result)
                    }
                });
            }
        }catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }
 
    });

    /*
    TODO:This api use List user details in Data Base
    @Function: Listing user details Data
    */
    app.get('/api/user/getListAllUserDetails',(req,res) => {
        console.log("reqreqreqreq ----",req)
        try{
            var obj = req.body._id
            console.log("whsx ----",obj)
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                USERREPORT.funGetAllUserDetails(obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        res.status(200).json(result)
                    }
                    else {
                        res.status(200).json(result)
                    }
                });
            }
        }catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }


    });

 
 
}