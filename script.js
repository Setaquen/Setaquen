document.addEventListener('DOMContentLoaded', function(){
    const contactToggle = document.querySelector('.contact-toggle');
    const contactBox = document.getElementById('contact-box');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    const themeToggle = document.querySelector('.theme-toggle');

    // Theme handling: default to dark unless the user explicitly chose light
    function setTheme(theme){
        document.body.setAttribute('data-theme', theme);
        try{ localStorage.setItem('theme', theme); } catch(e){}
        if(themeToggle){
            const isLight = theme === 'light';
            themeToggle.setAttribute('aria-pressed', isLight);
            themeToggle.innerHTML = isLight ? '<span class="icon">☀️</span>' : '<span class="icon">🌙</span>';
        }
    }

    // Initialize theme (dark by default)
    const savedTheme = (()=>{ try{ return localStorage.getItem('theme'); }catch(e){return null;} })();
    setTheme(savedTheme === 'light' ? 'light' : 'dark');

    if(themeToggle){
        themeToggle.addEventListener('click', ()=>{
            const current = document.body.getAttribute('data-theme') || 'dark';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // Contact toggle
    if(contactToggle && contactBox){
        contactToggle.addEventListener('click', ()=>{
            const isHidden = contactBox.hasAttribute('hidden');
            if(isHidden){
                contactBox.removeAttribute('hidden');
                contactToggle.setAttribute('aria-expanded','true');
            } else {
                contactBox.setAttribute('hidden','');
                contactToggle.setAttribute('aria-expanded','false');
            }
        });
    }

    // Mobile nav toggle
    if(mobileToggle && siteNav){
        mobileToggle.addEventListener('click', ()=>{
            const isVisible = siteNav.style.display === 'flex';
            siteNav.style.display = isVisible ? 'none' : 'flex';
            // If opened on small screens, make nav stacked
            if(!isVisible){
                siteNav.style.flexDirection = 'column';
                siteNav.style.alignItems = 'flex-end';
            } else {
                siteNav.style.flexDirection = '';
                siteNav.style.alignItems = '';
            }
        });

        // Close mobile nav after clicking a link (better UX)
        siteNav.addEventListener('click', (e)=>{
            if(window.innerWidth <= 800 && e.target.tagName === 'A'){
                siteNav.style.display = 'none';
            }
        });
    }
});