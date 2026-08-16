// js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // In a real app, you would fetch the user's auth state and events from Firebase here.
    console.log("User Dashboard loaded. Ready to fetch data.");
});

// Expose copy function to global window so the inline onclick works
window.copyToClipboard = function(inputId) {
    const copyText = document.getElementById(inputId);
    
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value).then(() => {
        // Simple visual feedback
        const btn = copyText.nextElementSibling;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    });
};
