import { Counter } from "../model/counter.js";

export async function createQuestionCounter() {
    const exist = await Counter.exists({_id: "question"}); 
    if (exist != null) {
        console.log("qCounter already exists")
    } else {
        const qCounter = new Counter({_id: "question", seq:1});

        try {
            const createQCounter = await qCounter.save();
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