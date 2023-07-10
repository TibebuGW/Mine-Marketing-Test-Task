import { Router } from "express";
import { saveResult, getResultsByUser } from "../controllers/resultController";
const resultRoute = Router()

resultRoute.post("/saveresult", saveResult)
resultRoute.get("/getresultsbyuser", getResultsByUser)

export default resultRoute