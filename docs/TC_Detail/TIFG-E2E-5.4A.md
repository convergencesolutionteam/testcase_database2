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
| TIFG-E2E-5.4A | Connected mode Intra/Inter O-DU mobility - HO | 5G-SA,5G-NSA | Handover |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

Below are the NSA mode steps   
1.	The 4G and 5G cell setups are configured following Clause 5.4.2.  
2.	All the three cells are configured according to the test configuration. The cells are activated and unloaded.   
3.	Both 5G cells are configured as neighbors to each other, so that the UE can trigger measurement events for handover.    
4.	The source (cell 1) and target (cell 2) 5G cells for intra O-DU mobility shall be depicted as in Figure 5 1.  
5.	The test UE is under source 5G cell coverage.  
6.	Power on the UE and UE shall successfully complete the LTE attach followed by successful SgNB addition to source 5G cell.  
7.	The full-buffer UDP bi-directional data transmission (see Clause 4.4) from the application server is initiated.  
8.	The UE shall move from the source 5G cell to the target 5G cell to trigger a handover.  
Below are the SA Mode steps   
1.	The 5G cell setup is configured following Clause 5.4.2.  
2.	Configure two 5G cells within an O-DU according to the test configuration. The cells are activated and unloaded.   
3.	Both 5G cells are configured as neighbors to each other, so that the UE can trigger measurement events for handover.    
4.	The source and target 5G cells for intra O-DU mobility shall be depicted as in Figure 5 2.  
5.	The test UE is under source cell coverage.  
6.	Power on the UE and UE shall successfully register to source 5G cell.  
7.	The full-buffer UDP bi-directional data transmission (see Clause 4.4) from the application server is initiated.  
8.	The UE shall move from source cell to target cell to perform handover.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass Received L1 DL Throughput  
Pass Received L1 UL Throughput  
Pass Handover success count

</div>

</div>
