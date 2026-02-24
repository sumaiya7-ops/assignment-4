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