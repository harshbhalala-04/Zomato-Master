// env variable
require("dotenv").config();

import  express  from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// Config Import
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

// API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant"
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image"; 
import Orders from "./API/Orders";
import Reviews from "./API/Reviews";  

// Database Connection
import ConnectDB from './database/connection';

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: "false"}));
zomato.use(cors());
zomato.use(helmet());
zomato.use(passport.initialize());
zomato.use(passport.session());

//Passport configuration
googleAuthConfig(passport);
routeConfig(passport);

// For application routes
//It will be localhost:4000/auth/signup route endpoint.
zomato.use("/auth", Auth); 
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/orders", Orders);
zomato.use("/reviews", Reviews);


// Get Root Route
zomato.get("/", (req,res) => res.json({message: "Setup Successfully!"}));

// Zomato Server Port.
zomato.listen(4000, ()=>
ConnectDB().then(()=>console.log("Server is up and running"))
.catch(()=>console.log("DB connection failed")));
