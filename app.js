
import {setFlickering, revealContent, renderEmailDiv, copyToClipboard, 
    unrenderEmailDiv, renderContent, renderAboutMe} from './utils';

    


const worksBtnClickedModule = (function() { /*used in the event listener 'works-btn' and unrenderWorks */
    let worksBtnClickedOnce = false;
    function switchWorksBtnClicked() {
        worksBtnClickedOnce = !worksBtnClickedOnce
    }
    return {worksBtnClickedOnce, switchWorksBtnClicked};
})();



function render1work() {
    
    const htmlString = ` 
                            <h4 class='works-text works-text-upper intro-cont'>
                                <h5>React | Bootstrap | CSS | Node | Express</h5>
                                Meme manager app (CRUD Full-Stack App): 
                            </h4>
                            
                            <h4 class='works-text intro-cont'>
                                ♦️ get meme templates from the dedicated API displayed on the main feed<br/>
                                ♦️ interact with them in a bunch of different ways (like, favourite, add comments)<br/>
                                ♦️ upload images from your computer as meme templates<br/>
                                ♦️ create memes using custom text position and other options (using the templates)<br/>
                                ♦️ view memes and meme templates in the dedicated sections 
                            </h4>
                           
                            <a href='https://memes-manager.onrender.com/' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Link <span class='link-span'>></span>
                                </h5>
                            </a> 
                           
                            <a href='https://github.com/adamr7777/memesManager_frontend' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Code <span class='link-span'>></span>
                                </h5>
                            </a> 
                        `;
    renderContent(htmlString);
};


function render2work() {

    const htmlString = ` 
                            
                            <h4 class='works-text works-text-upper intro-cont'>
                                <h5>React | Bootstrap | CSS | Node | Express | MongoDb | Mongoose</h5>
                                Weather App (Full-Stack App):
                            </h4>

                            <h4 class='works-text intro-cont'>
                                ♦️ calls a weather API for the 3-hour period/5-days predictions<br/>
                                ♦️ utilises geolocation API to pinpoint the user's location to get<br/>
                                    accurate results for the area
                                ♦️ calls Unsplash API to receive an image tailored to the weather conditions<br/> 
                                    by using specific query parameters (if it's snowy it displays e.g. snowy mountains)<br/>
                                ♦️ displays a random 'fortune cookie' with a tip for the day from the fortune cookie database stored in MongoDb (via Mongoose)
                                <br/> 
                            </h4>

                            <a href='https://weather-app-hot-not.netlify.app' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Link <span class='link-span'>></span>
                                </h5>
                            </a> 

                            <a href='https://github.com/adamr7777/weatherApp_frontend' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Code <span class='link-span'>></span>
                                </h5>
                            </a> 
                        `;
    renderContent(htmlString);
};


function render3work() {

    const htmlString = ` 
                            
                            <h4 class='works-text works-text-upper intro-cont'>
                                <h5>React | Bootstrap | CSS | Node | Express</h5>
                                AI cat chatbot (Full-Stack App):
                            </h4>

                            <h4 class='works-text intro-cont'>
                                ♦️ the user can hold a back-and-forth realistic conversation with the chatbot<br/>
                                ♦️ utilises GPT-4 technology via POST API call<br/>
                                ♦️ uses custom prompts that shape the AI to impersonate a grumpy and cheeky cat character<br/>
                                ♦️ React app architecture maintains a smooth and responsive user experience<br/>
                            </h4>

                            <a href='https://grumpy-cat-cat.netlify.app' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Link <span class='link-span'>></span>
                                </h5>
                            </a> 

                            <a href='https://github.com/adamr7777/grumpy_cat_frontend' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Code <span class='link-span'>></span>
                                </h5>
                            </a> 
                        `;
    renderContent(htmlString);
};

function render4work() {

    const htmlString = ` 
                            
                            <h3 class='works-text works-text-upper intro-cont'>
                                Portfolio of my frontend web development projects: 
                            </h3>
                            
                            <h3 class='works-text intro-cont'>
                                ♦️ built as a SPA where the various sections displaying the info 
                                    (projects, technologies and about me) are rendered on 
                                    the screen conditionally<br/>
                                ♦️ custom hand-made CSS - JS animations.
                            </h3>
                            
                            <a href='https://portfolio-appweb.netlify.app/' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Link <span class='link-span'>></span>
                                </h5>
                            </a> 
                           
                            <a href='https://github.com/adamr7777/portfolio_page' target='_blank'>
                                <h5 class='password-link intro-cont'>
                                    <span class='link-span'><</span> Code <span class='link-span'>></span>
                                </h5>
                            </a> 
                        `;
    renderContent(htmlString);
};





