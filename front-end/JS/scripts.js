document.addEventListener("DOMContentLoaded", () => {
    fetch('/get-schedule')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('teacher-schedule');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.time_slot}</td>
                    <td>${row.monday}</td>
                    <td>${row.tuesday}</td>
                    <td>${row.wednesday}</td>
                    <td>${row.thursday}</td>
                    <td>${row.friday}</td>
                `;
                tbody.appendChild(tr);
            });
        });
});
