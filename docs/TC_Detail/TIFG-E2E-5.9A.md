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
| TIFG-E2E-5.9A | Idle Mode Intra- O-DU mobility_Intra/Inter frequency | 5G-NSA | Handover |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

Below are the SA Mode Intra frequency steps   
1.	The 5G cell setup is configured following Clause 5.9.2.  
2.	Configure two 5G cells (cell 1 and cell 2) of same frequency within an O-DU according to the test configuration. The cells are activated and unloaded.   
3.	Both 5G Cells are configured neighbours to each other, so that UE can use it for cell re-selection.    
4.	The source and target 5G cells for intra O-DU mobility shall be depicted as in Figure 5-7.  
5.	The test UE is under source cell coverage.  
6.	Power on the UE and UE shall successfully register to source 5G cell.  
7.	Wait till the UE goes in idle mode as per UE inactivity timer and then move the UE from source cell to target cell.  
8.	Once UE moves to new cell, make an MO data call.  
9.	Repeat the above test steps for 10 iterations.  
Below is the SA Mode Inter frequency steps   
1.	The 5G cell setup is configured following Clause 5.9.2.  
2.	Configure two 5G cells (cell 1 and cell 2) on different frequencies within an O-DU according to the test configuration. The cells are activated and unloaded.   
3.	Both 5G Cells are configured neighbours to each other, so that UE can use it for cell re-selection.    
4.	The source and target 5G cells for intra O-DU mobility shall be depicted as in Figure 5-7.  
5.	The test UE is under source cell coverage.  
6.	Power on the UE and UE shall successfully register to source 5G cell.  
7.	Wait till the UE goes in idle mode as per UE inactivity timer and then move the UE from source cell to target cell, move the UE from source cell to target cell.  
8.	Once UE moves to new cell, make an MO data call.  
9.	Repeat the above test steps for 10 iterations.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass SA Attach Success Rate  
Pass SA reselection Success Rate

</div>

</div>
