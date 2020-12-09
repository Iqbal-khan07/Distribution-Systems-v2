class DataDisplayUtils{
    static displayMoneyValue(value){
        return "Rs. "+Number(value).toFixed(2)
    }
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }    
}

export default DataDisplayUtils;