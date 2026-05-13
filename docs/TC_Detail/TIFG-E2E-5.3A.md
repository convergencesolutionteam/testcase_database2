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
| TIFG-E2E-5.3A | 5G SA registration(Attach) and deregistration(Detach) of single UE | 5G-SA | Access |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

Below are the test procedure steps  
1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are powered off.  
2.	Power on the UE and the UE shall send REGISTRATION REQUEST message.  UE shall successfully register to the 5G SA network.   
3.	Full-buffer UDP bi-directional data transmission (see Clause 4.4) between the application server and UE is initiated.  
4.	The registration procedure messages shall be captured, and the latency of the registration procedure shall be measured and recorded in Table 5 6. The duration of the test shall be at least 3 minutes when the throughput is stable. The PDU session establishment procedure messages shall also be captured and verified.  
5.	Power off the UE and UE shall send DEREGISTRATION REQUEST message. UE shall successfully deregister from the 5G SA network.  
6.	The deregistration procedure messages shall be captured, and the latency of deregistration procedure shall be measured and recorded in Table 5 6. The PDU session release procedure messages shall also be captured and verified.  
7.	Repeat steps 2 to 6, for a total of 10 times and record the KPIs mentioned in Table 5 6.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass Registration Latency  
Pass De-registration Latency

</div>

</div>
