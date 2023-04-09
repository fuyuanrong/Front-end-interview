
//js冒泡排序  最慢的排序方式
/**
    比较相邻的两个元素,根据大小来决定是否交换位置
    比较的次数位数组长度
**/
let arr = [9,5,3,6,2,1,4,7,8];
for (let index = 0 ; index < arr.length - 1 ; index++) {
    for (let i = 0; i < arr.length-1; i++) {
        if(arr[i] > arr[i+1]){
            // 大数在前小数在后的话交换位置
            let temp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = temp;
        }
    }
}
console.log(arr);





// (加工版)
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


//  选择排序
function selectSort(arr){
    let len = arr.length;
    let minIndex,temp;
    for (let i = 0; i < len - 1 ; i++) {
        minIndex = i;
        for (let j = 0; j < len; j++) {
            if(arr[j]<arr[minIndex]){
                //寻找最小值
                minIndex = j;  //将最小值索引保存
            }
            
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] =  temp;
        
    }
    return arr
}

//插入排序
function insertSort(arr){
    let length = arr.length;
    //从1开始
    for (let i = 1; i < length; i++) {
        let preIndex = i - 1;
        let current = arr[i];
        //在i之前都是已排序好的数,while的作用是找到一个坑位,插入current
        while (preIndex>=0&& arr[preIndex]>current) {
            //对大于current的值,往后移一位,给current的插入腾出位置
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr
}
//希尔排序
function hillSort(arr){
    //每次向下得到一半的增量
    let gap = Math.floor(arr.length/2);
    // 根据步长得到的子序列如果间隔大于0,则表示还可以继续分组
    while (gap>=1) {
        //每个分组进行插入排序
        for (let i = gap; i < arr.length; i++) {
            let j,temp = arr[i];
            for ( j = i-gap; j >=0&&temp<arr[j]; j = j - gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
        //缩短一半步长
        gap = Math.floor(gap/2);
    }
    return arr
}
