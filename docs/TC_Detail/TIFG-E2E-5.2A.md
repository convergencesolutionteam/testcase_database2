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
| TIFG-E2E-5.2A | NSA(LTE&NR) attach and detach of multiple UEs | 5G-NSA | Access |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

The test steps below are applicable for either LTE or 5G NSA:  
1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are powered off.  
2.	The multiple UEs (real or emulated) are placed under excellent radio conditions (Cell centre close to radiated SUT’s Antenna) as defined by LTE RSRP (for LTE) or 5G SS-RSRP (for 5G NSA) in Clause  4.6.   
3.	The End-to-end setup shall be operational for LTE or 5G NSA as applicable for the test scenario, and there shall not be any connectivity issues.   
4.	Start the logs to capture the call flow and signalling messages.   
5.	“Power ON” the multiple connected UEs to attach to the LTE or 5G NSA cell.  Wait for the successful attach of all UEs.   
6.	“Power OFF” the multiple UEs to detach from the network. Wait for the successful detach of all UEs  
7.	Stop and save the test logs. The logs shall be captured and kept for test result reference and measurements   
8.	Repeat steps 4 to 7, for a total of 10 times and record the KPIs mentioned in Clause 5.2.4

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass NSA Attach Success Rate  
Pass NSA Detach Success Rate

</div>

</div>
