import { Counter } from "../model/counter.js";
import { filterQuestion, filterQuestions } from "./common.js";
import { populateDatabase } from "./createQuestion.js";

export async function createLeetcodeCounter() {
    const idName = "leetcodeId";
    const startingSeq = 0;

    const exist = await Counter.exists({_id: idName}); 
    if (exist != null) {
        console.log(`${idName} counter already exists`);
    } else {
        const counter = new Counter({_id: idName, seq: startingSeq});
        try {
            const createdCounter = await counter.save();
            return createdCounter;
        } catch (error) {
            throw error;
        }
    }
}

export async function getNextLeetcodeId() {
    const idName = "leetcodeId";
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

export async function setLeetcodeId(num) {
    const idName = "leetcodeId";
    try{
        const counter = await getLeetcodeId();
        counter.seq = num;
        const updatedCounter =  await counter.save();
        return updatedCounter;
    } catch (error) {
        return error;
    }
}

export async function getLeetcodeId() {
    try{
        const idName = "leetcodeId";
        const counter = await Counter.findOne({_id: idName});
        return counter;
    } catch (error) {
        return error;
    }
}

export async function getCurrentLeetcodeId(req, res) {
    try{
        const counter = await getLeetcodeId();
        return res.send({"seq": counter.seq});
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export async function createQuestionBulk(req, res) {
    const questions = req.body.questions

    const resultArr = []
    for (const question of questions) {
        const createdQuestion = await populateDatabase(question);
        const leetcodeId = await getNextLeetcodeId();

        resultArr.push({
            "leetcodeId": leetcodeId,
            "question": filterQuestion(createdQuestion)
        })
    }

    return res.send(resultArr);
}
