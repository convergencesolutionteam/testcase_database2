<a href="javascript:history.back()" class="tc-back-btn">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg> Back to List
</a>

<div class="tc-report-page" markdown="1">

<div class="tc-report-top">
    <div class="tc-report-logo">Test Case <strong>Accuver</strong></div>
</div>

<h1 class="tc-report-maintitle">XCAL-ART</h1>

| Test case ID | Description | Tech classification | Functional areas classification |
|---|---|---|---|
| V-NSA-004 | VoLTE Stability (LTE+NR) | 5G-NSA | VoLTE |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

Verify VoLTE call stability and success rate for the maximum number of UEs in LTE+NR.

### Test Procedure {: .tc-shaded-header }

1. Initiate MO VoLTE calls & establish VoLTE calls using 16 pairs of UEs  
2. Wait 30 sec  
3. Disconnect VoLTE calls for 16 pairs of Ues  
4. Repeat test step "1" to "3" for 1 hour

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 1 Cell (Single carrier)  
UE Position: Cell center / Fixed point  
RF Condition: RSRP High (e.g., -60 ~ -80 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

VoLTE Call Success Rate [%]  
Number of UE

</div>

</div>
