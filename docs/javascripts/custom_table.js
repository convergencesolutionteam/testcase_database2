window.goToDetail = function (e, btn) {
    e.stopPropagation(); // row 선택(카트 담기) 이벤트 방지
    const tr = btn.closest('tr');
    // TC Title 컬럼 데이터 추출
    const tcTitle = tr.children.length > 1 ? tr.children[1].innerText.trim() : '';

    // hooks.py가 생성한 전역 변수 사용 (만약 로드되지 않았다면 빈 배열)
    const targets = window.TC_DETAIL_LIST || [];

    if (targets.includes(tcTitle)) {
        // MkDocs 로고를 기반으로 한 Root 경로 찾기
        const logo = document.querySelector('.md-header__button.md-logo, .md-logo');
        const rootUrl = logo ? logo.getAttribute('href') : '/';
        const safeRoot = rootUrl.endsWith('/') ? rootUrl : rootUrl + '/';

        const encodedName = encodeURIComponent(tcTitle);
        window.location.href = safeRoot + 'TC_Detail/' + encodedName + '/';
    } else {
        alert('상세 페이지가 준비 중입니다.\n[ ' + tcTitle + ' ]');
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // 테이블 초기화 시, 리포트 전용 테이블(tc-report-table) 및 리포트 페이지 내부 표는 일반 표로 남겨두도록 제외합니다.
    $('.md-typeset table').not('.tc-report-page table, .tc-report-table').DataTable({
        columnDefs: [
            {
                targets: 1,
                className: 'tc-id-col'
            },
            {
                targets: 2,
                className: 'tc-title-col'
            },
            {
                orderable: false,
                targets: -1,
                render: function (data, type, row, meta) {
                    // 마지막 컬럼이 View 관련 데이터일 경우 버튼으로 렌더링 (사전 랜더링으로 깜빡임 방지)
                    if (data && typeof data === 'string') {
                        const rawText = data.replace(/<[^>]+>/g, '').trim();
                        if (rawText === 'View' || rawText === 'Doc' || data.includes('tc-view-btn')) {
                            return `<button class="tc-view-btn" onclick="window.goToDetail(event, this)" title="View Document"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:text-bottom"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg></button>`;
                        }
                    }
                    return data;
                }
            } // 마지막 열 정렬 비활성화 및 버튼 렌더링
        ],
        layout: {
            top2Start: {
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'CSV 📄💾',
                        className: 'md-button md-button--primary dt-icon-btn',
                        attr: { title: 'Export Filtered Results to CSV' },
                        exportOptions: { columns: ':not(:last-child)', modifier: { search: 'applied' } }
                    },
                    {
                        text: 'XLSX 📄💾',
                        className: 'md-button md-button--primary dt-icon-btn',
                        attr: { title: 'Export Filtered Results to Excel with Details' },
                        action: async function (e, dt, node, config) {
                            const filteredData = dt.rows({ search: 'applied' }).data().toArray();
                            if (filteredData.length === 0) {
                                alert("No data to export.");
                                return;
                            }

                            const originalText = node.html();
                            try {
                                node.html('⏳ Exporting...');
                                node.css('pointer-events', 'none');

                                let pageTitle = document.title.split('-')[0].trim();
                                const h1 = document.querySelector('h1');
                                if (h1 && window.getComputedStyle(h1).display !== 'none') {
                                    pageTitle = h1.innerText.replace(/\(.*?\)/g, '').trim();
                                }

                                const items = filteredData.map(row => ({
                                    category: pageTitle,
                                    number: String(row[0]).replace(/<[^>]+>/g, '').trim(),
                                    testcaseId: String(row[1]).replace(/<[^>]+>/g, '').trim(),
                                    title: String(row[2]).replace(/<[^>]+>/g, '').trim(),
                                    technology: String(row[3]).replace(/<[^>]+>/g, '').trim(),
                                    reportType: String(row[4]).replace(/<[^>]+>/g, '').trim()
                                }));

                                const wb = new ExcelJS.Workbook();
                                wb.creator = 'Test Case Database';
                                wb.created = new Date();

                                const ws = wb.addWorksheet("Test Cases", {
                                    views: [{ state: 'frozen', xSplit: 0, ySplit: 2 }],
                                    pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
                                });

                                let logoId = null;
                                let logoWidth = 120;
                                let logoHeight = 26;

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

                                        logoHeight = 26;
                                        logoWidth = Math.round(img.width * (logoHeight / img.height));
                                    }
                                } catch (e) {
                                    console.warn("Could not load logo for Excel export.", e);
                                }

                                ws.mergeCells('A1:E1');
                                ws.getCell('A1').value = `Test Cases     `;
                                ws.getCell('A1').font = { size: 16, bold: true, color: { argb: 'FF1F4E79' } };
                                ws.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
                                ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'right' };
                                ws.getRow(1).height = 45;

                                if (logoId !== null) {
                                    ws.addImage(logoId, {
                                        tl: { col: 0.2, row: 0.8 },
                                        ext: { width: logoWidth, height: logoHeight }
                                    });
                                }

                                const headerRow = ws.addRow(['Category', 'TestCase ID', 'TC Title', 'Technology', 'Report Type']);
                                headerRow.height = 25;
                                headerRow.eachCell((cell) => {
                                    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
                                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' } };
                                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                                    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                                });

                                items.forEach((item, index) => {
                                    const row = ws.addRow([item.category, item.testcaseId, item.title, item.technology, item.reportType]);
                                    row.eachCell((cell, colNumber) => {
                                        cell.border = {
                                            top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                                            left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                                            bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
                                            right: { style: 'thin', color: { argb: 'FFDDDDDD' } }
                                        };
                                        cell.alignment = { vertical: 'middle', wrapText: true };
                                        if (colNumber === 1 || colNumber === 2 || colNumber === 4 || colNumber === 5) {
                                            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                                        }
                                    });
                                    if (index % 2 === 1) {
                                        row.eachCell((cell) => {
                                            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9F9F9' } };
                                        });
                                    }
                                });

                                ws.getColumn(1).width = 25;
                                ws.getColumn(2).width = 20;
                                ws.getColumn(3).width = 75;
                                ws.getColumn(4).width = 20;
                                ws.getColumn(5).width = 20;

                                const logoElement = document.querySelector('.md-header__button.md-logo, .md-logo');
                                const rootUrl = logoElement ? logoElement.getAttribute('href') : '/';
                                const safeRoot = rootUrl.endsWith('/') ? rootUrl : rootUrl + '/';

                                for (const item of items) {
                                    try {
                                        const encodedName = encodeURIComponent(item.testcaseId);
                                        const detailUrl = safeRoot + 'TC_Detail/' + encodedName + '/';
                                        const response = await fetch(detailUrl);
                                        
                                        if (response.ok) {
                                            const htmlText = await response.text();
                                            const parser = new DOMParser();
                                            const doc = parser.parseFromString(htmlText, "text/html");
                                            
                                            const reportPage = doc.querySelector('.tc-report-page');
                                            if (reportPage) {
                                                let safeSheetName = item.testcaseId.substring(0, 31).replace(/[?*\/\\:\[\]]/g, '_');
                                                let attempt = 1;
                                                let finalSheetName = safeSheetName;
                                                while(wb.getWorksheet(finalSheetName)) {
                                                    finalSheetName = safeSheetName.substring(0, 28) + "_" + attempt;
                                                    attempt++;
                                                }
                                                
                                                const wsDetail = wb.addWorksheet(finalSheetName, {
                                                    views: [{ state: 'normal', showGridLines: false }],
                                                    pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
                                                });
                                                
                                                wsDetail.getColumn(1).width = 4;
                                                wsDetail.getColumn(2).width = 20;
                                                wsDetail.getColumn(3).width = 25;
                                                wsDetail.getColumn(4).width = 20;
                                                wsDetail.getColumn(5).width = 30;
                                                
                                                let dRow = 2;
                                                const titleTag = doc.querySelector('.tc-report-maintitle');
                                                const mainTitleStr = titleTag ? titleTag.innerText.trim() : "Test Case Detail";

                                                wsDetail.mergeCells(`B${dRow}:E${dRow}`);
                                                const titleCell = wsDetail.getCell(`B${dRow}`);
                                                titleCell.value = mainTitleStr + "    ";
                                                titleCell.font = { size: 22, bold: true, color: { argb: 'FF000000' } };
                                                titleCell.alignment = { vertical: 'middle', horizontal: 'right' };
                                                
                                                if (logoId !== null) {
                                                    wsDetail.addImage(logoId, {
                                                        tl: { col: 1.1, row: (dRow - 1) + 0.3 },
                                                        ext: { width: logoWidth, height: logoHeight }
                                                    });
                                                }
                                                
                                                wsDetail.getRow(dRow).height = 40;
                                                dRow += 2;
                                                
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
                                                        
                                                        let descLength = values[1] ? values[1].length : 0;
                                                        let estimatedLines = Math.max(1, Math.ceil(descLength / 22));
                                                        vr.height = Math.max(35, estimatedLines * 16 + 10);
                                                        
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
                                                                let listItems = [];
                                                                child.querySelectorAll('li').forEach((li, idx) => {
                                                                    let prefix = child.tagName === 'OL' ? `${idx + 1}. ` : "• ";
                                                                    let clone = li.cloneNode(true);
                                                                    clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
                                                                    listItems.push(prefix + clone.textContent.trim());
                                                                });
                                                                contentText = listItems.join('\n');
                                                            }
                                                            
                                                            if (contentText) {
                                                                wsDetail.mergeCells(`B${dRow}:E${dRow}`);
                                                                const cCell = wsDetail.getCell(`B${dRow}`);
                                                                cCell.value = contentText;
                                                                cCell.font = { size: 10 };
                                                                cCell.alignment = { wrapText: true, vertical: 'top', indent: 1 };
                                                                
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

                                const buffer = await wb.xlsx.writeBuffer();
                                const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                                saveAs(blob, `${pageTitle}_Export.xlsx`);
                            } catch (err) {
                                console.error(err);
                                alert("Export failed.");
                            } finally {
                                node.html(originalText);
                                node.css('pointer-events', 'auto');
                            }
                        }
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
                                const cell4 = String(row[4]).replace(/<[^>]+>/g, '').trim(); // Report Type

                                const exists = currentCart.find(item => item.testcaseId === cell1 && item.category === pageTitle);
                                if (!exists) {
                                    currentCart.push({
                                        category: pageTitle,
                                        number: cell0,
                                        testcaseId: cell1,
                                        title: cell2,
                                        technology: cell3,
                                        reportType: cell4
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
            },
            top2End: {
                search: {}
            },
            topEnd: {
                buttons: [
                    {
                        extend: 'colvis',
                        text: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:text-bottom; margin-right:4px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Columns',
                        className: 'dt-custom-colvis-btn',
                        postfixButtons: ['colvisRestore']
                    }
                ]
            }
        },
        select: {
            style: 'os'
        },
        paging: false,
        initComplete: function () {
            let api = this.api();

            // 전역 클릭 이벤트 - 팝업 외부 클릭 시 닫기
            document.addEventListener('click', function (e) {
                if (!e.target.closest('.dt-excel-modal') && !e.target.closest('.dt-excel-icon')) {
                    document.querySelectorAll('.dt-excel-modal').forEach(el => el.style.display = 'none');
                }
            });

            api.columns().every(function (index) {
                // 마지막 Detail 열에는 필터 제외
                if (index === api.columns().count() - 1) return;

                let column = this;
                let header = column.header();

                // Add filter icon to header
                let icon = document.createElement('span');
                icon.className = 'dt-excel-icon';
                icon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>'; // Filter funnel icon
                icon.title = 'Filter & Sort';

                // Toggle modal on icon click
                icon.addEventListener('click', function (e) {
                    e.stopPropagation();

                    // Close other open modals
                    document.querySelectorAll('.dt-excel-modal').forEach(el => {
                        if (el !== modal) el.style.display = 'none';
                    });

                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                    } else {
                        // 모달이 열릴 때마다 현재 테이블의 전체 정렬 상태(api.order())를 확인
                        let tableOrder = api.order(); // [[index, dir], ...] 형식
                        let direction = null;

                        // 현재 컬럼(index)이 정렬 목록에 있는지 확인
                        for (let i = 0; i < tableOrder.length; i++) {
                            if (tableOrder[i][0] === index) {
                                direction = tableOrder[i][1];
                                break;
                            }
                        }

                        sortAsc.classList.remove('active');
                        sortDesc.classList.remove('active');
                        if (direction === 'asc') sortAsc.classList.add('active');
                        else if (direction === 'desc') sortDesc.classList.add('active');

                        modal.style.display = 'block';
                    }
                });

                header.appendChild(icon);

                // Create Modal container
                let modal = document.createElement('div');
                modal.className = 'dt-excel-modal';

                // Prevent sorting when interacting inside modal
                modal.addEventListener('click', function (e) {
                    e.stopPropagation();
                });

                // 1. Sort Buttons
                let sortDiv = document.createElement('div');
                sortDiv.className = 'dt-excel-modal-sort';
                let sortAsc = document.createElement('button');
                sortAsc.innerHTML = 'Sort A to Z';
                let sortDesc = document.createElement('button');
                sortDesc.innerHTML = 'Sort Z to A';

                // Apply initial active class (will be updated on every modal open)
                let currentOrder = column.order();
                if (currentOrder === 'asc') sortAsc.classList.add('active');
                else if (currentOrder === 'desc') sortDesc.classList.add('active');

                // 필터 아이콘 강조 업데이트 함수
                const updateIconStatus = () => {
                    if (column.search() !== "") icon.classList.add('active');
                    else icon.classList.remove('active');
                };
                updateIconStatus(); // 초기화 시 실행

                sortAsc.onclick = function () {
                    column.order('asc').draw();
                    sortAsc.classList.add('active');
                    sortDesc.classList.remove('active');
                    modal.style.display = 'none';
                };
                sortDesc.onclick = function () {
                    column.order('desc').draw();
                    sortDesc.classList.add('active');
                    sortAsc.classList.remove('active');
                    modal.style.display = 'none';
                };
                sortDiv.appendChild(sortAsc);
                sortDiv.appendChild(sortDesc);


                modal.appendChild(sortDiv);
                modal.appendChild(document.createElement('hr'));

                // 2. Checkboxes for filtering
                let checkDiv = document.createElement('div');
                checkDiv.className = 'dt-excel-modal-checkboxes';

                let selectAllLabel = document.createElement('label');
                let selectAllCb = document.createElement('input');
                selectAllCb.type = 'checkbox';
                selectAllCb.checked = true;
                selectAllLabel.appendChild(selectAllCb);
                selectAllLabel.appendChild(document.createTextNode(' Select All'));
                checkDiv.appendChild(selectAllLabel);

                let options = [];
                let checkboxes = [];

                // Get unique raw data, convert to stripped text, then completely unique it
                let rawData = column.data().unique().toArray();
                let cleanTexts = [];
                rawData.forEach(d => {
                    let text = String(d).replace(/<[^>]+>/g, '').trim();
                    if (text && !cleanTexts.includes(text)) {
                        cleanTexts.push(text);
                    }
                });

                // Natural sort the clean texts (e.g., 1, 2, 10 instead of 1, 10, 2)
                cleanTexts.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

                cleanTexts.forEach(function (text) {
                    let label = document.createElement('label');
                    let cb = document.createElement('input');
                    cb.type = 'checkbox';
                    cb.value = text;
                    cb.checked = true;

                    cb.onchange = function () {
                        if (!cb.checked) selectAllCb.checked = false;
                        else if (checkboxes.every(c => c.checked)) selectAllCb.checked = true;
                    };
                    checkboxes.push(cb);

                    label.appendChild(cb);
                    label.appendChild(document.createTextNode(' ' + text));
                    checkDiv.appendChild(label);
                });

                selectAllCb.onchange = function () {
                    let isChecked = selectAllCb.checked;
                    checkboxes.forEach(cb => cb.checked = isChecked);
                };

                modal.appendChild(checkDiv);
                modal.appendChild(document.createElement('hr'));

                // 3. Apply / Clear Actions
                let actionDiv = document.createElement('div');
                actionDiv.className = 'dt-excel-modal-actions';

                let applyBtn = document.createElement('button');
                applyBtn.className = 'apply-btn';
                applyBtn.innerHTML = 'Apply';
                applyBtn.onclick = function () {
                    let selected = checkboxes.filter(cb => cb.checked).map(cb => cb.value);
                    if (selected.length === checkboxes.length || selected.length === 0) {
                        column.search('', false, false).draw();
                    } else {
                        let regex = '^(' + selected.map(val => val.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|') + ')$';
                        column.search(regex, true, false).draw();
                    }
                    updateIconStatus(); // 필터 적용 시 아이콘 상태 업데이트
                    modal.style.display = 'none';
                };

                let clearBtn = document.createElement('button');
                clearBtn.className = 'clear-btn';
                clearBtn.innerHTML = 'Clear';
                clearBtn.onclick = function () {
                    selectAllCb.checked = false;
                    checkboxes.forEach(cb => cb.checked = false);
                };

                actionDiv.appendChild(clearBtn);
                actionDiv.appendChild(applyBtn);
                modal.appendChild(actionDiv);

                header.appendChild(modal);
            });
        }
    });
});
