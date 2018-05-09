import { Solver } from "../libs/solver";

const timeoutLimit = 5*1000;

describe("Bot test",()=>{
    let solver: Solver;
    
    beforeEach(()=>{
        solver = new Solver();
    })

    test.skip("Test get score", async ()=>{
        await solver.init();
        await solver.run();
        expect.assertions(1);
    }, timeoutLimit);
})