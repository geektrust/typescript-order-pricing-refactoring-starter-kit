const CAT_NAMES: string[] = ["Electronics", "Books", "Clothing"];
const CAT_SHIP: number[] = [10, 0, 5];


const PROMO_CODES: string[] = ["SAVE10", "TECH15", "READ25", "WINTER20"];
const PROMO_DISCOUNT: number[] = [10, 15, 25, 20];
const PROMO_ELIGIBLE_CATS: string[] = [
 "Electronics,Books,Clothing",
 "Electronics",
 "Books",
 "Clothing",
];


export function processOrder(s: any) {
 const a = s.split(" ");
 const c = a[0];
 let t = 0;
 let sh = 0;
 let seen = "";
 let n = 0;
 const codes: string[] = [];


 if (c !== "Regular" && c !== "Member" && c !== "VIP") {
   console.log("INVALID CUSTOMER TYPE");
   return;
 }


 for (let i = 1; i < a.length; i++) {
   if (a[i][0] === "+") {
     codes.push(a[i].substring(1));
     continue;
   }


   const b = a[i].split(":");
   const cat = b[0];
   const p = parseInt(b[1], 10);
   const q = parseInt(b[2], 10);


   let idx = -1;
   for (let j = 0; j < CAT_NAMES.length; j++) {
     if (CAT_NAMES[j] === cat) { idx = j; }
   }
   if (idx < 0) {
     console.log("INVALID CATEGORY");
     return;
   }


   if (("," + seen).indexOf("," + cat + ",") < 0) { n = n + 1; }
   seen = seen + cat + ",";


   sh = sh + CAT_SHIP[idx] * q;
   t = t + p * q;
 }


 let d = 0;
 if (c === "Member") { d = 10; }
 if (c === "VIP") { d = 20; }


 for (let i = 0; i < codes.length; i++) {
   let pi = -1;
   for (let j = 0; j < PROMO_CODES.length; j++) {
     if (PROMO_CODES[j] === codes[i]) { pi = j; }
   }
   if (pi < 0) {
     console.log("INVALID PROMO CODE");
     return;
   }


   let ok = true;
   const sl = seen.split(",");
   for (let k = 0; k < sl.length; k++) {
     if (sl[k] === "") { continue; }
     if (("," + PROMO_ELIGIBLE_CATS[pi] + ",").indexOf("," + sl[k] + ",") < 0) { ok = false; }
   }
   if (ok && PROMO_DISCOUNT[pi] > d) { d = PROMO_DISCOUNT[pi]; }
 }


 let total = t - (t * d) / 100;
 if (c !== "VIP" && n < 3) { total = total + sh; }


 console.log("Order Total: " + total.toFixed(2));
}
