import mongoose from "mongoose";
import { Car, Category } from "../dist/src/models/index.js";

const DB_NAME = process.env.MONGO_DATABASE_NAME;
const DB_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(DB_CONNECTION_STRING)
.then(seedData)
.catch((error) => (
  console.error("An error occurred while executing the migration script:\n", error),
  process.exit(1)
));

async function seedData() {
  const sportUtilityCars = new Category({ 
    name: "Sport Utility Cars", 
    description: "This class of cars usually includes models with off-road performance. This segment offers a wide range of options, from spacious full-size models to compact versions. Manufacturers offer a variety of all-wheel drive systems, each with its own unique characteristics. In addition, vehicles in this class can be further subdivided into subcategories based on their size, off-road capabilities, and other factors. These vehicles have increased ground clearance, powerful engines, reinforced suspension, improved safety systems and a high level of comfort.", 
    imageUrl: "https://images2.exist.ua/media/settings/files/Volvo-XC90_R6fGD4A.png",
  });
  const miniCars = new Category({ 
    name: "Mini Cars",
    description: "These compact cars are ideal for urban environments, as they are easy to park and can easily navigate narrow streets. The length of such cars does not exceed 3.6 meters. Most often, these are three-door hatchbacks. These cars are distinguished by their maneuverability and have a relatively small engine size, usually in the range of 0.8 to 1.4 liters. This indicates that the fuel consumption of cars in this class is the lowest among all available options. The luggage compartments are usually of limited size.",
    imageUrl: "https://images2.exist.ua/media/settings/files/Fiat_500-1_bsLtrZn.png",
  });
  const executiveCars = new Category({ 
    name: "Executive Cars",
    description: "E-class cars stand out for their size, modern technical characteristics and, of course, their higher price. In this category, you will find many premium features, including various electronic assistants, high-quality interior materials, and more. The E-Class often includes both sedans and station wagons that offer extended luggage space. Another characteristic feature of these cars is improved safety: they are equipped with advanced active and passive safety systems. The E-Class is usually powered by powerful engines that provide excellent dynamics and performance. Traditionally, German car brands are leading in this class.",
    imageUrl: "https://images2.exist.ua/media/settings/files/bmw-5_NF5HdKm.png",
  }); 

  await Promise.all([
    miniCars.save(),
    executiveCars.save(),
    sportUtilityCars.save(),
  ]);

  const car1 = new Car({ 
    model: "Volkswagen Touareg",
    price: 63000,
    color: "Silver",
    description: "The car has been in use for more than a year, a lot of work has been done, it has been fully serviced, and there are invoices for the work performed. Paperwork for the military. More details by phone, video review available.",
    imageUrl: "https://cf-cdn-v6.volkswagen.at/media/Content_Model_Equipment_Lightbox_Child_MediaBig_Image_Component/83953-1281726_lightbox-939483-mediaBig-child/dh-1015-00fe24/10eb2654/1727083271/touareg-silver.png",
    categoryId: sportUtilityCars._id,
  });
  const car2 = new Car({ 
    model: "Volvo XC 90", 
    price: 56000, 
    color: "Silver Grey", 
    description: "The car is in good condition. Officially bought in Ukraine. Service has just been completed. Diesel soft hybrid Kers. Inscription. Partially covered with a protective film. Active Full led headlights. Air suspension. Front and rear parking sensors. Keyless entry. Electric trunk lid opening. 360 camera. City Safety. Cross Traffic Allert. Lane keeping assist. Road sign recognition. Adaptive cruise control. Leather interior.", 
    imageUrl: "https://cas.volvocars.com/image/dynamic/MY25_2417/256/exterior-aligned-v1/28/74000/RA0000/R144/TC05/_/_/TJ04/TP02/_/JT02/GR03/T102/NP03/TM02/JG02/_/EV02/JB0C/T21B/LF01/_/VP09/UF02/FH02/_/_/_/TR07/default.jpg?market=ua&client=gox-graph%7Cpdps&angle=4&w=1080&bg=descriptive-studio", 
    categoryId: sportUtilityCars._id 
  });

  const car3 = new Car({ 
    model: "Toyota Aygo", 
    price: 4500, 
    color: "Red", 
    description: "The car is in perfect condition, fully serviced, garage storage, first registration. Before the sale, it underwent a full MOT, polishing and dry cleaning of the interior). The car is completely ready to bring joy to the new owner). If you are interested, please call, we are always ready to answer all your questions)", 
    imageUrl: "https://cdn1.riastatic.com/photosnew/auto/photo/toyota_aygo__497338746hd.webp", 
    categoryId: miniCars._id 
  });
  const car4 = new Car({ 
    model: "Kia Picanto", 
    price: 3500, 
    color: "Brown", 
    description: "A good, economical car. Cheap to maintain. Recently replaced oil, filters, and a new battery. There are LED lamps, the light is very bright, the road is clearly visible.", 
    imageUrl: "https://cdn0.riastatic.com/photosnew/auto/photo/kia_picanto__543449205hd.webp", 
    categoryId: miniCars._id 
  });

  const car5 = new Car({ 
    model: "Audi A6", 
    price: 49000, 
    color: "Black", 
    description: "Maximum equipment, perfect condition. MOT every 5000 km only at the official Porsche West Kyiv service (can be checked in the service history at the station)", 
    imageUrl: "https://cdn2.riastatic.com/photosnew/auto/photo/audi_a6__569151637hd.webp", 
    categoryId: executiveCars._id 
  });
  const car6 = new Car({ 
    model: "Mercedes-Benz E-Class", 
    price: 44000, 
    color: "Black", 
    description: "The car can be inspected in Lutsk, Karpenko-Karyi St. 17, Mitsubishi car center.Freshly driven and customs cleared car. Passed certification. A full package of documents for registering a car for a new owner in MREO.", 
    imageUrl: "https://cdn0.riastatic.com/photosnew/auto/photo/mercedes-benz_e-class__572863080hd.webp", 
    categoryId: executiveCars._id 
  });

  await Promise.all([
    car1.save(),
    car2.save(),
    car3.save(),
    car4.save(),
    car5.save(),
    car6.save(),
  ]);

  mongoose.connection.close();

  console.log("The migration script has been successfully completed.");
}