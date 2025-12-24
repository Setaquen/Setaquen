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

    // Mobile nav toggle (class-based overlay, mobile-only)
    if(mobileToggle && siteNav){
        // initialize ARIA
        mobileToggle.setAttribute('aria-expanded','false');

        const toggleNav = (e)=>{
            // only active on mobile widths
            if(window.innerWidth > 800) return;
            if(e && e.preventDefault) e.preventDefault();
            const isOpen = siteNav.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            // simple hamburger -> X toggle (text-based for now)
            mobileToggle.textContent = isOpen ? '✕' : '☰';
        };

        mobileToggle.addEventListener('click', toggleNav);
        mobileToggle.addEventListener('touchstart', toggleNav);

        // Close mobile nav after clicking a link (better UX)
        siteNav.addEventListener('click', (e)=>{
            if(window.innerWidth <= 800 && e.target.tagName === 'A'){
                siteNav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded','false');
                mobileToggle.textContent = '☰';
            }
        });

        // Clean up when resizing back to desktop
        window.addEventListener('resize', ()=>{
            if(window.innerWidth > 800){
                siteNav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded','false');
                mobileToggle.textContent = '☰';
            }
        });
    }

    // --- Christmas timed event (non-intrusive) ---
    (function(){
        const now = new Date();
        const url = typeof URL !== 'undefined' ? new URL(window.location.href) : null;
        const preview = url ? url.searchParams.get('christmas') === '1' : false;
        // Active Dec 20 - Dec 26 inclusive
        const isInRange = preview || (now.getMonth() === 11 && now.getDate() >= 20 && now.getDate() <= 26);
        if(!isInRange) return;

        // Mark season (keeps theme toggle behavior intact)
        document.body.setAttribute('data-season','christmas');

        // Add decorative garland (non-interactive)
        const garland = document.createElement('div');
        garland.className = 'christmas-garland';
        garland.setAttribute('aria-hidden','true');
        document.body.appendChild(garland);

        // Respect prefers-reduced-motion
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(!prefersReduced){
            const snow = document.createElement('div');
            snow.id = 'snow';
            snow.setAttribute('aria-hidden','true');
            document.body.appendChild(snow);

            const isLightTheme = document.body.getAttribute('data-theme') === 'light';
            const flakes = isLightTheme ? 18 : 28;
            for(let i=0;i<flakes;i++){
                const f = document.createElement('div');
                f.className = 'snowflake';
                f.style.left = Math.random()*100 + '%';
                f.style.animationDelay = (Math.random()*10)+'s';
                f.style.opacity = (0.5 + Math.random()*0.5).toString();
                f.style.fontSize = (8 + Math.random()*18) + 'px';
                f.style.animationDuration = (6 + Math.random()*8) + 's';
                f.textContent = isLightTheme ? '❅' : '❄';
                if(isLightTheme){
                    f.style.color = '#154525';
                    f.style.textShadow = '0 1px 0 rgba(255,255,255,0.8)';
                } else {
                    f.style.color = 'white';
                    f.style.textShadow = '0 1px 2px rgba(0,0,0,0.6)';
                }
                snow.appendChild(f);
            }
        }
    })();

});