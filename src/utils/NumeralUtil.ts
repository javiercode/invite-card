
export default  {
  AMOUNT_PER_PAGE: 15,
  formatterMoney: (money:number) => {
      // return numeral(money).format("0,0.00");
      return money;
    // }
    // return money;
  }, 
  formatterNum: (num:number) => {
      return num;
      // return numeral(num).format("0.00");
    // }
    // return money;
  }, 
};