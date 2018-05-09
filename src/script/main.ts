import { Solver } from "../libs/solver";

async function main() {
    const solver = new Solver();
    await solver.init();
    await solver.run();
}

main();