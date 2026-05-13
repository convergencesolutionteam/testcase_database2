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
| TIFG-E2E-8.3A | Traffic Load Testing | 5G-NSA | Throughput |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

The test steps below are applicable for either LTE or 5G SA:  
1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are powered off.  
2.	The UEs are placed under excellent radio conditions (Cell centre close to radiated SUT’s Antenna) as defined by LTE RSRP (for LTE) or 5G SS-RSRP (for 5G SA) in Clause 4.6.   
3.	The End-to-end setup shall be operational for LTE or 5G SA as applicable for the test scenario, and there should not be any connectivity issues.   
4.	Required performance data (incl. the signalling and control data) as specified in the “Test requirements” clause below shall be measured and captured at the UE(s) and SUT side using logging/measurement tools.   
5.	Power on X UEs per second to access the SUT by signalling, initiate UDP upload/download for each UE after UEs get access. In this step and later steps, lost connections shall be re-established automatically to maintain number of RRC Connected UEs.  
6.	Continue Step 5 until total UEs reach maximum active number of UEs N per cell.  
7.	Release X UEs per second then add X UEs per second to access the SUT and initiate UDP upload/download for each new access UE.  
8.	Repeat Step 7 for at least 5 minutes and record the KPI values, RRC access success rate, and Packet Error Rate.  
9.	Release all UEs, add X UEs per second to access the SUT and initiate UDP upload/download for each new access UE until total UEs reach maximum active number of UEs N per cell. Keep testing for at least 5 minutes. Record KPI values and packet error rate.  
10.	Stop and save the test logs. Check the log to make sure that the test runs successfully and that no unexpected behavior such as unexpected call release is recorded. The logs shall be captured and kept for test result reference and measurements.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass NSA Attach Success Rate  
NR Number of Ues

</div>

</div>