function renderWorks() {
    const worksDiv = document.getElementById('works-div');
    const aboutmeBtn = document.getElementById('about-me-btn');
    const worksBtn = document.getElementById('works-btn');
    worksBtn.textContent += ':';
    worksBtn.classList.remove('nav-item');
    worksDiv.classList.add('works-clicked');
    aboutmeBtn.classList.add('about-me-btn-changed');
    worksDiv.style.background = '#080808';
    worksDiv.style.opacity = 0.80;
    worksDiv.innerHTML += `
        <button id='close-btn-works' class='close-btn-works projects'>X</button>
        <p class='projects hidden' id='meme-manager'>Meme Manager</p>
        <p class='projects hidden' id='weather-app'>Weather App</p>
        <p class='projects hidden' id='grumpy-cat'>Grumpy Cat</p>
        <p class='projects hidden' id='portfolio'>My Portfolio</p>
    `              /*add new projects */
    const passwordG = document.getElementById('meme-manager');
    const weatherApp = document.getElementById('weather-app');
    const grumpyCat = document.getElementById('grumpy-cat');
    const portfolio = document.getElementById('portfolio');
    const appearingMemeManager = setTimeout(()=> {
        passwordG.classList.remove('hidden');
        passwordG.classList.add('visible');
    }, 250)
    const appearingWeatherApp = setTimeout(()=> {
        weatherApp.classList.remove('hidden');
        weatherApp.classList.add('visible');
    }, 250)
    const appearingCat= setTimeout(()=> {
        grumpyCat.classList.remove('hidden');
        grumpyCat.classList.add('visible');
    }, 250)
    const appearingPortfolio= setTimeout(()=> {
        portfolio.classList.remove('hidden');
        portfolio.classList.add('visible');
    }, 250)
};


function unrenderWorks() {
    const {switchWorksBtnClicked} = worksBtnClickedModule;
    const worksDiv = document.getElementById('works-div');
    const aboutmeBtn = document.getElementById('about-me-btn');
    const worksBtn = document.getElementById('works-btn');
    const passwordG = document.getElementById('meme-manager');
    const weatherApp = document.getElementById('weather-app');
    const grumpyCat = document.getElementById('grumpy-cat');
    const portfolio = document.getElementById('portfolio');
    const closeBtnWorks = document.getElementById('close-btn-works');
    passwordG.classList.remove('visible');
    passwordG.classList.add('hidden');
    weatherApp.classList.remove('visible');
    weatherApp.classList.add('hidden');
    grumpyCat.classList.remove('visible');
    grumpyCat.classList.add('hidden');
    portfolio.classList.remove('visible');
    portfolio.classList.add('hidden');
    const dissapearingWorksMenu = setTimeout(()=> {
        worksBtn.textContent = 'works';
        aboutmeBtn.classList.remove('about-me-btn-changed');
        worksDiv.classList.remove('works-clicked');
        worksBtn.classList.add('nav-item');
        closeBtnWorks.classList.add('hidden');
        worksDiv.innerHTML = `<p id='works-btn' class='works-btn nav-item'>works</p>`;
        worksDiv.style.opacity = 1;
    }, 750)
    switchWorksBtnClicked();
};


document.addEventListener('click', (event)=> {
    if (event.target.id === 'email-icon') {
        renderEmailDiv() 
    }

    if (event.target.id === 'info-p') {
        copyToClipboard();
    }

    if (event.target.id === 'close-btn') {
        unrenderEmailDiv();
    }

    if (event.target.id === 'about-me-btn') {
       renderAboutMe();
    }

    if (event.target.id === 'works-btn') {
        const {worksBtnClicked, switchWorksBtnClicked} = worksBtnClickedModule;
        if (!worksBtnClicked) {
            renderWorks();
            switchWorksBtnClicked();
        }

    }

    if (event.target.id === 'close-btn-works') {
        unrenderWorks();
    }

    if (event.target.id === 'meme-manager') {
        render1work();
    }

    if (event.target.id === 'weather-app') {
        render2work();
    }

    if (event.target.id === 'grumpy-cat') {
        render3work();
    }

    if (event.target.id === 'portfolio') {
        render4work();
    }
});



   setFlickering();
   revealContent();
   



   