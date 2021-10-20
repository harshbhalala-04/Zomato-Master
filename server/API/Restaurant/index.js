import express from "express";
import { RestaurentModel } from "../../database/allModels";


// Validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/food";

const Router = express.Router();

/*

Route:        /
Des:          Get all restaurants details
Param:        None
Access:       Public
Method:       GET
*/

Router.get("/", async(req, res) => {
    try{
        await ValidateRestaurantCity(req.query);
        const {city} = req.query;
        const restaurants = await RestaurentModel.find({city});
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route:        /
Des:          Get Perticular restaurants details on ID
Param:        _id
Access:       Public
Method:       GET
*/

Router.get("/:_id", async(req, res) => {
    try{
        await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const restaurant = await RestaurentModel.findOne(_id);

        if(!restaurant){
            return res.status(404).json({error: "Restaurant Not Found"});
        }

        return res.json({restaurant});
    }catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route:        /search 
Des:          Get  restaurants details on Search
Param:        none
Body:         Search String
Access:       Public
Method:       GET
*/

Router.get("/search", async(req, res) => {
    try{
      await ValidateRestaurantSearchString(req.body);
      const {searchString} = req.body;  

      const restaurants = await RestaurentModel.find({
          name: {$regex: searchString, $options: "i"},
      });

      return res.json({restaurant});
    }catch(error) {
        return res.status(500).json({error: error.message});
    }
});


export default Router;