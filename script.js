document.addEventListener('DOMContentLoaded', () => {
    const wheelSegments = document.querySelectorAll('.wheel-segment');
    const templateButtons = document.querySelectorAll('.template-btn');
    const modal = document.getElementById('popupModal');
    const closeModal = document.querySelector('.close-btn');
    const popupFormContent = document.getElementById('popupFormContent');
    const popupForm = document.getElementById('popupForm');
    const previewSection = document.querySelector('.preview-section');
    const emailPreview = document.getElementById('emailPreview');
    const copyEmailButton = document.getElementById('copyEmail');
    const backToFormButton = document.getElementById('backToForm');
    const adminTemplateSection = document.getElementById('adminTemplateSection');
    const addNewTemplateBtn = document.getElementById('addNewTemplateBtn');
    const editTemplatesBtn = document.getElementById('editTemplatesBtn');
    const adminTemplateForm = document.getElementById('adminTemplateForm');
    const modalTitle = document.getElementById('modalTitle');
    const adminAccessBtn = document.getElementById('adminAccessBtn');
    const wheel = document.querySelector('.wheel');

    let selectedTemplate = null;
    let formData = null;
    let editingTemplate = null;
    let templates = {
        'dev-testing-started': {
            fields: [
                { id: 'projectName', label: 'Project Name', type: 'text', placeholder: 'Enter project name', required: true },
                { id: 'recipientName', label: 'Recipient\'s Name', type: 'text', placeholder: 'Enter recipient\'s name', required: true },
                { id: 'frontendUrl', label: 'Frontend URL', type: 'url', placeholder: 'Enter frontend URL', required: true },
                { id: 'backendUrl', label: 'Backend URL', type: 'url', placeholder: 'Enter backend URL', required: true },
                { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter login username', required: true },
                { id: 'password', label: 'Password', type: 'text', placeholder: 'Enter login password', required: true },
                { id: 'bugTrackerUrl', label: 'Bug Tracker URL', type: 'url', placeholder: 'Enter bug tracker URL', required: true },
                { id: 'device1', label: 'Device 1 (OS Version)', type: 'text', placeholder: 'Enter device details', required: true },
                { id: 'device2', label: 'Device 2', type: 'text', placeholder: 'Enter device details', required: false },
                { id: 'device3', label: 'Device 3', type: 'text', placeholder: 'Enter device details', required: false },
                { id: 'startDate', label: 'Start Date', type: 'date', placeholder: '', required: true },
                { id: 'dueDate', label: 'Expected Completion Date', type: 'date', placeholder: '', required: true },
                { id: 'testDocName', label: 'Test Document Name', type: 'text', placeholder: 'Enter test document name', required: true },
                { id: 'pcName', label: 'Project Coordinator Name', type: 'text', placeholder: 'Enter project coordinator name', required: true },
                { id: 'teamLeadName', label: 'Team Lead Name', type: 'text', placeholder: 'Enter team lead name', required: true },
                { id: 'approvalDeadline', label: 'Approval Deadline', type: 'date', placeholder: '', required: true },
                { id: 'senderName', label: 'Your Name', type: 'text', placeholder: 'Enter your name', required: true },
                { id: 'testDocLink', label: 'Test Document Link', type: 'url', placeholder: 'Enter test document link', required: false }
            ],
            content: `
Dear {recipientName},

I’m writing to inform you that development testing has officially commenced for {projectName}. Please find the testing details below for your reference:

### Testing Overview
- Frontend URL: {frontendUrl}
- Backend URL: {backendUrl}
- Username: {username}
- Password: {password}

### Testing Approach
- Method: Manual + Automation
- Tools in Use:
  - Selenium – Functional Validations
  - Burp Suite – Security Testing
  - Axe – Accessibility Checks
  - JAM – Session Recording
  - Screaming Frog – SEO Analysis
  - GitLab – Bug Tracking ({bugTrackerUrl})

### Browsers & Devices
- Browsers Covered: Safari, Chrome, Brave, Firefox
- Devices Used:
  - {device1}
  - {device2 || 'N/A'}
  - {device3 || 'N/A'}

### Testing Timeline
- Start Date: {startDate}
- Expected Completion: {dueDate}

### Test Documentation
Please review the attached test plan – {testDocName}.doc – which outlines the scope, test cases, and methodologies for this testing phase.
Kindly request the Project Coordinator ({pcName}) and Team Lead ({teamLeadName}) to review and approve the document before testing proceeds. We request that approval be shared with the team no later than {approvalDeadline}.

If you have any questions or require further details, feel free to reach out.

Best regards,
{senderName}

Test Document Link: {testDocLink}
            `,
            icon: 'fas fa-rocket'
        },
        'dev-testing-rejected': {
            fields: [
                { id: 'recipientName', label: 'Recipient\'s Name', type: 'text', placeholder: 'Enter recipient\'s name', required: true },
                { id: 'projectName', label: 'Project Name', type: 'text', placeholder: 'Enter project name', required: true },
                { id: 'websiteName', label: 'Website Name', type: 'text', placeholder: 'Enter website name', required: true },
                { id: 'backendName', label: 'Backend Name', type: 'text', placeholder: 'Enter backend name', required: true },
                { id: 'frontendUrl', label: 'Frontend URL', type: 'url', placeholder: 'Enter frontend URL', required: true },
                { id: 'backendUrl', label: 'Backend URL', type: 'url', placeholder: 'Enter backend URL', required: true },
                { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter login username', required: true },
                { id: 'password', label: 'Password', type: 'text', placeholder: 'Enter login password', required: true },
                { id: 'criticalBugs', label: 'Critical Bugs', type: 'number', placeholder: 'Enter number of critical bugs', required: true },
                { id: 'startDate', label: 'Start Date', type: 'date', placeholder: '', required: true },
                { id: 'endDate', label: 'End Date', type: 'date', placeholder: '', required: true },
                { id: 'totalIssues', label: 'Total Issues', type: 'number', placeholder: 'Enter total issues reviewed', required: true },
                { id: 'bugsCount', label: 'Bugs Count', type: 'number', placeholder: 'Enter total bugs identified', required: true },
                { id: 'bugtrackerUrl', label: 'Bug Tracker URL', type: 'url', placeholder: 'Enter bug tracker URL', required: true },
                { id: 'newBugs', label: 'New Bugs', type: 'number', placeholder: 'Enter number of new bugs', required: true },
                { id: 'viewNewBugsLink', label: 'View New Bugs Link', type: 'url', placeholder: 'Enter link to view new bugs', required: true },
                { id: 'viewCriticalBugsLink', label: 'View Critical Bugs Link', type: 'url', placeholder: 'Enter link to view critical bugs', required: true },
                { id: 'otherBugs', label: 'Other Bugs', type: 'number', placeholder: 'Enter number of other bugs', required: true },
                { id: 'viewOtherBugsLink', label: 'View Other Bugs Link', type: 'url', placeholder: 'Enter link to view other bugs', required: true },
                { id: 'viewAllIssuesLink', label: 'View All Issues Link', type: 'url', placeholder: 'Enter link to view all issues', required: true },
                { id: 'browser1', label: 'Browser 1', type: 'text', placeholder: 'Enter first browser', required: true },
                { id: 'browser2', label: 'Browser 2', type: 'text', placeholder: 'Enter second browser', required: false },
                { id: 'browser3', label: 'Browser 3', type: 'text', placeholder: 'Enter third browser', required: false },
                { id: 'browser4', label: 'Browser 4', type: 'text', placeholder: 'Enter fourth browser', required: false },
                { id: 'device1', label: 'Device 1', type: 'text', placeholder: 'Enter first device', required: true },
                { id: 'device2', label: 'Device 2', type: 'text', placeholder: 'Enter second device', required: false },
                { id: 'device3', label: 'Device 3', type: 'text', placeholder: 'Enter third device', required: false },
                { id: 'osVersion', label: 'OS Version', type: 'text', placeholder: 'Enter OS version', required: false },
                { id: 'yourName', label: 'Your Name', type: 'text', placeholder: 'Enter your name', required: true }
            ],
            content: `
Subject: Dev Testing Rejected for {projectName}

Dear {recipientName},

I regret to inform you that the Dev testing phase for {projectName} has been rejected due to the identification of multiple critical bugs. Please find the details below for your reference:

🧪 Testing Details:
Website: {websiteName}
Backend: {backendName}
Frontend URL: {frontendUrl}
Backend URL: {backendUrl}
Username: {username}
Password: {password}

❌ Reason for Rejection:
During the testing phase, {criticalBugs} critical bugs were identified, which pose significant risks to functionality, security, or performance. These issues prevent the current phase from being approved.

📋 Testing Summary:
Start Date: {startDate}
End Date: {endDate}
Total Issues Reviewed: {totalIssues}
Total Bugs Identified: {bugsCount}
Critical Bugs: {criticalBugs}
Bug Tracker: {bugtrackerUrl}

🐞 Issues Breakdown:
Category | Count | Details
---------|-------|--------
Total Issues | {totalIssues} | {viewAllIssuesLink}
New Bugs | {newBugs} | {viewNewBugsLink}
Critical Bugs | {criticalBugs} | {viewCriticalBugsLink}
Other Bugs | {otherBugs} | {viewOtherBugsLink}

🧰 Testing Method & Tools:
Method: Manual + Automation
Tools Used:
- Selenium – Bug Validation
- Burp Suite – Security Testing
- Axe – Accessibility Checks
- JAM – Bug Recording
- Screaming Frog – SEO Analysis
- GitLab (Bug Tracker): {bugtrackerUrl}

🌐 Browsers Covered:
{browser1}, {browser2 || 'N/A'}, {browser3 || 'N/A'}, {browser4 || 'N/A'}

💻 Devices Used:
{device1} ({osVersion || 'N/A'})
{device2 || 'N/A'}
{device3 || 'N/A'}

🚀 Next Steps:
The development team is requested to prioritize and resolve the {criticalBugs} critical bugs. A revised testing phase will be scheduled once these issues are addressed and verified.

Please review the detailed bug report at {bugtrackerUrl} and let me know if you need any further clarification or support.

Best regards,
{yourName}
            `,
            icon: 'fas fa-ban'
        },
        'dev-retesting-rejected': {
            fields: [],
            content: 'Default content for dev-retesting-rejected',
            icon: 'fas fa-times-circle'
        },
        'dev-retesting-completed': {
            fields: [],
            content: 'Default content for dev-retesting-completed',
            icon: 'fas fa-check-circle'
        },
        'html-comparison-started': {
            fields: [],
            content: 'Default content for html-comparison-started',
            icon: 'fas fa-code'
        },
        'html-comparison-completed': {
            fields: [],
            content: 'Default content for html-comparison-completed',
            icon: 'fas fa-check-double'
        },
        'before-live-started': {
            fields: [],
            content: 'Default content for before-live-started',
            icon: 'fas fa-hourglass-start'
        },
        'before-live-approved-with-bugs': {
            fields: [],
            content: 'Default content for before-live-approved-with-bugs',
            icon: 'fas fa-exclamation-triangle'
        },
        'before-live-approval': {
            fields: [],
            content: 'Default content for before-live-approval',
            icon: 'fas fa-award'
        },
        'before-live-rejected': {
            fields: [],
            content: 'Default content for before-live-rejected',
            icon: 'fas fa-ban'
        },
        'after-live-started': {
            fields: [],
            content: 'Default content for after-live-started',
            icon: 'fas fa-globe'
        },
        'after-live-completed': {
            fields: [],
            content: 'Default content for after-live-completed',
            icon: 'fas fa-check-circle'
        },
        'sick-leave': {
            fields: [],
            content: 'Default content for sick-leave',
            icon: 'fas fa-medkit'
        },
        'casual-leave': {
            fields: [],
            content: 'Default content for casual-leave',
            icon: 'fas fa-umbrella-beach'
        },
        'unpaid-leave': {
            fields: [],
            content: 'Default content for unpaid-leave',
            icon: 'fas fa-wallet'
        },
        'dev-retesting-started': {
            fields: [
                { id: 'recipientName', label: 'Recipient\'s Name', type: 'text', placeholder: 'Enter recipient\'s name', required: true },
                { id: 'projectName', label: 'Project Name', type: 'text', placeholder: 'Enter project name', required: true },
                { id: 'websiteName', label: 'Website Name', type: 'text', placeholder: 'Enter website name', required: true },
                { id: 'backendName', label: 'Backend Name', type: 'text', placeholder: 'Enter backend name', required: true },
                { id: 'frontendUrl', label: 'Frontend URL', type: 'url', placeholder: 'Enter frontend URL', required: true },
                { id: 'backendUrl', label: 'Backend URL', type: 'url', placeholder: 'Enter backend URL', required: true },
                { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter login username', required: true },
                { id: 'password', label: 'Password', type: 'text', placeholder: 'Enter login password', required: true },
                { id: 'totalIssues', label: 'Total Issues', type: 'number', placeholder: 'Enter total issues logged', required: true },
                { id: 'bugsCount', label: 'Bugs Count', type: 'number', placeholder: 'Enter total bugs logged', required: true },
                { id: 'bugtrackerUrl', label: 'Bug Tracker URL', type: 'url', placeholder: 'Enter bug tracker URL', required: true },
                { id: 'browser1', label: 'Browser 1', type: 'text', placeholder: 'Enter first browser', required: true },
                { id: 'browser2', label: 'Browser 2', type: 'text', placeholder: 'Enter second browser', required: false },
                { id: 'browser3', label: 'Browser 3', type: 'text', placeholder: 'Enter third browser', required: false },
                { id: 'browser4', label: 'Browser 4', type: 'text', placeholder: 'Enter fourth browser', required: false },
                { id: 'device1', label: 'Device 1', type: 'text', placeholder: 'Enter first device', required: true },
                { id: 'device2', label: 'Device 2', type: 'text', placeholder: 'Enter second device', required: false },
                { id: 'device3', label: 'Device 3', type: 'text', placeholder: 'Enter third device', required: false },
                { id: 'osVersion', label: 'OS Version', type: 'text', placeholder: 'Enter OS version', required: false },
                { id: 'startDate', label: 'Start Date', type: 'date', placeholder: '', required: true },
                { id: 'dueDate', label: 'Due Date', type: 'date', placeholder: '', required: true },
                { id: 'previousBugReportLink', label: 'Previous Bug Report Link', type: 'url', placeholder: 'Enter link to previous bug report', required: true },
                { id: 'yourName', label: 'Your Name', type: 'text', placeholder: 'Enter your name', required: true }
            ],
            content: `
Subject: Dev Retesting Started for {projectName}

Dear {recipientName},

I am pleased to inform you that the retesting phase for {projectName} has started. This phase focuses on verifying fixes for previously identified issues and ensuring stability across the application. Please find the details below for your reference:

🧪 Testing Details:
Website: {websiteName}
Backend: {backendName}
Frontend URL: {frontendUrl}
Backend URL: {backendUrl}
Username: {username}
Password: {password}

🔍 Scope of Retesting:
- Verification of fixes for {totalIssues} previously logged issues
- Retesting of {bugsCount} bugs
- Validation of UI and functionality changes
- Cross-browser and device compatibility
- Performance improvements
- Security and SEO rechecks

🧰 Testing Method & Tools:
Method: Manual + Automation
Tools:
- Selenium – Validation of fixes
- Burp Suite – Security retesting
- Axe – Accessibility revalidation
- JAM – Bug recording
- Screaming Frog – SEO reanalysis
- GitLab (Bug Tracker): {bugtrackerUrl}

🌐 Browsers Covered:
{browser1}, {browser2 || 'N/A'}, {browser3 || 'N/A'}, {browser4 || 'N/A'}

💻 Devices Used:
{device1} ({osVersion || 'N/A'})
{device2 || 'N/A'}
{device3 || 'N/A'}

📅 Timeline:
Start Date: {startDate}
Expected Due Date: {dueDate}

📊 Previous Testing Summary:
- Total Issues Logged: {totalIssues}
- Bugs Logged: {bugsCount}
- Link to Previous Bug Report: {previousBugReportLink}

Please feel free to reach out if you have any questions or require additional details.

Best regards,
{yourName}
            `,
            icon: 'fas fa-redo'
        },
        'dev-retesting-phase-rejected': {
            fields: [
                { id: 'recipientName', label: 'Recipient\'s Name', type: 'text', placeholder: 'Enter recipient\'s name', required: true },
                { id: 'projectName', label: 'Project Name', type: 'text', placeholder: 'Enter project name', required: true },
                { id: 'websiteName', label: 'Website Name', type: 'text', placeholder: 'Enter website name', required: true },
                { id: 'backendName', label: 'Backend Name', type: 'text', placeholder: 'Enter backend name', required: true },
                { id: 'frontendUrl', label: 'Frontend URL', type: 'url', placeholder: 'Enter frontend URL', required: true },
                { id: 'backendUrl', label: 'Backend URL', type: 'url', placeholder: 'Enter backend URL', required: true },
                { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter username', required: true },
                { id: 'password', label: 'Password', type: 'text', placeholder: 'Enter password', required: true },
                { id: 'totalReopenedBugs', label: 'Total Reopened Bugs', type: 'number', placeholder: 'Enter total reopened bugs', required: true },
                { id: 'startDate', label: 'Start Date', type: 'date', placeholder: '', required: true },
                { id: 'endDate', label: 'End Date', type: 'date', placeholder: '', required: true },
                { id: 'totalIssues', label: 'Total Issues', type: 'number', placeholder: 'Enter total issues reviewed', required: true },
                { id: 'bugsCount', label: 'Bugs Count', type: 'number', placeholder: 'Enter total bugs identified', required: true },
                { id: 'bugtrackerUrl', label: 'Bugtracker URL', type: 'url', placeholder: 'Enter bugtracker URL', required: true },
                { id: 'previousBugReportLink', label: 'Previous Bug Report Link', type: 'url', placeholder: 'Enter previous bug report link', required: true },
                { id: 'newBugs', label: 'New Bugs', type: 'number', placeholder: 'Enter new bugs count', required: true },
                { id: 'viewNewBugsLink', label: 'View New Bugs Link', type: 'url', placeholder: 'Enter link to view new bugs', required: true },
                { id: 'viewReopenedBugsLink', label: 'View Reopened Bugs Link', type: 'url', placeholder: 'Enter link to view reopened bugs', required: true },
                { id: 'criticalBugs', label: 'Critical Bugs', type: 'number', placeholder: 'Enter critical bugs count', required: true },
                { id: 'viewCriticalBugsLink', label: 'View Critical Bugs Link', type: 'url', placeholder: 'Enter link to view critical bugs', required: true },
                { id: 'viewAllIssuesLink', label: 'View All Issues Link', type: 'url', placeholder: 'Enter link to view all issues', required: true },
                { id: 'browser1', label: 'Browser 1', type: 'text', placeholder: 'Enter first browser', required: true },
                { id: 'browser2', label: 'Browser 2', type: 'text', placeholder: 'Enter second browser', required: false },
                { id: 'browser3', label: 'Browser 3', type: 'text', placeholder: 'Enter third browser', required: false },
                { id: 'browser4', label: 'Browser 4', type: 'text', placeholder: 'Enter fourth browser', required: false },
                { id: 'device1', label: 'Device 1', type: 'text', placeholder: 'Enter first device', required: true },
                { id: 'device2', label: 'Device 2', type: 'text', placeholder: 'Enter second device', required: false },
                { id: 'device3', label: 'Device 3', type: 'text', placeholder: 'Enter third device', required: false },
                { id: 'osVersion', label: 'OS Version', type: 'text', placeholder: 'Enter OS version', required: false },
                { id: 'yourName', label: 'Your Name', type: 'text', placeholder: 'Enter your name', required: true }
            ],
            content: `
Dear {recipientName},

I regret to inform you that the retesting phase for {projectName} has been rejected due to the discovery of multiple reopened bugs. Below are the details for your reference:

### Testing Details:
- Website: {websiteName}
- Backend: {backendName}
- Frontend URL: {frontendUrl}
- Backend URL: {backendUrl}
- Username: {username}
- Password: {password}

### Reason for Rejection:
During the retesting phase, {totalReopenedBugs} reopened bugs were identified, indicating that previously reported issues remain unresolved. This prevents the phase from being approved.

### Retesting Summary:
- Start Date: {startDate}
- End Date: {endDate}
- Total Issues Reviewed: {totalIssues}
- Total Bugs Identified: {bugsCount}
- Reopened Bugs: {totalReopenedBugs}
- Bugtracker: {bugtrackerUrl}
- Previous Testing Report: {previousBugReportLink}

### Issues Breakdown:
<table border="1" cellpadding="5" cellspacing="0">
    <thead>
        <tr>
            <th>Category</th>
            <th>Count</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Total Issues</td>
            <td>{totalIssues}</td>
            <td><a href="{viewAllIssuesLink}">View All Issues</a></td>
        </tr>
        <tr>
            <td>New Bugs</td>
            <td>{newBugs}</td>
            <td><a href="{viewNewBugsLink}">View New Bugs</a></td>
        </tr>
        <tr>
            <td>Reopened Bugs</td>
            <td>{totalReopenedBugs}</td>
            <td><a href="{viewReopenedBugsLink}">View Reopened Bugs</a></td>
        </tr>
        <tr>
            <td>Critical Bugs</td>
            <td>{criticalBugs}</td>
            <td><a href="{viewCriticalBugsLink}">View Critical Bugs</a></td>
        </tr>
    </tbody>
</table>

### Testing Method:
Manual + Automation

### Testing Tools:
- Selenium: Validation of fixes
- Burp Suite: Security rechecks
- Axe: Accessibility validation
- JAM: Bug recording
- GitLab (Bug Tracker): {bugtrackerUrl}
- Screaming Frog: SEO revalidation

### Browsers Covered:
{browser1}, {browser2 || 'N/A'}, {browser3 || 'N/A'}, {browser4 || 'N/A'}

### Devices Used:
- {device1} ({osVersion || 'N/A'})
- {device2 || 'N/A'}
- {device3 || 'N/A'}

### Next Steps:
The development team is requested to resolve the {totalReopenedBugs} reopened bugs and address any critical issues. A new retesting phase will be scheduled once the fixes are implemented and verified.

Please review the detailed bug report at {bugtrackerUrl} and let me know if you require further details or assistance.

Best regards,  
{yourName}
            `,
            icon: 'fas fa-times-circle'
        },
        'assign-task': {
            fields: [
                { id: 'recipientName', label: 'Recipient\'s Name', type: 'text', placeholder: 'Enter recipient\'s name', required: true },
                { id: 'taskDescription', label: 'Task Description', type: 'textarea', placeholder: 'Enter task description', required: true },
                { id: 'dueDate', label: 'Due Date', type: 'date', placeholder: '', required: true },
                { id: 'yourName', label: 'Your Name', type: 'text', placeholder: 'Enter your name', required: true }
            ],
            content: `
Subject: New Task Assignment

Dear {recipientName},

You have been assigned a new task. Please find the details below:

**Task Description**: {taskDescription}
**Due Date**: {dueDate}

Please ensure to complete the task by the specified due date. Feel free to reach out if you have any questions.

Best regards,
{yourName}
            `,
            icon: 'fas fa-tasks'
        }
    };

    // Attach event listeners to template buttons
    templateButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedTemplate = button.getAttribute('data-template');
            templateButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            const fields = templates[selectedTemplate]?.fields || [];
            generateForm(fields);
            modalTitle.textContent = 'Template Form';
            popupForm.style.display = 'block';
            adminTemplateForm.style.display = 'none';
            modal.style.display = 'flex';
        });
    });

    // Handle wheel segment click
    wheelSegments.forEach(segment => {
        segment.addEventListener('click', () => {
            selectedTemplate = segment.getAttribute('data-template');
            wheelSegments.forEach(seg => seg.classList.remove('selected'));
            segment.classList.add('selected');
            const fields = templates[selectedTemplate]?.fields || [];
            generateForm(fields);
            modalTitle.textContent = 'Template Form';
            popupForm.style.display = 'block';
            adminTemplateForm.style.display = 'none';
            modal.style.display = 'flex';
        });
    });

    // Admin access with password
    adminAccessBtn.addEventListener('click', () => {
        const password = prompt('Enter admin password:');
        if (password === 'Abhihere12') {
            adminTemplateSection.style.display = 'block';
        } else {
            alert('Incorrect password. Access denied.');
        }
    });

    // Handle add new template
    addNewTemplateBtn.addEventListener('click', () => {
        editingTemplate = null;
        document.getElementById('isEditing').value = 'false';
        modalTitle.textContent = 'Add New Template';
        adminTemplateForm.reset();
        popupForm.style.display = 'none';
        adminTemplateForm.style.display = 'block';
        modal.style.display = 'flex';
    });

    // Handle edit templates
    editTemplatesBtn.addEventListener('click', () => {
        const templateSelect = document.createElement('select');
        templateSelect.id = 'templateSelect';
        templateSelect.className = 'custom-input';
        templateSelect.style.width = '100%';
        templateSelect.style.padding = '14px';
        templateSelect.style.marginBottom = '15px';
        templateSelect.innerHTML = '<option value="">Select a template to edit</option>' + Object.keys(templates).map(template => `
            <option value="${template}">${template.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
        `).join('');
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        formGroup.innerHTML = '<label for="templateSelect">Select Template:</label>';
        formGroup.appendChild(templateSelect);
        adminTemplateForm.insertBefore(formGroup, adminTemplateForm.firstChild);

        editingTemplate = null;
        document.getElementById('isEditing').value = 'false';
        modalTitle.textContent = 'Edit Template';
        adminTemplateForm.reset();
        popupForm.style.display = 'none';
        adminTemplateForm.style.display = 'block';
        modal.style.display = 'flex';

        templateSelect.addEventListener('change', () => {
            const selectedTemplateName = templateSelect.value;
            if (selectedTemplateName) {
                editingTemplate = selectedTemplateName;
                document.getElementById('isEditing').value = 'true';
                const template = templates[selectedTemplateName];
                document.getElementById('templateName').value = selectedTemplateName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                document.getElementById('templateFields').value = template.fields.map(field => field.label).join(', ');
                document.getElementById('templateContent').value = template.content;
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        adminTemplateForm.querySelectorAll('.form-group').forEach((group, index) => {
            if (index === 0 && group.querySelector('#templateSelect')) {
                group.remove();
            }
        });
        modal.style.display = 'none';
        resetForm();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            adminTemplateForm.querySelectorAll('.form-group').forEach((group, index) => {
                if (index === 0 && group.querySelector('#templateSelect')) {
                    group.remove();
                }
            });
            modal.style.display = 'none';
            resetForm();
        }
    });

    // Generate form fields dynamically
    function generateForm(fields) {
        popupFormContent.innerHTML = '';
        fields.forEach(field => {
            const fieldHTML = `
                <div class="form-group">
                    <label for="${field.id}">${field.label}:</label>
                    <div class="custom-input">
                        <i class="fas fa-${getIconForField(field.id)}"></i>
                        ${field.type === 'textarea' ? 
                            `<textarea id="${field.id}" name="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} rows="5"></textarea>` :
                            `<input type="${field.type}" id="${field.id}" name="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`
                        }
                    </div>
                </div>
            `;
            popupFormContent.innerHTML += fieldHTML;
        });
    }

    // Get appropriate Font Awesome icon for each field
    function getIconForField(fieldId) {
        const icons = {
            projectName: 'project-diagram',
            recipientName: 'user',
            websiteName: 'globe',
            backendName: 'server',
            frontendUrl: 'link',
            backendUrl: 'link',
            username: 'user-lock',
            password: 'lock',
            criticalBugs: 'exclamation-triangle',
            startDate: 'calendar-alt',
            endDate: 'calendar-check',
            totalIssues: 'list',
            bugsCount: 'bug',
            bugtrackerUrl: 'bug',
            newBugs: 'plus-circle',
            viewNewBugsLink: 'link',
            viewCriticalBugsLink: 'link',
            otherBugs: 'info-circle',
            viewOtherBugsLink: 'link',
            viewAllIssuesLink: 'link',
            browser1: 'desktop',
            browser2: 'desktop',
            browser3: 'desktop',
            browser4: 'desktop',
            device1: 'mobile-alt',
            device2: 'tablet-alt',
            device3: 'laptop',
            osVersion: 'cog',
            yourName: 'signature',
            taskDescription: 'tasks',
            dueDate: 'calendar-alt',
            testDocName: 'file-alt',
            pcName: 'user-tie',
            teamLeadName: 'user-shield',
            approvalDeadline: 'calendar-check',
            senderName: 'signature',
            testDocLink: 'link',
            totalReopenedBugs: 'bug',
            viewReopenedBugsLink: 'link',
            previousBugReportLink: 'link'
        };
        return icons[fieldId] || 'pen';
    }

    // Handle form submission
    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formData = new FormData(popupForm);
        const data = Object.fromEntries(formData);
        if (validateForm(data)) {
            modal.style.display = 'none';
            generateAndDisplayEmail(data);
        } else {
            alert('Please fill all required fields.');
        }
    });

    // Handle admin template submission (add or edit)
    adminTemplateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const isEditing = document.getElementById('isEditing').value === 'true';
        const templateNameInput = document.getElementById('templateName').value.toLowerCase().replace(/\s+/g, '-');
        const templateFieldsInput = document.getElementById('templateFields').value.split(',').map(field => field.trim());
        const templateContent = document.getElementById('templateContent').value;

        if (templateNameInput && templateFieldsInput.length && templateContent) {
            const fields = templateFieldsInput.map(field => ({
                id: field.toLowerCase().replace(/\s+/g, '-'),
                label: field.charAt(0).toUpperCase() + field.slice(1),
                type: 'text',
                placeholder: `Enter ${field.toLowerCase()}`,
                required: true
            }));
            const templateName = isEditing ? editingTemplate : templateNameInput;
            templates[templateName] = { fields, content: templateContent, icon: 'fas fa-file-alt' };

            if (isEditing) {
                updateTemplateSegment(templateName, 'fas fa-file-alt');
            } else {
                addTemplateSegment(templateName, 'fas fa-file-alt');
            }
            adminTemplateForm.querySelectorAll('.form-group').forEach((group, index) => {
                if (index === 0 && group.querySelector('#templateSelect')) {
                    group.remove();
                }
            });
            modal.style.display = 'none';
            adminTemplateForm.reset();
            alert(`${isEditing ? 'Edited' : 'Added'} template successfully!`);
            editingTemplate = null;
        } else {
            alert('Please fill all fields for the new template.');
        }
    });

    // Validate form data
    function validateForm(data) {
        const requiredFields = templates[selectedTemplate]?.fields || [];
        return requiredFields.every(field => !field.required || (data[field.id] && data[field.id].trim() !== ''));
    }

    // Generate and display email immediately
    function generateAndDisplayEmail(data) {
        const template = templates[selectedTemplate];
        let emailContent = template.content;
        for (const [key, value] of Object.entries(data)) {
            emailContent = emailContent.replace(`{${key}}`, value || 'N/A');
        }
        emailPreview.innerHTML = `<pre>${emailContent}</pre>`;
        previewSection.style.display = 'block';
        copyEmailButton.disabled = false;
        window.scrollTo({ top: previewSection.offsetTop, behavior: 'smooth' });
    }

    // Handle copy email button click
    copyEmailButton.addEventListener('click', () => {
        const emailContent = emailPreview.textContent;
        navigator.clipboard.writeText(emailContent).then(() => {
            alert('Email content copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });

    // Handle back to form button click
    backToFormButton.addEventListener('click', () => {
        previewSection.style.display = 'none';
        wheelSegments.forEach(seg => seg.classList.remove('selected'));
        resetForm();
    });

    // Add new template segment to wheel
    function addTemplateSegment(templateName, templateIcon) {
        const segmentHTML = `
            <div class="wheel-segment custom-template" data-template="${templateName}">
                <i class="${templateIcon}"></i> ${templateName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
        `;
        wheel.insertAdjacentHTML('beforeend', segmentHTML);
        const newSegment = wheel.lastElementChild;
        newSegment.addEventListener('click', () => {
            selectedTemplate = newSegment.getAttribute('data-template');
            wheelSegments.forEach(seg => seg.classList.remove('selected'));
            newSegment.classList.add('selected');
            const fields = templates[selectedTemplate]?.fields || [];
            generateForm(fields);
            modalTitle.textContent = 'Template Form';
            popupForm.style.display = 'block';
            adminTemplateForm.style.display = 'none';
            modal.style.display = 'flex';
        });
        // Update wheelSegments NodeList
        wheelSegments = document.querySelectorAll('.wheel-segment');
        updateWheelLayout();
    }

    // Update existing template segment
    function updateTemplateSegment(templateName, templateIcon) {
        const segment = document.querySelector(`.wheel-segment[data-template="${templateName}"]`);
        if (segment) {
            segment.innerHTML = `<i class="${templateIcon}"></i> ${templateName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
            // Reattach event listener
            segment.removeEventListener('click', segment._clickHandler);
            segment._clickHandler = () => {
                selectedTemplate = segment.getAttribute('data-template');
                wheelSegments.forEach(seg => seg.classList.remove('selected'));
                segment.classList.add('selected');
                const fields = templates[selectedTemplate]?.fields || [];
                generateForm(fields);
                modalTitle.textContent = 'Template Form';
                popupForm.style.display = 'block';
                adminTemplateForm.style.display = 'none';
                modal.style.display = 'flex';
            };
            segment.addEventListener('click', segment._clickHandler);
        }
    }

    // Update wheel layout dynamically
    function updateWheelLayout() {
        const segments = document.querySelectorAll('.wheel-segment');
        const angleStep = 360 / segments.length;
        segments.forEach((segment, index) => {
            segment.style.transform = `rotate(${index * angleStep}deg) translate(150px) rotate(-${index * angleStep}deg)`;
        });
    }

    // Initialize wheel layout
    updateWheelLayout();

    // Reset form and state
    function resetForm() {
        popupForm.reset();
        adminTemplateForm.reset();
        formData = null;
        selectedTemplate = null;
        editingTemplate = null;
        document.getElementById('isEditing').value = 'false';
        previewSection.style.display = 'none';
        copyEmailButton.disabled = true;
        emailPreview.innerHTML = '';
        popupForm.style.display = 'block';
        adminTemplateForm.style.display = 'none';
        adminTemplateForm.querySelectorAll('.form-group').forEach((group, index) => {
            if (index === 0 && group.querySelector('#templateSelect')) {
                group.remove();
            }
        });
    }
});
