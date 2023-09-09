import { Counter } from "../model/counter.js";
import { Question } from "../model/question.js";
import sampleQuestions from "../routes/sampleQuestions.js";

export async function createQuestionCounter() {
    const exist = await Counter.exists({_id: "question"}); 
    if (exist != null) {
        console.log("qCounter already exists")
    } else {
        const qCounter = new Counter({_id: "question", seq:1});

        try {
            const createQCounter = await qCounter.save();
            // populate the database (for now)
            async function tempPopulateDatabase(q) {
                const id = await getNextQuestionId();
                const newQ = new Question({
                    question_id: id,
                    ...q
                });
                await newQ.save();
            }
            sampleQuestions.forEach(tempPopulateDatabase);
            return createQCounter;
        } catch (error) {
            throw error;
        }
    }
}

export async function getNextQuestionId() {
    try{
        const qCounter = await Counter.findOneAndUpdate(
            {_id: "question"},
            { $inc: { seq: 1 } }
        )
        console.log(qCounter);
        return qCounter.seq;
    } catch (error) {
        return error;
    }
}

