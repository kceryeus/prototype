// Function to calculate the totals, VAT, and overall total
function calculateTotals() {
  let subtotal = 0; // Sum of all item subtotals
  let totalVAT = 0; // Sum of all VAT values

  const rows = document.querySelectorAll('#items-body tr'); // Select all rows in the table

  rows.forEach(row => {
    const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;

    // Get the selected VAT rate or custom VAT
    const vatSelect = row.querySelector('.vat-select');
    let vatRate = parseFloat(vatSelect.value) || 0; // Default to 0% VAT
    const customVatInput = row.querySelector('.custom-vat');
    if (vatSelect.value === "custom" && customVatInput.value) {
      vatRate = parseFloat(customVatInput.value) || 0; // Use custom VAT if provided
    }

    // Calculate the subtotal for this row (quantity * price)
    const rowSubtotal = quantity * price;

    // Calculate the VAT for this row
    const rowVAT = rowSubtotal * (vatRate / 100);

    // Calculate the total for this row (subtotal + VAT)
    const rowTotal = rowSubtotal + rowVAT;

    // Update the row's total in the table
    row.querySelector('.item-total').textContent = rowTotal.toFixed(2);

    // Add to the overall subtotal and VAT
    subtotal += rowSubtotal;
    totalVAT += rowVAT;
  });

  // Calculate the overall grand total
  const grandTotal = subtotal + totalVAT;

  // Update the totals in the document
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('vat').textContent = totalVAT.toFixed(2);
  document.getElementById('total').textContent = grandTotal.toFixed(2);
}

// Function to save the invoice as a draft in local storage
function saveAsDraft() {
  const invoiceData = {
    clientName: document.getElementById('client-name').value,
    clientAddress: document.getElementById('client-address').value,
    clientNUIT: document.getElementById('client-NUIT').value,
    clientEmail: document.getElementById('client-email').value,
    issueDate: document.getElementById('issue-date').value,
    dueDate: document.getElementById('due-date').value,
    paymentTerms: document.getElementById('payment-terms').value,
    items: [...document.querySelectorAll('#items-body tr')].map(row => ({
      description: row.querySelector('td:nth-child(2) input').value,
      quantity: row.querySelector('.item-quantity').value,
      price: row.querySelector('.item-price').value,
      vat: row.querySelector('.vat-select').value,
      customVat: row.querySelector('.custom-vat').value,
    })),
  };
  localStorage.setItem('draftInvoice', JSON.stringify(invoiceData));
  alert('Fatura salva como rascunho!');
}

// Function to load a draft invoice from local storage
function loadDraft() {
  const draft = localStorage.getItem('draftInvoice');
  if (!draft) {
    alert('Nenhum rascunho salvo encontrado.');
    return;
  }
  const invoiceData = JSON.parse(draft);

  document.getElementById('client-name').value = invoiceData.clientName;
  document.getElementById('client-address').value = invoiceData.clientAddress;
  document.getElementById('client-NUIT').value = invoiceData.clientNUIT;
  document.getElementById('client-email').value = invoiceData.clientEmail;
  document.getElementById('issue-date').value = invoiceData.issueDate;
  document.getElementById('due-date').value = invoiceData.dueDate;
  document.getElementById('payment-terms').value = invoiceData.paymentTerms;

  const itemsBody = document.getElementById('items-body');
  itemsBody.innerHTML = ''; // Clear existing rows

  invoiceData.items.forEach(item => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><button class="remove-item">x</button></td>
      <td><input type="text" value="${item.description}" placeholder="Descrição"></td>
      <td><input type="number" value="${item.quantity}" min="1" class="item-quantity"></td>
      <td><input type="number" value="${item.price}" step="0.01" class="item-price"></td>
      <td>
        <select class="vat-select">
          <option value="16" ${item.vat === '16' ? 'selected' : ''}>16%</option>
          <option value="5" ${item.vat === '5' ? 'selected' : ''}>5%</option>
          <option value="0" ${item.vat === '0' ? 'selected' : ''}>Isento</option>
          <option value="custom" ${item.vat === 'custom' ? 'selected' : ''}>Outro</option>
        </select>
        <input type="number" step="0.01" class="custom-vat" value="${item.customVat}" style="display: ${item.vat === 'custom' ? 'inline' : 'none'};" placeholder="%" />
      </td>
      <td class="item-total">0.00</td>
    `;
    itemsBody.appendChild(newRow);
  });

  calculateTotals();
}

// Attach event listeners
document.getElementById('generate-pdf').addEventListener('click', generatePDF);
document.getElementById('add-item').addEventListener('click', () => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><button class="remove-item">x</button></td>
    <td><input type="text" placeholder="Descrição"></td>
    <td><input type="number" value="1" min="1" class="item-quantity"></td>
    <td><input type="number" value="0" step="0.01" class="item-price"></td>
    <td>
      <select class="vat-select">
        <option value="16" selected>16%</option>
        <option value="5">5%</option>
        <option value="0">Isento</option>
        <option value="custom">Outro</option>
      </select>
      <input type="number" step="0.01" class="custom-vat" style="display: none;" placeholder="%" />
    </td>
    <td class="item-total">0.00</td>
  `;
  document.getElementById('items-body').appendChild(newRow);
});
document.getElementById('save-draft').addEventListener('click', saveAsDraft);
document.getElementById('load-draft').addEventListener('click', loadDraft);