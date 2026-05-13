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
| TIFG-E2E-7.5.2A | VoNR - Intra-Distributed Unit (DU) handover | 5G-SA | Handover |

<div class="tc-content-border-box" markdown="1">

### Purpose {: .tc-shaded-header }

<br>

### Test Procedure {: .tc-shaded-header }

Ensure the end user devices, O-RAN system, 5G core and the IMS Core have all been configured as outlined in Clause 7.5.2.2. In this test scenario, both the mobile originated and mobile terminated end user devices will use the same O-RAN system, 5G and IMS core to perform the end-to-end voice call. All traces and packet captures shall be enabled for the duration of the testing to ensure all communication between network elements can be captured and validated.  
1.	Power on the two end user devices and ensure both devices register with the 5G core for voice services over SA by connecting over the O-RAN (O-RU, O-DU and O-CU-CP/O-CU-UP). Ensure both the MO & MT end user devices are in the coverage area of the same O-RU – O-RU1.  
2.	Once the registration is complete, the MO and MT end user devices shall establish PDU session with the 5G core. Once the PDU session has been setup, both the end user devices shall register with the IMS core to support voice services.  
3.	Use the MO end user device to call the MT end user device. Validate the MT end user device can receive and answer the call.  
4.	Once the call has been setup, move the MO end user device from the coverage area of O-RU1 to coverage area of O-RU2, triggering a handover from O-RU1 to O-RU2.   
5.	Continue the two-way voice communication between MO and MT end user devices until the handover procedure is complete before terminating the voice call.   
6.	Repeat the test (steps 1 through 5) multiple times (> 10 times) and collect results.

### Autocall Scenario {: .tc-shaded-header }

<br>

### AIS Scenario {: .tc-shaded-header }

<br>

### Test Pass/Fail Criteria {: .tc-shaded-header }

Pass MO Call Success Rate  
Pass MT Call Success Rate  
Pass MO Call Setup Time (ms)  
Pass MT Call Setup Time (ms)  
Pass MO MOS Score  
Pass MT MOS Score  
Pass MO RTP Packet Loss  
Pass MT RTP Packet Loss  
Pass MO Mute Rate  
Pass MT Mute Rate  
Pass MO One Way Call  
Pass MT One Way Call  
Pass Handover success count  
Interarrival Packet Delay (sec)

</div>

</div>
