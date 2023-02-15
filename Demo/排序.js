
//js冒泡排序(加工版)
function bubbleSort(array,val) {
    // array  必须,所要排序的数组
    // val 可选,数组内所比较的属性,值必须是数字
    let low = 0;
    let high = array.length - 1;
    while (low < high) {
        for (let j = low; j < high; j++) {
            let judge = val ? array[j][val] > array[j + 1][val] : array[j] > array[j + 1]
            if (judge) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
        --high;
    }
    return array;
}
let arr=[
    {a:6,b:2},
    {a:12,b:2},
    {a:16,b:2},
    {a:1,b:2},
    {a:9,b:2},
    {a:11,b:2},
    {a:0,b:2},
    {a:47,b:2},
]
let arr1 = [9,2,3,4,2,8,66,32,4,526,23]
// console.log(bubbleSort(arr1).reverse())



//js快速排序
//基本思路：
// 1.以一个数为基准(中间的数)，比基准小的放到左边，比基准大的放到右边
// 2.再按此方法对这两部分数据分别进行快速排序（递归进行）
// 3.不能再分后退出递归，并重新将数组合并
function quickSort(arr) {
//如果数组元素 <=1 ,没必要排序 直接返回
    if (arr.length <= 1) {
        return arr
    }
    // pivot基准索引
    let pivotIndex = Math.floor(arr.length / 2);
    //找到基准,并且把基准从原数组中删除
    let pivot = arr.splice(pivotIndex, 1)[0];
    //定义左右数组
    let left = [];
    let right = [];
    //比基准小的放在left,大的放在right
    arr.forEach(el => {
        if (el < pivot) {
            left.push(el)
        }else{
            right.push(el)
        }
    });
    return quickSort(left).concat([pivot],quickSort(right))
}
