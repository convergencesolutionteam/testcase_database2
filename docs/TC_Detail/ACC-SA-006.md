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
| ACC-SA-006 | SA - Registration (Data + VoNR IMS) | 5G-SA | Access |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1.Toggle Airplane mode -> ON. Wait 10 secs, Toggle Airplane mode -> OFF, and confirm successful attach of UE to gNB under test.  
2. Repeat - 5 times.

### Autocall Scenario {: .tc-shaded-header }

Iterations : 5  
Idle (sec) : 25  
Traffic Duration (sec) : N/A  
Interval between iterations (sec) : ~3

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 1 Cell (Single carrier)  
UE Position: Cell center / Fixed point  
RF Condition: RSRP High (e.g., -60 ~ -80 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

Registration Success Rate[%]  
Registration Latency[ms]  
Registration IMS DNN Setup Success Rate[%]  
Registration IMS DNN Setup Latency[ms]

</div>

</div>
