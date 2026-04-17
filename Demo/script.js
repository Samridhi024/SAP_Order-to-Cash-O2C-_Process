const steps = [
    { name: "Inquiry", tcode: "VA11", desc: "Enter customer interest details.", fields: { "Cust ID": "C-10045", "Material": "ELEC-LAP-001", "Qty": "50 Units" } },
    { name: "Sales Order", tcode: "VA01", desc: "Create the formal contract and check credit.", fields: { "Order Type": "OR", "Net Value": "₹ 26,00,000", "Availability": "Confirmed" } },
    { name: "Delivery", tcode: "VL01N", desc: "Define shipping point and storage location.", fields: { "Shipping Pt": "SP01", "Storage Loc": "SL01", "Pick Status": "Completed" } },
    { name: "Goods Issue", tcode: "VL02N", desc: "Post Goods Issue to reduce stock.", fields: { "Mvt Type": "601", "Material Doc": "49000123", "COGS": "₹ 18,00,000" }, acc: { dr: "COGS A/c (Dr)", cr: "Inventory A/c (Cr)" } },
    { name: "Billing", tcode: "VF01", desc: "Generate invoice and calculate taxes.", fields: { "Tax (18%)": "₹ 4,68,000", "Total Due": "₹ 30,68,000", "Terms": "Net 30" }, acc: { dr: "Accounts Receivable (Dr)", cr: "Sales Revenue (Cr)" } },
    { name: "Payment", tcode: "F-28", desc: "Clear the invoice with the bank receipt.", fields: { "Bank": "HDFC-IND", "Amount": "₹ 30,68,000", "Balance": "₹ 0.00" }, acc: { dr: "Bank A/c (Dr)", cr: "Accounts Receivable (Cr)" } }
];

let current = 0;

// This function saves whatever you type back into our 'steps' data
function updateData(key, value) {
    steps[current].fields[key] = value;
}

function render() {
    const s = steps[current];
    document.getElementById('p-bar').style.width = ((current + 1) / steps.length) * 100 + '%';

    document.getElementById('nav-pipeline').innerHTML = steps.map((step, i) => `
        <div class="step-node ${i === current ? 'active' : (i < current ? 'done' : '')}">
            ${step.name}<br><strong>${step.tcode}</strong>
        </div>
    `).join('');

    let html = `
        <div class="description-box"><strong>Business Process:</strong> ${s.desc}</div>
        <div class="form-grid">
            ${Object.entries(s.fields).map(([k, v]) => `
                <div class="field-group">
                    <label>${k}</label>
                    <input type="text" value="${v}" oninput="updateData('${k}', this.value)">
                </div>
            `).join('')}
        </div>
    `;

    if (s.acc) {
        html += `<div class="accounting-entries">
            <div class="acc-card debit"><strong>Debit:</strong> ${s.acc.dr}</div>
            <div class="acc-card credit"><strong>Credit:</strong> ${s.acc.cr}</div>
        </div>`;
    }

    html += `<button class="btn-primary" onclick="next()">${current === 5 ? 'Finish & Restart' : 'Post Transaction'}</button>`;
    document.getElementById('main-content').innerHTML = html;
}

function next() {
    current = (current + 1) % steps.length;
    render();
}

render();