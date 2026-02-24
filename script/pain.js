function updateCounts(totalDiff, interviewDiff, rejectedDiff, magicDiff) {
    const totalEl = document.getElementById('total-jobs-count');
    const interviewEl = document.getElementById('interview-count');
    const rejectedEl = document.getElementById('rejected-count');
    const magicEl = document.getElementById('job-delete-8');
    if (totalEl) totalEl.innerText = Math.max(0, (parseInt(totalEl.innerText) || 0) + totalDiff);
    if (interviewEl) interviewEl.innerText = Math.max(0, (parseInt(interviewEl.innerText) || 0) + interviewDiff);
    if (rejectedEl) rejectedEl.innerText = Math.max(0, (parseInt(rejectedEl.innerText) || 0) + rejectedDiff);
    if (magicEl) magicEl.innerText = Math.max(0, (parseInt(magicEl.innerText) || 0) + magicDiff);
}
document.addEventListener('click', function (event) {
    const card = event.target.closest('.job-card');
    if (!card) return;

    let currentStatus = card.dataset.status || "none";
    const statusLabel = card.querySelector('.applied');
    if (event.target.classList.contains('interview-btn')) {
        if (currentStatus === "interview") return;

        if (currentStatus === "none") {        
            updateCounts(-1, 1, 0, -1);
        } else if (currentStatus === "rejected") {     
            updateCounts(0, 1, -1, 0);
        }

        card.dataset.status = "interview";
        if (statusLabel) {
            statusLabel.innerText = "APPLIED";
            statusLabel.classList.remove('bg-indigo-100', 'text-indigo-700', 'bg-red-700', 'text-white');
            statusLabel.classList.add('bg-green-700', 'text-white');
        }
    }

   
    if (event.target.classList.contains('rejected-btn')) {
        if (currentStatus === "rejected") return;

        if (currentStatus === "none") {           
            updateCounts(-1, 0, 1, -1);
        } else if (currentStatus === "interview") {      
            updateCounts(0, -1, 1, 0);
        }
        card.dataset.status = "rejected";
        if (statusLabel) {
            statusLabel.innerText = "NOT APPLIED";
            statusLabel.classList.remove('bg-indigo-100', 'text-indigo-700', 'bg-green-700', 'text-white');
            statusLabel.classList.add('bg-red-700', 'text-white');
        }
    }

    const deleteBtn = event.target.closest('.delete-card') || event.target.closest('.fa-trash-can');
    if (deleteBtn) {
        event.stopImmediatePropagation();

        if (currentStatus === "none") {
            updateCounts(-1, 0, 0, -1);
        } else if (currentStatus === "interview") {            
            updateCounts(0, -1, 0, 0);
        } else if (currentStatus === "rejected") {
           updateCounts(0, 0, -1, 0);
        }
        card.remove();   
        filterJobs(currentStatus, null); 
       
    }
});
function filterJobs(status, btn) {
    const allCards = document.querySelectorAll('.job-card');
    const noJobMessage = document.getElementById('job'); 
    const magicEl = document.getElementById('job-delete-8');     
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(b => {
        b.classList.remove('bg-blue-600', 'bg-green-600', 'bg-red-600', 'text-white', 'shadow-md');
        b.classList.add('bg-gray-100', 'text-gray-700');
    });    
    if (btn) {
        btn.classList.remove('bg-gray-100', 'text-gray-700');       
             if (status === 'interview') {
                  btn.classList.add('bg-green-600', 'text-white', 'shadow-md'); 
                     } else if (status === 'rejected') {
              btn.classList.add('bg-red-600', 'text-white', 'shadow-md');
              } else {
                btn.classList.add('bg-blue-600', 'text-white', 'shadow-md'); 
              }
        }      
       let visibleCount = 0;
    
    allCards.forEach(card => {
        const cardStatus = card.dataset.status || "none";
        
        if (status === 'all' || cardStatus === status) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (magicEl) magicEl.innerText = visibleCount;   
    if (visibleCount === 0) {
        noJobMessage.classList.remove('hidden');
        noJobMessage.classList.add('flex'); 
    } else {
        noJobMessage.classList.add('hidden');
        noJobMessage.classList.remove('flex');
    }
}
