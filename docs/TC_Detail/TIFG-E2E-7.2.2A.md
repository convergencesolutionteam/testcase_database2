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
| TIFG-E2E-7.2.2A | Video Streaming - Handover between same Master eNB but different O-RUs - Intra O-DU | 5G-NSA | Handover |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

Ensure the end user device, O-RAN system, 4G core, and the application server have all been configured as outlined in Clause 7.2.2.2. All traces and packet captures shall be enabled for the duration of the testing to ensure all communication between network elements can be captured and validated.  
1.	Power on the end user device and ensure it registers with the 4G core for data services over NSA by connecting over the O-eNB as Master eNB and O-RU1 of the O-RAN system as secondary gNB.  
2.	Once the registration is complete, the end user device shall establish a PDN connection with the 4G core.  
3.	Open the video streaming client on the end user device and start a streaming session over HTTP/TCP protocol.   
4.	Once the video streaming session has started, move the device so it can handover from O-RU1 to O-RU2 on the Secondary gNB while it continues to use the O-eNB as the Master eNB.   
5.	Allow the end user device to stream video through the entire handover process. Measure the KPIs included in Clause 7.2 for this video streaming session.  
6.	Optionally, repeat steps 1 through 5 for a video streaming session which uses HTTP/QUIC protocol for streaming.  
7.	Repeat the test multiple times (> 10 times) and gather results.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass Video Start Time (ms)  
Pass Number of Video Stalls/buffering Count  
Pass Duration of stalls in the video (ms)  
Pass Video MOS Score  
Pass Handover success count

</div>

</div>
