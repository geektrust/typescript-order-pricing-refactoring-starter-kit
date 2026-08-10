/*
***********************************************
* This is the driver code. Don't change it!!!
***********************************************
*/


import { processOrder } from "./orderProcessor";


const args: string[] = process.argv.slice(2);


if (args.length === 0) {
 throw new Error("No command line arguments passed");
}


processOrder(args[0]);
