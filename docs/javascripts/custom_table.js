window.goToDetail = function(e, btn) {
    e.stopPropagation(); // row 선택(카트 담기) 이벤트 방지
    const tr = btn.closest('tr');
    // TC Title 컬럼 데이터 추출
    const tcTitle = tr.children.length > 1 ? tr.children[1].innerText.trim() : '';

    if (tcTitle === '5G Addition (upperlayerindication-r15, RestrictDCNR)') {
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
                orderable: false, 
                targets: -1,
                render: function (data, type, row, meta) {
                    // 마지막 컬럼이 View 관련 데이터일 경우 버튼으로 렌더링 (사전 랜더링으로 깜빡임 방지)
                    if (data && typeof data === 'string' && (data.trim() === 'View' || data.trim() === 'Doc' || data.includes('tc-view-btn'))) {
                        return `<button class="tc-view-btn" onclick="window.goToDetail(event, this)" title="View Document"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:text-bottom"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg></button>`;
                    }
                    return data;
                }
            } // 마지막 열 정렬 비활성화 및 버튼 렌더링
        ],
        layout: {
            topStart: {
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'CSV 🔍',
                        className: 'md-button md-button--primary dt-icon-btn',
                        attr: { title: 'Export Filtered Results to CSV' },
                        exportOptions: { columns: ':not(:last-child)', modifier: { search: 'applied' } }
                    },
                    {
                        extend: 'excelHtml5',
                        text: 'XLSX 🔍',
                        className: 'md-button md-button--primary dt-icon-btn',
                        attr: { title: 'Export Filtered Results to Excel' },
                        exportOptions: { columns: ':not(:last-child)', modifier: { search: 'applied' } }
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
        paging: false,
        initComplete: function () {
            let api = this.api();
            
            // 전역 클릭 이벤트 - 팝업 외부 클릭 시 닫기
            document.addEventListener('click', function(e) {
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
                icon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Close other open modals
                    document.querySelectorAll('.dt-excel-modal').forEach(el => {
                        if (el !== modal) el.style.display = 'none';
                    });
                    
                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                    } else {
                        modal.style.display = 'block';
                    }
                });
                
                header.appendChild(icon);

                // Create Modal container
                let modal = document.createElement('div');
                modal.className = 'dt-excel-modal';
                
                // Prevent sorting when interacting inside modal
                modal.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
                
                // 1. Sort Buttons
                let sortDiv = document.createElement('div');
                sortDiv.className = 'dt-excel-modal-sort';
                let sortAsc = document.createElement('button');
                sortAsc.innerHTML = 'Sort A to Z';
                sortAsc.onclick = function() { column.order('asc').draw(); modal.style.display = 'none'; };
                let sortDesc = document.createElement('button');
                sortDesc.innerHTML = 'Sort Z to A';
                sortDesc.onclick = function() { column.order('desc').draw(); modal.style.display = 'none'; };
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
                    
                    cb.onchange = function() {
                        if (!cb.checked) selectAllCb.checked = false;
                        else if (checkboxes.every(c => c.checked)) selectAllCb.checked = true;
                    };
                    checkboxes.push(cb);
                    
                    label.appendChild(cb);
                    label.appendChild(document.createTextNode(' ' + text));
                    checkDiv.appendChild(label);
                });
                
                selectAllCb.onchange = function() {
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
                applyBtn.onclick = function() {
                    let selected = checkboxes.filter(cb => cb.checked).map(cb => cb.value);
                    if (selected.length === checkboxes.length || selected.length === 0) {
                        column.search('', false, false).draw();
                    } else {
                        let regex = '^(' + selected.map(val => val.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|') + ')$';
                        column.search(regex, true, false).draw();
                    }
                    modal.style.display = 'none';
                };
                
                let clearBtn = document.createElement('button');
                clearBtn.className = 'clear-btn';
                clearBtn.innerHTML = 'Clear';
                clearBtn.onclick = function() {
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
