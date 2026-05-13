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
| FNC-SA-026 | E911 - VoNR,VoLTE | 5G-SA,4G | Emergency Service |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1.Toggle Airplane mode -> ON. Wait 5 secs, Toggle Airplane mode -> OFF. First Call Only  
2. With in Setup Time attempt originate 911 call  
3. Once connected, continue call session for the Traffic Duration Time.

### Autocall Scenario {: .tc-shaded-header }

Iterations : 5  
Idle (sec) : 15  
Setup Time (sec) : 30  
Traffic Duration (sec) : 25  
Interval between iterations (sec) : ~3

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 1 Cell (Single carrier)  
UE Position: Cell center / Fixed point  
RF Condition: RSRP High (e.g., -60 ~ -80 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

E911 Success Rate[%]  
E911 Latency[ms]

</div>

</div>
