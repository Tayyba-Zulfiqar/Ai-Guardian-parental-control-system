import React from 'react';

/* 

1- PARENT PROFILE: (IDENTITY LAYER)
🎯 Purpose:
Manage the parent’s own account (not the child system)
📦 Include:
Change name
Change email
Change password
Profile picture (optional)
Logout from parent dashboard
Delete account (optional, advanced)



2- SYSTEM CONTROLS: (POLICY LATERY)
Options:
🟢 1. Approval Mode (Recommended)
Child sends logout request
Parent approves/denies in dashboard
🔴 2. PIN Mode (Strict)
Child must enter Parent Control PIN
Logout allowed only if PIN is correct
⚪ 3. Disabled (Not recommended)
Child can logout freely
Monitoring may stop





3-NOTIFICATIONS SETTINGS: (AFFECT ALERTS --> COMMUNICATION LAYER)

 1-Turn alerts ON/OFF
2-Choose alert types:
       Only harmful content alerts
       Daily summary reports

⚙️ In system:
If OFF → parent sees data only in dashboard
If ON → parent gets instant alert like:

“Harmful content detected on YouTube”




3- MONITORING TOGGLE: (AFFECT MONITORING ---> DATA COLLECTION LAYER)
Enable monitoring
Pause monitoring temporarily
Stop tracking completely

ON → everything works (tracking, alerts, screen time)
OFF → child device is not monitored at all




*/

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;