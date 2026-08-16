// js/create.js

document.addEventListener('DOMContentLoaded', () => {
    
    // State Management
    let currentStep = 1;
    const totalSteps = 4;
    const formData = {
        type: 'Wedding', // Default from HTML
        names: '',
        date: '',
        message: '',
        theme: 'minimal' // Default from HTML
    };

    // DOM Elements
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4')
    ];
    
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const progressBar = document.getElementById('progress-bar');
    const stepIndicator = document.getElementById('step-indicator');
    const stepTitle = document.getElementById('step-title');

    const stepTitles = [
        "Event Type",
        "The Details",
        "Theme Selection",
        "Checkout"
    ];

    // Initialize UI
    updateUI();

    // Event Listeners for Navigation
    btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            if (validateStep(currentStep)) {
                saveStepData(currentStep);
                currentStep++;
                updateUI();
            }
        } else {
            // Final Step - Process Payment
            processPayment();
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    // Core Functions
    function updateUI() {
        // Hide all steps, show current step
        steps.forEach((step, index) => {
            if (index === currentStep - 1) {
                step.classList.remove('hidden');
                // Optional: Add a subtle fade-in class if you want
                step.classList.add('animate-fade-in-up'); 
            } else {
                step.classList.add('hidden');
                step.classList.remove('animate-fade-in-up');
            }
        });

        // Update Progress Bar
        const progressPercentage = ((currentStep) / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update Headers
        stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;
        stepTitle.textContent = stepTitles[currentStep - 1];

        // Update Buttons
        btnBack.classList.toggle('hidden', currentStep === 1);
        
        if (currentStep === totalSteps) {
            btnNext.textContent = 'Pay ₹199 & Publish';
            btnNext.classList.remove('bg-slate-900', 'hover:bg-slate-800');
            btnNext.classList.add('bg-brand-600', 'hover:bg-brand-700'); // Make checkout button pop
        } else {
            btnNext.textContent = 'Next Step';
            btnNext.classList.add('bg-slate-900', 'hover:bg-slate-800');
            btnNext.classList.remove('bg-brand-600', 'hover:bg-brand-700');
        }
    }

    function validateStep(step) {
        if (step === 2) {
            const names = document.getElementById('eventNames').value.trim();
            const date = document.getElementById('eventDate').value;
            
            if (!names || !date) {
                alert("Please fill in the required fields (Names and Date).");
                return false;
            }
        }
        return true;
    }

    function saveStepData(step) {
        if (step === 1) {
            const selectedType = document.querySelector('input[name="eventType"]:checked');
            if (selectedType) formData.type = selectedType.value;
        } else if (step === 2) {
            formData.names = document.getElementById('eventNames').value.trim();
            formData.date = document.getElementById('eventDate').value;
            formData.message = document.getElementById('eventMessage').value.trim();
        } else if (step === 3) {
            const selectedTheme = document.querySelector('input[name="themeSelection"]:checked');
            if (selectedTheme) formData.theme = selectedTheme.value;
        }
        
        console.log("Current Form Data:", formData); // For debugging
    }

    function processPayment() {
        btnNext.disabled = true;
        btnNext.textContent = 'Processing...';

        // ==========================================
        // TODO: INTEGRATE RAZORPAY / STRIPE HERE
        // ==========================================
        
        // Mocking a payment delay for demonstration
        setTimeout(() => {
            alert('Payment of ₹199 successful! (Mocked)');
            
            // ==========================================
            // TODO: SAVE formData TO FIREBASE FIRESTORE HERE
            // ==========================================
            
            // Redirect to User Dashboard upon success
            window.location.href = 'dashboard.html';
        }, 1500);
    }
});
