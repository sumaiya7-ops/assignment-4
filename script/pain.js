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
    }
});