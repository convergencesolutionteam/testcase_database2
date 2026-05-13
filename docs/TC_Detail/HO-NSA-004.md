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
| HO-NSA-004 | Idle Mode Cell Reselection (Dish 5G-SA <-> Roaming partner LTE/5G-NSA) | 5G-NSA | Reselection |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

Verify Idle Mode cell reselection between 5G-SA and LTE/5G-NSA, and compare results between DUT and Reference device.

### Test Procedure {: .tc-shaded-header }

<br>

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 2 Cells (Same EARFCN/ARFCN, Different PCI)  
UE Position: Moving from Source to Target / Virtual movement via Attenuator  
RF Condition: RSRP Cross-over (Source: -60 → -110 dBm, Target: -110 → -60 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

5G SA Reselection Success Rate (%)

</div>

</div>
