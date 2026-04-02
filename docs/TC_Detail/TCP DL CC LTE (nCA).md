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
| SNGL-001-07 | TCP DL CC LTE (nCA) | LTE | Throughput |

<div class="tc-content-border-box" markdown="1">

### Test Procedure {: .tc-shaded-header }

1. Data download measurement using Autocall FTP, Iperf, etc.
2. The download session is not disconnected during the set traffic time, and the average throughput of the traffic time is higher than the set threshold.


### • Autocall Scenario {: .tc-shaded-header }

Using 1 UE <br>
**Call Type** - App > Iperf <br>
**Mode** - TCP <br>
**Direction** - Down(iperf2 server), Down(iperf3 -R option) <br>

### • AIS Scenario {: .tc-shaded-header }

Using 1 Cell
Cell center 
Fixed point

### Test Pass/Fail Criteria {: .tc-shaded-header }

- Measured LTE PDSCH TOTAL throughput higher than the threshold. (Default - Pass: 441Mbps, C.Pass: 353Mbps)

</div>

</div>
