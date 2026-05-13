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
| TIFG-E2E-7.2.1A | NSA Video Streaming - Stationary Test(Poor/Good/Fair/Excellent position) | 5G-NSA | ViLTE |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

Ensure the end user device, O-RAN system, 4G/5G core and the application server have all been configured as outlined in Clause 7.2.1.2. All traces and packet captures shall be enabled for the duration of the testing to ensure all communication between network elements can be captured and validated.  
1.	Power on the end user device in excellent radio condition and ensure it registers with the 4G/5G core for data services.  
2.	Once the registration is complete, the end user device shall establish a PDN Session with the 4G core or PDU session with the 5G core.  
3.	Open the video streaming client on the end user device and start a video streaming session over HTTP/TCP protocol and let the video stream for at least 120 seconds.   
4.	Optionally, repeat the test by streaming a video session over the HTTP/QUIC protocol and stream the video content for at least 120 seconds.  
5.	Repeat the test multiple times (> 10 times) and gather results.  
6.	Repeat the above steps 1 through 5 for the good, fair and poor radio conditions.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass Video Start Time (ms)  
Pass Number of Video Stalls/buffering Count  
Pass Duration of stalls in the video (ms)  
Pass Video MOS Score  
RSRP(Max)  
RSRP(Min)  
SINR(Max)  
SINR(Min)

</div>

</div>
