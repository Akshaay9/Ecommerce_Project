import { mensNewDrop } from "../Data.js/MensNewDrop";
import { womensDrop } from "../Data.js/WomensNewDrop";
import { createServer } from "miragejs";
import {homeWorkoutEquipments} from "../Data.js/HomeWorkoutEquipments"
import { resistanceTrainingEquipment } from "../Data.js/ResistanceTrainingEquipments";
import { yogaEquipment } from "../Data.js/YogaEquipments";

export const mensNewDropProductListAPI = () => {
  createServer({
    routes() {
      this.namespace = "api";
      this.get("/products/mensNewDrops", () => {
        return {
          products: mensNewDrop,
        };
      });
      this.namespace = "api1";
      this.get("/products/womensNewDrop", () => {
        return {
          products: womensDrop,
        };
      });
      this.namespace = "api2";
      this.get("/products/homeWorkout", () => {
        return {
          products: homeWorkoutEquipments,
        };
      });
      this.namespace = "api3";
      this.get("/products/resistanceEquipments", () => {
        return {
          products: resistanceTrainingEquipment,
        };
      });
      this.namespace = "api4";
      this.get("/products/yogaEquipment", () => {
        return {
          products: yogaEquipment,
        };
      });
    },
  });
};
