const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


//dodawanie lokazizacji przez użytkownika
const updateUI = (data) => {

    const {cityDets, weather } = data;

    //update szczegółów lokalizacji i pogody
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;


    // update ikon noc/dzień i ikonki pogody
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);


    //usuwa class d-none (ukrywa lokalizację/pogodę przed wpisaniem użytkownika)
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};


cityForm.addEventListener('submit', event => {

    event.preventDefault();

    //przechowuje miasto wpisane przez użytkownika
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui nowym miastem
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));

    // dodawanie miasta do local storage
    localStorage.setItem('city', city);
    
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(error => console.log(error));
}