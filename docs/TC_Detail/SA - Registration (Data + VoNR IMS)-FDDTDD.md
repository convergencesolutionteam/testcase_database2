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
| ACC-001-02 | SA - Registration (Data + VoNR IMS)-FDD/TDD | SA | Access |

<div class="tc-content-border-box" markdown="1">

### Test Procedure {: .tc-shaded-header }

1. After the mobile sends a deregistration request, all connections to the network are disconnected.
2. Mobile sends registration request
3. Receive registration accept from system
4. Mobile sends Registration Complete
5. Deregistration and registration procedures should proceed without problems.

### • Autocall Scenario {: .tc-shaded-header }

Using 1 UE  
Voice > Common  
**Call Type** - Idle  
**Idle Time** - 20 sec  
**Attach / Detach in Idle** - Check  
**On to Off Time** - 10 sec  

### • AIS Scenario {: .tc-shaded-header }

Using 1 Cell  
SA only  
Cell center  
Fixed point  

### Test Pass/Fail Criteria {: .tc-shaded-header }

- Registration Request to Registration Complete latency within the threshold. (Default - Pass: 1000ms, C.Pass: 1200ms)
- Registration Success Rate higher than the threshold. (Default - Pass: 95%, C.Pass: 90%)
- Registration Success Rate = Registration Complete Count / Registration Request Count * 100

</div>

</div>
