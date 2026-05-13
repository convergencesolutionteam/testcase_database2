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
| ACC-NSA-007 | NSA,LTE - Attach Detach | 5G-NSA,4G | Access |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1. After mobile sends a detach request, all connections to the network are disconnected  
2. Mobile sends Attach request  
3. Receive Attach accept from system  
4. Mobile sends Attach complete  
5. Detach and Attach procedures should proceed without any problem.

### Autocall Scenario {: .tc-shaded-header }

Using 1 UE  
Voice > Common  
 Call Type - Idle  
 Idle Time - 20 sec  
 Attach / Detach in Idle - Check  
  On to Off Time - 10 sec

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 1 Cell (Single carrier)  
UE Position: Cell center / Fixed point  
RF Condition: RSRP High (e.g., -60 ~ -80 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

Attach Success Rate[%]  
Attach Latency[ms]

</div>

</div>
