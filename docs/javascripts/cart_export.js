document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    const currentCart = JSON.parse(localStorage.getItem('tc_cart') || '[]');

    if (currentCart.length === 0) {
        cartContainer.innerHTML = '<p style="color: grey; padding: 2rem; border-radius: 8px; border: 1px dashed #ccc; text-align: center;">Your cart is currently empty.<br><br>Please navigate to the Test Case tables, select the items you want, and click the <b>"🛒 Add to Cart ✓"</b> button.</p>';
        return;
    }

    // Render cart UI
    let html = `
        <div style="margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <button id="btn-export-cart" class="md-button md-button--primary" style="margin-right: 10px; font-weight: bold; padding: 8px 16px;">📊 Download Unified Test Cases</button>
                <button id="btn-clear-cart" class="md-button" style="padding: 8px 16px;">🗑️ Clear Entire Cart</button>
            </div>
            <span>Total Items in Cart: <strong>${currentCart.length}</strong></span>
        </div>
    `;

    // Group items by category to display them
    const grouped = {};
    currentCart.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
    });

    for (const [category, items] of Object.entries(grouped)) {
        html += `<h3 style="margin-top: 2rem; border-bottom: 1px solid var(--md-default-fg-color--lightest); padding-bottom: 0.5rem;">📂 ${category} <span style="font-size:0.8em; color:gray;">(${items.length} items)</span></h3>`;
        html += `<div class="md-typeset__scrollwrap"><div class="md-typeset__table"><table>`;
        html += `<thead><tr><th>Technology</th><th>TC Title</th><th>Customer</th><th>Remove</th></tr></thead><tbody>`;
        items.forEach((item, index) => {
            html += `<tr>
                <td style="text-align: center;">${item.technology || ''}</td>
                <td>${item.title || ''}</td>
                <td style="text-align: center;">${item.customer || ''}</td>
                <td style="text-align: center;"><a href="#" class="remove-item" data-title="${item.title}" style="color:var(--md-accent-fg-color); text-decoration: none;" title="Remove this item">✖</a></td>
            </tr>`;
        });
        html += `</tbody></table></div></div>`;
    }

    cartContainer.innerHTML = html;

    // Remove single item listener
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const targetTitle = this.getAttribute('data-title');
            const newCart = currentCart.filter(item => item.title !== targetTitle);
            localStorage.setItem('tc_cart', JSON.stringify(newCart));
            location.reload();
        });
    });

    // Clear cart listener
    document.getElementById('btn-clear-cart').addEventListener('click', function () {
        if (confirm("Are you sure you want to clear all items in the cart?")) {
            localStorage.removeItem('tc_cart');
            location.reload();
        }
    });

    // Export Excel (Styled using ExcelJS)
    document.getElementById('btn-export-cart').addEventListener('click', async function () {
        const wb = new ExcelJS.Workbook();
        wb.creator = 'Test Case Database';
        wb.created = new Date();

        const ws = wb.addWorksheet("Test Cases", {
            views: [{ state: 'frozen', xSplit: 0, ySplit: 2 }] // Freeze first 2 rows
        });

        // 0. Fetch the Logo dynamically and calculate aspect ratio safely
        let logoId = null;
        let logoWidth = 120;
        let logoHeight = 26; // Reduced height for smaller logo

        try {
            let faviconHref = document.querySelector('link[rel="icon"]')?.getAttribute('href');
            if (!faviconHref) faviconHref = '../assets/LIG%20Accuver_LIG%20Innovative%20Blue.png';

            const response = await fetch(faviconHref);
            if (response.ok) {
                const buffer = await response.arrayBuffer();
                logoId = wb.addImage({ buffer: buffer, extension: 'png' });

                const blob = new Blob([buffer], { type: "image/png" });
                const img = new Image();
                img.src = URL.createObjectURL(blob);
                await new Promise(r => img.onload = r);

                logoHeight = 26; // Made smaller
                logoWidth = Math.round(img.width * (logoHeight / img.height));
            }
        } catch (e) {
            console.warn("Could not load logo for Excel export.", e);
        }

        // 1. Add Big Title & Logo Holder (Row 1)
        ws.mergeCells('A1:D1'); // Only 4 columns now
        ws.getCell('A1').value = `Test Cases     `;
        ws.getCell('A1').font = { size: 16, bold: true, color: { argb: 'FF1F4E79' } };
        ws.getCell('A1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' }
        };
        ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'right' };
        ws.getRow(1).height = 45;

        // Inject the logo image
        if (logoId !== null) {
            ws.addImage(logoId, {
                tl: { col: 0.2, row: 0.8 }, // Centered vertically in Row 1 via offset
                ext: { width: logoWidth, height: logoHeight }
            });
        }

        // 2. Add Headers (Row 2) -> Reordered: Category, Tech, Title, Customer (And no #)
        const headerRow = ws.addRow(['Category', 'Technology', 'TC Title', 'Customer']);
        headerRow.height = 25;
        headerRow.eachCell((cell, colNumber) => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4F81BD' } // modern blue
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                top: { style: 'thin' }, left: { style: 'thin' },
                bottom: { style: 'thin' }, right: { style: 'thin' }
            };
        });

        // 3. Add Data (Row 3 onwards)
        let rowIndex = 0;
        for (const [category, items] of Object.entries(grouped)) {
            items.forEach((item) => {
                const row = ws.addRow([item.category, item.technology, item.title, item.customer]);
                row.eachCell((cell, colNumber) => {
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                        left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                        bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                        right: { style: 'thin', color: { argb: 'FFDDDDDD' } }
                    };
                    cell.alignment = { vertical: 'middle', wrapText: true };

                    if (colNumber === 1 || colNumber === 2 || colNumber === 4) {
                        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                    }
                });

                if (rowIndex % 2 === 1) {
                    row.eachCell((cell) => {
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9F9F9' } };
                    });
                }
                rowIndex++;
            });
        }

        // 4. Adjust Column Widths (Adjusted for 4 elements)
        ws.getColumn(1).width = 25;  // Category
        ws.getColumn(2).width = 20;  // Technology
        ws.getColumn(3).width = 75;  // TC Title
        ws.getColumn(4).width = 25;  // Customer

        // Export using FileSaver
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "TestCase_Cart_Export.xlsx");
    });
});
