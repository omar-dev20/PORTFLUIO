let btn = document.querySelector('.back-to-top');
window.onscroll = function() {
    if (window.scrollY > 500) {
       btn.style.opacity = "1";
       btn.style.pointerEvents = "auto";
    } else {
        btn.style.opacity = "0";
    }
};


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('load-show');
        }
    });
});

document.querySelectorAll('.load-hidden').forEach(el => {
    observer.observe(el);
});
const targets = document.querySelectorAll('a[href^="#"], .back-to-top');

targets.forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        let targetId = this.getAttribute('href');
        let targetPosition = 0;

        if (targetId && targetId !== "#") {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            }
        }

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        function animation(currentTime) {
            if (!start) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);

            const ease = easeInOutQuad(progress);
            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
});
let el = document.querySelector('.scrollar');
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop; 
    el.style.width = scrollTop / height * 100 + '%';
});
let toggleBtn = document.getElementById('toggleBtn');
let img = document.querySelector('.imge img');
let secondNav = null;
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('clicked');
    if (toggleBtn.classList.contains('clicked')) {
        toggleBtn.classList.replace('fa-bars', 'fa-xmark');
        img.style.marginTop = '50px';
        if (!secondNav) {
            secondNav = document.createElement('nav');
            const secondNavUl = document.createElement('ul');
            
            const links = [
                { text: 'Home', href: '#Home' },
                { text: 'Skills', href: '#Skills' },
                { text: 'About', href: '#about' },
                { text: 'Projects', href: '#Projects' },
                { text: 'Contact', href: '#contact-me' }
            ];

            links.forEach(linkData => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = linkData.href;
                a.textContent = linkData.text;
                a.style.cssText = `
                    color: var(--text);
                    font-size: 18px;
                    font-weight: 500;
                    transition: var(--main-transition);
                    display: block;
                    padding: 10px;
                `;
                a.addEventListener('click', () => {
                    secondNav.style.display = 'none';
                    toggleBtn.classList.remove('clicked');
                    toggleBtn.classList.replace('fa-xmark', 'fa-bars');
                });

                li.appendChild(a);
                secondNavUl.appendChild(li);
            });

            secondNav.appendChild(secondNavUl);
            document.body.appendChild(secondNav);
            secondNav.style.cssText = `
                position: fixed;
                top: 100px; 
                left: 0;
                width: 100%;
                background-color: rgba(5, 8, 16, 0.95);
                backdrop-filter: blur(10px);
                z-index: 1000;
                border-bottom: 2px solid var(--primary);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px 0;
            `;

            secondNavUl.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                list-style: none;
                padding: 0;
                margin: 0;
            `;
        } else {
            secondNav.style.display = 'flex';
        }
    } else {
        toggleBtn.classList.replace('fa-xmark', 'fa-bars');
        if (secondNav) secondNav.style.display = 'none';
    }
});