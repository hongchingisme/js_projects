const container = document.querySelector('.container');

// 使用 querySelectorAll 可以將重複的class 變成陣列，如果是使用querySelector的話只會抓取重複class的第一個
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie')

populateUI();

// 因為這個value值我們要做加減，所以使用 + 號 把它從 string 變成 number ( + = parseInt)
let ticketPrice = +movieSelect.value




// 儲存更換電影之後，電影的價錢與總價

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
//寫入計算價錢的函式，我們定義選取成功的數量，因為當我們使用querySelectorAll的時候，它會回傳陣列，所以我們可以透過長度去乘上選取上的價錢。
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //抓取定位成功的返還陣列，每訂位成功就返還一個 seats 陣列內的 seat 的位置
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })
    //設定localStorage讓使用者關閉瀏覽器時不會使資料消失
    //setItem 存入資料
    //localStorage儲存資料的時候，只接受「字串string」，所以資料會被強制變成string，所以透過
    //使用JSON.stringify()方法，將要儲存的資料轉換為 JSON 格式的字串
    //要取出資料時，再透過 JSON.parse() 方法，將資料轉換回原本的格式
    //這裡就是 存入 被定位成功的陣列。
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount *ticketPrice;
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    //當我們選擇後，重新整理頁面，會將原本儲存好的陣列拿出來比對，如果他有選擇並且重整，陣列會為-1開始
    //因為重新整理後，原本的陣列就會重新，代表重整前的數據已經沒了，但資料還有，所以就會是負值
    //透過這個機制，我們建立一個 if ，如果儲存的資料不是空的，或者大於0的時候，讓每個seats執行函式
    //如果seat儲存的資料 >-1 就把那個 seat 加入 class selected 
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if (selectedSeats.indexOf(index) >-1){
                seat.classList.add('selected');
            }
        })
    }

    //跟上面一樣，重新整理頁面的時候，如果資料不是空的，就執行，讓我們抓取之前的電影index

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null ){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//寫入不同選項，價錢不同疊加的監聽事件，當我們修改選項後，將指定的選項目標的value變成ticketPrice
//呼叫儲存資料的函式 14行
movieSelect.addEventListener('change',function(e){
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount;
})

// 寫入點擊的事件監聽，如果點擊的元素的 class 包含 seat "並且" "非" 點擊的元素包含 occupied 的話，給予點擊的元素增加 selected 的元素。
// target(目標)
// classList (該元素的class)
// contains (包含)
// toggle(新增與取消) 像這邊是點擊事件，所以會變成點一下新增，再點一次取消。  
container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') &&!e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();

});

//更新價錢與座位
updateSelectedCount();