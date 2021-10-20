import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {BsHandbag} from "react-icons/bs";
import {IoBeerOutline} from "react-icons/io5";
import {GiMorgueFeet} from "react-icons/gi";

const MobileTab = () => {

    const [allTypes, setAllTypes] = useState([
        {
            id: "delivery",
            icon: <BsHandbag />,
            name: "Delivery",
            isActive: false
        },
        {
            id: "night",
            icon: <IoBeerOutline />,
            name: "Night Life",
            isActive: false
        },
        {
            id: "dining",
            icon: <GiMorgueFeet />,
            name: "Dining Out",
            isActive: false
        }
    ]);

    const {type} = useParams();

    return (
        <>
            <div 
            className="flex items-center justify-between lg:hidden bg-white p-3 fixed bottom-0 z-10 w-full border text-gray-500">
              {
                  allTypes.map((items) => (
                    <Link to={`/${items.id}`}> 
                        <div className={
                            type === items.id ? "flex flex-col items-center text-xl relative text-navColor-400 border-navColor-400" : "flex flex-col items-center text-xl"
                        }>
                        <div className = {
                            type === items.id && 
                            "absolute -top-3 w-full h-2 border-t-2 border-navColor-400"}
                        />
                        {items.icon}
                        <h5 className="text-sm">{items.name}</h5>
                        </div>
                    </Link>
                  ))} 
            </div>
        </>
    );
};

const FoodTab = () => {
    return (
        <>
        <div>
            <MobileTab />
        </div>
        </>
    );
}

export default FoodTab;


// master url: type

// delivery, dining, night life -> Type