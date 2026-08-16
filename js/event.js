// js/event.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Parse the URL Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    const loadingState = document.getElementById('loading-state');
    const eventContent = document.getElementById('event-content');
    const bodyContainer = document.getElementById('body-container');

    if (!eventId) {
        showError("Invitation not found. Please check your link.");
        return;
    }

    // 2. Fetch Data (Mocking Firebase Firestore)
    setTimeout(() => {
        const eventData = fetchEventData(eventId);
        
        if (eventData) {
            renderWebsite(eventData);
        } else {
            showError("This invitation has expired or does not exist.");
        }
    }, 1200); // Artificial delay to show the premium loading screen

    // --- Core Functions ---

    function fetchEventData(id) {
        // Mock Database. In production: 
        // const doc = await getDoc(doc(db, "events", id)); return doc.data();
        
        const mockDatabase = {
            'evt_98765': {
                names: 'Sarah & James',
                type: 'Wedding',
                date: '2026-12-12',
                message: 'We cannot wait to celebrate the beginning of our forever with you. Join us for a night of love, laughter, and dancing.',
                theme: 'minimal'
            },
            'evt_11111': {
                names: 'Aisha',
                type: 'Birthday',
                date: '2026-08-20',
                message: 'Cheers to 21 years! Join me for an unforgettable evening of celebration.',
                theme: 'elegant'
            }
        };

        return mockDatabase[id] || null;
    }

    function renderWebsite(data) {
        // Format the date nicely
        const dateObj = new Date(data.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });

        // Set the page title
        document.title = `${data.names} | ${data.type}`;

        // Select the correct template based on theme
        let htmlTemplate = '';

        if (data.theme === 'minimal') {
            htmlTemplate = getMinimalTheme(data, formattedDate);
            bodyContainer.className = "bg-slate-50 antialiased min-h-screen flex flex-col font-sans text-slate-800";
        } else if (data.theme === 'elegant') {
            htmlTemplate = getElegantTheme(data, formattedDate);
            bodyContainer.className = "bg-slate-900 antialiased min-h-screen flex flex-col font-serif text-slate-100";
        }

        // Inject content and trigger animations
        eventContent.innerHTML = htmlTemplate;
        
        // Hide loader, show content
        loadingState.style.opacity = '0';
        setTimeout(() => {
            loadingState.style.display = 'none';
            eventContent.classList.remove('hidden');
            // Slight delay before fading in content for smoothness
            setTimeout(() => {
                eventContent.style.opacity = '1';
            }, 50);
        }, 500);
    }

    function showError(msg) {
        loadingState.style.display = 'none';
        bodyContainer.className = "bg-slate-50 min-h-screen flex items-center justify-center font-sans";
        eventContent.innerHTML = `
            <div class="text-center px-6 fade-in-slow">
                <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h1 class="text-2xl font-bold text-slate-900 mb-2">Oops!</h1>
                <p class="text-slate-500">${msg}</p>
            </div>
        `;
        eventContent.classList.remove('hidden');
        eventContent.style.opacity = '1';
    }

    // --- Theme Templates ---

    function getMinimalTheme(data, formattedDate) {
        return `
            <div class="max-w-4xl mx-auto w-full px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center fade-in-slow h-full min-h-[80vh]">
                <span class="text-brand-500 font-semibold tracking-widest uppercase text-sm mb-6 block">
                    You are invited to our ${data.type}
                </span>
                
                <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-8 leading-tight">
                    ${data.names}
                </h1>
                
                <div class="w-16 h-1 bg-brand-500 mx-auto mb-8 rounded-full"></div>
                
                <p class="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    "${data.message}"
                </p>
                
                <div class="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-100 inline-block">
                    <p class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">When</p>
                    <p class="text-xl font-semibold text-slate-800">${formattedDate}</p>
                </div>
            </div>
        `;
    }

    function getElegantTheme(data, formattedDate) {
        return `
            <div class="max-w-3xl mx-auto w-full px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center fade-in-slow h-full min-h-[80vh]">
                <div class="p-8 md:p-16 elegant-border relative w-full bg-slate-900 shadow-2xl">
                    
                    <span class="text-gold-500 italic text-lg mb-4 block">
                        Join us to celebrate the ${data.type.toLowerCase()} of
                    </span>
                    
                    <h1 class="text-5xl md:text-7xl text-white mb-10 font-normal tracking-wide">
                        ${data.names}
                    </h1>
                    
                    <div class="flex items-center justify-center gap-4 mb-10 opacity-70">
                        <div class="h-px w-12 bg-gold-500"></div>
                        <span class="text-gold-500 text-2xl">✧</span>
                        <div class="h-px w-12 bg-gold-500"></div>
                    </div>
                    
                    <p class="text-lg text-slate-300 max-w-xl mx-auto mb-12 font-light italic leading-loose">
                        ${data.message}
                    </p>
                    
                    <div class="mt-8">
                        <p class="text-gold-400 tracking-[0.2em] uppercase text-sm mb-2">Date</p>
                        <p class="text-2xl text-white tracking-wider">${formattedDate}</p>
                    </div>
                </div>
            </div>
        `;
    }
});
