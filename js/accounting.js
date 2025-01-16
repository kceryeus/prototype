    // Sample account data with parent-child relationships
    const accounts = [
      { id: 1, number: "11", name: "Caixa", parent: null },
      { id: 2, number: "12", name: "Bancos", parent: null },
      { id: 3, number: "41", name: "Clientes", parent: null },
      { id: 4, number: "411", name: "Clientes c/c", parent: 1 },
      { id: 5, number: "412", name: "Clientes - Títulos a receber", parent: 2 },
      { id: 6, number: "418", name: "Clientes de cobrança duvidosa", parent: 3 },
      { id: 7, number: "71", name: "Vendas", parent: null },
      { id: 8, number: "711", name: "Mercadorias", parent: 7 },
      { id: 9, number: "712", name: "Produtos acabados e intermédios", parent: 7 },
    ];

    // Render accounts and handle parent-child relationships
    function renderAccounts(parentId = null, indentLevel = 0) {
      const coaList = document.getElementById("coa-list");

      // Filter accounts by their parent
      const filteredAccounts = accounts.filter((account) => account.parent === parentId);

      filteredAccounts.forEach((account) => {
        const li = document.createElement("li");
        li.textContent = `${account.number} - ${account.name}`;
        li.dataset.id = account.id;

        // Indent based on hierarchy level
        li.style.paddingLeft = `${indentLevel * 20}px`;

        coaList.appendChild(li);

        // Recursively render child accounts
        renderAccounts(account.id, indentLevel + 1);
      });
    }

    // Filter accounts based on search input
    function filterAccounts() {
      const query = document.getElementById("search").value.toLowerCase();
      const coaList = document.getElementById("coa-list");
      coaList.innerHTML = ""; // Clear the list

      // Filter by account name or number
      const filteredAccounts = accounts.filter(
        (account) =>
          account.name.toLowerCase().includes(query) || account.number.includes(query)
      );

      filteredAccounts.forEach((account) => {
        const li = document.createElement("li");
        li.textContent = `${account.number} - ${account.name}`;
        coaList.appendChild(li);
      });
    }

// Autocomplete suggestions for search
function autocompleteSearch() {
  const query = document.getElementById("accountSearch").value.toLowerCase();
  const suggestions = document.getElementById("autocomplete-suggestions");
  suggestions.innerHTML = ""; // Clear suggestions

  const matchedAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(query) ||
      account.number.includes(query)
  );

  matchedAccounts.forEach((account) => {
    const li = document.createElement("li");
    li.textContent = `${account.number} - ${account.name}`;
    li.onclick = () => {
      document.getElementById("accountSearch").value = `${account.number} - ${account.name}`;
      suggestions.innerHTML = ""; // Clear suggestions
    };
    suggestions.appendChild(li);
  });
}

    // Show all accounts
    function showAll() {
      const coaList = document.getElementById("coa-list");
      coaList.innerHTML = ""; // Clear the list
      renderAccounts(); // Re-render the full list
    }

    // Collapse all accounts
    function collapseAll() {
      const coaList = document.getElementById("coa-list");
      coaList.innerHTML = ""; // Clear the list
    }

    // Initialize rendering
    renderAccounts();

