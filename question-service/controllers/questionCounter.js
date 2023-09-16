import { Counter } from "../model/counter.js";
import { Question } from "../model/question.js";
import sampleQuestions from "../routes/sampleQuestions.js";
import { populateDatabase } from "./createQuestion.js";

export async function createQuestionCounter() {
    const idName = "question";
    const startingSeq = 1;

    const exist = await Counter.exists({_id: idName}); 
    if (exist != null) {
        console.log(`${idName} counter already exists`)
    } else {
        const counter = new Counter({_id: idName, seq: startingSeq});
        try {
            const createdCounter = await counter.save();
            
            await sampleQuestions.forEach(populateDatabase); // populate the database (for now)

            return createdCounter;
        } catch (error) {
            throw error;
        }
    }
}

export async function getNextQuestionId() {
    const idName = "question";
    try{
        const counter = await Counter.findOneAndUpdate(
            {_id: idName},
            { $inc: { seq: 1 } }
        );
        return counter.seq;
    } catch (error) {
        return error;
    }
}

