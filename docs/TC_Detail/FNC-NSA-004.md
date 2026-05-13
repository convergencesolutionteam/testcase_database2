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
| FNC-NSA-004 | Multi-service (VoLTE/Data/HO) Stability (LTE+NR) | 5G-NSA | Multi-service |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

Verify concurrent stability of VoLTE, data services, and handovers for the maximum number of UEs in LTE+NR.

### Test Procedure {: .tc-shaded-header }

1. Initiate MO VoLTE calls & establish VoLTE calls using 8 pairs of UEs  
2. Make each 8 UE download 500MB file from the FTP serever  
3.  Apply the scenario (VoLTE) to 8UEs and the scenario (Download) to others 8UEs.  
4. The others 2 UEs which are Performing Volte action are made handover action between MeNB#1 and MeNB#2 for 12Hours.  
5. Check 5G Release and Addition during handover operation.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

Cell Configuration: Using 1 Cell (Single carrier)  
UE Position: Cell center / Fixed point  
RF Condition: RSRP High (e.g., -60 ~ -80 dBm)

### Test Pass/Fail Criteria {: .tc-shaded-header }

Data Donwload Call Success Rate [%]  
Data Upload Call Success Rate [%]  
VoLTE Call Success Rate [%]  
Data Download Call Success Rate [%] with S1 Handover  
Data Upload Call Success Rate [%] with S1 Handover  
VoLTE Call Success Rate [%] with S1 Handover  
Number of UE

</div>

</div>
