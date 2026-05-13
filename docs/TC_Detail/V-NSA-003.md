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
| V-NSA-003 | VoLTE  Call with during UDP (with Idle mode) (LTE+NR) | 5G-NSA | VoLTE |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

Verify VoLTE call setup triggered from Idle mode during background UDP data scheduling (LTE+NR).

### Test Procedure {: .tc-shaded-header }

1. 2UE attach to the small cell (data mode off)  
2. Wait until rrc release after inactivity time.   
3. Start the volte call for 60 seconds (no volte call drop)  
4. Check for NR addition after volte call ends (data mode on)  
Repeat test step "1" and "4" 10 times

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 1 Cell (Single carrier)  
UE Position: Cell center / Fixed point  
RF Condition: RSRP High (e.g., -60 ~ -80 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

NR SCG Addition Success Rate [%]  
RRC State   
Data Call Success Rate [%]  
VoLTE Call Success Rate [%]

</div>

</div>
