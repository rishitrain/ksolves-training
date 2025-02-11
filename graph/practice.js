// question no.1

const smallestDifference = (arr1, arr2) => {
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    let m = arr1.length;
    let n = arr2.length;
    let a = 0;
    let b = 0;

    let res = Number.MAX_VALUE;

    while (a < m && b < n) {
        let diff = Math.abs(arr1[a] - arr2[b]);
        res = Math.min(res, diff);

        if (arr1[a] > arr2[b]) {
            b++;
        } else {
            a++;
        }
    }
    return res;
};

const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [12, 13, 14, 15, 16, 17];

console.log(smallestDifference(arr1, arr2));


//question no.2

// const nthFibonacci = (n) => {
//     if (n === 0) return 0;
//     if (n === 1) return 1;

//     return nthFibonacci(n - 1) + nthFibonacci(n - 2);
// };

// console.log(nthFibonacci(10));



const str = "azvdaaarrtaaa";
        let map = {};

        for( let i = 0 ;i <str.length ; i ++ ){
            map[str[i]] =map[str[i]] ? map[str[i]]+1 :1;

        }

        console.log(map['a'])

  
 
  