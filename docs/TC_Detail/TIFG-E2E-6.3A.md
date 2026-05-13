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
| TIFG-E2E-6.3A | Uplink Peak Throughput - SA,NSA | 5G-SA,5G-NSA | Throughput |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are turned off.   
2.	The UE (real or emulated UE) is placed under excellent radio condition (cell centre close to radiated SUT’s antenna) using RSRP thresholds as indicated in Clause 4.6. The UE is powered on and attached to the network.   
3.	The uplink full-buffer UDP and TCP data transmission (see Clause 4.4) from UE to the application server shall be verified by adjusting the connection settings (cabled environment) or UE position (OTA environment). The UE under excellent radio conditions that is achieving peak user throughput shall see stable utilization of the highest possible uplink MCS and uplink transport block size. These KPIs shall also be verified.   
4.	The UE shall be turned off or set to airplane mode, if possible, to empty the buffers. The uplink full-buffer UDP data transmission from UE to the application server is started. The application server shall receive the sent data.   
5.	All the required performance data (incl. the signalling and control data) as specified in the following “Test requirements” clause is measured and captured at UE, SUT and Application server sides using logging/measurement tools. The duration of test shall be at least 3 minutes when the throughput is stable. The location and position of the UE shall remain unchanged during the entire measurement duration (capture of log data).   
6.	The capture of log data is stopped. The uplink full-buffer UDP data transmission from UE to the application server is stopped.   
7.	The UE shall be turned off or set to airplane mode, to empty the buffers. The uplink full-buffer TCP data transmission from UE to the application server is started, and Step 5 is repeated.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass Received L1 UL Throughput

</div>

</div>
