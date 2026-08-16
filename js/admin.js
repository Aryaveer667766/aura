// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Security Check (Mock Firebase Auth Check)
    const authOverlay = document.getElementById('auth-overlay');
    const adminContent = document.getElementById('admin-content');
    
    // Simulate network delay for checking admin custom claims
    setTimeout(() => {
        const isAdmin = true; // TODO: Replace with Firebase auth state
        
        if (isAdmin) {
            authOverlay.style.display = 'none';
            adminContent.style.display = 'flex';
            loadAdminData();
        } else {
            // Kick them out if not admin
            window.location.href = 'index.html';
        }
    }, 800);

    // 2. Data Population
    function loadAdminData() {
        const tableBody = document.getElementById('admin-table-body');
        
        // Mock Data from Database
        const mockData = [
            { id: 'evt_98765', names: 'Sarah & James', type: 'Wedding', date: '2026-12-12', theme: 'Minimal' },
            { id: 'evt_98766', names: 'Aisha\'s 21st', type: 'Birthday', date: '2026-08-20', theme: 'Elegant' },
            { id: 'evt_98767', names: 'Rohan & Priya', type: 'Anniversary', date: '2026-09-05', theme: 'Minimal' },
        ];

        tableBody.innerHTML = mockData.map(event => `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">
                    <div class="font-semibold text-slate-900">${event.names}</div>
                    <div class="text-xs text-slate-500">${event.id}</div>
                </td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
                        ${event.type}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">${event.date}</td>
                <td class="px-6 py-4 text-sm text-slate-600">${event.theme}</td>
                <td class="px-6 py-4 text-right">
                    <button class="text-brand-600 hover:text-brand-900 font-medium text-sm mr-3">Edit</button>
                    <button class="text-red-500 hover:text-red-700 font-medium text-sm" onclick="alert('Delete functionality locked.')">Delete</button>
                </td>
            </tr>
        `).join('');
    }
});
