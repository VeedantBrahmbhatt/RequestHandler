const recordsPerPage = 10;
let currentPage = 1;
let records = [];

document.addEventListener('DOMContentLoaded', function() {
    records = generateRecords(100); // Generating 100 records for demonstration
    displayRecords(currentPage);
    setupPagination();
});

function generateRecords(count) {
    let records = [];
    for (let i = 0; i < count; i++) {
        const id = 551144 + i;
        const requestedBy = `User${i + 1}`;
        const approverL1 = `ApproverL1_${i + 1}`;
        const approverL2 = `ApproverL2_${i + 1}`;
        const additionalField1 = `Field1_${i + 1}`;
        const additionalField2 = `Field2_${i + 1}`;
        const additionalField3 = `Field3_${i + 1}`;
        const additionalField4 = `Field4_${i + 1}`;
        const additionalField5 = `Field5_${i + 1}`;
        
        records.push(`
            <tr class="initial-fields">
                <td>${id}</td>
                <td>Type${i + 1}</td>
                <td>Domain${i + 1}</td>
                <td>Company${i + 1}</td>
                <td>Department${i + 1}</td>
                <td>2024-07-${22 + i % 10} 12:00 AM</td>
                <td>2024-12-${31 - i % 10} 12:00 AM</td>
                <td>Application${i + 1}</td>
                <td>Environment${i + 1}</td>
                <td>Privilege${i + 1}</td>
                <td><button class="expandButton">+</button></td>
            </tr>
            <tr class="extraFields hidden">
                <td colspan="11">
                    <table>
                        <thead>
                            <tr>
                                <th>Requested By</th>
                                <th>Requested On</th>
                                <th>Request Status</th>
                                <th>Business Unit</th>
                                <th>Domain</th>
                                <th>Justification</th>
                                <th>Approver L1</th>
                                <th>App/Rej by L1</th>
                                <th>Approver L2</th>
                                <th>App/Rej by L2</th>
                                <th class="plus-button">+</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${requestedBy}</td>
                                <td>2024-07-${19 + i % 10}</td>
                                <td>Pending</td>
                                <td>BusinessUnit${i + 1}</td>
                                <td>Domain${i + 1}</td>
                                <td>Justification${i + 1}</td>
                                <td>${approverL1}</td>
                                <td>2024-07-${19 + i % 10} 7:07 PM</td>
                                <td>${approverL2}</td>
                                <td>2024-07-${24 + i % 10} 12:06 PM</td>
                                <td><button class="expandButtonSecond">+</button></td>
                            </tr>
                            <tr class="extraFieldsSecond hidden">
                                <td colspan="11">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Additional Field 1</th>
                                                <th>Additional Field 2</th>
                                                <th>Additional Field 3</th>
                                                <th>Additional Field 4</th>
                                                <th>Additional Field 5</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${additionalField1}</td>
                                                <td>${additionalField2}</td>
                                                <td>${additionalField3}</td>
                                                <td>${additionalField4}</td>
                                                <td>${additionalField5}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>`);
    }
    return records;
}

function displayRecords(page) {
    const start = (page - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedRecords = records.slice(start, end);
    document.getElementById('tableBody').innerHTML = paginatedRecords.join('');
    setupExpandButtons();
    setupExpandButtonsSecond();
}

function setupExpandButtons() {
    document.querySelectorAll('.expandButton').forEach(button => {
        button.addEventListener('click', function() {
            var extraFields = this.closest('tr').nextElementSibling;
            if (extraFields.classList.contains('hidden')) {
                extraFields.classList.remove('hidden');
                this.innerText = '-';
            } else {
                extraFields.classList.add('hidden');
                this.innerText = '+';
            }
        });
    });
}

function setupExpandButtonsSecond() {
    document.querySelectorAll('.expandButtonSecond').forEach(button => {
        button.addEventListener('click', function() {
            var extraFields = this.closest('tr').nextElementSibling;
            if (extraFields.classList.contains('hidden')) {
                extraFields.classList.remove('hidden');
                this.innerText = '-';
            } else {
                extraFields.classList.add('hidden');
                this.innerText = '+';
            }
        });
    });
}

function setupPagination() {
    const pageCount = Math.ceil(records.length / recordsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    paginationElement.appendChild(prevButton);

    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => changePage(i));
        if (i === currentPage) pageButton.classList.add('active');
        paginationElement.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.addEventListener('click', () => changePage(currentPage + 1));
    paginationElement.appendChild(nextButton);
}

function changePage(page) {
    const pageCount = Math.ceil(records.length / recordsPerPage);
    if (page < 1) page = 1;
    if (page > pageCount) page = pageCount;
    currentPage = page;
    displayRecords(page);
    setupPagination();
}
