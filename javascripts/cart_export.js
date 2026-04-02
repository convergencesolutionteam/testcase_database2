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

        // NEW LOGIC: Dynamic Detail Pages
        // Find MkDocs root context
        const logoElement = document.querySelector('.md-header__button.md-logo, .md-logo');
        const rootUrl = logoElement ? logoElement.getAttribute('href') : '/';
        const safeRoot = rootUrl.endsWith('/') ? rootUrl : rootUrl + '/';

        // Loop through all items in the cart and try to fetch their detail pages
        for (const item of currentCart) {
            try {
                const encodedName = encodeURIComponent(item.title);
                const detailUrl = safeRoot + 'TC_Detail/' + encodedName + '/';
                const response = await fetch(detailUrl);
                
                if (response.ok) {
                    const htmlText = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, "text/html");
                    
                    const reportPage = doc.querySelector('.tc-report-page');
                    if (reportPage) {
                        // 1. Create a new sheet! Truncate to maximum 31 characters.
                        let safeSheetName = item.title.substring(0, 31).replace(/[?*\/\\:\[\]]/g, '_');
                        let attempt = 1;
                        let finalSheetName = safeSheetName;
                        while(wb.getWorksheet(finalSheetName)) {
                            finalSheetName = safeSheetName.substring(0, 28) + "_" + attempt;
                            attempt++;
                        }
                        
                        const wsDetail = wb.addWorksheet(finalSheetName, {
                            views: [{ state: 'normal', showGridLines: false }],
                            pageSetup: { paperSize: 9, orientation: 'portrait' }
                        });
                        
                        // Set layout margins
                        wsDetail.getColumn(1).width = 4;
                        wsDetail.getColumn(2).width = 20;
                        wsDetail.getColumn(3).width = 25;
                        wsDetail.getColumn(4).width = 20;
                        wsDetail.getColumn(5).width = 30;
                        
                        let dRow = 2; // Start adding content at row 2 for top margin
                        
                        // 2. Add Title
                        const titleTag = doc.querySelector('.tc-report-maintitle');
                        const mainTitleStr = titleTag ? titleTag.innerText.trim() : "Test Case Detail";

                        wsDetail.mergeCells(`B${dRow}:E${dRow}`);
                        const titleCell = wsDetail.getCell(`B${dRow}`);
                        titleCell.value = mainTitleStr + "    ";
                        titleCell.font = { size: 22, bold: true, color: { argb: 'FF000000' } };
                        titleCell.alignment = { vertical: 'middle', horizontal: 'right' };
                        
                        // Add Logo to the left side of the title area
                        if (logoId !== null) {
                            wsDetail.addImage(logoId, {
                                tl: { col: 1.1, row: (dRow - 1) + 0.3 }, // Column B (1), vertically centered in row
                                ext: { width: logoWidth, height: logoHeight }
                            });
                        }
                        
                        wsDetail.getRow(dRow).height = 40;
                        dRow += 2;
                        
                        // 3. Parse Meta Table
                        const metaTable = doc.querySelector('.tc-report-page table');
                        if (metaTable) {
                            let headers = [];
                            let values = [];
                            
                            const theadCells = metaTable.querySelectorAll('thead tr:first-child th, thead tr:first-child td');
                            if (theadCells.length > 0) {
                                theadCells.forEach(th => headers.push(th.innerText.trim()));
                                metaTable.querySelectorAll('tbody tr:first-child td, tbody tr:first-child th').forEach(td => values.push(td.innerText.trim()));
                            } else {
                                const rows = metaTable.querySelectorAll('tr');
                                if (rows.length >= 2) {
                                    rows[0].querySelectorAll('th, td').forEach(c => headers.push(c.innerText.trim()));
                                    rows[1].querySelectorAll('th, td').forEach(c => values.push(c.innerText.trim()));
                                }
                            }
                            
                            if (headers.length >= 4) {
                                let hr = wsDetail.addRow(['', headers[0], headers[1], headers[2], headers[3]]);
                                hr.height = 20;
                                hr.eachCell((cell, colNum) => {
                                    if(colNum > 1) {
                                        cell.font = { bold: true, color: { argb: 'FF555555' }, size: 10 };
                                        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' }};
                                        cell.border = { top: { style: 'medium', color: { argb: 'FFCCCCCC' } }, bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } }, left: { style: 'thin', color: { argb: 'FFDDDDDD' } }, right: { style: 'thin', color: { argb: 'FFDDDDDD' } }};
                                    }
                                });
                                dRow++;
                                
                                let vr = wsDetail.addRow(['', values[0], values[1], values[2], values[3]]);
                                vr.height = 35;
                                vr.eachCell((cell, colNum) => {
                                    if(colNum > 1) {
                                        cell.font = { bold: true, color: { argb: 'FF000000' }, size: 11 };
                                        cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
                                        cell.border = { bottom: { style: 'medium', color: { argb: 'FFCCCCCC' } }, left: { style: 'thin', color: { argb: 'FFDDDDDD' } }, right: { style: 'thin', color: { argb: 'FFDDDDDD' } }};
                                    }
                                });
                                dRow += 2;
                            }
                        }

                        // 4. Content Array Parsing
                        const borderBox = doc.querySelector('.tc-content-border-box');
                        if (borderBox) {
                            Array.from(borderBox.children).forEach(child => {
                                if (child.tagName === 'H3' || child.classList.contains('tc-shaded-header')) {
                                    wsDetail.mergeCells(`B${dRow}:E${dRow}`);
                                    const hCell = wsDetail.getCell(`B${dRow}`);
                                    hCell.value = child.innerText.trim();
                                    hCell.font = { bold: true, size: 11 };
                                    hCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' }};
                                    hCell.border = { top: { style: 'thin', color: { argb: 'FFDDDDDD' } }, bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } }, left: { style: 'thin', color: { argb: 'FFDDDDDD' } }, right: { style: 'thin', color: { argb: 'FFDDDDDD' } }};
                                    hCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
                                    wsDetail.getRow(dRow).height = 25;
                                    dRow++;
                                } else if (child.tagName === 'P' || child.tagName === 'UL' || child.tagName === 'OL') {
                                    let contentText = "";
                                    if (child.tagName === 'P') {
                                        let clone = child.cloneNode(true);
                                        clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
                                        contentText = clone.textContent.trim();
                                    } else if (child.tagName === 'UL' || child.tagName === 'OL') {
                                        let items = [];
                                        child.querySelectorAll('li').forEach((li, idx) => {
                                            let prefix = child.tagName === 'OL' ? `${idx + 1}. ` : "• ";
                                            let clone = li.cloneNode(true);
                                            clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
                                            items.push(prefix + clone.textContent.trim());
                                        });
                                        contentText = items.join('\n');
                                    }
                                    
                                    if (contentText) {
                                        wsDetail.mergeCells(`B${dRow}:E${dRow}`);
                                        const cCell = wsDetail.getCell(`B${dRow}`);
                                        cCell.value = contentText;
                                        cCell.font = { size: 10 };
                                        cCell.alignment = { wrapText: true, vertical: 'top', indent: 1 };
                                        
                                        // Estimate row height: ~15 height per line. Add buffer.
                                        let lines = contentText.split('\n').length;
                                        let maxLineLengths = contentText.split('\n').map(l => l.length);
                                        let wrapLines = maxLineLengths.reduce((acc, curr) => acc + Math.floor(curr / 80), 0);
                                        wsDetail.getRow(dRow).height = (lines + wrapLines) * 16 + 10;
                                        dRow += 2; 
                                    }
                                }
                            });
                        }
                    }
                }
            } catch (error) {
                console.warn("Could not fetch detail page for export: ", item.title, error);
            }
        }

        // Export using FileSaver
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "TestCase_Cart_Export.xlsx");
    });
});
