const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//出現錯誤訊息函式
//parentElement 指定父元素，這邊就是指input的父元素
function showError(input , massage){
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = massage;

}

//成功訊息
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


//驗證信箱功能，利用正則表達

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




//確認密碼是否吻合

function checkpassword (input1 , input2){
    if(input1.value !== input2.value){
        showError(input2,'password is not match');
    }else if(input1.value == input2.value){
        showSuccess(password2);
    }
}


//馬上判斷是否正確 我使用keyup讓離開鍵盤時觸發事件
// 事件設定
// preventDefault 將預設為空 要不然會執行基本提交動作
form.addEventListener('keyup',function(e){
    e.preventDefault()
    
    if(username.value.length > 0){
        if(username.value.length<3){
            showError(username,'must be at least '+3+ ' characters');
        }else if (username.value.length>15){
            showError(username,'must be less then '+15+ ' characters');
        }else if (username.value.length>=3){
            showSuccess(username);
        }

    }

    if(email.value.length > 0){
        if(email.value === '' ){
            showError(email,'email is required');
        }else if (!isValidEmail(email.value)){
            showError(email,'Email is not valid');
        }else{
            showSuccess(email);
        }
    }

    if(password.value.length > 0){
        if(password.value.length<3){
            showError(password,'must be at least '+8+ ' characters');
        }else if (password.value.length>16){
            showError(password,'must be less then '+16+ ' characters');
        }else if (password.value.length>=8){
            showSuccess(password);
        }

    }

    if(password2.value.length > 0){
        checkpassword (password , password2);
    }

})



form.addEventListener('submit',function(e){
    
    
    if(username.value === '' ){
        showError(username,'Username is required');
    }else{
        showSuccess(username);
    }

    if(email.value === '' ){
        showError(email,'email is required');
    }else if (!isValidEmail(email.value)){
        showError(email,'Email is not valid');
    }else{
        showSuccess(email);
    }

    if(password.value === '' ){
        showError(password,'password is required');
    }else{
        showSuccess(password);
    }

    if(password2.value === '' ){
        showError(password2,' Please confirm your password');
    }else{
        showSuccess(password2);
    }
    
 
checkpassword(password , password2);
checkLength(username,3 , 15);
checkLength(password,8 , 16);


})







