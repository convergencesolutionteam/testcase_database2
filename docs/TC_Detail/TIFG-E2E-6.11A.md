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
| TIFG-E2E-6.11A | Impact of fronthaul latency on downlink peak throughout | 5G-SA,5G-NSA | Throughput |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

1.	The test setup is configured according to the test configuration. The test configuration shall be recorded in the test report. The serving cell under test is activated and unloaded. All other cells are turned off.   
2.	The UE (real or emulated) is placed in the excellent radio condition (cell centre) as defined by SINR in Clause 4.6. The UE is powered on and attached to the network.   
3.	The downlink full-buffer UDP and TCP data transmission (see Clause 4.4) from the application server shall be verified. The excellent radio conditions experiencing peak user throughput is identified with stable utilization of the highest possible downlink MCS, downlink transport block size and downlink MIMO rank (number of layers). The utilization of these KPIs shall be also verified.   
4.	The fronthaul latency (one-way transmission delay between O-DU and O-RU) shall be set to its minimum value.   
5.	The UEs shall be turned off or set to airplane mode, to empty the buffers. The downlink full-buffer UDP data transmission from the application server to the UE is started. The UE shall receive the data from application server.   
6.	All the required performance data (incl. the signalling and control data) as specified in the following “Test requirements” clause is measured and captured at UE and Application server using logging/measurement tools.   
7.	The capture of log data is stopped. The downlink full-buffer UDP data transmission from the UE to application server is stopped.   
8.	The fronthaul latency is increased by 20 us if no degradation of user peak downlink throughput was observer in the previous measurement. As soon as a degradation of user peak downlink throughput will be observed, the fronthaul latency is increased only by 5 us to capture fine-grained log data.   
9.	 Steps 5 to 8 are repeated until the total degradation of user peak downlink throughput is less than 30%. The KPIs measured with the minim fronthaul latency are used as a baseline (100%) for calculation of the degradation.  
10.	[Optional] Steps 4 to 9 are repeated for downlink full-buffer TCP data transmission.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

*AMS자체 판정   
"Total Degradation of Received L1 DL throughput [%]" 값 기준  
Pass : 30% 이하일 시  
Fail : 30% 초과일 시  
N/A : N/A일 시

</div>

</div>
