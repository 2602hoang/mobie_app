export const fomartPrice = (number)=>{
    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });

      return numberFormat.format(number);
}