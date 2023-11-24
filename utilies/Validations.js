//validate email
export const isValidEmail = (stringEmail) => {
     return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
    return true;
}
    
//validate password
export const isValidPassword = (stringPassword) => stringPassword.length >= 3

  