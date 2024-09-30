// Initial JSON Array
let chemicals = [
    { id: 1, name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", size: 100, unit: "kg", quantity: 6495.18 },
    { id: 2, name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", size: 100, unit: "kg", quantity: 8751.90 },
    { id: 3, name: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", size: 75, unit: "L", quantity: 5964.61 },
    { id: 4, name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", size: 105, unit: "kg", quantity: 8183.73 },
    { id: 5, name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", size: 105, unit: "kg", quantity: 4154.33 },
    { id: 6, name: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", size: 0, unit: "t", quantity: 6272.34 },
    { id: 7, name: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", size: 250, unit: "kg", quantity: 8749.54 },
    { id: 8, name: "Sodium Chloride", vendor: "BASF", density: 2163.12, viscosity: 55.10, packaging: "Bag", size: 50, unit: "kg", quantity: 9200.85 },
    { id: 9, name: "Hydrochloric Acid", vendor: "Formosa", density: 1248.55, viscosity: 12.85, packaging: "Barrel", size: 200, unit: "L", quantity: 5105.34 },
    { id: 10, name: "Sulfuric Acid", vendor: "DowDuPont", density: 1840.00, viscosity: 28.33, packaging: "Barrel", size: 150, unit: "L", quantity: 4123.23 },
    { id: 11, name: "Sodium Hydroxide", vendor: "LG Chem", density: 2153.45, viscosity: 39.85, packaging: "Bag", size: 100, unit: "kg", quantity: 6982.72 },
    { id: 12, name: "Acetone", vendor: "Formosa", density: 789.10, viscosity: 3.05, packaging: "Drum", size: 50, unit: "L", quantity: 8503.41 },
    { id: 13, name: "Ethanol", vendor: "Sinopec", density: 789.30, viscosity: 1.20, packaging: "Drum", size: 200, unit: "L", quantity: 10294.85 },
    { id: 14, name: "Benzene", vendor: "LG Chem", density: 876.53, viscosity: 0.65, packaging: "Drum", size: 100, unit: "L", quantity: 6004.25 },
    { id: 15, name: "Toluene", vendor: "BASF", density: 867.00, viscosity: 0.56, packaging: "Drum", size: 50, unit: "L", quantity: 5234.19 }
  ];
  
// Variable to store the sort order for each column
let sortOrder = {
    id: true, // true means ascending, false means descending
    name: true,
    vendor: true,
    density: true,
    viscosity: true,
    packaging: true,
    size: true,
    unit: true,
    quantity: true
  };
  
  // Function to sort and display the table based on the column clicked
  function sortTableBy(column) {
    chemicals.sort((a, b) => {
      if (typeof a[column] === 'string') {
        return sortOrder[column] ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
      } else {
        return sortOrder[column] ? a[column] - b[column] : b[column] - a[column];
      }
    });
  
    // Toggle the sort order for the next click
    sortOrder[column] = !sortOrder[column];
  
    // Re-render the table after sorting
    renderTable();
  }
  
  // Event listeners for each column header to trigger sorting
  document.getElementById('header-id').addEventListener('click', () => sortTableBy('id'));
  document.getElementById('header-name').addEventListener('click', () => sortTableBy('name'));
  document.getElementById('header-vendor').addEventListener('click', () => sortTableBy('vendor'));
  document.getElementById('header-density').addEventListener('click', () => sortTableBy('density'));
  document.getElementById('header-viscosity').addEventListener('click', () => sortTableBy('viscosity'));
  document.getElementById('header-packaging').addEventListener('click', () => sortTableBy('packaging'));
  document.getElementById('header-size').addEventListener('click', () => sortTableBy('size'));
  document.getElementById('header-unit').addEventListener('click', () => sortTableBy('unit'));
  document.getElementById('header-quantity').addEventListener('click', () => sortTableBy('quantity'));
  
  // Selected row index for moving or deleting
  let selectedRowIndex = null;
  
  // Render Table
  function renderTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear table first
    
    chemicals.forEach((chemical, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${chemical.id}</td>
        <td contenteditable="true">${chemical.name}</td>
        <td contenteditable="true">${chemical.vendor}</td>
        <td contenteditable="true">${chemical.density}</td>
        <td contenteditable="true">${chemical.viscosity}</td>
        <td contenteditable="true">${chemical.packaging}</td>
        <td contenteditable="true">${chemical.size}</td>
        <td contenteditable="true">${chemical.unit}</td>
        <td contenteditable="true">${chemical.quantity}</td>
      `;
  
      // Highlight the selected row
      row.onclick = () => {
        highlightRow(index);
      };
  
      tableBody.appendChild(row);
    });
  }

  // Call this to render the initial table
    renderTable();
  
  // Highlight selected row
  function highlightRow(index) {
    selectedRowIndex = index;
  
    // Remove previous selection
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => row.classList.remove('selected'));
  
    // Highlight the current row
    rows[index].classList.add('selected');
  }
  
  // Add Row Functionality
  document.getElementById('add-row').addEventListener('click', () => {
    const newRow = {
      id: chemicals.length + 1,
      name: "New Chemical",
      vendor: "Unknown",
      density: 0,
      viscosity: 0,
      packaging: "Bag",
      size: 0,
      unit: "kg",
      quantity: 0
    };
    chemicals.push(newRow);
    renderTable();
  });
  
  // Move Up Functionality
  document.getElementById('move-up').addEventListener('click', () => {
    if (selectedRowIndex > 0) {
      const temp = chemicals[selectedRowIndex];
      chemicals[selectedRowIndex] = chemicals[selectedRowIndex - 1];
      chemicals[selectedRowIndex - 1] = temp;
      selectedRowIndex--;
      renderTable();
      highlightRow(selectedRowIndex);
    }
  });
  
  // Move Down Functionality
  document.getElementById('move-down').addEventListener('click', () => {
    if (selectedRowIndex < chemicals.length - 1) {
      const temp = chemicals[selectedRowIndex];
      chemicals[selectedRowIndex] = chemicals[selectedRowIndex + 1];
      chemicals[selectedRowIndex + 1] = temp;
      selectedRowIndex++;
      renderTable();
      highlightRow(selectedRowIndex);
    }
  });
  
  // Delete Row Functionality
  document.getElementById('delete-row').addEventListener('click', () => {
    if (selectedRowIndex !== null) {
      chemicals.splice(selectedRowIndex, 1);
      selectedRowIndex = null;
      renderTable();
    }
  });
  
  // Refresh Data (Reset to original)
  document.getElementById('refresh').addEventListener('click', () => {
    location.reload(); // Reloads the page to reset data
  });
  
  // Save Data Functionality
  document.getElementById('save').addEventListener('click', () => {
    console.log('Saved Data:', chemicals); // For now, just log the data
    alert('Data saved successfully (logged in console).');
  });
  
  // Initialize table on page load
  window.onload = renderTable;
  