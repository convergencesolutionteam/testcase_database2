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
| FNC-SA-019 | MO & MT- SMSoIMS-Short/Long-Message - SA,LTE,NSA,3G | 5G-SA | Message Service |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1.Toggle Airplane mode -> ON. Wait 10 secs, Toggle Airplane mode -> OFF. First Call Only  
2. With in Setup Time attempt compose and send Message.  
3. Within Traffic time wait for the Message to receive on MT.

### Autocall Scenario {: .tc-shaded-header }

Iterations : 5  
Idle (sec) : 15  
Setup Time (sec) : 30  
Traffic Duration (sec) : 10  
Interval between iterations (sec) : ~3

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 1 Cell (Single carrier)  
UE Position: Cell center / Fixed point  
RF Condition: RSRP High (e.g., -60 ~ -80 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

MO Success Rate[%]  
MT Success Rate[%]  
End to End Delivery Time [s]  
Average Time to Send[s]

</div>

</div>
