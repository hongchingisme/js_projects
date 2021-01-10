const container = $('.container');
const seats = $('.row .seat:not(.occupied)');
const count = $('#count');
const total = $('#total');
const movieSelect = $('#movie');

populateUI();

let ticketPrice = parseInt(movieSelect.val());


function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
function updateSelectedCount(){
    const selectedSeats = $('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    
    count.text(selectedSeatsCount);
    total.text(selectedSeats.length *ticketPrice );

}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length>0){
        seats.each(function(index,seat){
            if (selectedSeats.indexOf(index) >-1){
                $(seat).addClass('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null ){
        movieSelect.get(0).selectedIndex = selectedMovieIndex;
    }
}

container.click(function(e) {
if($(e.target).hasClass('seat') && ! $(e.target).hasClass('occupied')){
    $(e.target).toggleClass('selected');
    }

    updateSelectedCount() 
});

movieSelect.change(function(e){
    ticketPrice =  parseInt($(this).val());
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})



updateSelectedCount();