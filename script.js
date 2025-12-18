document.addEventListener('DOMContentLoaded', function(){
    const contactToggle = document.querySelector('.contact-toggle');
    const contactBox = document.getElementById('contact-box');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const siteNav = document.querySelector('.site-nav');

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

    if(mobileToggle && siteNav){
        mobileToggle.addEventListener('click', ()=>{
            const isVisible = siteNav.style.display === 'flex';
            siteNav.style.display = isVisible ? 'none' : 'flex';
        });
    }
});