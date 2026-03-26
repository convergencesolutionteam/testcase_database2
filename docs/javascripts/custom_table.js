document.addEventListener("DOMContentLoaded", function () {
    $('.md-typeset table').DataTable({
        layout: {
            topStart: {
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'CSV 🔍',
                        className: 'md-button md-button--primary dt-icon-btn',
                        attr: { title: 'Export Filtered Results to CSV' },
                        exportOptions: { modifier: { search: 'applied' } }
                    },
                    {
                        extend: 'excelHtml5',
                        text: 'XLSX 🔍',
                        className: 'md-button md-button--primary dt-icon-btn',
                        attr: { title: 'Export Filtered Results to Excel' },
                        exportOptions: { modifier: { search: 'applied' } }
                    },
                    {
                        text: '🛒 Add to Cart ✓',
                        className: 'md-button md-button--primary dt-icon-btn',
                        attr: { title: 'Add Selected Items to Cart' },
                        action: function (e, dt, node, config) {
                            const selectedData = dt.rows({ selected: true }).data().toArray();
                            if (selectedData.length === 0) {
                                alert("Please select the items (Click or Shift+Click) to add to the cart first.");
                                return;
                            }

                            let pageTitle = document.title.split('-')[0].trim();
                            const h1 = document.querySelector('h1');
                            if (h1 && window.getComputedStyle(h1).display !== 'none') {
                                pageTitle = h1.innerText.replace(/\(.*?\)/g, '').trim();
                            }

                            const currentCart = JSON.parse(localStorage.getItem('tc_cart') || '[]');
                            let addedCount = 0;
                            selectedData.forEach(row => {
                                const cell0 = String(row[0]).replace(/<[^>]+>/g, '').trim();
                                const cell1 = String(row[1]).replace(/<[^>]+>/g, '').trim();
                                const cell2 = String(row[2]).replace(/<[^>]+>/g, '').trim();
                                const cell3 = String(row[3]).replace(/<[^>]+>/g, '').trim();

                                const exists = currentCart.find(item => item.title === cell1 && item.category === pageTitle);
                                if (!exists) {
                                    currentCart.push({
                                        category: pageTitle,
                                        number: cell0,
                                        title: cell1,
                                        technology: cell2,
                                        customer: cell3
                                    });
                                    addedCount++;
                                }
                            });

                            localStorage.setItem('tc_cart', JSON.stringify(currentCart));

                            const dedupeMsg = (addedCount < selectedData.length) ? ` (duplicates ignored)` : ``;
                            alert(`Added ${addedCount} items to the Cart (Category: '${pageTitle}')!${dedupeMsg}\nTotal items in Cart: ${currentCart.length}`);
                        }
                    }
                ]
            }
        },
        select: {
            style: 'os'
        },
        paging: false
    });
});
