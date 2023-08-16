










function getFlicker() { /*used inside utils.js module only */
    document.getElementById('web-dev-h2').classList.toggle('web-dev-red')
}; 


export function setFlickering() {
        setTimeout(getFlicker, 3000); 
        setTimeout(getFlicker, 3150);
        setTimeout(getFlicker, 5150);
        setTimeout(getFlicker, 5300);
        setTimeout(getFlicker, 5600);
        setTimeout(getFlicker, 5750);
        setTimeout(setFlickering, 5751);
    };

export function revealContent() {
    const emailIcon = document.getElementById('email-icon');
    setTimeout(()=> {
       const navOptions = document.getElementById('nav-options');
       const introduction = document.getElementById('introduction');
       navOptions.classList.remove('hidden');
       navOptions.classList.add('visible');
       introduction.classList.remove('hidden');
       introduction.classList.add('visible');
       emailIcon.classList.remove('hidden');
       emailIcon.classList.add('fa-envelope');
    },1000);
};
    
export function renderEmailDiv() {
    const emailIcon = document.getElementById('email-icon');
    const isReverse = false;
    const emailModal = document.getElementById('email-modal');
    emailIcon.classList.add('hidden-email-icon');
    emailModal.classList.add('visible-email-modal');
    animateGrowthEmail(emailModal, isReverse);
    const content = document.getElementsByClassName('email-modal-content');
    const delayedContent = setTimeout(()=> {
        [...content].forEach((element)=> {
            element.classList.remove('hidden');
            element.classList.add('visible');
        });
    }, 650);
};


function animateGrowthEmail(emailModal, isReverse) { /*used inside utils.js module only */
    if (isReverse === false) {
        let size = 10;
        const theInterval = setInterval(()=> {
            emailModal.style.height = size + 'px';
            emailModal.style.width = size + 'px';
            size += 50;
            if (size >= 350) {
                clearInterval(theInterval);
            }
        }, 100) 
    }
    else if (isReverse === true) {
        let size = 310;
        const theInterval = setInterval(()=> {
            emailModal.style.height = size + 'px';
            emailModal.style.width = size + 'px';
            size -= 50;
            if (size <= 0) {
                clearInterval(theInterval);
            }
        }, 100)
    }
}; 


export function copyToClipboard() {
    const emailH4 = document.getElementById('email-h4');
        const infoP = document.getElementById('info-p');
        navigator.clipboard.writeText(emailH4.textContent)
            .then(()=> {
                infoP.textContent = 'Copied!'          
                infoP.style.color = '#a17917';
                infoP.classList.remove('info-p');
            })
            .catch(err=> {
                alert(`Failed to copy the text: ${err} Please try again`)
            })
};


export function unrenderEmailDiv() {
    const isReverse = true;
    const emailModal = document.getElementById('email-modal');
    const emailIcon = document.getElementById('email-icon');
    const delayedContent = setTimeout(()=> {
        animateGrowthEmail(emailModal, true);
    }, 500)
    const content = document.getElementsByClassName('email-modal-content');
    [...content].forEach((element)=> {
        element.classList.remove('visible');
        element.classList.add('hidden');
    });
    const displayEmailIcon = setTimeout (()=> {
        emailIcon.classList.remove('hidden-email-icon'); 
        emailModal.classList.remove('visible-email-modal'); 
    }, 1230)
};


export function renderContent(htmlString) {
    const introContent =  document.getElementsByClassName('intro-cont');
    const introDiv = document.getElementById('introduction');
    [...introContent].forEach((element)=> {
        element.classList.add('hidden');
    });
    const displayCont = setTimeout(()=> {
        introDiv.innerHTML = htmlString;
    }, 700)
};

export function renderAboutMe() {
    const htmlString = ` 
                        <h3 class='first-item-aboutme intro-cont'>I am a web developer that specialises in frontend, 
                            and works with backend.</h3> 
                        <h3 class='second-item-aboutme intro-cont'>My current stack:</h3>
                        <ul class='about-me-stack intro-cont'>
                            <li>HTML</li>
                            <li>CSS | Bootstrap</li>
                            <li>Vanilla Java Script | React</li>
                            <li>Node | Express | MongoDb | Mongoose</li>
                            <li>Git Version Control</li>
                        </ul>
                        `;
    renderContent(htmlString);  
};


