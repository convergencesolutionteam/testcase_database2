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
| TIFG-E2E-8.1A | Simultaneous RRC_Connected UEs | 5G-NSA | Access |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

The test steps below are applicable for either LTE or 5G NSA/SA:  
1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are powered off.  
2.	The UEs are placed under excellent radio conditions (Cell centre close to radiated SUT’s Antenna) as defined by LTE RSRP (for LTE) or 5G SS-RSRP (for 5G NSA/SA) in Clause 4.6.   
3.	The End-to-end setup shall be operational for LTE or 5G NSA/SA as applicable for the test scenario, and there should not be any connectivity issues.   
4.	Required performance data (incl. the signalling and control data) as specified in the “Test requirements” clause below shall be measured and captured at the UE(s) and SUT side using logging/measurement tools.  
5.	"Power ON" the UEs one by one, connect them to the LTE or 5G NSA/SA cell, and confirm that they are in the RRC_CONNECTED state normally. The UE in RRC_CONNECTED state, to keep their RRC connection, periodically sends some data packets like Ping. The connection holding time shall be at least 3 minutes in Figure 8 1 to be sufficient for the test. Increase the number of UEs until the newly powered UE fails to connect to LTE or 5G NSA/SA cell.  
a)	Start with a number of 100 UEs and further increase the number of UEs in increments of 100, until a newly powered on UE fails to connect. Connect the UEs sequentially at a reasonable rate; the recommended rate is 10 UEs per second.  
b)	From the last increment, where all UEs connected successfully, repeat the process of increasing the number of UEs in increments of 10, until a newly powered on UE fails to connect. Connect the UEs sequentially at the same rate as before.  
c)	From the last increment, where all UEs connected successfully, repeat the process of increasing the number of UEs in increments of 1, until a newly powered on UE fails to connect. Connect the UEs sequentially at the same rate as before.  
6.	If all newly powered UEs successfully "Power ON" during one of the UE number increments in step 5, the Uu with optional additional OpenFH and/or F1 interface and test equipment (see Clause 4.1.1) should be used to add more UEs until a newly powered UE fails to connect  
7.	Lost connections shall be re-established automatically to maximize number of RRC Connected UEs.  
8.	Stop and save the test logs. Check the log to make sure that the test runs successfully and that no unexpected behavior such as unexpected call release is recorded. The logs shall be captured and kept for test result reference and measurements.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

LTE Number of UEs  
NR Number of Ues

</div>

</div>
