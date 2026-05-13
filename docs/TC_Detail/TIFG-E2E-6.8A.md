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
| TIFG-E2E-6.8A | Uplink coverage throughput (link budget) (single cell, single UE scenario) - SA,NSA | 5G-SA,5G-NSA | Throughput |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are turned off.   
2.	The UE (real or emulated) is placed under excellent radio condition (cell centre) using RSRP thresholds as indicated in Clause 4.6. The UE is powered on and attached to the network.   
3.	The uplink full-buffer UDP and TCP data transmission (see Clause 4.4) from UE to the application server shall be verified. The UE under excellent radio conditions that is achieving peak user throughput should see stable utilization of the highest possible uplink MCS and uplink transport block size. These KPIs shall also be verified.   
4.	The UE shall be turned off or set to airplane mode, to empty the buffers. The uplink full-buffer UDP data transmission from the application server to the UE is started. The application server shall receive data from the UE.   
5.	All the required performance data (incl. the signalling and control data) as specified in the following “Test requirements” clause is measured and captured at UE, SUT and Application server sides using logging/measurement tools.   
6.	In the field setup, the UE is moved along the defined drive route out from cell centre (excellent radio conditions) to cell edge (poor radio conditions) on the main lobe of SUT’s antenna and with constant speed of around 30kph until UE loses the coverage (call drop).   
7.	In the lab setup, the attenuation between the antenna connectors of O-RU and UE is gradually increased until UE losses the coverage (call drop).  
8.	The capture of log data is stopped. The uplink full-buffer UDP data transmission from UE to the application server is stopped.   
9.	[Optional] Steps 4 to 7 are repeated for uplink full-buffer TCP data transmission.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass Received L1 UL Throughput

</div>

</div>
