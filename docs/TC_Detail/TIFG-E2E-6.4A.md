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
| TIFG-E2E-6.4A | Downlink throughput in different radio conditions(Poor/Good/Fair/Excellent position) - SA,NSA | 5G-SA,5G-NSA | Throughput |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are turned off.   
2.	The UE (real or emulated UE) is placed under good radio conditions (close to cell centre) using SINR thresholds as indicated in Clause 4.6. The UE is powered on and attached to the network.   
3.	The downlink full-buffer UDP and TCP data transmission (see Clause 4.4) from the application server shall be verified by adjusting the connection settings (cabled environment) or UE position (OTA environment) to achieve good radio conditions.   
4.	The UE shall be turned off or set to airplane mode, to empty the buffers. The downlink full-buffer UDP data transmission from the application server to the UE is started. The UE shall receive the data from the application server.   
5.	All the required performance data (incl. the signalling and control data) as specified in the following “Test requirements” clause is measured and captured at UE and Application server sides using logging/measurement tools. The duration of test shall be at least 3 minutes when the throughput is stable. The location and position of the UE shall remain unchanged during the entire measurement duration (capture of log data).   
6.	The capture of log data is stopped. The downlink full-buffer UDP data transmission from the application server is stopped.   
7.	The radio conditions of UE are changed to fair using SINR thresholds as indicated in Clause 4.6. The steps 4 to 6 are repeated.   
8.	The radio conditions of UE are changed to poor (cell edge) radio condition using SINR thresholds as indicated in Clause 4.6. Steps 4 to 6 are repeated.   
9.	[Optional] Steps 4 to 8 are repeated for downlink full-buffer TCP data transmission.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass Received L1 DL Throughput  
RSRP(Max)  
RSRP(Min)  
SINR(Max)  
SINR(Min)

</div>

</div>
